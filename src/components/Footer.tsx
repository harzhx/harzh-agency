import React from "react";
import { ThemeMode } from "../types";
import { HarzhLogo } from "./HarzhLogo";
import { ArrowRight, Mail, MessageSquare, Youtube, Instagram, Twitter } from "lucide-react";

interface FooterProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="border-t border-white/[0.08] relative z-10 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Links & Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-xs text-white/50">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center sm:text-left">
            <HarzhLogo isDark={true} size="sm" showText={true} />
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-white/50 text-[11px] sm:text-xs">High-Retention Video Production</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#strategies" className="hover:text-white transition-colors">
              Strategies
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#testimonials" className="hover:text-white transition-colors">
              Testimonials
            </a>
            <a href="#packages" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </div>

          <div className="font-mono text-[11px]">
            © {new Date().getFullYear()} Harzh Agency. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
