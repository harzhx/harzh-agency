import React, { useEffect } from "react";
import { ThemeMode } from "../types";
import { X, ShieldCheck } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";

interface BookingModalProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
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
      } catch (err) {
        console.error("Cal.com init error:", err);
      }
    })();
  }, []);

  return (
    <div
      id="booking-modal"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl transition-all duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto scale-100"
          : "opacity-0 pointer-events-none scale-95"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[810px] flex flex-col">
        {/* Floating Top Header / Close Strip (Outside the card - Zero overlap) */}
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              15-Min Strategy Session
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-medium backdrop-blur-md border border-white/10 transition-all shadow-lg"
            aria-label="Close modal"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pristine 3-Column Calendar Card (Snug 475px Height - Zero Dead Space) */}
        <div className="w-full h-[475px] rounded-3xl border border-white/15 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-[#111111]">
          <Cal
            calLink="harzh/15min"
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>
      </div>
    </div>
  );
};

