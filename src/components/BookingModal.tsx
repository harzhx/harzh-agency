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
      <div className="relative w-full max-w-[760px] rounded-3xl overflow-hidden max-h-[92vh] flex flex-col shadow-[0_25px_90px_rgba(0,0,0,0.98)]">
        {/* Reusable Minimalist Booking Widget */}
        <BookingWidget isModal={true} onClose={onClose} />
      </div>
    </div>
  );
};
