import React, { useState } from "react";
import { ThemeMode } from "../types";
import { CREATOR_LOGOS, AGENCY_STATS } from "../data/agencyData";
import {
  Play,
  Sparkles,
  TrendingUp,
  Flame,
  ArrowRight,
  Volume2,
} from "lucide-react";

interface HeroSectionProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  onOpenBooking,
  onExploreWork,
}) => {
  const [isPlayingShowreel, setIsPlayingShowreel] = useState(false);
  const isDark = theme === "dark";

  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Scarcity Chip */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/[0.04] border border-white/[0.1] text-white/90 shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px]">Accepting 2 High-Growth Creators For Q3</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          </div>
        </div>

        {/* Main Hero Hook Title (High-Contrast & Radiant) */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-5 text-white glow-text">
            We Engineer High-Retention <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300">
              YouTube Edits & Systems.
            </span>
          </h1>

          {/* Promise of Value Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl font-normal max-w-3xl mx-auto leading-relaxed text-white/80">
            We turn raw founder insights and creator footage into <span className="font-bold text-white">75%+ retention masterclasses</span>, viral short-form funnels, and high-CTR packaging.
          </p>
        </div>

        {/* Hero CTAs (Compact & Responsive on Mobile) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 w-full max-w-md sm:max-w-none mx-auto">
          {/* Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-bold bg-white text-black hover:bg-white/90 hover:shadow-[0_0_35px_rgba(255,255,255,0.45)] transition-all duration-300 shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500" />
            <span>Book 15-Min Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onExploreWork}
            className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-medium bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md active:scale-95"
          >
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>Explore Work Vault</span>
          </button>
        </div>

        {/* HERO CINEMATIC SHOWREEL (SEAMLESS INLINE PLAYER — ZERO POPUPS) */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="relative rounded-2xl md:rounded-3xl border border-white/[0.12] overflow-hidden p-2 sm:p-2.5 bg-[#0a0a0e]/90 shadow-2xl shadow-black">
            {/* 16:9 Aspect Video Container */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black group">
              {isPlayingShowreel ? (
                /* Native Inline HTML5 Video Player (Zero Watermarks / 100% Clean) */
                <video
                  src="/videos/vsl.mp4"
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                /* Poster State with Glowing Play Trigger */
                <div
                  className="w-full h-full relative cursor-pointer"
                  onClick={() => setIsPlayingShowreel(true)}
                >
                  {/* Cinematic Video Poster */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80')`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
                  </div>

                  {/* Center Play Button with Neon Pulse */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black shadow-[0_0_50px_rgba(255,255,255,0.6)] group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                      <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-black translate-x-0.5" />
                    </div>
                  </div>

                  {/* Overlaid Badges */}
                  <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between z-10 pointer-events-none">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/80 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-emerald-500/40 text-emerald-400 text-[10px] sm:text-xs font-semibold">
                      <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>78.4% Avg Retention</span>
                    </div>

                    <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/20 text-white text-[10px] sm:text-xs font-mono">
                      4K 60FPS • SYSTEM BREAKDOWN
                    </div>
                  </div>

                  {/* Bottom Telemetry Bar */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between bg-black/80 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10 text-[11px] sm:text-xs text-white/70 pointer-events-none">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-semibold text-white">Harzh Retention Masterclass</span>
                      <span className="text-white/40 hidden sm:inline">•</span>
                      <span className="text-white/60 hidden sm:inline">Psychological Pacing & Systems</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold shrink-0">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Click to Watch Breakdown</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Agency Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-16">
          {AGENCY_STATS.map((stat, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center backdrop-blur-md hover:border-white/20 transition-all shadow-lg"
            >
              <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/70">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] text-emerald-400 mt-1 font-mono">
                {stat.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Smooth Scrolling Niches Marquee */}
        <div className="text-center overflow-hidden relative">
          <p className="text-[11px] sm:text-xs uppercase tracking-widest font-mono font-semibold mb-6 text-white/40">
            ENGINEERING RETENTION ACROSS TOP-TIER NICHES
          </p>

          {/* Marquee Container with Gradient Edge Masking */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee py-2 gap-4">
              {[...CREATOR_LOGOS, ...CREATOR_LOGOS, ...CREATOR_LOGOS].map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 text-white/80 whitespace-nowrap transition-colors"
                >
                  <span className="text-indigo-400">{logo.symbol}</span>
                  <span>{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
