import React, { useState } from "react";
import { ThemeMode, PortfolioItem } from "../types";
import { PORTFOLIO_ITEMS } from "../data/agencyData";
import {
  Play,
  TrendingUp,
  Eye,
  Clock,
  Sparkles,
  ArrowUpRight,
  X,
  Volume2,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WorkSectionProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
  activeVideoId?: string | null;
  onPlayVideo?: (id: string) => void;
  onStopVideo?: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  theme,
  onOpenBooking,
  activeVideoId,
  onPlayVideo,
  onStopVideo,
}) => {
  // 2 Primary Tabs: Long-Form (16:9) vs. Viral Shorts (9:16)
  const [activeCategory, setActiveCategory] = useState<"longform" | "shorts">("longform");
  
  // Fallback state if props not passed
  const [internalPlayingId, setInternalPlayingId] = useState<string | null>(null);
  const currentActiveId = activeVideoId !== undefined ? activeVideoId : internalPlayingId;

  const handlePlay = (id: string) => {
    if (onPlayVideo) {
      onPlayVideo(id);
    } else {
      setInternalPlayingId(id);
    }
  };

  const handleStop = () => {
    if (onStopVideo) {
      onStopVideo();
    } else {
      setInternalPlayingId(null);
    }
  };

  const longFormItems = PORTFOLIO_ITEMS.filter(
    (item) => item.category === "longform" || item.category === "documentary" || item.category === "podcast"
  );
  const shortsItems = PORTFOLIO_ITEMS.filter((item) => item.category === "shorts");

  return (
    <section id="work" className="scroll-mt-24 sm:scroll-mt-28 py-12 sm:py-16 md:py-20 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 sm:mb-8">
            Featured Work.
          </h2>

          {/* TWO PRIMARY TABS (Long-Form vs. Shorts) - Balanced 50/50 Toggle with Sliding Spring Animation */}
          <div className="relative grid grid-cols-2 p-1.5 rounded-2xl bg-black/70 border border-white/[0.1] backdrop-blur-xl shadow-2xl w-full max-w-xs sm:max-w-sm mx-auto">
            <button
              type="button"
              onClick={() => {
                setActiveCategory("longform");
                handleStop();
              }}
              className={`relative py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-200 flex items-center justify-center cursor-pointer ${
                activeCategory === "longform"
                  ? "text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {activeCategory === "longform" && (
                <motion.div
                  layoutId="activeWorkTab"
                  className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_12px_rgba(255,255,255,0.25)]"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10 select-none">Long-Form (16:9)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveCategory("shorts");
                handleStop();
              }}
              className={`relative py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-200 flex items-center justify-center cursor-pointer ${
                activeCategory === "shorts"
                  ? "text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {activeCategory === "shorts" && (
                <motion.div
                  layoutId="activeWorkTab"
                  className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_12px_rgba(255,255,255,0.25)]"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10 select-none">Shorts (9:16)</span>
            </button>
          </div>
        </motion.div>

        {/* FEED AREA WITH ANIMATED TRANSITIONS */}
        <AnimatePresence mode="wait">
          {/* 🎬 1. LONG-FORM: ONE-BY-ONE VERTICAL CINEMA FEED */}
          {activeCategory === "longform" ? (
            <motion.div
              key="longform-feed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="max-w-4xl mx-auto space-y-8 sm:space-y-12 mb-16 transform-gpu min-h-[420px]"
            >
              {longFormItems.map((item, index) => {
                const isPlaying = currentActiveId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 32, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
                    className="relative rounded-3xl md:rounded-[32px] border border-white/[0.12] overflow-hidden p-2 sm:p-3 bg-[#0a0a0e]/90 shadow-2xl shadow-black ring-1 ring-white/10 transition-colors duration-300 hover:border-indigo-500/40"
                  >
                    <div className="relative aspect-video rounded-2xl md:rounded-[26px] overflow-hidden bg-black group">
                      {isPlaying ? (
                        <video
                          src={item.videoPlaceholderUrl}
                          poster={item.thumbnailUrl}
                          controls
                          autoPlay
                          playsInline
                          onEnded={handleStop}
                          className="w-full h-full object-cover rounded-2xl md:rounded-[26px]"
                        />
                      ) : (
                        <div
                          data-testid="work-play-trigger"
                          onClick={() => handlePlay(item.id)}
                          className="w-full h-full relative cursor-pointer"
                        >
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                          
                          {/* Hover Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Glowing Center Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.85)] group-hover:scale-110 active:scale-95 group-hover:bg-white transition-all duration-300">
                              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black translate-x-0.5" />
                            </div>
                          </div>

                          {/* Bottom In-Frame Telemetry Overlay (HOVER ONLY) */}
                          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-white/80 mb-1">
                              <span className="text-white font-semibold">{item.creator}</span>
                              <span>•</span>
                              <span className="text-emerald-400 font-mono">{item.channelSubscribers}</span>
                            </div>
                            <h3 className="text-lg sm:text-2xl font-extrabold text-white line-clamp-1 drop-shadow-md">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* 📱 2. VIRAL SHORTS: 9:16 PURE CINEMA SHOWROOM */
            <motion.div
              key="shorts-feed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-16 transform-gpu min-h-[420px]"
            >
              {shortsItems.map((item, index) => {
                const isPlaying = currentActiveId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 26, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.12 }}
                    transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                    className="relative aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-white/[0.1] hover:border-indigo-500/50 shadow-2xl transition-colors duration-300 group ring-1 ring-white/5"
                  >
                    {isPlaying ? (
                      <video
                        src={item.videoPlaceholderUrl}
                        poster={item.thumbnailUrl}
                        controls
                        autoPlay
                        playsInline
                        onEnded={handleStop}
                        className="w-full h-full object-cover rounded-2xl md:rounded-3xl"
                      />
                    ) : (
                      <div
                        data-testid="work-play-trigger"
                        onClick={() => handlePlay(item.id)}
                        className="w-full h-full relative cursor-pointer"
                      >
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Glowing Center Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.7)] group-hover:scale-110 active:scale-95 group-hover:bg-white transition-all duration-300">
                            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-black translate-x-0.5" />
                          </div>
                        </div>

                        {/* Overlay Title on Thumbnail (HOVER ONLY) */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 z-10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <span className="text-xs font-semibold text-white font-mono">{item.creator}</span>
                            {item.proofBadge && (
                              <>
                                <span className="text-white/40 text-xs">•</span>
                                <span className="text-[11px] text-emerald-400 font-mono font-medium">{item.proofBadge}</span>
                              </>
                            )}
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 drop-shadow-md">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-sm text-white/60 mb-4">
            Have raw footage ready or want us to audit your existing videos?
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 rounded-full text-xs font-bold bg-white text-black hover:bg-white/90 transition-all shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            Book Strategy Call →
          </button>
        </motion.div>
      </div>
    </section>
  );
};
