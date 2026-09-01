import { useState, useEffect, useCallback } from "react";
import { ThemeMode } from "./types";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { StrategiesSection } from "./components/StrategiesSection";
import { WorkSection } from "./components/WorkSection";
import { ResultsSection } from "./components/ResultsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { PackagesSection } from "./components/PackagesSection";
import { FaqSection } from "./components/FaqSection";
import { BookingModal } from "./components/BookingModal";
import { Footer } from "./components/Footer";
import { getCalApi } from "@calcom/embed-react";

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const openBooking = useCallback(() => {
    setIsBookingOpen(true);
  }, []);

  // Track mouse position smoothly for cursor-proximity spotlight & ambient parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="app-root"
      className="min-h-screen relative font-sans bg-[#06070a] text-slate-100 selection:bg-white selection:text-black overflow-x-hidden"
    >
      {/* 1. RICH AMBIENT BACKGROUND EFFECTS (Canvas Particle Drift, Parallax Orbs, Grid Shimmer, Light Beam, Mouse Spotlight) */}
      <BackgroundEffects theme={theme} mousePosition={mousePosition} />

      {/* 2. NAVIGATION BAR (Clean Boutique Studio Header with Harzh Logo & Scarcity Indicator) */}
      <Navbar
        theme={theme}
        onToggleTheme={() => {}}
        onOpenBooking={openBooking}
      />

      {/* MAIN SECTIONS */}
      <main className="relative z-10">
        {/* 1. HERO SECTION (Promise, Description, 2 CTAs, 16:9 Showreel Player & Niches Marquee) */}
        <HeroSection
          theme={theme}
          onOpenBooking={openBooking}
          onExploreWork={scrollToWork}
        />

        {/* 2. THE 4 RETENTION STRATEGY PILLARS & PIXEL MASCOT */}
        <StrategiesSection
          theme={theme}
          onOpenBooking={openBooking}
        />

        {/* 3. THE WORK VAULT (2 Tabs: 🎬 Long-Form 16:9 & 📱 Viral Shorts 9:16) */}
        <WorkSection
          theme={theme}
          onOpenBooking={openBooking}
        />

        {/* 4. RETENTION DIAGNOSTICS & CASE STUDIES PROOF */}
        <ResultsSection
          theme={theme}
          onOpenBooking={openBooking}
        />

        {/* 5. CREATOR ENDORSEMENTS & VERIFIED TESTIMONIALS */}
        <TestimonialsSection
          onOpenBooking={openBooking}
        />

        {/* 6. THE 3 TRANSPARENT PACKAGES */}
        <PackagesSection
          theme={theme}
          onOpenBooking={openBooking}
        />

        {/* 7. CREATOR FAQS */}
        <FaqSection
          theme={theme}
          onOpenBooking={openBooking}
        />
      </main>

      {/* 7. MINIMALIST FOOTER */}
      <Footer
        theme={theme}
        onOpenBooking={openBooking}
      />

      {/* 8. PRELOADED INSTANT STRATEGY CALL BOOKING MODAL */}
      <BookingModal
        theme={theme}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
