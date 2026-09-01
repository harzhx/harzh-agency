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

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
      <div className="relative w-full max-w-[880px] h-[88vh] max-h-[660px] rounded-3xl border border-white/20 p-4 sm:p-5 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] bg-[#0c0e17] text-white flex flex-col ring-1 ring-white/10">
        {/* Header Strip */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.08] shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                DIRECT STRATEGY CALL
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Schedule Your Free 15-Min Retention Audit
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Embedded Cal.com Dark-Mode Scheduler (0ms Preloaded) */}
        <div className="flex-1 w-full h-full rounded-2xl overflow-hidden bg-black/40 border border-white/5 relative">
          <Cal
            calLink="harzh/15min"
            style={{ width: "100%", height: "100%", overflow: "auto" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>

        {/* Footer Guarantee */}
        <div className="pt-2.5 flex items-center justify-between gap-2 shrink-0 text-center sm:text-left">
          <p className="text-[11px] text-white/50 flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free • No obligation • Instant Google Meet Confirmation</span>
          </p>
          <div className="hidden sm:block text-[11px] text-white/40 font-mono">
            Harzh Growth Systems
          </div>
        </div>
      </div>
    </div>
  );
};

