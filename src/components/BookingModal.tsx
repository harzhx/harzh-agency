import React, { useState, useEffect, useRef, useMemo } from "react";
import { ThemeMode } from "../types";
import {
  X,
  Calendar,
  Clock,
  Video,
  User,
  Mail,
  Link as LinkIcon,
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  Globe,
} from "lucide-react";
import confetti from "canvas-confetti";

interface BookingModalProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
}

const REVENUE_TIERS = [
  { id: "tier_1", label: "$0 – $1,000", sub: "Getting Started" },
  { id: "tier_2", label: "$1,000 – $5,000", sub: "Scaling Fast" },
  { id: "tier_3", label: "$5,000 – $10,000", sub: "Established Channel" },
  { id: "tier_4", label: "$10,000+", sub: "High-Growth Studio" },
];

const TIMEZONE_OPTIONS = [
  { value: "America/New_York", label: "Eastern Time (US & Canada) — EST/EDT" },
  { value: "America/Chicago", label: "Central Time (US & Canada) — CST/CDT" },
  { value: "America/Denver", label: "Mountain Time (US & Canada) — MST/MDT" },
  { value: "America/Los_Angeles", label: "Pacific Time (US & Canada) — PST/PDT" },
  { value: "Europe/London", label: "London / Dublin — GMT/BST" },
  { value: "Europe/Paris", label: "Central Europe (Paris, Berlin, Rome) — CET" },
  { value: "Asia/Dubai", label: "Gulf Standard Time (Dubai) — GST" },
  { value: "Asia/Calcutta", label: "India Standard Time (IST)" },
  { value: "Asia/Singapore", label: "Singapore / Hong Kong — SGT/HKT" },
  { value: "Asia/Tokyo", label: "Japan Standard Time — JST" },
  { value: "Australia/Sydney", label: "Australian Eastern Time — AEST" },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channelLink, setChannelLink] = useState("");
  const [revenueTier, setRevenueTier] = useState<string>("$1,000 – $5,000");
  const [phone, setPhone] = useState("");

  // Timezone State (Auto-detected from browser)
  const [userTimeZone, setUserTimeZone] = useState<string>(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Calcutta";
    } catch {
      return "Asia/Calcutta";
    }
  });

  // Calendar State
  const [rawIsoSlots, setRawIsoSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [selectedSlotObj, setSelectedSlotObj] = useState<{ iso: string; timeStr: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedMeetUrl, setConfirmedMeetUrl] = useState<string>("");

  // Fetch Live Real-Time Available Slots from Google Calendar via Cal API
  const fetchLiveSlots = () => {
    setIsLoadingSlots(true);
    fetch("/api/available-slots")
      .then((res) => res.json())
      .then((data) => {
        if (data?.rawIsoSlots && Array.isArray(data.rawIsoSlots)) {
          setRawIsoSlots(data.rawIsoSlots);
        }
      })
      .catch((err) => console.warn("Live slots fetch notice:", err))
      .finally(() => setIsLoadingSlots(false));
  };

  useEffect(() => {
    if (isOpen) {
      fetchLiveSlots();
    }
  }, [isOpen]);

  // Group raw ISO slots by localized YYYY-MM-DD date in visitor's selected timezone
  const localizedSlotsByDate = useMemo(() => {
    const map: Record<string, { iso: string; timeStr: string }[]> = {};

    for (const iso of rawIsoSlots) {
      const d = new Date(iso);
      const dateKey = d.toLocaleDateString("en-CA", { timeZone: userTimeZone }); // YYYY-MM-DD
      const timeStr = d.toLocaleTimeString("en-US", {
        timeZone: userTimeZone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push({ iso, timeStr });
    }
    return map;
  }, [rawIsoSlots, userTimeZone]);

  // Rolling 7 Days in the visitor's localized timezone
  const availableDates = useMemo(() => {
    const dates: Date[] = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, []);

  // Compute active slots for currently selected date
  const selectedDateKey = selectedDate.toLocaleDateString("en-CA", { timeZone: userTimeZone });
  const activeSlotList = localizedSlotsByDate[selectedDateKey] || [];

  // Auto-select first slot when date or timezone changes
  useEffect(() => {
    if (activeSlotList.length > 0) {
      if (!selectedSlotObj || !activeSlotList.some((s) => s.iso === selectedSlotObj.iso)) {
        setSelectedSlotObj(activeSlotList[0]);
      }
    } else {
      setSelectedSlotObj(null);
    }
  }, [activeSlotList, userTimeZone]);

  // Multi-Cannon Guaranteed Confetti Blast
  const triggerCelebrationConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      });

      // Left Cannon
      myConfetti({
        particleCount: 75,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.65 },
        colors: ["#10b981", "#6366f1", "#38bdf8", "#fbbf24", "#ffffff"],
      });

      // Right Cannon
      myConfetti({
        particleCount: 75,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.65 },
        colors: ["#10b981", "#6366f1", "#38bdf8", "#fbbf24", "#ffffff"],
      });

      // Center Grand Starburst
      setTimeout(() => {
        myConfetti({
          particleCount: 110,
          spread: 90,
          origin: { x: 0.5, y: 0.45 },
          colors: ["#10b981", "#6366f1", "#ffffff", "#a855f7", "#38bdf8"],
        });
      }, 200);
    } catch (err) {
      console.error("Confetti trigger:", err);
    }
  };

  // Trigger Confetti as soon as Step 3 renders
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        triggerCelebrationConfetti();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset on Modal Reopen
  useEffect(() => {
    if (isOpen && step === 3) {
      setStep(1);
      setConfirmedMeetUrl("");
    }
  }, [isOpen]);

  const handleNextToCalendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !channelLink.trim()) {
      alert("Please fill in your name, email, and channel link to proceed.");
      return;
    }
    setStep(2);
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlotObj) {
      alert("Please select an available time slot to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const resp = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          channelLink,
          revenueTier,
          phone,
          slotTimeISO: selectedSlotObj.iso,
          selectedSlot: selectedSlotObj.timeStr,
          timeZone: userTimeZone,
        }),
      });

      const data = await resp.json();

      if (!resp.ok || !data.success) {
        alert(data.error || "This time slot was just booked by another creator. Please choose another time.");
        setIsSubmitting(false);
        fetchLiveSlots();
        return;
      }

      const meetUrl =
        data?.booking?.data?.meetingUrl ||
        data?.booking?.data?.location ||
        "";
      if (meetUrl) {
        setConfirmedMeetUrl(meetUrl);
      }
      setIsSubmitting(false);
      setStep(3);
    } catch (err) {
      console.warn("Booking notice:", err);
      setIsSubmitting(false);
      alert("Booking service notice: Please choose another time slot.");
    }
  };

  const formattedDateString = selectedDate.toLocaleDateString("en-US", {
    timeZone: userTimeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const googleCalendarUrl = useMemo(() => {
    const title = encodeURIComponent("15-Min Video Retention Audit — Harzh Agency");
    const details = encodeURIComponent(
      `Creator: ${name}\nChannel: ${channelLink}\nMeeting URL: ${confirmedMeetUrl || "Google Meet video link sent via email"}\nTimezone: ${userTimeZone}\nHost: Harzh`
    );
    const location = encodeURIComponent(confirmedMeetUrl || "Google Meet (Video Call)");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  }, [name, channelLink, confirmedMeetUrl, userTimeZone]);

  return (
    <div
      id="booking-modal"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-xl transition-all duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto scale-100"
          : "opacity-0 pointer-events-none scale-95"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[780px] rounded-3xl border border-white/20 bg-[#0c0e17] text-white shadow-[0_25px_90px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Dedicated Confetti Canvas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-50 w-full h-full"
        />

        {/* Subtle Luxury Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

        {/* TOP HEADER */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
              15-Min Retention Audit
            </span>
          </div>

          <div className="flex items-center gap-3">
            {step < 3 && (
              <div className="flex items-center gap-1.5 bg-white/[0.07] border border-white/15 px-3 py-1 rounded-full text-xs font-mono text-white/80">
                <span className={step === 1 ? "text-emerald-400 font-bold" : "text-white/50"}>
                  01
                </span>
                <span className="text-white/30">/</span>
                <span className={step === 2 ? "text-emerald-400 font-bold" : "text-white/50"}>
                  02
                </span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/[0.08] hover:bg-white/20 text-white/70 hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="relative z-10 overflow-y-auto p-6 sm:p-7 flex-1">
          {/* ================= STEP 1: INTAKE ================= */}
          {step === 1 && (
            <form onSubmit={handleNextToCalendar} className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  Schedule Your Free Retention Audit
                </h2>
                <p className="text-sm text-slate-300 mt-1 font-normal">
                  We'll audit your video pacing, pinpoint drop-off retention nodes, and map out your dedicated editing roadmap.
                </p>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-200 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Hormozi"
                    className="w-full px-4 py-3 rounded-xl bg-[#141722] border border-white/20 text-sm font-medium text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:bg-[#191e2c] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-200 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@channel.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#141722] border border-white/20 text-sm font-medium text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:bg-[#191e2c] transition-all"
                  />
                </div>
              </div>

              {/* Channel Link & Phone Number Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-200 flex items-center gap-1.5">
                    <LinkIcon className="w-4 h-4 text-emerald-400" />
                    <span>Channel / Social Link *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={channelLink}
                    onChange={(e) => setChannelLink(e.target.value)}
                    placeholder="youtube.com/@channel or @handle"
                    className="w-full px-4 py-3 rounded-xl bg-[#141722] border border-white/20 text-sm font-medium text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:bg-[#191e2c] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-200 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp / Phone</span>
                    </span>
                    <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000 / +91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[#141722] border border-white/20 text-sm font-medium text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:bg-[#191e2c] transition-all"
                  />
                </div>
              </div>

              {/* Monthly Revenue Tier */}
              <div className="space-y-2 pt-1">
                <label className="text-[13px] font-semibold text-slate-200 flex items-center justify-between">
                  <span>Current Monthly Channel / Business Revenue</span>
                  <span className="text-xs text-slate-400 font-normal">Confidential</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {REVENUE_TIERS.map((tier) => {
                    const isSelected = revenueTier === tier.label;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setRevenueTier(tier.label)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400"
                            : "bg-[#141722] border-white/15 text-slate-200 hover:bg-[#1c2130] hover:border-white/30"
                        }`}
                      >
                        <div className="text-sm font-bold text-white">{tier.label}</div>
                        <div className="text-xs text-slate-300 font-medium mt-0.5">{tier.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Continue Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black hover:opacity-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>Select Meeting Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 2: TIME PICKER ================= */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white">Select a Date & Time</h2>
                  <p className="text-sm text-slate-300 mt-0.5">
                    15-Min Strategy Session • Hosted on Google Meet (HD Video)
                  </p>
                </div>

                {/* Interactive Timezone Switcher */}
                <div className="flex items-center gap-1.5 bg-[#141722] border border-white/15 px-3 py-1.5 rounded-xl text-xs">
                  <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <select
                    value={userTimeZone}
                    onChange={(e) => setUserTimeZone(e.target.value)}
                    className="bg-transparent text-emerald-300 font-mono text-xs focus:outline-none cursor-pointer max-w-[200px] truncate"
                  >
                    {!TIMEZONE_OPTIONS.some((t) => t.value === userTimeZone) && (
                      <option value={userTimeZone} className="bg-[#141722] text-white">
                        {userTimeZone} (Local)
                      </option>
                    )}
                    {TIMEZONE_OPTIONS.map((tz) => (
                      <option key={tz.value} value={tz.value} className="bg-[#141722] text-white">
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Day Strip */}
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-200">Choose Available Day:</label>
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                  {availableDates.map((date) => {
                    const dateKey = date.toLocaleDateString("en-CA", { timeZone: userTimeZone });
                    const isSelected = selectedDateKey === dateKey;
                    const dayName = date.toLocaleDateString("en-US", { timeZone: userTimeZone, weekday: "short" });
                    const dayNum = date.toLocaleDateString("en-US", { timeZone: userTimeZone, day: "numeric" });
                    const monthName = date.toLocaleDateString("en-US", { timeZone: userTimeZone, month: "short" });
                    const daySlotCount = (localizedSlotsByDate[dateKey] || []).length;

                    return (
                      <button
                        key={dateKey}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all cursor-pointer relative ${
                          isSelected
                            ? "bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.4)] font-black scale-[1.03]"
                            : "bg-[#141722] border-white/15 text-slate-200 hover:bg-[#1c2130] hover:border-white/30"
                        }`}
                      >
                        <div className="text-xs uppercase font-bold tracking-wider opacity-80">{dayName}</div>
                        <div className="text-base sm:text-lg font-black my-0.5">{dayNum}</div>
                        <div className="text-[11px] font-semibold opacity-75">{monthName}</div>
                        {daySlotCount > 0 && !isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mx-auto mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-semibold text-slate-200">
                    Available Slots for {formattedDateString}:
                  </label>
                  {isLoadingSlots ? (
                    <span className="text-[11px] text-emerald-400 font-mono animate-pulse">
                      Syncing availability...
                    </span>
                  ) : (
                    <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {activeSlotList.length} Open Slots (Live Sync)
                    </span>
                  )}
                </div>

                {activeSlotList.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-[#141722] border border-white/10 text-center space-y-1">
                    <p className="text-sm text-slate-300 font-medium">No open slots on this date.</p>
                    <p className="text-xs text-slate-400 font-mono">Please select another day above to see available times.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {activeSlotList.map((slot) => {
                      const isSelected = selectedSlotObj?.iso === slot.iso;
                      return (
                        <button
                          key={slot.iso}
                          type="button"
                          onClick={() => setSelectedSlotObj(slot)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-mono border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? "bg-emerald-500/25 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400 font-bold"
                              : "bg-[#141722] border-white/15 text-slate-200 hover:bg-[#1c2130] hover:border-white/30"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]" : "bg-emerald-500/70"}`} />
                          <span>{slot.timeStr}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Selected Meeting Summary Bar */}
              {selectedSlotObj && (
                <div className="p-3.5 rounded-2xl bg-[#141722] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 font-mono text-white font-semibold">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>{formattedDateString} @ {selectedSlotObj.timeStr} ({userTimeZone.split("/")[1] || userTimeZone})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-medium">
                    <Video className="w-4 h-4" />
                    <span>Google Meet Video Call</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 rounded-xl border border-white/20 bg-white/[0.06] hover:bg-white/15 text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting || !selectedSlotObj}
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black hover:opacity-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Creating Google Meet session...</span>
                  ) : (
                    <>
                      <span>Confirm Strategy Call {selectedSlotObj ? `(${formattedDateString} @ ${selectedSlotObj.timeStr})` : ""}</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: VIP CONFIRMATION ================= */}
          {step === 3 && (
            <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.45)]">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Strategy Call Confirmed
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  You're on the calendar, {name || "Creator"}!
                </h2>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  We've reserved your slot for <strong className="text-white font-bold">{formattedDateString} @ {selectedSlotObj?.timeStr}</strong>. A calendar invite has been emailed to <strong className="text-white font-bold">{email}</strong>.
                </p>
              </div>

              {/* Google Meet Link Ready Card */}
              {confirmedMeetUrl && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 max-w-md mx-auto flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-left truncate">
                    <Video className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span className="truncate font-semibold">{confirmedMeetUrl}</span>
                  </div>
                  <a
                    href={confirmedMeetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-400 text-black font-bold text-xs hover:bg-emerald-300 flex items-center gap-1 shrink-0 shadow-md"
                  >
                    <span>Open Meet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

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
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/20 bg-white/[0.08] hover:bg-white/15 text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="relative z-10 px-6 py-3 border-t border-white/10 bg-black/50 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Free Video Retention Audit</span>
          </div>
          <div>hi@harzh.in</div>
        </div>
      </div>
    </div>
  );
};



