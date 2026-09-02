import React, { useEffect } from "react";
import { ThemeMode } from "../types";
import { X } from "lucide-react";
import { BookingWidget } from "./BookingWidget";

interface BookingModalProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="booking-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[780px] rounded-3xl overflow-hidden max-h-[92vh] flex flex-col shadow-[0_25px_90px_rgba(0,0,0,0.98)]">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 z-50 p-2 rounded-full bg-white/[0.08] hover:bg-white/20 text-white/70 hover:text-white transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Reusable Booking Widget with Animated Clock */}
        <BookingWidget isModal={true} onClose={onClose} />
      </div>
    </div>
  );
};
