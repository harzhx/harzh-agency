import React from "react";
import { ThemeMode } from "../types";
import { HarzhLogo } from "./HarzhLogo";
import { ArrowRight, Mail, MessageSquare, Youtube, Instagram, Twitter } from "lucide-react";

interface FooterProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  theme,
  onOpenBooking,
}) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#040508] relative z-10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big CTA Banner in Footer */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl mb-16 text-center max-w-4xl mx-auto shadow-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-2">
            START YOUR CREATIVE PARTNERSHIP
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to scale your retention and views?
          </h3>
          <p className="text-sm text-white/60 max-w-xl mx-auto mb-8">
            Book a 15-minute channel breakdown with our lead strategist. We will analyze your dropoffs and provide an actionable pacing roadmap.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white text-black hover:bg-white/90 hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-all shadow-xl inline-flex items-center gap-2 active:scale-95"
          >
            <span>Book 15-Min Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Links & Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/[0.06] text-xs text-white/50">
          <div className="flex items-center gap-3">
            <HarzhLogo isDark={true} size="sm" showText={true} />
            <span className="text-white/30">•</span>
            <span>Retention Engineering & Video Strategy</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#strategies" className="hover:text-white transition-colors">
              Strategies
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              Work Vault
            </a>
            <a href="#proof" className="hover:text-white transition-colors">
              Retention Proof
            </a>
            <a href="#packages" className="hover:text-white transition-colors">
              Packages
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </div>

          <div className="font-mono text-[11px]">
            © {new Date().getFullYear()} Harzh Studio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
