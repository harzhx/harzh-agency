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

interface WorkSectionProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  theme,
  onOpenBooking,
}) => {
  // 2 Primary Tabs: Long-Form (16:9) vs. Viral Shorts (9:16)
  const [activeCategory, setActiveCategory] = useState<"longform" | "shorts">("longform");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeCategory === "longform") {
      return item.category === "longform" || item.category === "documentary" || item.category === "podcast";
    }
    return item.category === "shorts";
  });

  return (
    <section id="work" className="py-24 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-white/[0.04] border border-white/[0.08] text-emerald-400 mb-3">
              <span>02 // THE WORK VAULT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              Featured Edits & Case Studies.
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl">
              Every cut is engineered for maximum retention. Play our 16:9 YouTube master edits and 9:16 viral short-form assets directly below.
            </p>
          </div>

          {/* TWO PRIMARY TABS (Long-Form vs. Shorts) */}
          <div className="flex items-center p-1.5 rounded-2xl bg-black/60 border border-white/[0.1] backdrop-blur-xl shrink-0">
            <button
              onClick={() => {
                setActiveCategory("longform");
                setPlayingVideoId(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeCategory === "longform"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span>🎬 Long-Form YouTube (16:9)</span>
            </button>

            <button
              onClick={() => {
                setActiveCategory("shorts");
                setPlayingVideoId(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeCategory === "shorts"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span>📱 Viral Shorts & Reels (9:16)</span>
            </button>
          </div>
        </div>

        {/* LONG-FORM 16:9 GRID — PURE VIDEO PLAYERS */}
        {activeCategory === "longform" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-in fade-in duration-300">
            {filteredItems.map((item) => {
              const isPlaying = playingVideoId === item.id;

              return (
                <div
                  key={item.id}
                  className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-white/[0.1] hover:border-indigo-500/50 shadow-2xl transition-all duration-300 group ring-1 ring-white/5"
                >
                  {isPlaying ? (
                    <video
                      src={item.videoPlaceholderUrl}
                      poster={item.thumbnailUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover rounded-2xl md:rounded-3xl"
                    />
                  ) : (
                    <div
                      onClick={() => setPlayingVideoId(item.id)}
                      className="w-full h-full relative cursor-pointer"
                    >
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

                      {/* Glowing Center Play Trigger */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.7)] group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-black translate-x-0.5" />
                        </div>
                      </div>

                      {/* Top Badges (Retention + Duration) */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-semibold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{item.retentionRate} AVD</span>
                        </div>

                        <div className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-mono text-white/90 border border-white/10 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-white/60" />
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      {/* Bottom In-Frame Title & Creator Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate drop-shadow-md mb-0.5">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-[11px] text-white/70 font-mono">
                          <span className="text-white font-medium">{item.creator}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold">{item.views} Views</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* SHORTS 9:16 VERTICAL GRID — PURE VIDEO PLAYERS */}
        {activeCategory === "shorts" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-in fade-in duration-300">
            {filteredItems.map((item) => {
              const isPlaying = playingVideoId === item.id;

              return (
                <div
                  key={item.id}
                  className="relative aspect-[9/14] rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-white/[0.1] hover:border-indigo-500/50 shadow-2xl transition-all duration-300 group ring-1 ring-white/5"
                >
                  {isPlaying ? (
                    <video
                      src={item.videoPlaceholderUrl}
                      poster={item.thumbnailUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover rounded-2xl md:rounded-3xl"
                    />
                  ) : (
                    <div
                      onClick={() => setPlayingVideoId(item.id)}
                      className="w-full h-full relative cursor-pointer"
                    >
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/30" />

                      {/* Top Retention Pill */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                          {item.retentionRate} Completion
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-mono text-white/80 border border-white/10">
                          {item.duration}
                        </span>
                      </div>

                      {/* Glowing Center Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-14 h-14 rounded-full bg-white/95 text-black flex items-center justify-center shadow-[0_0_35px_rgba(255,255,255,0.7)] group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                          <Play className="w-6 h-6 fill-black translate-x-0.5" />
                        </div>
                      </div>

                      {/* Overlay Title on Thumbnail */}
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-indigo-300 font-mono">{item.creator}</span>
                          <span>•</span>
                          <span className="text-xs font-bold text-white">{item.views} Views</span>
                        </div>
                        <h3 className="text-sm font-bold text-white line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Strip */}
        <div className="text-center">
          <p className="text-sm text-white/60 mb-4">
            Have raw footage ready or want us to audit your existing videos?
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 rounded-full text-xs font-bold bg-white text-black hover:bg-white/90 transition-all shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
          >
            Request Free 15-Min Retention Audit
          </button>
        </div>
      </div>
    </section>
  );
};
