import React, { useEffect } from "react";
import { ThemeMode } from "../types";
import { X } from "lucide-react";
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md transition-all duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto scale-100"
          : "opacity-0 pointer-events-none scale-95"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[760px] h-[510px] rounded-3xl border border-white/15 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] bg-[#101010] text-white flex flex-col">
        {/* Sleek Minimal Header Bar */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-black/60 border-b border-white/[0.08] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white tracking-wide">
              15-MIN RETENTION AUDIT
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pure Edge-to-Edge Cal.com Embed (No Bottom Gap) */}
        <div className="flex-1 w-full h-full overflow-hidden bg-[#101010]">
          <Cal
            calLink="harzh/15min"
            style={{ width: "100%", height: "100%", overflow: "auto" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>
      </div>
    </div>
  );
};

