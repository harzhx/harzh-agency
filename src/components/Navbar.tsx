import React, { useState, useEffect } from "react";
import { ThemeMode } from "../types";
import { HarzhLogo } from "./HarzhLogo";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsScrolledPastHero(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Strategies", href: "#strategies" },
    { label: "Work Vault", href: "#work" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Packages", href: "#packages" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#080a14]/90 backdrop-blur-xl border-b border-white/[0.1] shadow-2xl shadow-black/80"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with Original Harzh Geometric Mark & Typography */}
          <a href="#" className="flex items-center group">
            <HarzhLogo isDark={isDark} size="md" showText={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="px-4 py-2 text-xs font-semibold text-white/70 hover:text-white rounded-full hover:bg-white/[0.08] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-4">
            {/* Primary CTA */}
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-white text-black hover:bg-white/90 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2 active:scale-95 shadow-xl cursor-pointer"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button & Scroll-Triggered Sticky CTA */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-black shadow-md cursor-pointer transition-all duration-300 ease-out transform ${
                isScrolledPastHero
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 -translate-y-2 scale-90 pointer-events-none"
              }`}
            >
              Book Call
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080a14] border-b border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-white/80 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full text-sm font-bold bg-white text-black flex items-center justify-center gap-2 shadow-xl"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
