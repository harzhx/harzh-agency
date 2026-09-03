import express from "express";
import type { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4321;

app.use(express.json());

// Gemini API Key from environment
const API_KEY = process.env.GEMINI_API_KEY || "";

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY || "";
    if (key) {
      try {
        aiClient = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize GoogleGenAI:", err);
      }
    }
  }
  return aiClient;
}

import fs from "fs";

const LEADS_FILE = path.join(process.cwd(), "leads.json");

// Ensure leads file exists
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const CALCOM_API_KEY = process.env.CALCOM_API_KEY || "cal_live_62c45680b48210759140635b31b51666";
const CALCOM_EVENT_TYPE_ID = 6897453;

function parseSlotToISO(dateStr: string, slotStr: string): string {
  try {
    const d = new Date(dateStr);
    const [time, period] = (slotStr || "5:00 PM").split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");

    // IST is UTC+05:30
    const istISO = `${year}-${month}-${day}T${h}:${m}:00+05:30`;
    return new Date(istISO).toISOString();
  } catch {
    return new Date(Date.now() + 86400000).toISOString();
  }
}

// Normalize revenue tier to exact Cal.com dropdown option
function normalizeRevenueTier(tier: string): string {
  const t = (tier || "").toLowerCase();
  if (t.includes("10k") || t.includes("10,000") || t.includes("above")) return "Above $10,000";
  if (t.includes("0 – 1k") || t.includes("0 - 1k") || t.includes("0 – $1k") || t.includes("0 – 1,000") || t.includes("0 - 1,000")) return "$0 – $1,000";
  if (t.includes("1k – 5k") || t.includes("1k - 5k") || t.includes("1k – $5k") || t.includes("1,000 – 5,000") || t.includes("1,000 - 5,000")) return "$1,000 – $5,000";
  if (t.includes("5k – 10k") || t.includes("5k - 10k") || t.includes("5k – $10k") || t.includes("5,000 – 10,000") || t.includes("5,000 - 10,000")) return "$5,000 – $10,000";
  return "$1,000 – $5,000";
}

// Bookings & Leads API Endpoint
app.post("/api/bookings", async (req: Request, res: Response) => {
  const { name, email, channelLink, revenueTier, phone, selectedDate, selectedSlot } = req.body;

  if (!name || !email || !channelLink) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newLead = {
    id: `lead_${Date.now()}`,
    name,
    email,
    channelLink,
    revenueTier: revenueTier || "$1K – $5K",
    phone: phone || "Not provided",
    meetingDate: selectedDate || new Date().toISOString(),
    meetingSlot: selectedSlot || "5:00 PM",
    bookedAt: new Date().toISOString(),
    status: "CONFIRMED",
  };

  // 1. Persist to local database ledger
  try {
    const rawData = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads = JSON.parse(rawData || "[]");
    leads.unshift(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    console.log(`[LEAD CAPTURED] ${name} (${channelLink}) - ${selectedSlot}`);
  } catch (err: any) {
    console.error("Failed to save lead:", err);
  }

  // 2. Background Sync with Cal.com API (Creates Google Calendar Event + Google Meet Link)
  let meetingUrl = "https://meet.google.com/hzh-cal-strategy";
  let calResponse: any = null;

  try {
    const startISO = parseSlotToISO(selectedDate, selectedSlot);
    const normalizedRevenue = normalizeRevenueTier(revenueTier || "");

    const payload: any = {
      start: startISO,
      eventTypeId: CALCOM_EVENT_TYPE_ID,
      attendee: {
        name,
        email,
        timeZone: "Asia/Calcutta",
      },
      bookingFieldsResponses: {
        "Link-to-your-social-media-accounts-or": channelLink,
        "What-s-your-total-monthly-business-revenue-in": normalizedRevenue,
      },
    };

    if (phone && phone.trim()) {
      payload.attendee.phoneNumber = phone.trim();
    }

    const response = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        "cal-api-version": "2024-08-13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3500),
    });

    calResponse = await response.json();

    if (response.ok && calResponse?.data?.meetingUrl) {
      meetingUrl = calResponse.data.meetingUrl;
      console.log(`[CAL.COM SYNC SUCCESS] Meeting created:`, meetingUrl);
    } else if (response.ok && calResponse?.data?.location) {
      meetingUrl = calResponse.data.location;
    } else {
      console.warn("[CAL.COM SYNC NOTICE]:", calResponse?.error?.message || "Using fallback meet link");
    }
  } catch (apiErr: any) {
    console.warn("Cal.com background sync notice:", apiErr);
  }

  return res.json({
    success: true,
    lead: newLead,
    booking: {
      data: {
        meetingUrl,
        location: meetingUrl,
      },
    },
  });
});

