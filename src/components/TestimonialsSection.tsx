import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, TrendingUp, Sparkles, Flame, Star, Quote, Play, X, Volume2 } from "lucide-react";

export interface TestimonialCreator {
  id: string;
  name: string;
  subscribers: string;
  views: string;
  niche: string;
  badge: string;
  avatar: string;
  quote: string;
  keyMetric: string;
  accentColor: string;
}

export const TESTIMONIAL_CREATORS: TestimonialCreator[] = [
  {
    id: "simran-kaur",
    name: "Simran Kaur Makeovers",
    subscribers: "700K+",
    views: "50M+",
    niche: "Beauty & Lifestyle Authority",
    badge: "700K+ YOUTUBE CHANNEL",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
    quote: "Harsh transformed our production velocity. The hook retention and pacing eliminated dropoffs across our long-form tutorials and shorts.",
    keyMetric: "+42% Avg View Duration",
    accentColor: "from-pink-500/20 via-rose-500/10 to-transparent",
  },
  {
    id: "champagne-mike",
    name: "Champagne Mike",
    subscribers: "150K+",
    views: "12M+",
    niche: "Tech, Luxury & High-CPM Lifestyle",
    badge: "150K+ TECH CHANNEL",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80",
    quote: "The 3D motion telemetry and sound design elevated our storytelling to documentary level. Turnaround is consistently sharp and dependable.",
    keyMetric: "78.4% Watch Time Peak",
    accentColor: "from-amber-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: "jack-vegan",
    name: "Jack Vegan",
    subscribers: "120K+",
    views: "8M+",
    niche: "Documentary & Storytelling",
    badge: "120K+ LIFESTYLE CHANNEL",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80",
    quote: "From raw Zoom calls and lifestyle footage, they crafted cohesive narrative masterclasses that our audience watches until the final second.",
    keyMetric: "3.2x Subscriber Conversion",
    accentColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
];

export const TestimonialsSection: React.FC<{ onOpenBooking: () => void }> = ({
  onOpenBooking,
}) => {
  const [isPlayingTestimonial, setIsPlayingTestimonial] = useState(false);

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 relative z-10 border-t border-white/[0.06] overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute bottom-1/3 right-1/4 translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-white/[0.04] border border-white/[0.08] text-purple-400 mb-3 sm:mb-4 backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>04 // CREATOR ENDORSEMENTS & CASE STUDIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 sm:mb-4">
            Trusted by Channels Scaling to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300">
              Millions of Views.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto">
            Real feedback from established creators and founders who scaled their channel retention with the Harzh editing system.
          </p>
        </motion.div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8 sm:mb-12">
          {TESTIMONIAL_CREATORS.map((creator) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative rounded-3xl border border-white/[0.12] bg-[#0c0f20]/90 backdrop-blur-2xl p-7 sm:p-8 overflow-hidden group hover:border-indigo-500/50 transition-all duration-300 shadow-2xl flex flex-col justify-between"
            >
              {/* Gradient Hover Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${creator.accentColor} opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none`}
              />

              <div>
                {/* Header: Avatar + Channel Info */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="relative shrink-0">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-white/20 group-hover:ring-indigo-400 transition-all shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-0.5 shadow-md">
                      <CheckCircle2 className="w-4 h-4 fill-indigo-600 text-white" />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors truncate">
                      {creator.name}
                    </h3>
                    <span className="text-xs font-mono text-indigo-400 block truncate font-medium">
                      {creator.niche}
                    </span>
                    <div className="flex items-center gap-1 mt-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-black/50 border border-white/[0.08] mb-6 relative z-10">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                      Subscribers
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-white">
                      {creator.subscribers}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                      Total Views
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-emerald-400">
                      {creator.views}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative z-10 mb-6">
                  <Quote className="w-6 h-6 text-indigo-400/40 mb-2" />
                  <p className="text-sm text-white/80 leading-relaxed italic">
                    "{creator.quote}"
                  </p>
                </div>
              </div>

              {/* Bottom Result Badge */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between relative z-10">
                <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-white/60">
                  {creator.badge}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" /> {creator.keyMetric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Social Proof Telemetry & CTA Banner */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white/[0.03] border border-white/[0.1] p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-8 text-center sm:text-left">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                1,000,000+
              </div>
              <div className="text-xs text-white/60 font-semibold uppercase tracking-wider mt-0.5">
                Total Audience Reached
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 hidden sm:block" />
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                70M+
              </div>
              <div className="text-xs text-white/60 font-semibold uppercase tracking-wider mt-0.5">
                Views Delivered
              </div>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-xl"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Apply For Retainer Slot</span>
          </button>
        </div>
      </div>
    </section>
  );
};
