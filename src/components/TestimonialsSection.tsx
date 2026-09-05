import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Quote } from "lucide-react";

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
    subscribers: "2M+ Reach",
    views: "50M+ Views",
    niche: "Beauty & Business",
    badge: "INSTAGRAM & YOUTUBE",
    avatar: "/images/testimonials/simran_kaur.jpg",
    quote: "Harsh is easily the best editor out of everyone we've ever worked with, by far. Pacing and hooks are always spot on, and even the shorts are going viral. He can literally take whatever idea I have in mind and turn it into a high-performing video.",
    keyMetric: "Viral Reels & Shorts",
  },
  {
    id: "champagne-mike",
    name: "Champagne Mike",
    subscribers: "6.7M+ TikTok",
    views: "50M+ Views",
    niche: "Comedy & Sketches",
    badge: "6.7M+ ON TIKTOK",
    avatar: "/images/testimonials/champagne_mike.jpg",
    quote: "I honestly can't believe we both use the exact same editing software and your videos still come out ten times cleaner than mine. The comedic timing and pacing keeps people watching all the way through.",
    keyMetric: "6.7M Following",
  },
  {
    id: "the-jacked-vegan",
    name: "The Jacked Vegan",
    subscribers: "56K+ YouTube",
    views: "8M+ Views",
    niche: "Fitness & Calisthenics",
    badge: "CALISTHENICS COACH",
    avatar: "/images/testimonials/the_jacked_vegan.jpg",
    quote: "My video edits and retention have gotten so much better since Harsh came on. No back-and-forth headache, he understands the fitness vibe, and the uploads just perform. That's really it.",
    keyMetric: "Retention Lift",
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
          viewport={{ once: true, amount: 0.2 }}
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

        {/* 3 Testimonial Cards Grid (Tablet: 2x1 balanced, Desktop: 3-column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TESTIMONIAL_CREATORS.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className={`relative rounded-3xl border border-white/[0.08] bg-[#0c0e18]/95 backdrop-blur-xl p-6 sm:p-8 overflow-hidden group hover:border-indigo-500/40 transition-colors duration-300 shadow-2xl flex flex-col justify-between ${
                index === 2 ? "md:col-span-2 md:max-w-xl md:mx-auto lg:col-span-1 lg:max-w-none w-full" : ""
              }`}
            >
              <div className="relative z-10">
                {/* Quote with Elegant Quotation Glyph */}
                <div className="mb-6 sm:mb-8">
                  <Quote className="w-7 h-7 text-indigo-400/40 mb-4 group-hover:text-indigo-400/70 transition-colors" />
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

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-200 transition-colors truncate">
                    {creator.name}
                  </h3>
                  <div className="text-xs text-white/60 flex items-center gap-1.5 flex-wrap font-sans mt-0.5">
                    <span>{creator.niche}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-indigo-400 font-semibold">{creator.subscribers}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
