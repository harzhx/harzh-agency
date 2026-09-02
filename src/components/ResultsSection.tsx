import React from "react";
import { ThemeMode } from "../types";
import { CASE_STUDIES } from "../data/agencyData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Clock, Users, ArrowUpRight, Flame } from "lucide-react";
import { motion } from "motion/react";

interface ResultsSectionProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  theme,
  onOpenBooking,
}) => {
  const caseStudy = CASE_STUDIES[0];

  return (
    <section id="proof" className="py-12 sm:py-16 md:py-20 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-white/[0.04] border border-white/[0.08] text-purple-400 mb-3 sm:mb-4">
            <span>03 // THE RETENTION DIAGNOSTICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 sm:mb-4">
            Proof in the Analytics.
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed">
            Real second-by-second YouTube Studio retention curves comparing standard industry editing vs. the Harzh retention framework.
          </p>
        </motion.div>

        {/* Big Interactive Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto p-5 sm:p-8 md:p-10 rounded-3xl border border-white/[0.1] bg-white/[0.02] backdrop-blur-xl shadow-2xl mb-0"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-1">
                YOUTUBE STUDIO RETENTION ANALYSIS
              </span>
              <h3 className="text-2xl font-bold text-white">
                18-Minute Tech Documentary Retardown
              </h3>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-white font-semibold">Harzh High-Pacing Edit (78% AVD)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="text-white/50">Industry Average (34% AVD)</span>
              </div>
            </div>
          </div>

          {/* Recharts Area Container */}
          <div className="h-72 sm:h-80 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={caseStudy.retentionCurveData}>
                <defs>
                  <linearGradient id="harzhGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="timeMarker" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 100]} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d0f17",
                    borderColor: "rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="kromaEdited"
                  name="Harzh Retention"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#harzhGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="industryAverage"
                  name="Industry Average"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#avgGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Key Metric Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] text-xs">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
              <span className="text-white/50 block mb-1 font-mono">0:30 HOOK RETENTION</span>
              <span className="text-xl font-extrabold text-white">90% Retained</span>
              <p className="text-emerald-400 text-[11px] mt-0.5">+44% vs Industry Baseline</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
              <span className="text-white/50 block mb-1 font-mono">10:00 MID-ROLL SUSTAIN</span>
              <span className="text-xl font-extrabold text-white">73% Watching</span>
              <p className="text-emerald-400 text-[11px] mt-0.5">Eliminated typical 60% drop</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
              <span className="text-white/50 block mb-1 font-mono">CHANNEL SCALE</span>
              <span className="text-xl font-extrabold text-white">+405K Subscribers</span>
              <p className="text-indigo-400 text-[11px] mt-0.5">Within 4 months of partnership</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
