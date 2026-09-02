import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

export const PixelMascot: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div
      ref={ref}
      className="flex flex-col items-end select-none pointer-events-auto group cursor-pointer"
    >
      {/* Speech Bubble — Smooth & Sweet Pop-In */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.85, y: 10 }
        }
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 16,
          delay: 0.2,
        }}
        className="relative mb-2 bg-[#090c1b]/95 border-2 border-indigo-400 px-3.5 py-1.5 rounded-xl shadow-[0_0_22px_rgba(129,140,248,0.55)] backdrop-blur-md z-30"
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          className="flex items-center gap-1.5 font-mono text-[10.5px] sm:text-xs font-black tracking-wide text-white whitespace-nowrap"
        >
          <span className="text-amber-400">⚡</span>
          <span>This is how we do it!</span>
          <span className="hidden sm:inline-block text-indigo-400 font-bold group-hover:translate-x-1 transition-transform">→</span>
          <span className="inline-block sm:hidden text-indigo-400 font-bold group-hover:translate-y-1 transition-transform">↓</span>
        </motion.div>

        {/* Downward Pointer Tail */}
        <div className="absolute -bottom-2 right-7 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-indigo-400" />
      </motion.div>

      {/* Mascot Character — Desktop: Cheerful Spring Pop / Mobile: Gentle Sweet Rise */}
      <motion.div
        initial={{ opacity: 0, y: 55, scale: 0.88 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 55, scale: 0.88 }
        }
        transition={{
          type: "spring",
          stiffness: 160,
          damping: 14,
          mass: 0.8,
          delay: 0.05,
        }}
        className="relative w-20 h-24 sm:w-24 sm:h-28 z-10 filter drop-shadow-[0_8px_22px_rgba(99,102,241,0.65)] translate-y-3"
      >
        {/* DESKTOP SVG PIXEL ART (Pointing Right →) */}
        <svg
          viewBox="0 0 44 42"
          className="hidden sm:block w-full h-full"
          style={{ shapeRendering: "crispEdges" }}
        >
          {/* Headphones Arch & Glowing Cat Ears */}
          <rect x="14" y="2" width="16" height="3" fill="#1E1B4B" />
          <rect x="10" y="4" width="4" height="6" fill="#312E81" />
          <rect x="30" y="4" width="4" height="6" fill="#312E81" />
          <rect x="12" y="1" width="4" height="3" fill="#818CF8" />
          <rect x="13" y="2" width="2" height="2" fill="#38BDF8" />
          <rect x="28" y="1" width="4" height="3" fill="#818CF8" />
          <rect x="29" y="2" width="2" height="2" fill="#38BDF8" />

          {/* Cyan Glowing Earcups */}
          <rect x="8" y="11" width="4" height="9" fill="#38BDF8" />
          <rect x="9" y="13" width="2" height="5" fill="#FFFFFF" />
          <rect x="32" y="11" width="4" height="9" fill="#38BDF8" />
          <rect x="33" y="13" width="2" height="5" fill="#FFFFFF" />

          {/* Hair Base */}
          <rect x="12" y="5" width="20" height="17" fill="#4338CA" />
          <rect x="10" y="9" width="24" height="13" fill="#4F46E5" />
          <rect x="8" y="13" width="28" height="10" fill="#6366F1" />

          {/* Twin Tails */}
          <rect x="4" y="15" width="5" height="16" fill="#4338CA" />
          <rect x="2" y="21" width="3" height="12" fill="#3730A3" />
          <rect x="5" y="13" width="3" height="3" fill="#EF4444" />

          <rect x="35" y="15" width="5" height="16" fill="#4338CA" />
          <rect x="39" y="21" width="3" height="12" fill="#3730A3" />
          <rect x="36" y="13" width="3" height="3" fill="#EF4444" />

          {/* Face Skin */}
          <rect x="12" y="9" width="20" height="16" fill="#FFDFC4" />

          {/* Front Bangs */}
          <rect x="12" y="5" width="20" height="5" fill="#6366F1" />
          <rect x="10" y="7" width="4" height="6" fill="#4F46E5" />
          <rect x="30" y="7" width="4" height="6" fill="#4F46E5" />
          <rect x="18" y="7" width="4" height="5" fill="#4338CA" />
          <rect x="24" y="7" width="3" height="4" fill="#4338CA" />

          {/* Sparkly Anime Eyes */}
          <rect x="14" y="14" width="4" height="5" fill="#1E1B4B" />
          <rect x="14" y="14" width="3" height="3" fill="#818CF8" />
          <rect x="15" y="15" width="2" height="2" fill="#FFFFFF" />

          <rect x="26" y="14" width="4" height="5" fill="#1E1B4B" />
          <rect x="26" y="14" width="3" height="3" fill="#818CF8" />
          <rect x="27" y="15" width="2" height="2" fill="#FFFFFF" />

          {/* Cute Anime Blush */}
          <rect x="12" y="19" width="4" height="2" fill="#FB7185" opacity="0.85" />
          <rect x="28" y="19" width="4" height="2" fill="#FB7185" opacity="0.85" />

          {/* Smile */}
          <rect x="20" y="20" width="4" height="2" fill="#BE123C" />
          <rect x="21" y="21" width="2" height="1" fill="#FDA4AF" />

          {/* Torso / Sailor Uniform */}
          <rect x="13" y="25" width="18" height="13" fill="#FFFFFF" />
          <rect x="11" y="25" width="4" height="7" fill="#1E1B4B" />
          <rect x="29" y="25" width="4" height="7" fill="#1E1B4B" />
          {/* Crimson Ribbon */}
          <rect x="20" y="26" width="4" height="3" fill="#EF4444" />
          <rect x="19" y="29" width="6" height="2" fill="#DC2626" />
          <rect x="18" y="31" width="3" height="3" fill="#B91C1C" />
          <rect x="23" y="31" width="3" height="3" fill="#B91C1C" />

          {/* Pointing Right Hand (→) */}
          <rect x="30" y="26" width="5" height="4" fill="#1E1B4B" />
          <rect x="35" y="25" width="4" height="4" fill="#FFDFC4" />
          <rect x="39" y="24" width="4" height="3" fill="#FFDFC4" />
          <rect x="42" y="24" width="2" height="2" fill="#FBBF24" />

          {/* Left Hand */}
          <rect x="9" y="26" width="4" height="4" fill="#1E1B4B" />
          <rect x="8" y="29" width="3" height="4" fill="#FFDFC4" />

          {/* Clean Waistline Band */}
          <rect x="12" y="38" width="20" height="4" fill="#1E1B4B" />
          <rect x="14" y="38" width="16" height="2" fill="#312E81" />
        </svg>

        {/* MOBILE SVG PIXEL ART (Pointing Downwards ↓) */}
        <svg
          viewBox="0 0 44 42"
          className="block sm:hidden w-full h-full"
          style={{ shapeRendering: "crispEdges" }}
        >
          {/* Headphones Arch & Cat Ears */}
          <rect x="14" y="2" width="16" height="3" fill="#1E1B4B" />
          <rect x="10" y="4" width="4" height="6" fill="#312E81" />
          <rect x="30" y="4" width="4" height="6" fill="#312E81" />
          <rect x="12" y="1" width="4" height="3" fill="#818CF8" />
          <rect x="13" y="2" width="2" height="2" fill="#38BDF8" />
          <rect x="28" y="1" width="4" height="3" fill="#818CF8" />
          <rect x="29" y="2" width="2" height="2" fill="#38BDF8" />

          {/* Cyan Earcups */}
          <rect x="8" y="11" width="4" height="9" fill="#38BDF8" />
          <rect x="9" y="13" width="2" height="5" fill="#FFFFFF" />
          <rect x="32" y="11" width="4" height="9" fill="#38BDF8" />
          <rect x="33" y="13" width="2" height="5" fill="#FFFFFF" />

          {/* Hair Base */}
          <rect x="12" y="5" width="20" height="17" fill="#4338CA" />
          <rect x="10" y="9" width="24" height="13" fill="#4F46E5" />
          <rect x="8" y="13" width="28" height="10" fill="#6366F1" />

          {/* Twin Tails */}
          <rect x="4" y="15" width="5" height="16" fill="#4338CA" />
          <rect x="2" y="21" width="3" height="12" fill="#3730A3" />
          <rect x="5" y="13" width="3" height="3" fill="#EF4444" />

          <rect x="35" y="15" width="5" height="16" fill="#4338CA" />
          <rect x="39" y="21" width="3" height="12" fill="#3730A3" />
          <rect x="36" y="13" width="3" height="3" fill="#EF4444" />

          {/* Face Skin */}
          <rect x="12" y="9" width="20" height="16" fill="#FFDFC4" />

          {/* Bangs */}
          <rect x="12" y="5" width="20" height="5" fill="#6366F1" />
          <rect x="10" y="7" width="4" height="6" fill="#4F46E5" />
          <rect x="30" y="7" width="4" height="6" fill="#4F46E5" />
          <rect x="18" y="7" width="4" height="5" fill="#4338CA" />
          <rect x="24" y="7" width="3" height="4" fill="#4338CA" />

          {/* Eyes */}
          <rect x="14" y="14" width="4" height="5" fill="#1E1B4B" />
          <rect x="14" y="14" width="3" height="3" fill="#818CF8" />
          <rect x="15" y="15" width="2" height="2" fill="#FFFFFF" />

          <rect x="26" y="14" width="4" height="5" fill="#1E1B4B" />
          <rect x="26" y="14" width="3" height="3" fill="#818CF8" />
          <rect x="27" y="15" width="2" height="2" fill="#FFFFFF" />

          {/* Blush & Smile */}
          <rect x="12" y="19" width="4" height="2" fill="#FB7185" opacity="0.85" />
          <rect x="28" y="19" width="4" height="2" fill="#FB7185" opacity="0.85" />
          <rect x="20" y="20" width="4" height="2" fill="#BE123C" />
          <rect x="21" y="21" width="2" height="1" fill="#FDA4AF" />

          {/* Torso */}
          <rect x="13" y="25" width="18" height="13" fill="#FFFFFF" />
          <rect x="11" y="25" width="4" height="7" fill="#1E1B4B" />
          <rect x="29" y="25" width="4" height="7" fill="#1E1B4B" />
          <rect x="20" y="26" width="4" height="3" fill="#EF4444" />
          <rect x="19" y="29" width="6" height="2" fill="#DC2626" />
          <rect x="18" y="31" width="3" height="3" fill="#B91C1C" />
          <rect x="23" y="31" width="3" height="3" fill="#B91C1C" />

          {/* Pointing Down Hand (↓) */}
          <rect x="28" y="28" width="5" height="4" fill="#1E1B4B" />
          <rect x="29" y="32" width="4" height="4" fill="#FFDFC4" />
          <rect x="30" y="36" width="3" height="4" fill="#FFDFC4" />
          <rect x="30" y="40" width="3" height="2" fill="#FBBF24" />

          {/* Left Hand */}
          <rect x="9" y="26" width="4" height="4" fill="#1E1B4B" />
          <rect x="8" y="29" width="3" height="4" fill="#FFDFC4" />

          {/* Clean Waistline Band */}
          <rect x="12" y="38" width="20" height="4" fill="#1E1B4B" />
          <rect x="14" y="38" width="16" height="2" fill="#312E81" />
        </svg>

        {/* Subtle Star Sparkle */}
        <motion.div
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute -top-2 -right-1 text-amber-300 text-xs font-mono select-none"
        >
          ✦
        </motion.div>
      </motion.div>
    </div>
  );
};
