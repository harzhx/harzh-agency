import React from "react";
import { ThemeMode } from "../types";
import { PixelMascot } from "./PixelMascot";
import {
  Flame,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  Volume2,
  Image as ImageIcon,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

interface StrategiesSectionProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
}

export const StrategiesSection: React.FC<StrategiesSectionProps> = ({
  theme,
  onOpenBooking,
}) => {
  const processSteps = [
    {
      step: 1,
      title: "The 3-Second HookLock™",
      tag: "+46% 30s Retention",
      desc: "We eliminate slow channel chatter in the first 1.8 seconds, replacing it with psychological curiosity gaps, instant visual stakes, and pattern-interrupt sound risers.",
      icon: <Zap className="w-4 h-4 text-amber-400" />,
    },
    {
      step: 2,
      title: "Micro-Vibration Pacing",
      tag: "2.8s Stimulus Rate",
      desc: "We engineer a rhythmic cadence of subtle camera punch-ins, directional parallax overlays, and speed ramps to eliminate dead air and viewer fatigue.",
      icon: <Activity className="w-4 h-4 text-indigo-400" />,
    },
    {
      step: 3,
      title: "12-Layer Foley & Sound Design",
      tag: "12 Layers / Min",
      desc: "Studio-grade vocal mastering, sidechain ducking, tactile UI textures, and sub-bass drops that give your content a 6-figure cinema feel.",
      icon: <Volume2 className="w-4 h-4 text-purple-400" />,
    },
    {
      step: 4,
      title: "High-CTR Packaging Matrix",
      tag: "12-16% CTR Target",
      desc: "We design high-contrast A/B thumbnail variations and curiosity-driven title hooks to maximize impression-to-click conversion.",
      icon: <ImageIcon className="w-4 h-4 text-indigo-400" />,
    },
    {
      step: 5,
      title: "Algorithmic Retention Diagnostics",
      tag: "Continuous Lift",
      desc: "We analyze your YouTube Studio dropoff curves second-by-second and re-engineer every pacing lag back into your next upload.",
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
    },
  ];

  return (
    <section id="strategies" className="py-12 sm:py-16 md:py-20 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-24 sm:mb-24 lg:mb-28"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR PROVEN PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            The Science of Holding <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">Attention</span>.
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            We don't just "cut clips." We apply a 5-stage retention pipeline engineered to eliminate viewer dropoffs and scale Average View Duration (AVD).
          </p>
        </motion.div>

        {/* 2-COLUMN BALANCED PROCESS LAYOUT WITH PIXEL MASCOT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Agency Overview Card & CTA (Waist-Up Pixel Mascot — Pure Sticky) */}
          <div className="lg:col-span-5 relative pt-12 sm:pt-14 lg:sticky lg:top-28">
            {/* Waist-Up Japanese Schoolgirl Mascot Popping Up (z-10) */}
            <div className="absolute -top-14 sm:-top-16 right-4 sm:right-6 z-10">
              <PixelMascot />
            </div>

            {/* The DFY System Card in Foreground (z-20) */}
            <div className="p-8 sm:p-9 rounded-3xl border border-white/[0.1] bg-[#090b16] backdrop-blur-2xl shadow-2xl relative z-20 overflow-hidden ring-1 ring-white/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span>DONE-FOR-YOU SYSTEM</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                You Film.<br />We Handle The Rest.
              </h3>

              {/* Core Deliverable Badges */}
              <div className="space-y-3.5 mb-8 pt-5 border-t border-white/[0.08]">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-white/95 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <strong className="font-bold text-white">Test us on 1 video</strong>{" "}
                    <span className="text-white/60">— 100% Risk-Free</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-white/95 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <strong className="font-bold text-white">Never miss an upload</strong>{" "}
                    <span className="text-white/60">— Reliable turnaround</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-white/95 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </div>
                  <div>
                    <strong className="font-bold text-white">Unlimited revisions</strong>{" "}
                    <span className="text-white/60">— Until you love it</span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <button
                onClick={onOpenBooking}
                className="w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 active:scale-95 group cursor-pointer"
              >
                <span>Book Strategy Call</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 5 Sequential Clean Numbered Process Cards */}
          <div className="lg:col-span-7 space-y-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-300 group shadow-lg flex items-start gap-5"
              >
                {/* Big Clean Step Number Badge */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] text-white flex items-center justify-center font-mono text-base font-extrabold shrink-0 group-hover:border-indigo-500/40 group-hover:text-indigo-400 transition-colors shadow-inner">
                  {step.step}
                </div>

                {/* Card Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded-md bg-white/[0.05]">
                        {step.icon}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {step.title}
                      </h4>
                    </div>

                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {step.tag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
