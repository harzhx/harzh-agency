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
  // 2 Primary Tabs requested by the user: Long-Form (16:9) vs. Viral Shorts (9:16)
  const [activeCategory, setActiveCategory] = useState<"longform" | "shorts">("longform");
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);

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
              Every cut is engineered for maximum retention. Filter between our 16:9 YouTube master edits and 9:16 viral short-form assets.
            </p>
          </div>

          {/* TWO PRIMARY TABS (Long-Form vs. Shorts) */}
          <div className="flex items-center p-1.5 rounded-2xl bg-black/60 border border-white/[0.1] backdrop-blur-xl shrink-0">
            <button
              onClick={() => setActiveCategory("longform")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeCategory === "longform"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span>🎬 Long-Form YouTube (16:9)</span>
            </button>

            <button
              onClick={() => setActiveCategory("shorts")}
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

        {/* LONG-FORM 16:9 GRID */}
        {activeCategory === "longform" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-in fade-in duration-300">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedVideo(item)}
                className="group rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* 16:9 Thumbnail Image Container */}
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {/* Play Button Overlay on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 fill-black translate-x-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-mono text-white/90 border border-white/10 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-white/60" />
                      <span>{item.duration}</span>
                    </div>

                    {/* Retention Pill */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-semibold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3" />
                      <span>{item.retentionRate} AVD</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2 text-xs text-white/50 font-mono">
                      <span>{item.creator} ({item.channelSubscribers})</span>
                      <span className="text-white/80 font-bold">{item.views} Views</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/70 border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Metric Comparison */}
                <div className="px-6 py-3.5 bg-black/40 border-t border-white/[0.06] text-xs flex items-center justify-between text-white/70">
                  <span className="font-mono text-[11px] text-white/50">BEFORE/AFTER PACING</span>
                  <span className="text-emerald-400 font-semibold font-mono flex items-center gap-1">
                    <span>Watch Breakdown</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SHORTS 9:16 VERTICAL GRID */}
        {activeCategory === "shorts" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-in fade-in duration-300">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedVideo(item)}
                className="group rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl"
              >
                {/* 9:16 Tall Vertical Aspect Frame */}
                <div className="relative aspect-[9/14] overflow-hidden bg-black">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                      {item.retentionRate} Completion
                    </span>

                    <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-mono text-white/80 border border-white/10">
                      {item.duration}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-7 h-7 fill-black translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Text in 9:16 Card */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-indigo-300 font-mono">{item.creator}</span>
                      <span className="text-xs text-white/50">•</span>
                      <span className="text-xs font-bold text-white">{item.views} Views</span>
                    </div>
                    <h3 className="text-base font-bold text-white line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Key Edits Note */}
                <div className="p-4 bg-black/40 border-t border-white/[0.06] text-xs text-white/70">
                  <span className="text-white/40 block mb-1 font-mono text-[10px]">VIRAL HOOK EDIT</span>
                  <p className="text-white/80 line-clamp-2 text-[11px]">
                    {item.keyEdits[0]}
                  </p>
                </div>
              </div>
            ))}
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

      {/* VIDEO PLAYER MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-[#0c0e17] border border-white/20 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/40">
              <div>
                <span className="text-xs font-mono font-semibold text-emerald-400 block mb-0.5">
                  {selectedVideo.category.toUpperCase()} • {selectedVideo.retentionRate} AVD
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">{selectedVideo.title}</h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Breakdown Notes */}
            <div className="p-6 bg-[#080910] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-white/40 uppercase font-mono block mb-1.5 font-bold">KEY RETENTION TECHNIQUES</span>
                <ul className="space-y-1 text-white/80">
                  {selectedVideo.keyEdits.map((edit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{edit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between">
                <div>
                  <span className="text-indigo-400 font-mono font-bold block mb-1">PROVEN IMPACT</span>
                  <p className="text-white/70 text-xs">
                    {selectedVideo.beforeAfterComparison?.editedPacing || "Engineered for 75%+ Average View Duration."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedVideo(null);
                    onOpenBooking();
                  }}
                  className="mt-3 py-2 rounded-xl text-center bg-white text-black font-bold text-xs hover:bg-white/90 transition-all"
                >
                  Apply This Style To My Channel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
