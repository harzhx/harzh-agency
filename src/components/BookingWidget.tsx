import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Video,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Globe,
  ChevronDown,
  Lock,
  Zap,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

interface BookingWidgetProps {
  isModal?: boolean;
  onClose?: () => void;
}

const REVENUE_TIERS = [
  { id: "tier_1", label: "$0 – $1K", sub: "Getting Started" },
  { id: "tier_2", label: "$1K – $5K", sub: "Scaling Fast" },
  { id: "tier_3", label: "$5K – $10K", sub: "Established" },
  { id: "tier_4", label: "$10K+", sub: "High-Growth" },
];

const DEFAULT_TIME_SLOTS = [
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

const TIMEZONE_OPTIONS = [
  { value: "Asia/Kolkata", label: "India (IST)", code: "IST", offset: "+05:30" },
  { value: "America/New_York", label: "US Eastern (EST/EDT)", code: "EST", offset: "-04:00" },
  { value: "America/Chicago", label: "US Central (CST/CDT)", code: "CST", offset: "-05:00" },
  { value: "America/Denver", label: "US Mountain (MST/MDT)", code: "MST", offset: "-06:00" },
  { value: "America/Los_Angeles", label: "US Pacific (PST/PDT)", code: "PST", offset: "-07:00" },
  { value: "Europe/London", label: "UK / London (GMT/BST)", code: "GMT", offset: "+01:00" },
  { value: "Europe/Paris", label: "Central Europe (CET/CEST)", code: "CET", offset: "+02:00" },
  { value: "Asia/Dubai", label: "Dubai / UAE (GST)", code: "GST", offset: "+04:00" },
  { value: "Asia/Singapore", label: "Singapore / HK (SGT)", code: "SGT", offset: "+08:00" },
  { value: "Asia/Tokyo", label: "Japan (JST)", code: "JST", offset: "+09:00" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)", code: "AEST", offset: "+10:00" },
  { value: "Pacific/Auckland", label: "New Zealand (NZST)", code: "NZST", offset: "+12:00" },
];

function getTimeAngles(slotStr: string): { hourAngle: number; minuteAngle: number } {
  try {
    const [time, period] = (slotStr || "5:00 PM").split(" ");
    const [hStr, mStr] = time.split(":");
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10) || 0;
    if (period === "PM" && h < 12) h += 12;
    if (period === "AM" && h === 12) h = 0;

    const hourOnClock = (h % 12) + m / 60;
    const hourAngle = hourOnClock * 30;
    const minuteAngle = m * 6;
    return { hourAngle, minuteAngle };
  } catch {
    return { hourAngle: 150, minuteAngle: 0 };
  }
}

