import { useState, useEffect, lazy, Suspense } from "react";
import { ThemeMode } from "./types";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { StrategiesSection } from "./components/StrategiesSection";
import { WorkSection } from "./components/WorkSection";
import { Footer } from "./components/Footer";

// Lazy-loaded below-the-fold & modal components for instant initial paint
const ResultsSection = lazy(() =>
  import("./components/ResultsSection").then((m) => ({ default: m.ResultsSection }))
);
const TestimonialsSection = lazy(() =>
  import("./components/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection }))
);
const PackagesSection = lazy(() =>
  import("./components/PackagesSection").then((m) => ({ default: m.PackagesSection }))
);
const FaqSection = lazy(() =>
  import("./components/FaqSection").then((m) => ({ default: m.FaqSection }))
);
const BookingModal = lazy(() =>
  import("./components/BookingModal").then((m) => ({ default: m.BookingModal }))
);

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* MAIN SECTIONS */}
      <main className="relative z-10">
        {/* 1. HERO SECTION (Promise, Description, 2 CTAs, 16:9 Showreel Player & Niches Marquee) */}
        <HeroSection
          theme={theme}
          onOpenBooking={() => setIsBookingOpen(true)}
          onExploreWork={scrollToWork}
        />

        {/* 2. THE 4 RETENTION STRATEGY PILLARS & PIXEL MASCOT */}
        <StrategiesSection
          theme={theme}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* 3. THE WORK VAULT (2 Tabs: 🎬 Long-Form 16:9 & 📱 Viral Shorts 9:16) */}
        <WorkSection
          theme={theme}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* 4. RETENTION DIAGNOSTICS & CASE STUDIES PROOF */}
        <Suspense fallback={<div className="py-16 text-center text-white/20 font-mono text-xs">Loading analytics...</div>}>
          <ResultsSection
            theme={theme}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </Suspense>

        {/* 5. CREATOR ENDORSEMENTS & VERIFIED TESTIMONIALS */}
        <Suspense fallback={<div className="py-16" />}>
          <TestimonialsSection
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </Suspense>

        {/* 6. THE 3 TRANSPARENT PACKAGES */}
        <Suspense fallback={<div className="py-16" />}>
          <PackagesSection
            theme={theme}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </Suspense>

        {/* 7. CREATOR FAQS */}
        <Suspense fallback={<div className="py-16" />}>
          <FaqSection
            theme={theme}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </Suspense>
      </main>

      {/* 7. MINIMALIST FOOTER */}
      <Footer
        theme={theme}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* 8. INSTANT PRELOADED CAL.COM BOOKING MODAL */}
      {isBookingOpen && (
        <Suspense fallback={null}>
          <BookingModal
            theme={theme}
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
