import React, { useState, useEffect, useRef, useMemo } from "react";
import {
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
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";

interface BookingWidgetProps {
  isModal?: boolean;
  onSuccess?: () => void;
  onClose?: () => void;
}

const REVENUE_TIERS = [
  { id: "tier_1", label: "$0 – $1,000", sub: "Getting Started" },
  { id: "tier_2", label: "$1,000 – $5,000", sub: "Scaling Fast" },
  { id: "tier_3", label: "$5,000 – $10,000", sub: "Established Channel" },
  { id: "tier_4", label: "$10,000+", sub: "High-Growth Studio" },
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
];

// Helper to compute clock hand angles from time string (e.g. "6:30 PM")
function getTimeAngles(slotStr: string): { hourAngle: number; minuteAngle: number; hourDisplay: string } {
  try {
    const [time, period] = (slotStr || "5:00 PM").split(" ");
    const [hStr, mStr] = time.split(":");
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10) || 0;
    if (period === "PM" && h < 12) h += 12;
    if (period === "AM" && h === 12) h = 0;

    const hourOnClock = (h % 12) + m / 60;
    const hourAngle = hourOnClock * 30; // 360 / 12 = 30 deg
    const minuteAngle = m * 6; // 360 / 60 = 6 deg
    return { hourAngle, minuteAngle, hourDisplay: slotStr };
  } catch {
    return { hourAngle: 150, minuteAngle: 0, hourDisplay: slotStr || "5:00 PM" };
  }
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ isModal = false, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channelLink, setChannelLink] = useState("");
  const [revenueTier, setRevenueTier] = useState<string>("$1,000 – $5,000");
  const [phone, setPhone] = useState("");

  // Calendar State
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [selectedSlot, setSelectedSlot] = useState<string>("5:00 PM");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedMeetUrl, setConfirmedMeetUrl] = useState<string>("");
  const [liveSlotsByDate, setLiveSlotsByDate] = useState<Record<string, string[]>>({});
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Available Dates (Next 6 rolling days)
  const availableDates = useMemo(() => {
    const dates: Date[] = [];
    const current = new Date();
    current.setDate(current.getDate() + 1);

    while (dates.length < 6) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

  // Fetch Live Real-Time Available Slots from backend API
  useEffect(() => {
    setIsLoadingSlots(true);
    fetch("/api/available-slots")
      .then((res) => res.json())
      .then((data) => {
        if (data?.slots && Object.keys(data.slots).length > 0) {
          setLiveSlotsByDate(data.slots);
        }
      })
      .catch((err) => console.warn("Slots fetch notice:", err))
      .finally(() => setIsLoadingSlots(false));
  }, []);

  // Compute local date key YYYY-MM-DD
  const getLocalDateKey = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateKey = getLocalDateKey(selectedDate);
  const activeSlots =
    liveSlotsByDate[selectedDateKey] && liveSlotsByDate[selectedDateKey].length > 0
      ? liveSlotsByDate[selectedDateKey]
      : !isLoadingSlots
      ? []
      : DEFAULT_TIME_SLOTS;

  // Auto-select first slot when date or slots change
  useEffect(() => {
    if (activeSlots.length > 0 && !activeSlots.includes(selectedSlot)) {
      setSelectedSlot(activeSlots[0]);
    }
  }, [activeSlots, selectedSlot]);

  // Confetti Blast for Step 3
  const triggerCelebrationConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      });

      // Dual side cannons + starburst
      myConfetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ["#10b981", "#6366f1", "#38bdf8", "#fbbf24", "#ffffff"],
      });

      myConfetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ["#10b981", "#6366f1", "#38bdf8", "#fbbf24", "#ffffff"],
      });

      setTimeout(() => {
        myConfetti({
          particleCount: 100,
          spread: 80,
          origin: { x: 0.5, y: 0.45 },
          colors: ["#10b981", "#6366f1", "#ffffff", "#a855f7", "#38bdf8"],
        });
      }, 180);
    } catch (err) {
      console.error("Confetti trigger:", err);
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
      alert("Please fill in your name, email, and channel link to proceed.");
      return;
    }
    setStep(2);
  };

  const handleConfirmBooking = async () => {
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
          selectedDate: selectedDate.toISOString(),
          selectedSlot,
        }),
      });

      const data = await resp.json();

      if (!resp.ok || !data.success) {
        alert(data.error || "This time slot is no longer available. Please choose another time.");
        setIsSubmitting(false);
        fetch("/api/available-slots")
          .then((res) => res.json())
          .then((d) => {
            if (d?.slots) setLiveSlotsByDate(d.slots);
          });
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
      console.warn("Booking error notice:", err);
      setIsSubmitting(false);
      alert("Booking service notice: Please choose another time slot.");
    }
  };

  const formattedDateString = selectedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const googleCalendarUrl = useMemo(() => {
    const title = encodeURIComponent("15-Min Video Retention Audit — Harzh Agency");
    const details = encodeURIComponent(
      `Creator: ${name}\nChannel: ${channelLink}\nMeeting URL: ${confirmedMeetUrl || "Google Meet video link sent via email"}\nHost: Harzh`
    );
    const location = encodeURIComponent(confirmedMeetUrl || "Google Meet (Video Call)");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  }, [name, channelLink, confirmedMeetUrl]);

  // Animated Clock Angles
  const { hourAngle, minuteAngle } = getTimeAngles(selectedSlot);

  return (
    <div className="relative w-full rounded-3xl border border-white/15 bg-[#0a0c14]/95 text-white shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col">
      {/* Confetti canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-50 w-full h-full" />

      {/* Top Emerald Brand Highlight Line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

      {/* CARD HEADER */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
            15-Min Retention Audit
          </span>
        </div>

        <div className="flex items-center gap-3">
          {step < 3 && (
            <div className="flex items-center gap-1.5 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-white/80">
              <span className={step === 1 ? "text-emerald-400 font-bold" : "text-white/40"}>01</span>
              <span className="text-white/20">/</span>
              <span className={step === 2 ? "text-emerald-400 font-bold" : "text-white/40"}>02</span>
            </div>
          )}
        </div>
      </div>

      {/* CARD BODY */}
      <div className="relative z-10 p-6 sm:p-8 flex-1 overflow-y-auto">
        {/* ================= STEP 1: INTAKE ================= */}
        {step === 1 && (
          <form onSubmit={handleNextToCalendar} className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Book Your Video Retention Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
                We'll audit your video pacing, identify retention dropoff nodes, and map out your dedicated editing roadmap.
              </p>
            </div>

            {/* Inputs: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Your Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Hormozi"
                  className="w-full px-4 py-3 rounded-xl bg-[#121522] border border-white/15 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@channel.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#121522] border border-white/15 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                />
              </div>
            </div>

            {/* Channel Link & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Channel / Social URL *</span>
                </label>
                <input
                  type="text"
                  required
                  value={channelLink}
                  onChange={(e) => setChannelLink(e.target.value)}
                  placeholder="youtube.com/@channel or @handle"
                  className="w-full px-4 py-3 rounded-xl bg-[#121522] border border-white/15 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp / Phone</span>
                  </span>
                  <span className="text-[11px] text-slate-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-[#121522] border border-white/15 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                />
              </div>
            </div>

            {/* Revenue Tier Selector */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                <span>Monthly Channel / Business Revenue</span>
                <span className="text-[11px] text-slate-400 font-mono">Confidential</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {REVENUE_TIERS.map((tier) => {
                  const isSelected = revenueTier === tier.label;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setRevenueTier(tier.label)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-500/20 border-emerald-400 text-white ring-1 ring-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                          : "bg-[#121522] border-white/10 text-slate-300 hover:bg-[#191d2d] hover:border-white/25"
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{tier.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{tier.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black hover:opacity-95 transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Select Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 2: TIME PICKER WITH ANIMATED CLOCK ================= */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Top Bar with Dynamic Animated Clock & Time Readout */}
            <div className="p-4 rounded-2xl bg-[#121522] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Minimalist SVG Animated Clock */}
                <div className="relative w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-black/60 border border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <svg className="w-10 h-10" viewBox="0 0 40 40">
                    {/* Dial ticks */}
                    <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <line x1="20" y1="4" x2="20" y2="7" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    <line x1="36" y1="20" x2="33" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    <line x1="20" y1="36" x2="20" y2="33" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    <line x1="4" y1="20" x2="7" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

                    {/* Dynamic Hour Hand */}
                    <line
                      x1="20"
                      y1="20"
                      x2="20"
                      y2="10"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{
                        transformOrigin: "20px 20px",
                        transform: `rotate(${hourAngle}deg)`,
                        transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />

                    {/* Dynamic Minute Hand */}
                    <line
                      x1="20"
                      y1="20"
                      x2="20"
                      y2="6"
                      stroke="#ffffff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      style={{
                        transformOrigin: "20px 20px",
                        transform: `rotate(${minuteAngle}deg)`,
                        transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />

                    {/* Pivot point */}
                    <circle cx="20" cy="20" r="2" fill="#10b981" />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{formattedDateString}</span>
                    <span className="text-sm font-mono font-extrabold text-emerald-400">@ {selectedSlot}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Video className="w-3.5 h-3.5 text-emerald-400" />
                    <span>15-Min Strategy Session • Google Meet HD</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Timezone: IST (Asia/Kolkata)</span>
              </div>
            </div>

            {/* 6-Day Rolling Date Strip */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200">Select Date:</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {availableDates.map((date) => {
                  const isSelected = selectedDate.toDateString() === date.toDateString();
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
                          ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] font-black scale-[1.02]"
                          : "bg-[#121522] border-white/10 text-slate-300 hover:bg-[#191d2d] hover:border-white/25"
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold tracking-wider opacity-75">{dayName}</div>
                      <div className="text-lg font-black my-0.5">{dayNum}</div>
                      <div className="text-[10px] font-semibold opacity-75">{monthName}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Chips Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200">Available Timeslots:</label>
                {isLoadingSlots ? (
                  <span className="text-[11px] text-emerald-400 font-mono animate-pulse">Syncing availability...</span>
                ) : (
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {activeSlots.length} Open Slots (Live Sync)
                  </span>
                )}
              </div>

              {activeSlots.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#121522] border border-white/10 text-center text-xs text-slate-400 font-mono">
                  No available slots on this day. Please select another date.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {activeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-1.5 rounded-xl text-xs font-mono border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-emerald-500/25 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400 font-bold"
                            : "bg-[#121522] border-white/10 text-slate-300 hover:bg-[#191d2d] hover:border-white/25"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.9)]" : "bg-emerald-500/60"
                          }`}
                        />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-3.5 rounded-xl border border-white/20 bg-white/[0.05] hover:bg-white/10 text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black hover:opacity-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Reserving slot &amp; creating Meet session...</span>
                ) : (
                  <>
                    <span>Confirm Strategy Call ({formattedDateString} @ {selectedSlot})</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: CONFIRMATION ================= */}
        {step === 3 && (
          <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(16,185,129,0.45)]">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Strategy Call Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                You're on the calendar, {name || "Creator"}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                We've locked your slot for <strong className="text-white font-bold">{formattedDateString} @ {selectedSlot}</strong>. A calendar invite has been dispatched to <strong className="text-white font-bold">{email}</strong>.
              </p>
            </div>

            {/* Meet Link */}
            {confirmedMeetUrl && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 max-w-md mx-auto flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-mono text-left truncate">
                  <Video className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span className="truncate font-semibold">{confirmedMeetUrl}</span>
                </div>
                <a
                  href={confirmedMeetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-400 text-black font-bold text-xs hover:bg-emerald-300 flex items-center gap-1 shrink-0"
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
              {isModal && onClose && (
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/20 bg-white/[0.08] hover:bg-white/15 text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER BADGE */}
      <div className="relative z-10 px-6 py-3 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Free Video Retention Audit</span>
        </div>
        <div>hi@harzh.in</div>
      </div>
    </div>
  );
};