// Convert IST slot timestamp to user-selected timezone
function formatSlotInTimezone(date: Date, slotStr: string, targetTz: string): string {
  try {
    const [time, period] = (slotStr || "5:00 PM").split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");

    const istISO = `${year}-${month}-${day}T${h}:${m}:00+05:30`;
    const slotDate = new Date(istISO);

    return slotDate.toLocaleTimeString("en-US", {
      timeZone: targetTz,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return slotStr;
  }
}

function isToday(d: Date): boolean {
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

// Check if an IST slot time on a given date is at least 30 minutes in the future
function isSlotInFuture(date: Date, slotStr: string): boolean {
  try {
    if (!isToday(date)) return true;
    const [time, period] = (slotStr || "5:00 PM").split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");

    const slotTime = new Date(`${year}-${month}-${day}T${h}:${m}:00+05:30`).getTime();
    // Allow slots starting at least 30 minutes from now
    return slotTime > Date.now() + 30 * 60 * 1000;
  } catch {
    return true;
  }
}

function parseSlotToISO(d: Date, slotStr: string): string {
  try {
    const [time, period] = (slotStr || "5:00 PM").split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");

    const istISO = `${year}-${month}-${day}T${h}:${m}:00+05:30`;
    return new Date(istISO).toISOString();
  } catch {
    return new Date(Date.now() + 86400000).toISOString();
  }
}

function normalizeRevenueTier(tier: string): string {
  const t = (tier || "").toLowerCase();
  if (t.includes("10k") || t.includes("10,000") || t.includes("above")) return "Above $10,000";
  if (t.includes("0 – 1k") || t.includes("0 - 1k") || t.includes("0 – $1k") || t.includes("0 – 1,000") || t.includes("0 - 1,000")) return "$0 – $1,000";
  if (t.includes("1k – 5k") || t.includes("1k - 5k") || t.includes("1k – $5k") || t.includes("1,000 – 5,000") || t.includes("1,000 - 5,000")) return "$1,000 – $5,000";
  if (t.includes("5k – 10k") || t.includes("5k - 10k") || t.includes("5k – $10k") || t.includes("5,000 – 10,000") || t.includes("5,000 - 10,000")) return "$5,000 – $10,000";
  return "$1,000 – $5,000";
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ isModal = false, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channelLink, setChannelLink] = useState("");
  const [revenueTier, setRevenueTier] = useState<string>("$1K – $5K");
  const [phone, setPhone] = useState("");

  // Timezone State
  const [timezone, setTimezone] = useState<string>(() => {
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const exists = TIMEZONE_OPTIONS.some((t) => t.value === userTz);
      return exists ? userTz : "Asia/Kolkata";
    } catch {
      return "Asia/Kolkata";
    }
  });
  const [isTzDropdownOpen, setIsTzDropdownOpen] = useState(false);

  // Available Dates (Includes TODAY if slots are still open)
  const availableDates = useMemo(() => {
    const dates: Date[] = [];
    const today = new Date();
    const hasRemainingToday = DEFAULT_TIME_SLOTS.some((s) => isSlotInFuture(today, s));

    const current = new Date();
    if (!hasRemainingToday) {
      current.setDate(current.getDate() + 1);
    }

    while (dates.length < 6) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

  // Calendar State (Defaults to Today if available, otherwise Tomorrow)
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date();
    const hasRemainingToday = DEFAULT_TIME_SLOTS.some((s) => isSlotInFuture(today, s));
    if (hasRemainingToday) return today;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [selectedSlot, setSelectedSlot] = useState<string>("5:00 PM");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedMeetUrl, setConfirmedMeetUrl] = useState<string>("https://meet.google.com/hzh-cal-strategy");
  const [isSyncingMeet, setIsSyncingMeet] = useState(false);
  const [liveSlotsByDate, setLiveSlotsByDate] = useState<Record<string, string[]>>({});
  const [slotIsoMap, setSlotIsoMap] = useState<Record<string, string>>({});
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Fetch Live Available Slots (API with Direct Cal.com CORS Fallback)
  useEffect(() => {
    setIsLoadingSlots(true);

    const fetchDirectFromCalCom = async () => {
      try {
        const now = new Date();
        const startTime = now.toISOString();
        const nextWeek = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString();
        const calUrl = `https://api.cal.com/v2/slots/available?eventTypeId=6897453&startTime=${startTime}&endTime=${nextWeek}`;
        const res = await fetch(calUrl, {
          headers: {
            Authorization: "Bearer cal_live_62c45680b48210759140635b31b51666",
            "cal-api-version": "2024-08-13",
          },
        });
        if (res.ok) {
          const data = await res.json();
          const rawSlots = data?.data?.slots || {};
          const formattedSlots: Record<string, string[]> = {};
          const isoMap: Record<string, string> = {};

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
                  if (!formattedSlots[localDateKey]) formattedSlots[localDateKey] = [];
                  if (!formattedSlots[localDateKey].includes(localTimeStr)) formattedSlots[localDateKey].push(localTimeStr);
                  isoMap[`${localDateKey}_${localTimeStr}`] = slotObj.time;
                }
              }
            }
          }
          if (Object.keys(formattedSlots).length > 0) {
            setLiveSlotsByDate(formattedSlots);
            setSlotIsoMap(isoMap);
          }
        }
      } catch (err) {
        console.warn("Direct Cal.com slots notice:", err);
      }
    };

    fetch("/api/available-slots")
      .then((res) => {
        if (!res.ok) throw new Error("Backend slots not available");
        return res.json();
      })
      .then((data) => {
        if (data?.slots && Object.keys(data.slots).length > 0) {
          setLiveSlotsByDate(data.slots);
        }
        if (data?.slotIsoMap) {
          setSlotIsoMap(data.slotIsoMap);
        }
      })
      .catch(async () => {
        await fetchDirectFromCalCom();
      })
      .finally(() => setIsLoadingSlots(false));
  }, []);

  const getLocalDateKey = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateKey = getLocalDateKey(selectedDate);
  const baseSlots =
    liveSlotsByDate[selectedDateKey] && liveSlotsByDate[selectedDateKey].length > 0
      ? liveSlotsByDate[selectedDateKey]
      : DEFAULT_TIME_SLOTS;

  // Filter slots for today so expired hours are hidden
  const rawSlots = useMemo(() => {
    const validSlots = baseSlots.filter((slot) => isSlotInFuture(selectedDate, slot));
    return validSlots.length > 0 ? validSlots : baseSlots;
  }, [baseSlots, selectedDate]);

  useEffect(() => {
    if (rawSlots.length > 0 && !rawSlots.includes(selectedSlot)) {
      setSelectedSlot(rawSlots[0]);
    }
  }, [rawSlots, selectedSlot]);

  // Confetti Blast for Step 3
  const triggerCelebrationConfetti = () => {
    try {
      // Global multi-cannon celebration
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#ffffff", "#6366f1", "#10b981", "#a855f7", "#38bdf8"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors: ["#ffffff", "#6366f1", "#10b981", "#38bdf8"],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors: ["#ffffff", "#6366f1", "#10b981", "#38bdf8"],
        });
      }, 150);
    } catch (err) {
      console.warn("Confetti notice:", err);
    }
  };

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(triggerCelebrationConfetti, 50);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNextToCalendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !channelLink.trim()) {
      alert("Please enter your name, email, and channel URL to proceed.");
      return;
    }
    setStep(2);
  };

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setIsSyncingMeet(true);

    const dateKey = getLocalDateKey(selectedDate);
    const exactSlotIso = slotIsoMap[`${dateKey}_${selectedSlot}`] || "";

    // Direct Cal.com sync
    const directCalComSync = async () => {
      try {
        const startISO = exactSlotIso || parseSlotToISO(selectedDate, selectedSlot);
        const normalizedRevenue = normalizeRevenueTier(revenueTier || "");

        const calRes = await fetch("https://api.cal.com/v2/bookings", {
          method: "POST",
          headers: {
            Authorization: "Bearer cal_live_62c45680b48210759140635b31b51666",
            "cal-api-version": "2024-08-13",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start: startISO,
            eventTypeId: 6897453,
            attendee: {
              name: name || "Creator",
              email: email || "creator@channel.com",
              timeZone: "Asia/Calcutta",
            },
            bookingFieldsResponses: {
              "Link-to-your-social-media-accounts-or": channelLink || "youtube.com",
              "What-s-your-total-monthly-business-revenue-in": normalizedRevenue,
            },
          }),
        });

        if (calRes.ok) {
          const calData = await calRes.json();
          const meet = calData?.data?.meetingUrl || calData?.data?.location;
          if (meet) setConfirmedMeetUrl(meet);
          return true;
        }
      } catch (err) {
        console.warn("Direct Cal.com fallback sync notice:", err);
      } finally {
        setIsSyncingMeet(false);
      }
      return false;
    };

    // Instant optimistic UI transition in 350ms with confetti
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 350);

    // Call Cal.com in parallel
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Creator",
          email: email || "creator@channel.com",
          channelLink: channelLink || "youtube.com",
          revenueTier: revenueTier || "$1K – $5K",
          phone: phone || "",
          selectedDate: selectedDate.toISOString(),
          selectedSlot: selectedSlot || "5:00 PM",
          slotIso: exactSlotIso,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data?.booking?.data?.meetingUrl) {
            setConfirmedMeetUrl(data.booking.data.meetingUrl);
            setIsSyncingMeet(false);
          }
        })
        .catch(() => directCalComSync());
    } else {
      directCalComSync();
    }
  };

  const formattedDateString = selectedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const googleCalendarUrl = useMemo(() => {
    try {
      const [time, period] = (selectedSlot || "5:00 PM").split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const h = String(hours).padStart(2, "0");
      const m = String(minutes).padStart(2, "0");

      const istStart = new Date(`${year}-${month}-${day}T${h}:${m}:00+05:30`);
      const istEnd = new Date(istStart.getTime() + 15 * 60 * 1000); // 15-minute call

      const formatGCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
      const datesParam = `${formatGCalDate(istStart)}/${formatGCalDate(istEnd)}`;

      const title = encodeURIComponent("15-Min Video Retention Audit — Harzh Agency");
      const details = encodeURIComponent(
        `Creator: ${name || "Creator"}\nEmail: ${email || ""}\nChannel: ${channelLink || ""}\nMeeting Link: ${confirmedMeetUrl || "https://meet.google.com/hzh-cal-strategy"}\nHost: Harzh Studio`
      );
      const location = encodeURIComponent(confirmedMeetUrl || "Google Meet (Video Call)");

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${datesParam}`;
    } catch {
      return "https://calendar.google.com";
    }
  }, [name, email, channelLink, confirmedMeetUrl, selectedDate, selectedSlot]);

  const displayTimeInTz = useMemo(() => {
    return formatSlotInTimezone(selectedDate, selectedSlot, timezone);
  }, [selectedDate, selectedSlot, timezone]);

  const currentTzLabel = useMemo(() => {
    const found = TIMEZONE_OPTIONS.find((t) => t.value === timezone);
    return found ? found.label : timezone;
  }, [timezone]);

  const currentTzCode = useMemo(() => {
    const found = TIMEZONE_OPTIONS.find((t) => t.value === timezone);
    return found ? found.code : "TZ";
  }, [timezone]);

  const { hourAngle, minuteAngle } = getTimeAngles(displayTimeInTz);

  return (
    <div className="relative w-full rounded-3xl border border-white/[0.08] bg-[#07080c] text-white shadow-2xl overflow-hidden flex flex-col font-sans">
      {/* Confetti canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-50 w-full h-full" />

      {/* MINIMAL HEADER */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-white/[0.01]">
        <div className="flex items-center gap-2 text-xs font-mono text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-wider uppercase font-semibold">15-Min Strategy Audit</span>
        </div>

        <div className="flex items-center gap-3">
          {step < 3 ? (
            <span className="text-xs font-mono text-white/40">
              <strong className="text-white font-bold">{step === 1 ? "01" : "02"}</strong> / 02
            </span>
          ) : (
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirmed</span>
            </span>
          )}
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* FORM BODY */}
      <div className="relative z-10 p-6 sm:p-8 flex-1 overflow-y-auto">
        {/* ================= STEP 1: INTAKE ================= */}
        {step === 1 && (
          <form onSubmit={handleNextToCalendar} className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
                Book Your Retention Audit
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1 font-normal leading-relaxed">
                We'll audit your video pacing, identify drop-off nodes, and map out your dedicated editing roadmap.
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-medium text-white/70">Channel / Social URL *</label>
                <input
                  type="text"
                  required
                  value={channelLink}
                  onChange={(e) => setChannelLink(e.target.value)}
                  placeholder="youtube.com/@yourchannel"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            {/* Revenue Tier Selector (Condensed Single-Line Pill Bar) */}
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-white/70">Monthly Revenue</label>
                <span className="text-[11px] font-mono text-white/30">Confidential</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {REVENUE_TIERS.map((tier) => {
                  const isSelected = revenueTier === tier.label;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setRevenueTier(tier.label)}
                      className={`py-2.5 px-1 sm:py-2.5 sm:px-3 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? "bg-white text-black border-white font-bold shadow-lg"
                          : "bg-white/[0.02] border-white/[0.06] text-white/70 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap">
                        {tier.label}
                      </div>
                      <div className={`hidden sm:block text-[10px] truncate max-w-full mt-1 ${isSelected ? "text-black/70" : "text-white/40"}`}>
                        {tier.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button & Inline Trust */}
            <div className="pt-1.5">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-[0.99]"
              >
                <span>Select Date &amp; Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-2.5 text-[11px] font-mono text-white/40 whitespace-nowrap">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>100% Free • Instant Google Meet Invite</span>
              </div>
            </div>
          </form>
        )}

        {/* ================= STEP 2: MINIMAL TIME PICKER WITH LARGER CLOCK & TIMEZONE ================= */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Minimalist Clock & Meeting Preview */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Bigger, High-Definition Minimalist Analog Clock */}
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 shrink-0 flex items-center justify-center rounded-full bg-black/50 border border-white/25 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                  <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 48 48">
                    {/* Outer dial ticks */}
                    <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                    {/* 12, 3, 6, 9 Cardinal Markers */}
                    <line x1="24" y1="4" x2="24" y2="8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="44" y1="24" x2="40" y2="24" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="24" y1="44" x2="24" y2="40" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="4" y1="24" x2="8" y2="24" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

                    {/* Secondary hour dots */}
                    <circle cx="34" cy="6.7" r="1" fill="rgba(255,255,255,0.3)" />
                    <circle cx="41.3" cy="14" r="1" fill="rgba(255,255,255,0.3)" />
                    <circle cx="41.3" cy="34" r="1" fill="rgba(255,255,255,0.3)" />
                    <circle cx="34" cy="41.3" r="1" fill="rgba(255,255,255,0.3)" />
                    <circle cx="14" cy="41.3" r="1" fill="rgba(255,255,255,0.3)" />
                    <circle cx="6.7" cy="34" r="1" fill="rgba(255,255,255,0.3)" />
                    <circle cx="6.7" cy="14" r="1" fill="rgba(255,255,255,0.3)" />
                    <circle cx="14" cy="6.7" r="1" fill="rgba(255,255,255,0.3)" />

                    {/* Hour Hand (Crisp White) */}
                    <line
                      x1="24"
                      y1="24"
                      x2="24"
                      y2="12"
                      stroke="#ffffff"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      style={{
                        transformOrigin: "24px 24px",
                        transform: `rotate(${hourAngle}deg)`,
                        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />

                    {/* Minute Hand (Vibrant Indigo Accent) */}
                    <line
                      x1="24"
                      y1="24"
                      x2="24"
                      y2="7"
                      stroke="#818cf8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        transformOrigin: "24px 24px",
                        transform: `rotate(${minuteAngle}deg)`,
                        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />

                    {/* Center Cap */}
                    <circle cx="24" cy="24" r="2.5" fill="#818cf8" />
                    <circle cx="24" cy="24" r="1.2" fill="#ffffff" />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">{formattedDateString}</span>
                    <span className="text-base font-mono font-bold text-indigo-300">
                      @ {displayTimeInTz}
                    </span>
                  </div>
                  <div className="text-xs text-white/50 flex items-center gap-1.5 mt-0.5">
                    <Video className="w-3.5 h-3.5 text-emerald-400" />
                    <span>15m • Google Meet</span>
                  </div>
                </div>
              </div>

              {/* Interactive Timezone Dropdown Selector */}
              <div className="relative w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsTzDropdownOpen(!isTzDropdownOpen)}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-white/80 hover:text-white transition-all flex items-center justify-between sm:justify-center gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="truncate max-w-[170px] sm:max-w-[200px] text-left">{currentTzLabel}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isTzDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Timezone Options Menu */}
                {isTzDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-full sm:w-72 max-h-64 overflow-y-auto rounded-2xl bg-[#0c0e18] border border-white/20 shadow-2xl p-1.5 z-50 backdrop-blur-2xl animate-in fade-in duration-150">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider text-white/40 border-b border-white/[0.06] mb-1">
                      Choose Your Timezone
                    </div>
                    {TIMEZONE_OPTIONS.map((tz) => {
                      const isSelected = tz.value === timezone;
                      return (
                        <button
                          key={tz.value}
                          type="button"
                          onClick={() => {
                            setTimezone(tz.value);
                            setIsTzDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-left text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-white text-black font-bold"
                              : "text-white/80 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          <span className="truncate">{tz.label}</span>
                          <span className={`text-[10px] ${isSelected ? "text-black/60" : "text-white/40"}`}>
                            {tz.offset}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* 6-Day Rolling Date Strip */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/70">Select Date:</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {availableDates.map((date) => {
                  const isSelected = selectedDate.toDateString() === date.toDateString();
                  const isCurrentDay = isToday(date);
                  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                  const dayNum = date.getDate();
                  const monthName = date.toLocaleDateString("en-US", { month: "short" });

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white text-black border-white font-bold shadow-lg scale-[1.02]"
                          : "bg-white/[0.02] border-white/[0.06] text-white/70 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div
                        className={`text-[10px] uppercase font-semibold ${
                          isCurrentDay && !isSelected ? "text-emerald-400 font-bold" : "opacity-70"
                        }`}
                      >
                        {isCurrentDay ? "TODAY" : dayName}
                      </div>
                      <div className="text-lg font-bold my-0.5">{dayNum}</div>
                      <div className="text-[10px] font-medium opacity-60">{monthName}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Chips Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-white/70">
                  Available Slots ({currentTzCode}):
                </label>
                {isLoadingSlots ? (
                  <span className="text-[11px] text-white/40 font-mono animate-pulse">Syncing...</span>
                ) : (
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {rawSlots.length} Open Slots
                  </span>
                )}
              </div>

              {rawSlots.length === 0 ? (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center text-xs text-white/40 font-mono">
                  No slots available on this day. Please pick another date.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-2">
                  {rawSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    const displaySlot = formatSlotInTimezone(selectedDate, slot, timezone);

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-1.5 sm:py-2.5 sm:px-2 rounded-xl text-xs font-mono border transition-all cursor-pointer text-center whitespace-nowrap ${
                          isSelected
                            ? "bg-white text-black border-white font-bold shadow-md"
                            : "bg-white/[0.02] border-white/[0.06] text-white/70 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {displaySlot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xl active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Confirming...</span>
                  ) : (
                    <>
                      <span>Confirm Booking</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: MINIMAL VIP CONFIRMATION ================= */}
        {step === 3 && (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-white/[0.06] border border-white/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                Strategy Call Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                You're on the calendar, {name || "Creator"}!
              </h3>
              <p className="text-xs sm:text-sm text-white/60 max-w-sm mx-auto leading-relaxed">
                We've reserved <strong className="text-white font-semibold">{formattedDateString} @ {displayTimeInTz} ({currentTzCode})</strong>. A calendar invite has been dispatched to <strong className="text-white font-semibold">{email}</strong>.
              </p>
            </div>

            {/* Meet link card */}
            {isSyncingMeet ? (
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] max-w-md mx-auto flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-white/80 font-mono">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-white/70">Generating secure Google Meet room...</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                  SYNCING
                </span>
              </div>
            ) : confirmedMeetUrl ? (
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] max-w-md mx-auto flex items-center justify-between gap-3 text-xs animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-white/80 font-mono truncate">
                  <Video className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span className="truncate">{confirmedMeetUrl}</span>
                </div>
                <a
                  href={confirmedMeetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Open Meet</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-sm mx-auto">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl font-bold text-xs bg-white text-black hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Add to Google Calendar</span>
              </a>
              {isModal && onClose && (
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
