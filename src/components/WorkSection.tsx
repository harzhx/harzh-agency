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
  
  // Long-Form Grand Theater State
  const [activeLongIndex, setActiveLongIndex] = useState(0);
  const [isPlayingGrandLong, setIsPlayingGrandLong] = useState(false);

  // Shorts Inline Playback State
  const [playingShortId, setPlayingShortId] = useState<string | null>(null);

  const longFormItems = PORTFOLIO_ITEMS.filter(
    (item) => item.category === "longform" || item.category === "documentary" || item.category === "podcast"
  );
  const shortsItems = PORTFOLIO_ITEMS.filter((item) => item.category === "shorts");

  const currentLongItem = longFormItems[activeLongIndex] || longFormItems[0];

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
              Every cut is engineered for maximum retention. Play our 16:9 YouTube master edits on the grand theater screen or browse 9:16 viral short-form assets.
            </p>
          </div>

          {/* TWO PRIMARY TABS (Long-Form vs. Shorts) */}
          <div className="flex items-center p-1.5 rounded-2xl bg-black/60 border border-white/[0.1] backdrop-blur-xl shrink-0">
            <button
              onClick={() => {
                setActiveCategory("longform");
                setIsPlayingGrandLong(false);
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
                setPlayingShortId(null);
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

        {/* 🎬 1. LONG-FORM: GRAND CINEMA THEATER PLAYER */}
        {activeCategory === "longform" && currentLongItem && (
          <div className="animate-in fade-in duration-300">
            {/* Grand Cinema Theater Screen (Large Scale on Desktop) */}
            <div className="max-w-5xl mx-auto mb-6">
              <div className="relative rounded-3xl md:rounded-[32px] border border-white/[0.12] overflow-hidden p-2 sm:p-3 bg-[#0a0a0e]/90 shadow-2xl shadow-black ring-1 ring-white/10">
                <div className="relative aspect-video rounded-2xl md:rounded-[26px] overflow-hidden bg-black group">
                  {isPlayingGrandLong ? (
                    <video
                      key={currentLongItem.id}
                      src={currentLongItem.videoPlaceholderUrl}
                      poster={currentLongItem.thumbnailUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover rounded-2xl md:rounded-[26px]"
                    />
                  ) : (
                    <div
                      onClick={() => setIsPlayingGrandLong(true)}
                      className="w-full h-full relative cursor-pointer"
                    >
                      <img
                        src={currentLongItem.thumbnailUrl}
                        alt={currentLongItem.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

                      {/* Glowing Center Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.85)] group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black translate-x-0.5" />
                        </div>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between z-10 pointer-events-none">
                        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold shadow-lg">
                          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>{currentLongItem.retentionRate} AVD</span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-xs font-mono">
                          <Clock className="w-3.5 h-3.5 text-white/60" />
                          <span>{currentLongItem.duration}</span>
                        </div>
                      </div>

                      {/* Bottom In-Frame Telemetry Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 pointer-events-none">
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-white/80 mb-1">
                          <span className="text-white font-semibold">{currentLongItem.creator} ({currentLongItem.channelSubscribers})</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold">{currentLongItem.views} Views</span>
                        </div>
                        <h3 className="text-lg sm:text-2xl font-extrabold text-white line-clamp-1 drop-shadow-md">
                          {currentLongItem.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3-Clip Interactive Selector Strip (Below the Theater Screen) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-5xl mx-auto mb-14">
              {longFormItems.map((item, idx) => {
                const isSelected = activeLongIndex === idx;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveLongIndex(idx);
                      setIsPlayingGrandLong(true);
                    }}
                    className={`text-left p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 group shadow-xl ${
                      isSelected
                        ? "border-indigo-500/80 bg-indigo-500/10 ring-2 ring-indigo-500/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                        : "border-white/[0.08] hover:border-white/20 bg-white/[0.02] text-white/70 hover:text-white"
                    }`}
                  >
                    {/* Mini 16:9 Thumbnail Preview */}
                    <div className="relative w-20 sm:w-24 aspect-video rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-indigo-500 text-white' : 'bg-black/60 text-white'}`}>
                          <Play className="w-2.5 h-2.5 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Metadata Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 truncate">
                          {item.retentionRate} AVD
                        </span>
                        <span className="text-[10px] font-mono text-white/50">{item.duration}</span>
                      </div>
                      <h4 className="text-xs font-bold truncate text-white leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-white/50 truncate font-mono mt-0.5">
                        {item.creator}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 📱 2. VIRAL SHORTS: 9:16 PURE CINEMA SHOWROOM */}
        {activeCategory === "shorts" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-in fade-in duration-300">
            {shortsItems.map((item) => {
              const isPlaying = playingShortId === item.id;

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
                      onClick={() => setPlayingShortId(item.id)}
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