// Real-time Live Available Slots Endpoint (Reads Google Calendar via Cal.com API with Guaranteed Availability Fallback)
const DEFAULT_SLOTS_POOL = [
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

app.get("/api/available-slots", async (req: Request, res: Response) => {
  const formattedSlots: Record<string, string[]> = {};

  try {
    const now = new Date();
    const startTime = now.toISOString();
    const nextWeek = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
    const endTime = nextWeek.toISOString();

    const calUrl = `https://api.cal.com/v2/slots/available?eventTypeId=${CALCOM_EVENT_TYPE_ID}&startTime=${startTime}&endTime=${endTime}`;

    const response = await fetch(calUrl, {
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        "cal-api-version": "2024-08-13",
      },
      signal: AbortSignal.timeout(3000),
    });

    if (response.ok) {
      const data = await response.json();
      const rawSlots = data?.data?.slots || {};

      for (const slotList of Object.values(rawSlots)) {
        if (Array.isArray(slotList)) {
          for (const slotObj of slotList) {
            if (slotObj?.time) {
              const slotDate = new Date(slotObj.time);
              const localDateKey = slotDate.toLocaleDateString("en-CA", { timeZone: "Asia/Calcutta" });
              const localTimeStr = slotDate.toLocaleTimeString("en-US", {
                timeZone: "Asia/Calcutta",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              });

              if (!formattedSlots[localDateKey]) {
                formattedSlots[localDateKey] = [];
              }
              if (!formattedSlots[localDateKey].includes(localTimeStr)) {
                formattedSlots[localDateKey].push(localTimeStr);
              }
            }
          }
        }
      }
    }

    // Ensure 11:30 PM is included and slots are sorted chronologically
    for (const dateKey of Object.keys(formattedSlots)) {
      if (!formattedSlots[dateKey].includes("11:30 PM")) {
        formattedSlots[dateKey].push("11:30 PM");
      }
      formattedSlots[dateKey].sort((a, b) => {
        const toMin = (t: string) => {
          const [time, period] = t.split(" ");
          let [h, m] = time.split(":").map(Number);
          if (period === "PM" && h < 12) h += 12;
          if (period === "AM" && h === 12) h = 0;
          return h * 60 + m;
        };
        return toMin(a) - toMin(b);
      });
    }

    return res.json({ success: true, slots: formattedSlots });
  } catch (err: any) {
    console.warn("Live Cal.com slot fetch notice (using guaranteed slot pool):", err?.message || err);
  }

  // Guaranteed fallback: ensure today and next 10 days always have open available slots up to 11:30 PM
  for (let i = 0; i <= 10; i++) {
    const d = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    const dateKey = d.toLocaleDateString("en-CA", { timeZone: "Asia/Calcutta" });
    if (!formattedSlots[dateKey] || formattedSlots[dateKey].length === 0) {
      formattedSlots[dateKey] = [...DEFAULT_SLOTS_POOL];
    }
  }

  return res.json({ success: true, slots: formattedSlots });
});

// Admin Lead Viewer API Endpoint
app.get("/api/bookings", (_req: Request, res: Response) => {
  try {
    const rawData = fs.readFileSync(LEADS_FILE, "utf-8");
    const leads = JSON.parse(rawData || "[]");
    return res.json({ leads, total: leads.length });
  } catch {
    return res.status(500).json({ error: "Failed to read leads" });
  }
});

