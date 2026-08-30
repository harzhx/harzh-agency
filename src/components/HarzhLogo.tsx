import React from "react";

interface HarzhLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  isDark?: boolean;
  className?: string;
}

export const HarzhLogo: React.FC<HarzhLogoProps> = ({
  size = "md",
  showText = true,
  isDark = true,
  className = "",
}) => {
  // Dimensions based on size
  const iconSizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
    xl: "w-14 h-14 text-xl",
  }[size];

  const textSizeClasses = {
    sm: "text-base tracking-tight",
    md: "text-lg tracking-tight",
    lg: "text-2xl tracking-tight",
    xl: "text-3xl tracking-tight",
  }[size];

  const subtextSizeClasses = {
    sm: "text-[8px] tracking-[0.25em]",
    md: "text-[9px] tracking-[0.28em]",
    lg: "text-[10px] tracking-[0.3em]",
    xl: "text-xs tracking-[0.35em]",
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Harzh Geometric 'H' Mark */}
      <div
        className={`${iconSizeClasses} relative rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 ${
          isDark
            ? "bg-gradient-to-br from-[#121629] via-[#0d1020] to-[#080a14] border border-white/20 shadow-[0_0_20px_rgba(129,140,248,0.25)]"
            : "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-700 shadow-md"
        }`}
      >
        {/* Ambient interior glow */}
        <div
          className={`absolute inset-0 opacity-40 bg-gradient-to-tr from-indigo-500/30 via-transparent to-purple-500/30`}
        />

        {/* Bespoke Harzh 'H' Monogram with Cinematic Play Crossbar */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[62%] h-[62%] relative z-10"
        >
          {/* Left Vertical Pillar */}
          <path
            d="M7 6.5C7 5.67157 7.67157 5 8.5 5H10.5C11.3284 5 12 5.67157 12 6.5V25.5C12 26.3284 11.3284 27 10.5 27H8.5C7.67157 27 7 26.3284 7 25.5V6.5Z"
            fill={isDark ? "#FFFFFF" : "#FFFFFF"}
          />
          {/* Right Vertical Pillar */}
          <path
            d="M20 6.5C20 5.67157 20.6716 5 21.5 5H23.5C24.3284 5 25 5.67157 25 6.5V25.5C25 26.3284 24.3284 27 23.5 27H21.5C20.6716 27 20 26.3284 20 25.5V6.5Z"
            fill={isDark ? "#FFFFFF" : "#FFFFFF"}
          />
          {/* Central Connecting Dynamic Crossbar & Fast-Forward Play Prism */}
          <path
            d="M12 13.5L19 16L12 18.5V13.5Z"
            fill="#818CF8"
          />
          <path
            d="M11 15H21V17H11V15Z"
            fill="#818CF8"
            fillOpacity="0.7"
          />
          {/* Subtle Top/Bottom Film Track notches */}
          <circle cx="9.5" cy="8.5" r="0.9" fill="#818CF8" />
          <circle cx="22.5" cy="8.5" r="0.9" fill="#818CF8" />
          <circle cx="9.5" cy="23.5" r="0.9" fill="#818CF8" />
          <circle cx="22.5" cy="23.5" r="0.9" fill="#818CF8" />
        </svg>

        {/* Hover shimmer line */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform pointer-events-none" />
      </div>

      {/* Typography Wordmark */}
      {showText && (
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black font-sans uppercase ${textSizeClasses} leading-none tracking-tight ${
              isDark ? "text-white glow-text" : "text-slate-900"
            }`}
          >
            HARZH
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
        </div>
      )}
    </div>
  );
};
