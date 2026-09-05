import React from "react";
import { ThemeMode } from "../types";
import { BookingWidget } from "./BookingWidget";
import { motion } from "motion/react";

interface EmbeddedBookingSectionProps {
  theme: ThemeMode;
}

export const EmbeddedBookingSection: React.FC<EmbeddedBookingSectionProps> = ({ theme }) => {
  return (
    <section id="book" className="scroll-mt-24 sm:scroll-mt-28 py-12 sm:py-16 md:py-20 relative z-10 border-t border-white/[0.08] overflow-hidden">
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
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>WORK WITH US</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Let’s Scale{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">
              Your Channel
            </span>.
          </h2>
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
