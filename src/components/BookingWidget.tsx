import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Video,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Calendar,
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

export const BookingWidget: React.FC<BookingWidgetProps> = ({ isModal = false, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channelLink, setChannelLink] = useState("");
  const [revenueTier, setRevenueTier] = useState<string>("$1K – $5K");
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

  // Fetch Live Available Slots
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
      const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
      myConfetti({
        particleCount: 70,
        angle: 60,
        spread: 50,
        origin: { x: 0, y: 0.65 },
        colors: ["#ffffff", "#6366f1", "#10b981", "#a855f7"],
      });
      myConfetti({
        particleCount: 70,
        angle: 120,
        spread: 50,
        origin: { x: 1, y: 0.65 },
        colors: ["#ffffff", "#6366f1", "#10b981", "#a855f7"],
      });
    } catch (err) {
      console.error("Confetti error:", err);
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
      console.warn("Booking notice:", err);
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
      `Creator: ${name}\nChannel: ${channelLink}\nMeeting URL: ${confirmedMeetUrl || "Google Meet link sent via email"}\nHost: Harzh`
    );
    const location = encodeURIComponent(confirmedMeetUrl || "Google Meet (Video Call)");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  }, [name, channelLink, confirmedMeetUrl]);

  const { hourAngle, minuteAngle } = getTimeAngles(selectedSlot);

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
          {step < 3 && (
            <span className="text-xs font-mono text-white/40">
              <strong className="text-white font-bold">{step === 1 ? "01" : "02"}</strong> / 02
            </span>
          )}
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors"
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
          <form onSubmit={handleNextToCalendar} className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Book Your Retention Audit
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1 font-normal leading-relaxed">
                We'll audit your video pacing, identify drop-off nodes, and map out your dedicated editing roadmap.
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Hormozi"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@channel.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">Channel / Social URL *</label>
                <input
                  type="text"
                  required
                  value={channelLink}
                  onChange={(e) => setChannelLink(e.target.value)}
                  placeholder="youtube.com/@channel"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-white/70">WhatsApp / Phone</label>
                  <span className="text-[11px] text-white/30">(Optional)</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            {/* Revenue Tier Selector */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-white/70">Monthly Channel / Business Revenue</label>
                <span className="text-[11px] font-mono text-white/30">Confidential</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {REVENUE_TIERS.map((tier) => {
                  const isSelected = revenueTier === tier.label;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setRevenueTier(tier.label)}
                      className={`py-3 px-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white text-black border-white font-bold shadow-lg"
                          : "bg-white/[0.02] border-white/[0.06] text-white/70 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="text-xs font-bold">{tier.label}</div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? "text-black/60" : "text-white/40"}`}>
                        {tier.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-[0.99]"
              >
                <span>Select Date &amp; Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 2: MINIMAL TIME PICKER WITH CLOCK ================= */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Minimalist Clock & Meeting Preview */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {/* Thin needle minimalist analog clock */}
                <div className="relative w-11 h-11 shrink-0 flex items-center justify-center rounded-full bg-black/40 border border-white/20 shadow-inner">
                  <svg className="w-9 h-9" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="20" y1="4" x2="20" y2="7" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    <line x1="36" y1="20" x2="33" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    <line x1="20" y1="36" x2="20" y2="33" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    <line x1="4" y1="20" x2="7" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

                    {/* Hour Hand */}
                    <line
                      x1="20"
                      y1="20"
                      x2="20"
                      y2="10"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        transformOrigin: "20px 20px",
                        transform: `rotate(${hourAngle}deg)`,
                        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />

                    {/* Minute Hand */}
                    <line
                      x1="20"
                      y1="20"
                      x2="20"
                      y2="6"
                      stroke="#818cf8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{
                        transformOrigin: "20px 20px",
                        transform: `rotate(${minuteAngle}deg)`,
                        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />
                    <circle cx="20" cy="20" r="1.5" fill="#ffffff" />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{formattedDateString}</span>
                    <span className="text-sm font-mono font-bold text-indigo-300">@ {selectedSlot}</span>
                  </div>
                  <div className="text-[11px] text-white/50 flex items-center gap-1.5 mt-0.5">
                    <Video className="w-3.5 h-3.5 text-emerald-400" />
                    <span>15-Min Strategy Session • Google Meet</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-white/60 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                IST (Asia/Kolkata)
              </div>
            </div>

            {/* 6-Day Rolling Date Strip */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/70">Select Date:</label>
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
                          ? "bg-white text-black border-white font-bold shadow-lg scale-[1.02]"
                          : "bg-white/[0.02] border-white/[0.06] text-white/70 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="text-[10px] uppercase font-semibold opacity-70">{dayName}</div>
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
                <label className="text-xs font-medium text-white/70">Available Timeslots:</label>
                {isLoadingSlots ? (
                  <span className="text-[11px] text-white/40 font-mono animate-pulse">Syncing...</span>
                ) : (
                  <span className="text-[11px] text-emerald-400 font-mono">
                    {activeSlots.length} Open Slots
                  </span>
                )}
              </div>

              {activeSlots.length === 0 ? (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center text-xs text-white/40 font-mono">
                  No slots available on this day. Please pick another date.
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
                        className={`py-2.5 px-2 rounded-xl text-xs font-mono border transition-all cursor-pointer text-center ${
                          isSelected
                            ? "bg-white text-black border-white font-bold shadow-md"
                            : "bg-white/[0.02] border-white/[0.06] text-white/70 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
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
                className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xl"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Confirming session...</span>
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
                We've reserved <strong className="text-white font-semibold">{formattedDateString} @ {selectedSlot}</strong>. A calendar invite has been sent to <strong className="text-white font-semibold">{email}</strong>.
              </p>
            </div>

            {/* Meet link card */}
            {confirmedMeetUrl && (
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] max-w-md mx-auto flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-white/80 font-mono truncate">
                  <Video className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span className="truncate">{confirmedMeetUrl}</span>
                </div>
                <a
                  href={confirmedMeetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-white/90 flex items-center gap-1 shrink-0"
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
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MINIMAL FOOTER */}
      <div className="relative z-10 px-6 py-3 border-t border-white/[0.06] bg-black/20 flex items-center justify-between text-[11px] font-mono text-white/40">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-white/50" />
          <span>100% Free • Confidential Retention Audit</span>
        </div>
        <div>hi@harzh.in</div>
      </div>
    </div>
  );
};
