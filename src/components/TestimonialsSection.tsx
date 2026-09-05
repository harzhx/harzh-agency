import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, TrendingUp, Quote } from "lucide-react";

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
}

export const TESTIMONIAL_CREATORS: TestimonialCreator[] = [
  {
    id: "simran-kaur",
    name: "Simran Kaur Makeovers",
    subscribers: "700K+",
    views: "50M+",
    niche: "Beauty & Lifestyle",
    badge: "700K+ CREATOR",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
    quote: "Harsh transformed our production velocity. The hook retention and pacing eliminated dropoffs across our long-form tutorials and shorts.",
    keyMetric: "+42% Avg View Duration",
  },
  {
    id: "champagne-mike",
    name: "Champagne Mike",
    subscribers: "150K+",
    views: "12M+",
    niche: "Tech & Luxury Lifestyle",
    badge: "150K+ TECH",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80",
    quote: "The 3D motion telemetry and sound design elevated our storytelling to documentary level. Turnaround is consistently sharp and dependable.",
    keyMetric: "78.4% Watch Time Peak",
  },
  {
    id: "jack-vegan",
    name: "Jack Vegan",
    subscribers: "120K+",
    views: "8M+",
    niche: "Fitness & Calisthenics",
    badge: "120K+ FITNESS",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80",
    quote: "From raw Zoom calls and lifestyle footage, they crafted cohesive narrative masterclasses that our audience watches until the final second.",
    keyMetric: "3.2x Subscriber Growth",
  },
];

export const TestimonialsSection: React.FC<{ onOpenBooking: () => void }> = () => {
  return (
    <section id="testimonials" className="scroll-mt-24 sm:scroll-mt-28 py-12 sm:py-16 md:py-20 relative z-10 border-t border-white/[0.06] overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute bottom-1/3 right-1/4 translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>TESTIMONIALS</span>
          </div>

          <h2 className="text-[22px] sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-snug sm:leading-tight">
            Trusted by Channels<br className="block sm:inline" />{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300">
              Scaling to Millions of Views.
            </span>
          </h2>
        </motion.div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TESTIMONIAL_CREATORS.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className="relative rounded-3xl border border-white/[0.08] bg-[#0c0e18]/95 backdrop-blur-xl p-6 sm:p-8 overflow-hidden group hover:border-indigo-500/40 transition-colors duration-300 shadow-2xl flex flex-col justify-between"
            >
              <div className="relative z-10">
                {/* Result Proof Pill Top */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-white/50">
                    {creator.badge}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5 animate-pulse" />
                    <span>{creator.keyMetric}</span>
                  </div>
                </div>

                {/* Quote with Quotation Glyph */}
                <div className="mb-8">
                  <Quote className="w-6 h-6 text-indigo-400/40 mb-3" />
                  <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed font-normal">
                    "{creator.quote}"
                  </p>
                </div>
              </div>

              {/* Creator Profile Footer */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-white/[0.08] relative z-10">
                <div className="relative shrink-0">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-indigo-400 transition-all shadow-md"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 bg-indigo-600 text-white rounded-full p-0.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-indigo-600 text-white" />
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-200 transition-colors truncate">
                    {creator.name}
                  </h3>
                  <span className="text-xs font-mono text-white/50 block truncate font-medium">
                    {creator.niche} • <span className="text-indigo-400 font-semibold">{creator.subscribers}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
