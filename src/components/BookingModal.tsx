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
  { id: "tier_2", label: "$1,000 – $5,000", sub: "Scaling Creator" },
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

  // Available Dates Generator (Next 6 available business days)
  const availableDates = React.useMemo(() => {
    const dates: Date[] = [];
    let current = new Date();
    current.setDate(current.getDate() + 1); // Start tomorrow

    while (dates.length < 6) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

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

  // Reset step on modal reopen
  useEffect(() => {
    if (isOpen && step === 3) {
      setStep(1);
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

  const handleConfirmBooking = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10b981", "#6366f1", "#ffffff", "#38bdf8"],
        });
      } catch (err) {
        console.error("Confetti error:", err);
      }
    }, 600);
  };

  const formattedDateString = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  // Google Calendar Link Generator
  const googleCalendarUrl = React.useMemo(() => {
    const title = encodeURIComponent("15-Min Video Retention Audit — Harzh Agency");
    const details = encodeURIComponent(
      `Creator: ${name}\nChannel: ${channelLink}\nRevenue: ${revenueTier}\n\nGoogle Meet link will be active 5 minutes before start.\nHost: Harzh (hi@harzh.in)`
    );
    const location = encodeURIComponent("Google Meet (Video Call)");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  }, [name, channelLink, revenueTier]);

  return (
    <div
      id="booking-modal"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-xl transition-all duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto scale-100"
          : "opacity-0 pointer-events-none scale-95"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[840px] rounded-3xl border border-white/15 bg-[#0d0f18] text-white shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-32 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

        {/* TOP HEADER BAR */}
        <div className="relative z-10 flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/[0.08] bg-black/40">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400">
              Direct Strategy Call
            </span>
            <span className="hidden sm:inline-block text-white/20">•</span>
            <span className="hidden sm:inline-block text-xs font-mono text-white/50">
              {step === 1 && "Step 1 of 2: Channel & Details"}
              {step === 2 && "Step 2 of 2: Select Date & Time"}
              {step === 3 && "Booking Confirmed"}
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
              className="p-1.5 rounded-full bg-white/[0.06] hover:bg-white/15 text-white/60 hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="relative z-10 overflow-y-auto p-5 sm:p-7 flex-1">
          {/* ================= STEP 1: QUALIFIER INTAKE FORM ================= */}
          {step === 1 && (
            <form onSubmit={handleNextToCalendar} className="space-y-5 animate-in fade-in duration-300">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  Schedule Your Free 15-Min Retention Audit
                </h2>
                <p className="text-xs sm:text-sm text-white/60 mt-1">
                  We'll audit your current video pacing, diagnose drop-off retention points, and present a custom visual editing plan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/70 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Hormozi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/80 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/70 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@creatorstudio.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/80 transition-all"
                  />
                </div>
              </div>

              {/* Channel / Social Link */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Channel or Social Media Link / Handle *</span>
                </label>
                <input
                  type="text"
                  required
                  value={channelLink}
                  onChange={(e) => setChannelLink(e.target.value)}
                  placeholder="youtube.com/@yourchannel or @handle"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/80 transition-all"
                />
              </div>

              {/* Monthly Revenue Tier Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/70 flex items-center justify-between">
                  <span>Current Monthly Channel / Business Revenue</span>
                  <span className="text-[11px] text-white/40 font-sans">(Confidential)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {REVENUE_TIERS.map((tier) => {
                    const isSelected = revenueTier === tier.label;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setRevenueTier(tier.label)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          isSelected
                            ? "bg-emerald-500/10 border-emerald-400/80 text-white shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-400/50"
                            : "bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06] hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs font-bold font-mono">{tier.label}</div>
                        <div className="text-[10px] text-white/40 mt-0.5">{tier.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Phone / WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-400" />
                    <span>WhatsApp / Phone (Optional)</span>
                  </span>
                  <span className="text-[11px] text-white/40 font-sans">For instant SMS/calendar reminder</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000 / +91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/80 transition-all"
                />
              </div>

              {/* Continue CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black hover:opacity-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>Select Date & Time Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 2: BESPOKE LUXURY CALENDAR & TIME PICKER ================= */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-extrabold text-white">
                    Select Your 15-Min Audit Slot
                  </h2>
                  <p className="text-xs text-white/60 mt-0.5">
                    Hosted by Harzh • Google Meet link generated automatically
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Asia/Kolkata (IST)</span>
                </div>
              </div>

              {/* Calendar Days Strip (Next 6 available business days) */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/60">Available Days (Rolling Window):</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((date) => {
                    const isSelected =
                      selectedDate.toDateString() === date.toDateString();
                    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                    const monthName = date.toLocaleDateString("en-US", { month: "short" });
                    const dayNum = date.getDate();

                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? "bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.3)] font-bold scale-[1.02]"
                            : "bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.08] hover:border-white/25"
                        }`}
                      >
                        <div className="text-[10px] uppercase font-mono tracking-wider opacity-70">
                          {dayName}
                        </div>
                        <div className="text-lg font-extrabold my-0.5">{dayNum}</div>
                        <div className="text-[10px] opacity-60">{monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-white/60">
                    Available Slots for {formattedDateString}:
                  </label>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    14 Open Slots
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-mono font-medium border transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)] font-bold"
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

              {/* Booking Summary Box */}
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="text-white/40 font-mono">SELECTED MEETING:</div>
                  <div className="text-white font-bold flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{formattedDateString} @ {selectedSlot} (15 Mins)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Video className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Meet Video Link</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/10 text-white/80 text-xs font-mono transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-black hover:opacity-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Locking in slot...</span>
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

          {/* ================= STEP 3: INSTANT VIP CONFIRMATION ================= */}
          {step === 3 && (
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                  Call Confirmed
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  You're on the calendar, {name || "Creator"}!
                </h2>
                <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                  We've reserved your 15-minute slot. A calendar invitation and Google Meet link have been prepared for <strong className="text-white">{email}</strong>.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-white/40">Date & Time:</span>
                  <span className="text-white font-bold">{formattedDateString} @ {selectedSlot}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-white/40">Duration:</span>
                  <span className="text-white">15 Minutes (Strategy Audit)</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-white/40">Platform:</span>
                  <span className="text-emerald-400 font-bold">Google Meet (HD Video)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Channel / Social:</span>
                  <span className="text-white truncate max-w-[200px]">{channelLink}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 max-w-md mx-auto">
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
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/10 text-white text-xs font-mono transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER GUARANTEE */}
        <div className="px-6 py-3 border-t border-white/[0.06] bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-[11px] font-mono text-white/40">
          <div className="flex items-center gap-1.5 text-white/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free • No Pitch Slap • Harzh Growth Systems</span>
          </div>
          <div>hi@harzh.in</div>
        </div>
      </div>
    </div>
  );
};

