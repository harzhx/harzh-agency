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
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md transition-all duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto scale-100"
          : "opacity-0 pointer-events-none scale-95"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[800px] h-[460px] rounded-2xl md:rounded-3xl border border-white/15 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] bg-[#111111] text-white flex flex-col">
        {/* Minimalist Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 z-30 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-md"
          aria-label="Close modal"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Pure Snug 3-Column Calendar Card (Zero Top/Bottom Dead Space) */}
        <div className="w-full h-full overflow-hidden">
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

