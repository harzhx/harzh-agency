import React from "react";
import { ThemeMode } from "../types";
import { BookingWidget } from "./BookingWidget";
import { Sparkles, Flame, ShieldCheck, Video, Clock } from "lucide-react";
import { motion } from "motion/react";

interface EmbeddedBookingSectionProps {
  theme: ThemeMode;
}

export const EmbeddedBookingSection: React.FC<EmbeddedBookingSectionProps> = ({ theme }) => {
  return (
    <section id="book" className="py-12 sm:py-16 md:py-20 relative z-10 border-t border-white/[0.08] overflow-hidden">
      {/* Ambient background glow */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none transform-gpu" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-white/[0.04] border border-white/[0.08] text-emerald-400 mb-3 sm:mb-4 shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>07 // DIRECT STRATEGY SESSION</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 sm:mb-4">
            Lock In Your Video Retention Audit.
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Pick a time below for a 15-minute 1-on-1 strategy call with our lead director. We will audit your current timeline, diagnose drop-off nodes, and craft a tailored retention roadmap.
          </p>

          {/* Quick value badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 mt-4 sm:mt-6 text-xs text-white/60 font-mono">
            <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full">
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Meet HD</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>15 Minutes Focused</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Free • No Pitch Slap</span>
            </div>
          </div>
        </motion.div>

        {/* Embedded Booking Widget Container */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto shadow-2xl"
        >
          <BookingWidget isModal={false} />
        </motion.div>
      </div>
    </section>
  );
};
