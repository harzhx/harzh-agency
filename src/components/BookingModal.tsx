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
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl transition-all duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto scale-100"
          : "opacity-0 pointer-events-none scale-95"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Responsive Calendar & Form Card (Smooth scrolling for Step 2 Form & Confirm Button) */}
      <div className="w-full max-w-[850px] h-[90vh] max-h-[640px] rounded-2xl md:rounded-3xl border border-white/15 overflow-y-auto overflow-x-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-[#111111]">
        <Cal
          calLink="harzh/15min"
          style={{ width: "100%", height: "100%", minHeight: "560px", overflow: "auto" }}
          config={{ layout: "month_view", theme: "dark" }}
        />
      </div>
    </div>
  );
};

