import React, { useEffect } from "react";
import { ThemeMode } from "../types";
import { X, ShieldCheck, ExternalLink } from "lucide-react";
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

  if (!isOpen) return null;

  return (
    <div
      id="booking-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl h-[90vh] sm:h-[85vh] max-h-[720px] rounded-3xl border border-white/20 p-4 sm:p-5 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-[#0c0e17] text-white flex flex-col ring-1 ring-white/10">
        {/* Header Strip */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.08] shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                DIRECT STRATEGY CALL
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Schedule Your Free 15-Min Retention Audit
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://cal.com/harzh/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white/70 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 transition-colors"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Cal.com Dark-Mode Scheduler */}
        <div className="flex-1 w-full h-full rounded-2xl overflow-hidden bg-black/40 border border-white/5 relative">
          <Cal
            calLink="harzh/15min"
            style={{ width: "100%", height: "100%", overflow: "auto" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>

        {/* Footer Guarantee */}
        <div className="pt-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 text-center sm:text-left">
          <p className="text-[11px] text-white/50 flex items-center justify-center gap-1.5 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free • No obligation • Instant Google Meet Confirmation</span>
          </p>
          <div className="text-[11px] text-white/40 font-mono">
            Harzh Growth Systems
          </div>
        </div>
      </div>
    </div>
  );
};

