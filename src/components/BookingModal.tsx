import React from "react";
import { ThemeMode } from "../types";
import { X, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

interface BookingModalProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="booking-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl h-[92vh] sm:h-[88vh] rounded-3xl border border-white/20 p-4 sm:p-6 overflow-hidden shadow-2xl bg-[#090b11] text-white flex flex-col">
        {/* Header Strip */}
        <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/[0.08] shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                DIRECT STRATEGY CALL
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Schedule Your Free 15-Min Retention Audit
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://cal.com/harzh/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white/70 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 transition-colors"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
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
        <div className="flex-1 w-full h-full rounded-2xl overflow-hidden bg-black/50 border border-white/10 relative">
          <iframe
            src="https://cal.com/harzh/15min?theme=dark"
            title="Schedule 15-Min Retention Audit"
            className="w-full h-full border-0 rounded-2xl"
            allow="camera; microphone; autoplay; fullscreen"
          />
        </div>

        {/* Footer Guarantee */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 text-center sm:text-left">
          <p className="text-[11px] text-white/50 flex items-center justify-center gap-1.5 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free • No obligation • Instant Google Meet Confirmation</span>
          </p>
          <div className="text-[11px] text-white/40 font-mono">
            Powered by Harzh Growth Systems
          </div>
        </div>
      </div>
    </div>
  );
};

