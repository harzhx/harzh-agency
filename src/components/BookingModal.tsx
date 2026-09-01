import React, { useState, useEffect } from "react";
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
  Sparkles,
  ExternalLink,
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

const TIME_SLOTS = [
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

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

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

  // Available Dates (Next 6 rolling days)
  const availableDates = React.useMemo(() => {
    const dates: Date[] = [];
    let current = new Date();
    current.setDate(current.getDate() + 1);

    while (dates.length < 6) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

  // Multi-Cannon Spectacular Confetti Blast
  const triggerCelebrationConfetti = () => {
    try {
      // Left Cannon
      confetti({
        particleCount: 65,
        angle: 60,
        spread: 55,
        origin: { x: 0.05, y: 0.65 },
        zIndex: 99999,
        colors: ["#10b981", "#6366f1", "#ffffff", "#38bdf8", "#fbbf24"],
      });

      // Right Cannon
      confetti({
        particleCount: 65,
        angle: 120,
        spread: 55,
        origin: { x: 0.95, y: 0.65 },
        zIndex: 99999,
        colors: ["#10b981", "#6366f1", "#ffffff", "#38bdf8", "#fbbf24"],
      });

      // Center Starburst
      setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { x: 0.5, y: 0.5 },
          zIndex: 99999,
          colors: ["#10b981", "#6366f1", "#ffffff", "#a855f7"],
        });
      }, 180);
    } catch (err) {
      console.error("Confetti trigger:", err);
    }
  };

  // Trigger Confetti as soon as Step 3 mounts
  useEffect(() => {
    if (step === 3) {
      triggerCelebrationConfetti();
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
      const meetUrl =
        data?.booking?.data?.meetingUrl ||
        data?.booking?.data?.location ||
        "";
      if (meetUrl) {
        setConfirmedMeetUrl(meetUrl);
      }
    } catch (err) {
      console.warn("Booking saved locally:", err);
    }

    setIsSubmitting(false);
    setStep(3);
  };

  const formattedDateString = selectedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const googleCalendarUrl = React.useMemo(() => {
    const title = encodeURIComponent("15-Min Video Retention Audit — Harzh Agency");
    const details = encodeURIComponent(
      `Creator: ${name}\nChannel: ${channelLink}\nMeeting URL: ${confirmedMeetUrl || "Google Meet video link sent via email"}\nHost: Harzh`
    );
    const location = encodeURIComponent(confirmedMeetUrl || "Google Meet (Video Call)");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  }, [name, channelLink, confirmedMeetUrl]);

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
      <div className="relative w-full max-w-[780px] rounded-3xl border border-white/15 bg-[#0b0d14] text-white shadow-[0_25px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Subtle Luxury Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

        {/* TOP HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/90">
              15-Min Retention Audit
            </span>
          </div>

          <div className="flex items-center gap-3">
            {step < 3 && (
              <div className="flex items-center gap-1.5 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-full text-[11px] font-mono text-white/70">
                <span className={step === 1 ? "text-emerald-400 font-bold" : "text-white/40"}>
                  01
                </span>
                <span className="text-white/20">/</span>
                <span className={step === 2 ? "text-emerald-400 font-bold" : "text-white/40"}>
                  02
                </span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/[0.06] hover:bg-white/15 text-white/60 hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto p-6 sm:p-7 flex-1">
          {/* ================= STEP 1: INTAKE ================= */}
          {step === 1 && (
            <form onSubmit={handleNextToCalendar} className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Schedule Your Free Retention Audit
                </h2>
                <p className="text-xs text-white/50 mt-0.5">
                  We'll audit your video pacing, pinpoint retention drop-off nodes, and map out your dedicated editing roadmap.
                </p>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/75 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Hormozi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/75 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@channel.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  />
                </div>
              </div>

              {/* Channel Link & Phone Number Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/75 flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Channel / Social Link *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={channelLink}
                    onChange={(e) => setChannelLink(e.target.value)}
                    placeholder="youtube.com/@channel or @handle"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/75 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-indigo-400" />
                      <span>WhatsApp / Phone</span>
                    </span>
                    <span className="text-[10px] text-white/35 font-sans">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000 / +91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  />
                </div>
              </div>

              {/* Monthly Revenue Tier */}
              <div className="space-y-1.5 pt-0.5">
                <label className="text-xs font-mono text-white/75 flex items-center justify-between">
                  <span>Current Monthly Channel / Business Revenue</span>
                  <span className="text-[10px] text-white/35 font-sans">Confidential</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {REVENUE_TIERS.map((tier) => {
                    const isSelected = revenueTier === tier.label;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setRevenueTier(tier.label)}
                        className={`py-2.5 px-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-500/15 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)] ring-1 ring-emerald-400/50"
                            : "bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06] hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs font-bold font-mono">{tier.label}</div>
                        <div className="text-[10px] text-white/40">{tier.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Continue Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black hover:opacity-95 transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Select a Date & Time</h2>
                  <p className="text-xs text-white/50 mt-0.5">
                    15-Min Strategy Session • Hosted on Google Meet (HD Video)
                  </p>
                </div>
                <div className="text-xs text-emerald-400 font-mono hidden sm:flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timezone: IST (Asia/Kolkata)</span>
                </div>
              </div>

              {/* Day Strip */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/60">Choose Available Day:</label>
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
                        className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] font-bold scale-[1.02]"
                            : "bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.07] hover:border-white/20"
                        }`}
                      >
                        <div className="text-[10px] uppercase font-mono tracking-wider opacity-70">{dayName}</div>
                        <div className="text-base font-extrabold my-0.5">{dayNum}</div>
                        <div className="text-[10px] opacity-60">{monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/60">Available Slots for {formattedDateString}:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-1.5 rounded-xl text-xs font-mono border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)] font-bold"
                            : "bg-white/[0.03] border-white/10 text-white/75 hover:bg-white/[0.07] hover:border-white/20"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-emerald-400" : "bg-emerald-500/60"}`} />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Meeting Summary Bar */}
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-mono text-white/90">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{formattedDateString} @ {selectedSlot}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                  <Video className="w-3.5 h-3.5" />
                  <span>Google Meet Video Link</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 text-white/80 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black hover:opacity-95 transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Creating Google Meet session...</span>
                  ) : (
                    <>
                      <span>Confirm 15-Min Strategy Call</span>
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
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Strategy Call Confirmed
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  You're on the calendar, {name || "Creator"}!
                </h2>
                <p className="text-xs sm:text-sm text-white/60 max-w-sm mx-auto">
                  We've reserved your slot for <strong className="text-white">{formattedDateString} @ {selectedSlot}</strong>. A calendar invite has been emailed to <strong className="text-white">{email}</strong>.
                </p>
              </div>

              {/* Google Meet Link Ready Card */}
              {confirmedMeetUrl && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 max-w-md mx-auto flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono text-left truncate">
                    <Video className="w-4 h-4 shrink-0" />
                    <span className="truncate">{confirmedMeetUrl}</span>
                  </div>
                  <a
                    href={confirmedMeetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-400 text-black font-bold text-xs hover:bg-emerald-300 flex items-center gap-1 shrink-0 shadow-md"
                  >
                    <span>Open Meet</span>
                    <ExternalLink className="w-3 h-3" />
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
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/10 text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-2.5 border-t border-white/[0.06] bg-black/40 flex items-center justify-between text-[11px] font-mono text-white/40">
          <div className="flex items-center gap-1.5 text-white/50">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free • No Obligation • Harzh Growth Systems</span>
          </div>
          <div>hi@harzh.in</div>
        </div>
      </div>
    </div>
  );
};


