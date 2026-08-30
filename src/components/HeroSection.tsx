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
import vslThumbnail from "../assets/vsl_thumbnail.jpg";

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
      className="relative pt-28 pb-6 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 overflow-hidden"
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
                  poster={vslThumbnail}
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
                      backgroundImage: `url(${vslThumbnail})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
                  </div>

                  {/* Sleek Minimalist Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.7)] group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-black translate-x-0.5" />
                    </div>
                  </div>

                  {/* Clean Top Badges (Non-overlapping & Lightweight) */}
                  <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-10 pointer-events-none">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white text-[10px] sm:text-xs font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>RETENTION BREAKDOWN</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      <span>78.4% Retention</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 1. Agency Stats (DESKTOP: Clean 4-Card Grid Without Green Subtext) */}
        <div className="hidden sm:grid sm:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          {AGENCY_STATS.map((stat, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center backdrop-blur-md hover:border-white/20 transition-all shadow-lg flex flex-col justify-center min-h-[120px]"
            >
              <div className="text-3xl sm:text-4xl lg:text-4xl font-extrabold font-sans tracking-tight text-white mb-1.5">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/70 leading-relaxed font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Desktop Marquees Section */}
        <div className="space-y-2.5 mb-4 sm:mb-12 overflow-hidden relative select-none">
          {/* 1. Stats Marquee (MOBILE ONLY: Moving Right → Left) */}
          <div className="block sm:hidden relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee-left py-0.5 gap-2.5">
              {[
                { symbol: "✦", text: "240M+ VIEWS GENERATED" },
                { symbol: "📈", text: "4.2X RETENTION" },
                { symbol: "⏱️", text: "30H+ SAVED / WK" },
                { symbol: "⚡", text: "48–72H DELIVERY" },
                { symbol: "✦", text: "240M+ VIEWS GENERATED" },
                { symbol: "📈", text: "4.2X RETENTION" },
                { symbol: "⏱️", text: "30H+ SAVED / WK" },
                { symbol: "⚡", text: "48–72H DELIVERY" },
                { symbol: "✦", text: "240M+ VIEWS GENERATED" },
                { symbol: "📈", text: "4.2X RETENTION" },
                { symbol: "⏱️", text: "30H+ SAVED / WK" },
                { symbol: "⚡", text: "48–72H DELIVERY" },
                { symbol: "✦", text: "240M+ VIEWS GENERATED" },
                { symbol: "📈", text: "4.2X RETENTION" },
                { symbol: "⏱️", text: "30H+ SAVED / WK" },
                { symbol: "⚡", text: "48–72H DELIVERY" },
              ].map((stat, index) => (
                <div
                  key={`stat-${index}`}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/90 whitespace-nowrap shadow-md shrink-0"
                >
                  <span className="text-indigo-400 text-xs">{stat.symbol}</span>
                  <span className="font-mono">{stat.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Niches Header */}
          <p className="hidden sm:block text-[11px] uppercase tracking-widest font-mono font-semibold text-white/40 text-center mb-1">
            ENGINEERING RETENTION ACROSS TOP-TIER NICHES
          </p>

          {/* 2. Niches Marquee (Glitchless Single-Track: Moving Left → Right) */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee-right py-0.5 gap-2.5">
              {[
                ...CREATOR_LOGOS,
                ...CREATOR_LOGOS,
              ].map((logo, idx) => (
                <div
                  key={`niche-${idx}`}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 text-white/90 whitespace-nowrap shadow-md transition-colors shrink-0"
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
