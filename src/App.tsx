import React, { useState, useEffect } from "react";
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
    (async function () {
      try {
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#6366f1" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (e) {
        console.error("Cal.com init:", e);
      }
    })();
  }, []);

  const handleOpenBooking = async () => {
    try {
      const cal = await getCalApi();
      cal("modal", {
        calLink: "harzh/15min",
        config: { layout: "month_view", theme: "dark" },
      });
    } catch {
      setIsBookingOpen(true);
    }
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
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
        onOpenBooking={handleOpenBooking}
      />

      {/* MAIN SECTIONS */}
      <main className="relative z-10">
        {/* 1. HERO SECTION (Promise, Description, 2 CTAs, 16:9 Showreel Player & Niches Marquee) */}
        <HeroSection
          theme={theme}
          onOpenBooking={handleOpenBooking}
          onExploreWork={scrollToWork}
        />

        {/* 2. THE 4 RETENTION STRATEGY PILLARS & PIXEL MASCOT */}
        <StrategiesSection
          theme={theme}
          onOpenBooking={handleOpenBooking}
        />

        {/* 3. THE WORK VAULT (2 Tabs: 🎬 Long-Form 16:9 & 📱 Viral Shorts 9:16) */}
        <WorkSection
          theme={theme}
          onOpenBooking={handleOpenBooking}
        />

        {/* 4. RETENTION DIAGNOSTICS & CASE STUDIES PROOF */}
        <ResultsSection
          theme={theme}
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. CREATOR ENDORSEMENTS & VERIFIED TESTIMONIALS */}
        <TestimonialsSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 6. THE 3 TRANSPARENT PACKAGES */}
        <PackagesSection
          theme={theme}
          onOpenBooking={handleOpenBooking}
        />

        {/* 7. CREATOR FAQS */}
        <FaqSection
          theme={theme}
          onOpenBooking={handleOpenBooking}
        />
      </main>

      {/* 7. MINIMALIST FOOTER */}
      <Footer
        theme={theme}
        onOpenBooking={handleOpenBooking}
      />

      {/* 8. STRATEGY CALL BOOKING MODAL */}
      <BookingModal
        theme={theme}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
