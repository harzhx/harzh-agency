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
    <section id="strategies" className="pt-10 pb-20 sm:py-24 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
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
        </div>

        {/* 2-COLUMN BALANCED PROCESS LAYOUT WITH PIXEL MASCOT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Agency Overview Card & CTA (Waist-Up Pixel Mascot) */}
          <div className="lg:col-span-5 relative pt-14 sm:pt-12 lg:sticky lg:top-28">
            {/* Waist-Up Japanese Schoolgirl Mascot Popping Up (z-10) */}
            <div className="absolute -top-16 sm:-top-18 right-3 sm:right-6 z-10">
              <PixelMascot />
            </div>

            {/* The DFY System Card in Foreground (z-20) */}
            <div className="p-8 sm:p-9 rounded-3xl border border-white/[0.1] bg-[#090b16] backdrop-blur-2xl shadow-2xl relative z-20 overflow-hidden ring-1 ring-white/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 block mb-2">
                DONE-FOR-YOU MEDIA SYSTEMS
              </span>

              <h3 className="text-2xl font-extrabold text-white mb-4 leading-snug">
                From Raw Footage to Viral Retention Engine.
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                You record the ideas. We handle the psychological hooks, cinematic pacing, 12-layer foley audio, and high-CTR packaging—delivering YouTube-ready master edits in 48 hours.
              </p>

              {/* Core Deliverable Badges */}
              <div className="space-y-3 mb-8 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center gap-3 text-xs text-white/90 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                  <span>Guaranteed 48-Hour Turnarounds</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-white/90 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                  <span>Unlimited Frame.io Revisions</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-white/90 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                  <span>Engineered for 75%+ Average Watch Time</span>
                </div>
              </div>

              {/* Call to Action */}
              <button
                onClick={onOpenBooking}
                className="w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 active:scale-95 group"
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Book 15-Min Strategy Call</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 5 Sequential Clean Numbered Process Cards */}
          <div className="lg:col-span-7 space-y-4">
            {processSteps.map((step) => (
              <div
                key={step.step}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
