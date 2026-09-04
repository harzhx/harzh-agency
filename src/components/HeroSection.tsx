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
import { motion } from "motion/react";
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
      className="relative pt-24 pb-4 sm:pt-30 sm:pb-10 md:pt-36 md:pb-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Scarcity Chip & Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-center mb-5 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/[0.04] border border-white/[0.1] text-white/90 shadow-xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10.5px] sm:text-[11px]">Accepting 2 High-Growth Creators For Q3</span>
            </div>
          </div>

          {/* Main Hero Hook Title (High-Contrast & Radiant) */}
          <div className="text-center max-w-5xl mx-auto mb-5 sm:mb-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 text-white glow-text">
              Turn Your YouTube Channel Into <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300">
                A Top 1% Media Brand.
              </span>
            </h1>

            {/* Promise of Value Subtitle */}
            <p className="text-sm sm:text-lg md:text-xl font-normal max-w-xl mx-auto leading-relaxed text-white/80">
              Test us on 1 video. If it's not the best edit on your channel, you don't pay a dollar.
            </p>
          </div>

          {/* Hero CTAs (Side-by-side on mobile, spacious on desktop) */}
          <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 mb-6 sm:mb-10 w-full max-w-sm sm:max-w-none mx-auto px-1">
            {/* Primary CTA */}
            <button
              onClick={onOpenBooking}
              className="flex-1 sm:flex-initial px-4 py-3 sm:px-8 sm:py-4 rounded-full text-xs sm:text-base font-bold bg-white text-black hover:bg-white/90 hover:shadow-[0_0_35px_rgba(255,255,255,0.45)] transition-all duration-300 shadow-xl active:scale-95 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onExploreWork}
              className="flex-1 sm:flex-initial px-4 py-3 sm:px-8 sm:py-4 rounded-full text-xs sm:text-base font-medium bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 backdrop-blur-md active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 fill-emerald-400" />
              <span>See Our Work</span>
            </button>
          </div>
        </motion.div>

        {/* HERO CINEMATIC SHOWREEL (SEAMLESS INLINE PLAYER — ZERO POPUPS) */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto mb-8 sm:mb-12"
        >
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

                  {/* Clean Top Badges (Non-overlapping & Responsive) */}
                  <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-10 pointer-events-none">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/10 text-white text-[10px] sm:text-xs font-mono whitespace-nowrap shrink-0">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>THE 1% BLUEPRINT</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-semibold whitespace-nowrap shrink-0">
                      <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>240M+ Organic Views</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* 1. Agency Stats (DESKTOP: Clean 4-Card Grid Without Green Subtext) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:grid sm:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8 sm:mb-12"
        >
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
        </motion.div>

        {/* Mobile & Desktop Marquees Section */}
        <div className="space-y-2.5 mb-4 sm:mb-12 overflow-hidden relative select-none">
          {/* 1. Stats Marquee (MOBILE ONLY: Moving Right → Left) */}
          <div className="block sm:hidden relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee-left py-0.5 gap-2.5">
              {[
                { symbol: "✦", text: "240M+ VIEWS GENERATED" },
                { symbol: "↗", text: "4.2X RETENTION" },
                { symbol: "◈", text: "30H+ SAVED / WK" },
                { symbol: "⚡", text: "48–72H DELIVERY" },
                { symbol: "✦", text: "240M+ VIEWS GENERATED" },
                { symbol: "↗", text: "4.2X RETENTION" },
                { symbol: "◈", text: "30H+ SAVED / WK" },
                { symbol: "⚡", text: "48–72H DELIVERY" },
                { symbol: "✦", text: "240M+ VIEWS GENERATED" },
                { symbol: "↗", text: "4.2X RETENTION" },
                { symbol: "◈", text: "30H+ SAVED / WK" },
                { symbol: "⚡", text: "48–72H DELIVERY" },
                { symbol: "✦", text: "240M+ VIEWS GENERATED" },
                { symbol: "↗", text: "4.2X RETENTION" },
                { symbol: "◈", text: "30H+ SAVED / WK" },
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
