import React, { useEffect, useRef } from "react";
import { ThemeMode } from "../types";

interface BackgroundEffectsProps {
  theme: ThemeMode;
  mousePosition: { x: number; y: number };
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ theme, mousePosition }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas particle drift animation with subtle glow and drift
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle parameters
    const particleCount = theme === "dark" ? 48 : 26;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * (theme === "dark" ? 0.35 : 0.18) + 0.05;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.08, // Slow upward drift
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === "dark";
      const particleColor = isDark ? "160, 180, 255" : "99, 102, 241";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Subtle gentle breathing pulse
        p.alpha = p.baseAlpha + Math.sin(frame * p.pulseSpeed + p.pulseOffset) * 0.12;

        // Wrap edges smoothly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${Math.max(0.02, p.alpha)})`;
        ctx.fill();

        // Optional tiny glow halo
        if (p.radius > 1.2 && isDark) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${particleColor}, ${Math.max(0.01, p.alpha * 0.25)})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div
      id="ambient-background-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. SOFT ANIMATED GRADIENT MESH */}
      <div
        id="gradient-mesh-layer"
        className={`absolute inset-0 ${
          isDark
            ? "bg-[#06070a]"
            : "bg-gradient-to-b from-[#f8faff] via-[#f1f4fb] to-[#eaf0fa]"
        }`}
      />

      {/* Atmospheric Beam Texture Backdrop */}
      <div
        id="beam-texture-radial"
        className="absolute inset-0 beam-texture pointer-events-none transition-opacity duration-700"
      />

      {/* Left and Right Vertical Ambient Beam Lines */}
      <div className="absolute top-0 bottom-0 left-12 md:left-24 lg:left-32 w-px beam-line pointer-events-none opacity-40" />
      <div className="absolute top-0 bottom-0 right-12 md:right-24 lg:right-32 w-px beam-line pointer-events-none opacity-40" />

      {/* 2. LIGHT FIELD / BEAM TEXTURE (Spotlight beam from top) */}
      <div
        id="light-beam-layer"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[750px] opacity-80 transition-all duration-1000"
        style={{
          background: isDark
            ? "conic-gradient(from 180deg at 50% 0%, rgba(99, 102, 241, 0) 140deg, rgba(129, 140, 248, 0.22) 175deg, rgba(168, 85, 247, 0.28) 180deg, rgba(96, 165, 250, 0.22) 185deg, rgba(99, 102, 241, 0) 220deg)"
            : "conic-gradient(from 180deg at 50% 0%, rgba(99, 102, 241, 0) 140deg, rgba(99, 102, 241, 0.12) 175deg, rgba(147, 51, 234, 0.14) 180deg, rgba(59, 130, 246, 0.12) 185deg, rgba(99, 102, 241, 0) 220deg)",
          filter: "blur(45px)",
          transform: `translateX(-50%) translateY(${mousePosition.y * 0.015}px)`,
        }}
      />

      {/* Top luminous glow crown */}
      <div
        id="top-glow-crown"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[80px] pointer-events-none transition-all duration-1000"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, rgba(129, 140, 248, 0.35) 0%, rgba(168, 85, 247, 0.18) 45%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.22) 0%, rgba(192, 132, 252, 0.12) 45%, transparent 70%)",
        }}
      />

      {/* 3. PARALLAX SLOW ABSTRACT ORBS */}
      <div
        id="parallax-orb-1"
        className="absolute top-1/4 -left-24 w-[500px] h-[500px] rounded-full blur-[110px] opacity-40 transition-transform duration-700 ease-out"
        style={{
          background: isDark ? "rgba(99, 102, 241, 0.18)" : "rgba(99, 102, 241, 0.12)",
          transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`,
        }}
      />
      <div
        id="parallax-orb-2"
        className="absolute top-2/3 -right-24 w-[600px] h-[600px] rounded-full blur-[130px] opacity-35 transition-transform duration-700 ease-out"
        style={{
          background: isDark ? "rgba(168, 85, 247, 0.16)" : "rgba(168, 85, 247, 0.10)",
          transform: `translate3d(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px, 0)`,
        }}
      />

      {/* 4. GRID SHIMMER OVERLAY (Subtle high-tech blueprint line pattern) */}
      <div
        id="grid-shimmer-layer"
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055] transition-opacity duration-700"
        style={{
          backgroundImage: `linear-gradient(${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.15)"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.15)"} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)",
        }}
      />

      {/* 5. CURSOR PROXIMITY SPOTLIGHT (Subtle radial glow following mouse) */}
      <div
        id="cursor-proximity-spotlight"
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-300 blur-[80px]"
        style={{
          left: `${mousePosition.x - 250}px`,
          top: `${mousePosition.y - 250}px`,
          background: isDark
            ? "radial-gradient(circle, rgba(129, 140, 248, 0.08) 0%, rgba(99, 102, 241, 0.03) 40%, transparent 70%)"
            : "radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, rgba(168, 85, 247, 0.02) 40%, transparent 70%)",
        }}
      />

      {/* 6. CANVAS PARTICLES */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
