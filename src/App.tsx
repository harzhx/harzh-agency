import { useState, useEffect } from "react";
import { ThemeMode } from "./types";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { StrategiesSection } from "./components/StrategiesSection";
import { WorkSection } from "./components/WorkSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { PackagesSection } from "./components/PackagesSection";
import { FaqSection } from "./components/FaqSection";
import { EmbeddedBookingSection } from "./components/EmbeddedBookingSection";
import { BookingModal } from "./components/BookingModal";
import { Footer } from "./components/Footer";

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Stop active video when booking modal opens
  useEffect(() => {
    if (isBookingOpen) {
      setActiveVideoId(null);
    }
  }, [isBookingOpen]);

  // Global video mutual-exclusion: pause any native <video> if another starts playing
  useEffect(() => {
    const handleVideoPlay = (e: Event) => {
      const currentVideo = e.target as HTMLVideoElement;
      if (!currentVideo || currentVideo.tagName !== "VIDEO") return;

      const allVideos = document.querySelectorAll("video");
      allVideos.forEach((video) => {
        if (video !== currentVideo && !video.paused) {
          video.pause();
        }
      });
    };

    document.addEventListener("play", handleVideoPlay, true);
    return () => document.removeEventListener("play", handleVideoPlay, true);
  }, []);

  // Track mouse position smoothly for cursor-proximity spotlight & ambient parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle section anchor clicks and clean hashes from URL
  useEffect(() => {
    // If opened or reloaded with a hash, scroll to target and clear hash from URL bar
    if (window.location.hash) {
      const targetId = window.location.hash.replace(/^#/, "");
      window.history.replaceState(null, "", window.location.pathname);
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const id = href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
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
          activeVideoId={activeVideoId}
          onPlayVideo={setActiveVideoId}
          onStopVideo={() => setActiveVideoId(null)}
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
          activeVideoId={activeVideoId}
          onPlayVideo={setActiveVideoId}
          onStopVideo={() => setActiveVideoId(null)}
        />

        {/* 4. CREATOR ENDORSEMENTS & VERIFIED TESTIMONIALS */}
        <TestimonialsSection
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* 6. THE 3 TRANSPARENT PACKAGES */}
        <PackagesSection
          theme={theme}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* 7. CREATOR FAQS */}
        <FaqSection
          theme={theme}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* 8. EMBEDDED INTERACTIVE BOOKING SECTION */}
        <EmbeddedBookingSection theme={theme} />
      </main>

      {/* 7. MINIMALIST FOOTER */}
      <Footer
        theme={theme}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* 8. INSTANT PRELOADED CAL.COM BOOKING MODAL */}
      <BookingModal
        theme={theme}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
