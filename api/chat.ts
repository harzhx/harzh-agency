import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY || "";
    if (key) {
      try {
        aiClient = new GoogleGenAI({
          apiKey: key,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } },
        });
      } catch (err) {
        console.error("Failed to initialize GoogleGenAI:", err);
      }
    }
  }
  return aiClient;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") return res.status(200).json({ status: "ok" });

  const { messages, creatorNiche, promptType } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array" });
  }

  const lastUserMessage = messages[messages.length - 1]?.content || "";
  const systemInstruction = `You are "Harzh AI", the elite Chief Content Strategist & Video Editing Director at Harzh Creative Agency.
You specialize in helping YouTubers, short-form creators (TikTok/Reels/Shorts), and podcasters skyrocket audience retention, master the 3-second hook, optimize pacing curves, and turn raw footage into high-converting retention machines.
Creator niche: ${creatorNiche || "General YouTube / Content Creation"}.
Prompt Focus: ${promptType || "General Strategy"}.
Format responses with clean, crisp markdown, bullet points, and actionable takeaways. Keep replies punchy, engaging, and under 300 words.`;

  const ai = getAIClient();
  if (ai) {
    try {
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 600,
        },
      });

      const reply = response.text || "I'd love to help you scale your retention. Book a call to speak directly with our team.";
      return res.status(200).json({ reply });
    } catch (err: any) {
      console.warn("Gemini API call notice, using fallback:", err?.message || err);
    }
  }

  return res.status(200).json({
    reply: `Here is a high-retention strategy framework for **${creatorNiche || "your channel"}**:\n\n1. **The Cold 3-Second Open:** Start directly in media res. Never say 'In this video...'\n2. **Visual Stimulus Every 2.8s:** Inject focal punch-ins and foley stingers at every paragraph break.\n3. **Curiosity Stacking:** Open a psychological tension loop before answering the previous question.\n\nBook a 15-minute retention audit call on our calendar so we can review your raw timelines directly!`,
  });
}