// AI Content Strategy & Video Script Chatbot API
app.post("/api/chat", async (req: Request, res: Response) => {
  const { messages, creatorNiche, promptType } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array" });
  }

  const lastUserMessage = messages[messages.length - 1]?.content || "";

  const systemInstruction = `You are "Harzh AI", the elite Chief Content Strategist & Video Editing Director at Harzh Creative Agency.
You specialize in helping YouTubers, short-form creators (TikTok/Reels/Shorts), and podcasters skyrocket audience retention, master the 3-second hook, optimize pacing curves, and turn raw footage into high-converting retention machines.

Your personality:
- Highly analytical, direct, creative, and data-driven.
- Knowledgeable about MrBeast pacing, Ali Abdaal visual storytelling, Iman Gadzhi cinematic editing, Alex Hormozi kinetic captions, and algorithmic retention curves.
- When creators ask for hook ideas, provide 3-5 punchy, pattern-interrupt hooks with clear visual notes.
- When asked about video pacing, critique their structure with second-by-second advice.
- When asked about pricing or working with Harzh Agency, warmly explain our services (Full YouTube Longform Editing, Short-Form Repurposing Engine, Thumbnail & Packaging Matrix, Dedicated 48-hour turnarounds).

Creator niche: ${creatorNiche || "General YouTube / Content Creation"}.
Prompt Focus: ${promptType || "General Strategy"}.

Format responses with clean, crisp markdown, bullet points, and actionable takeaways. Keep replies punchy, engaging, and under 300 words unless deep analysis is requested.`;

  const ai = getAIClient();

  if (ai) {
    try {
      // Build conversation context
      const chat = ai.chats.create({
        model: "gemini-3.7-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      // Send recent messages for context
      const response = await chat.sendMessage({
        message: lastUserMessage,
      });

      const replyText = response.text || "Here is a strategic breakdown for your content...";
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.warn("Gemini API call encountered an error, falling back to smart agency strategist logic:", error?.message || error);
    }
  }

  // Smart fallback strategist responses if key is not configured or in offline preview
  const smartFallback = generateSmartAgencyResponse(lastUserMessage, creatorNiche, promptType);
  return res.json({ reply: smartFallback });
});

// Helper for high-fidelity fallback responses
function generateSmartAgencyResponse(message: string, niche: string = "Creator", promptType: string = ""): string {
  const lower = message.toLowerCase();

  if (lower.includes("hook") || promptType === "hooks") {
    return `### 🔥 High-Retention Hook Frameworks for **${niche}**

Here are 4 battle-tested pattern interrupts designed to stop the scroll in under 1.8 seconds:

1. **The Negative Premise Hook**: 
   > *"Everything you’ve been told about [Common Belief] is why you're staying stuck..."*
   *Visual Note:* Fast whip-pan cut with blurred background and dynamic red punch-in text.

2. **The High-Stakes Proof**:
   > *"I tested 30 different strategies over 90 days so you don't waste $10,000 like I did."*
   *Visual Note:* Hold the primary result artifact in frame during frame 0.00.

3. **The Uncomfortable Question**:
   > *"What happens if your biggest competitor discovered this exact workflow yesterday?"*
   *Visual Note:* Slow cinematic push-in with low-pass ambient riser audio.

4. **The Direct Contrast**:
   > *"Average creators spend 14 hours doing this. We automated it down to 8 minutes."*
   *Visual Note:* Split-screen side-by-side comparison with timer overlay.

💡 **Agency Pro-Tip:** Never start a video by introducing your name or channel. Hook first, deliver value payoff at 0:15, and introduce yourself at 1:30!`;
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("package") || lower.includes("service")) {
    return `### ⚡ Harzh Agency Partnership Tiers

We offer dedicated, high-touch video editing and retention strategy for creators who want to save 25+ hours every week and scale viewership:

- **1. Short-Form Growth Engine ($1,850/mo)**: 16 high-impact TikToks/Shorts/Reels with custom sound foley, kinetic typography, dynamic zoom cuts & 48h turnaround.
- **2. Full YouTube Authority ($3,600/mo)**: 4 longform master edits (up to 20 mins) + 12 short-form cutdowns + 2 A/B tested thumbnails per video + retention pacing diagnostics.
- **3. Custom Creator Studio ($5,500/mo)**: Full end-to-end strategy, unlimited revisions, weekly ideation call, dedicated senior editor & art director.

👉 **Ready to audit your channel?** Click the **"Book Strategy Call"** button at the top to lock in a free 15-minute video retention breakdown!`;
  }

  if (lower.includes("pacing") || lower.includes("retention") || lower.includes("drop")) {
    return `### 📈 The 80% Retention Curve Blueprint

To eliminate the classic 30-second audience dropoff:

1. **Micro-Pacing Rule**: Change visual stimuli every **2.5 to 3.8 seconds** (B-roll, graphic overlay, punch-in, or text highlight).
2. **Audio Riser Transitions**: Place subtle whooshes and sub-bass hits 0.5s *before* major topic shifts to prime the viewer's subconscious attention.
3. **Open Loops at 40%**: Introduce a second high-value mystery or bonus framework at minute 3:00 to keep viewers watching through minute 8:00.
4. **Trim the Dead Air**: Remove all natural breathing pauses longer than 0.25 seconds during the initial hook phase.

Want our team to review your latest timeline and pinpoint exact dropoff nodes? Drop your YouTube URL or book a free audit!`;
  }

  return `### 🎬 Harzh Content Strategy Analysis

Thanks for reaching out! In the **${niche}** niche, the biggest leverage point right now is **Visual Density & Retention Architecture**.

Key recommendations for your channel:
- **Hook Optimization**: Shift from topical intros to emotional curiosity gaps.
- **Visual Rhythm**: Add motion graphics and foley sound design to reinforce key metrics.
- **Packaging Synergy**: Ensure your first 5 seconds directly pays off the promise shown on the thumbnail.

Ask me for:
- *"Give me 5 viral hooks about [topic]"*
- *"How can I improve retention in longform video?"*
- *"What editing style fits my channel?"*`;
}

// Vite middleware & Production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        watch: {
          ignored: [
            "**/leads.json",
            "**/leads.json/**",
            "**/*.log",
            "**/.tempmediaStorage/**",
            "**/verify_*.**",
            "**/test_*.**",
          ],
        },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Harzh Agency Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
