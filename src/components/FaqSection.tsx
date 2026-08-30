import React, { useState } from "react";
import { ThemeMode } from "../types";
import { FAQS_DATA } from "../data/agencyData";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

interface FaqSectionProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  theme,
  onOpenBooking,
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-white/[0.04] border border-white/[0.08] text-indigo-400 mb-4">
            <span>05 // COMMON QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Frequently Asked Questions.
          </h2>
          <p className="text-sm sm:text-base text-white/60">
            Everything you need to know about our workflow, communication, and turnaround standards.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-14">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/50 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/[0.04] pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="text-center p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Have a specific question about your channel?</h4>
            <p className="text-xs text-white/50">Book a quick 15-minute consultation with our lead strategist.</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-full text-xs font-bold bg-white text-black hover:bg-white/90 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Talk With Us Directly</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
