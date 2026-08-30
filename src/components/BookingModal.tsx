import React, { useState } from "react";
import { ThemeMode } from "../types";
import { X, Flame, CheckCircle2, ShieldCheck, MessageSquare, ArrowRight, Calendar } from "lucide-react";

interface BookingModalProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  theme,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    channelUrl: "",
    subscribers: "50k-250k",
    packageInterest: "YouTube Flagship ($2,200/mo)",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      id="booking-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl rounded-3xl border border-white/20 p-6 sm:p-8 overflow-hidden shadow-2xl bg-[#0c0e17] text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                DIRECT STRATEGY CALL
              </span>
            </div>

            <h3 className="text-2xl font-extrabold mb-1 text-white">
              Schedule Your Channel Audit
            </h3>
            <p className="text-xs sm:text-sm mb-6 text-white/60">
              We'll review your recent uploads, analyze your audience retention dropoffs, and outline an exact high-retention pacing roadmap.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold block mb-1 text-white/80">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1 text-white/80">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@creatorstudio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1 text-white/80">Channel or Portfolio Link</label>
                <input
                  type="text"
                  required
                  placeholder="https://youtube.com/@yourchannel or TikTok/IG"
                  value={formData.channelUrl}
                  onChange={(e) => setFormData({ ...formData, channelUrl: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold block mb-1 text-white/80">Subscriber Scale</label>
                  <select
                    value={formData.subscribers}
                    onChange={(e) => setFormData({ ...formData, subscribers: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0d101d] text-white focus:outline-none"
                  >
                    <option value="10k-50k">10K - 50K Subscribers</option>
                    <option value="50k-250k">50K - 250K Subscribers</option>
                    <option value="250k-1M">250K - 1M Subscribers</option>
                    <option value="1M+">1M+ Subscribers</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1 text-white/80">Package Interest</label>
                  <select
                    value={formData.packageInterest}
                    onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0d101d] text-white focus:outline-none"
                  >
                    <option value="YouTube Flagship ($2,200/mo)">YouTube Flagship ($2,200/mo)</option>
                    <option value="Short-Form Velocity ($1,200/mo)">Short-Form Velocity ($1,200/mo)</option>
                    <option value="Full Growth Partner ($3,500/mo)">Full Growth Partner ($3,500/mo)</option>
                    <option value="Custom Scope">Custom Scope / Consultation</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full font-bold text-xs tracking-wider uppercase bg-white text-black hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                >
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Confirm Strategy Call Request</span>
                </button>
              </div>

              <p className="text-[11px] text-white/50 text-center flex items-center justify-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Free • No obligation • 24-hour turnaround</span>
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Call Request Received!</h3>
            <p className="text-sm text-white/70 max-w-md mx-auto">
              Thanks <span className="font-semibold text-white">{formData.name}</span>! Our lead strategist will review <span className="text-emerald-400">{formData.channelUrl}</span> and reply with your audit calendar invite within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold transition-all hover:scale-105"
            >
              Return to Agency Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
