import React from "react";
import { ThemeMode } from "../types";
import { PRICING_PACKAGES } from "../data/agencyData";
import { CheckCircle2, Flame, ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface PackagesSectionProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  theme,
  onOpenBooking,
}) => {
  const [activeMobileTier, setActiveMobileTier] = React.useState<string>("pkg-flagship");

  const renderCard = (pkg: (typeof PRICING_PACKAGES)[0], isMobile = false) => (
    <div
      className={`rounded-3xl p-6 sm:p-9 flex flex-col justify-between relative transition-all duration-300 ${
        pkg.popular
          ? "bg-gradient-to-b from-[#13172e] via-[#0d1022] to-[#080a14] border-2 border-indigo-500/40 shadow-2xl shadow-indigo-950/60 ring-1 ring-white/20 lg:-translate-y-3"
          : "bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.1] hover:border-white/25 backdrop-blur-xl shadow-xl hover:-translate-y-1"
      }`}
    >
      {/* Popular Glow Header Pill */}
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-extrabold tracking-widest uppercase font-mono shadow-[0_0_20px_rgba(129,140,248,0.6)] flex items-center gap-1.5 z-20 whitespace-nowrap">
          <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>MOST POPULAR CHOICE</span>
        </div>
      )}

      {pkg.badge && !pkg.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/20 text-white/80 text-[10px] font-bold tracking-widest uppercase font-mono backdrop-blur-md whitespace-nowrap">
          {pkg.badge}
        </div>
      )}

      <div>
        {/* Package Title & Description */}
        <div className="mb-5 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
            {pkg.name}
          </h3>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed sm:min-h-[44px]">
            {pkg.description}
          </p>
        </div>

        {/* Price Display Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/[0.08] mb-6 sm:mb-8">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 block mb-1">
            STARTING INVESTMENT
          </span>
          <div className="flex items-baseline gap-2 mb-2.5 sm:mb-3">
            <span className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {pkg.priceAnchor.replace("Starts at ", "")}
            </span>
            <span className="text-xs font-mono text-white/50">
              {pkg.billingPeriod}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>{pkg.turnaround}</span>
          </div>
        </div>

        {/* What's Included Micro-List */}
        <div className="space-y-3 mb-6 sm:mb-8">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-white/40 block pb-1 border-b border-white/[0.06]">
            DELIVERABLES &amp; SCOPE
          </span>

          <div className="space-y-2 pt-1">
            {pkg.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white/85 leading-relaxed group"
              >
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          onClick={onOpenBooking}
          className={`w-full py-3.5 sm:py-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-xl cursor-pointer ${
            pkg.popular
              ? "bg-white text-black hover:bg-white/90 hover:shadow-[0_0_35px_rgba(255,255,255,0.45)]"
              : "bg-white/[0.08] hover:bg-white/[0.16] text-white border border-white/15 hover:border-white/30 backdrop-blur-md"
          }`}
        >
          <span>{pkg.ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const activeMobilePkg = PRICING_PACKAGES.find((p) => p.id === activeMobileTier) || PRICING_PACKAGES[1];

  return (
    <section id="packages" className="scroll-mt-24 sm:scroll-mt-28 py-12 sm:py-16 md:py-20 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>PRICING & PACKAGES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 sm:mb-8">
            Transparent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">
              Retainer Tiers
            </span>.
          </h2>
        </motion.div>

        {/* MOBILE VIEW: SLEEK TAB SWITCHER (< lg) */}
        <div className="block lg:hidden max-w-md mx-auto mb-8">
          {/* Segmented Tier Switcher Tabs */}
          <div className="relative flex items-center justify-between p-1.5 rounded-2xl bg-black/70 border border-white/[0.1] backdrop-blur-xl shadow-2xl mb-6">
            {PRICING_PACKAGES.map((pkg) => {
              const isSelected = pkg.id === activeMobileTier;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setActiveMobileTier(pkg.id)}
                  className={`relative flex-1 py-2.5 px-2 rounded-xl text-[11px] font-mono font-bold transition-colors text-center flex items-center justify-center gap-1 cursor-pointer ${
                    isSelected
                      ? "text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activePackageTab"
                      className="absolute inset-0 bg-white rounded-xl shadow-lg"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  {pkg.popular && <Flame className="w-3 h-3 text-amber-500 shrink-0 relative z-10" />}
                  <span className="truncate relative z-10">
                    {pkg.id === "pkg-shorts" ? "Shorts" : pkg.id === "pkg-flagship" ? "Flagship" : "Partner"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Mobile Card */}
          <motion.div
            key={activeMobilePkg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderCard(activeMobilePkg, true)}
          </motion.div>
        </div>

        {/* DESKTOP VIEW: 3 CRISP PACKAGES GRID (>= lg) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8 sm:mb-10 items-stretch">
          {PRICING_PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between"
            >
              {renderCard(pkg, false)}
            </motion.div>
          ))}
        </div>

        {/* Crisp Guarantee Ribbon */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center gap-2.5 text-xs text-white/60 font-mono text-center shadow-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>All retainers include unlimited revisions • No long-term lock-in • 48-hour turnarounds</span>
        </div>
      </div>
    </section>
  );
};
