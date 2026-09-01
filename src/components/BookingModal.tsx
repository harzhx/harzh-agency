import React, { useState, useEffect } from "react";
import { ThemeMode } from "../types";
import {
  X,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  User,
  Mail,
  Youtube,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import Cal from "@calcom/embed-react";

interface BookingModalProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
}

const REVENUE_TIERS = [
  { label: "$0 – $1K", value: "$0 - $1,000" },
  { label: "$1K – $5K", value: "$1,000 - $5,000" },
  { label: "$5K – $10K", value: "$5,000 - $10,000" },
  { label: "$10K+", value: "Above $10,000" },
];

const GOAL_OPTIONS = [
  "Fix Retention & Drop-offs",
  "Scale Views & Subscribers",
  "Level Up Edit Quality",
  "Full Production Hand-off",
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channelUrl, setChannelUrl] = useState("");
  const [revenue, setRevenue] = useState("$1,000 - $5,000");
  const [selectedGoal, setSelectedGoal] = useState("Fix Retention & Drop-offs");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset step on open/close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep(1), 200);
    }
  }, [isOpen]);

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !channelUrl.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 250);
  };

  return (
    <div
      id="booking-modal"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl transition-all duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto scale-100"
          : "opacity-0 pointer-events-none scale-95"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full rounded-3xl border border-white/15 bg-[#0a0c14] text-white p-5 sm:p-7 shadow-[0_0_80px_rgba(0,0,0,0.95)] ring-1 ring-white/10 overflow-hidden transition-all duration-300 ${
          step === 2 ? "max-w-[820px]" : "max-w-xl"
        }`}
      >
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white transition-all active:scale-95"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 1: NATIVE CREATOR INTAKE FORM */}
        {step === 1 && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                1-ON-1 STRATEGY CALL
              </span>
              <span className="text-xs text-white/30">•</span>
              <span className="text-[11px] font-mono text-white/60">
                15-Min Retention Audit
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              Let's audit your retention.
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mb-6">
              Drop your channel details below. We'll analyze your drop-off curves and prepare a custom editing roadmap before our call.
            </p>

            <form onSubmit={handleSubmitStep1} className="space-y-4">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-white/50" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-white/50" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@creator.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/50 transition-colors"
                  />
                </div>
              </div>

              {/* Channel / Social Link */}
              <div>
                <label className="block text-xs font-mono font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                  <Youtube className="w-3.5 h-3.5 text-red-400" />
                  <span>Channel or Social Link (@handle) *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="youtube.com/@yourchannel or @handle"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/50 transition-colors"
                />
              </div>

              {/* Revenue Tier Selection */}
              <div>
                <label className="block text-xs font-mono font-medium text-white/70 mb-2 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Monthly Channel / Business Revenue</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {REVENUE_TIERS.map((tier) => {
                    const isSelected = revenue === tier.value;
                    return (
                      <button
                        type="button"
                        key={tier.value}
                        onClick={() => setRevenue(tier.value)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-semibold font-mono border transition-all text-center ${
                          isSelected
                            ? "bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            : "bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.07] hover:text-white"
                        }`}
                      >
                        {tier.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary Focus / Goal Chips */}
              <div>
                <label className="block text-xs font-mono font-medium text-white/70 mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Primary Growth Goal</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {GOAL_OPTIONS.map((goal) => {
                    const isSelected = selectedGoal === goal;
                    return (
                      <button
                        type="button"
                        key={goal}
                        onClick={() => setSelectedGoal(goal)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          isSelected
                            ? "bg-indigo-500/20 border-indigo-400/80 text-indigo-200"
                            : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06]"
                        }`}
                      >
                        {goal}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500 text-black font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-[0.99] cursor-pointer"
                >
                  <span>Select Time Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Trust Footer */}
            <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-white/40 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Free • No sales pressure
              </span>
              <span>Harzh Growth Systems</span>
            </div>
          </div>
        )}

        {/* STEP 2: IN-MODAL LIVE CALENDAR SLOT PICKER */}
        {step === 2 && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/10 text-xs font-mono text-white/70 hover:text-white transition-colors flex items-center gap-1"
                >
                  ← Back
                </button>
                <span className="text-xs text-white/30">•</span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Select Time Slot
                </span>
              </div>
              <div className="text-[11px] font-mono text-white/50 hidden sm:block">
                Booking for <span className="text-white font-medium">{name}</span>
              </div>
            </div>

            {/* Seamless Embedded Cal Slot Picker (Zero Redirect) */}
            <div className="w-full h-[470px] rounded-2xl overflow-hidden bg-black/40 border border-white/5 relative">
              <Cal
                calLink={`harzh/15min?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`}
                style={{ width: "100%", height: "100%", overflow: "auto" }}
                config={{ layout: "month_view", theme: "dark" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

