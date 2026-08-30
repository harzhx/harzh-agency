import React, { useState, useRef, useEffect } from "react";
import { ThemeMode, ChatMessage } from "../types";
import { AI_PROMPT_TEMPLATES } from "../data/agencyData";
import { BorderBeam } from "./ui/BorderBeam";
import { HarzhLogo } from "./HarzhLogo";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Copy,
  Check,
  Flame,
  Lightbulb,
  Zap,
  Wand2,
  RefreshCw,
} from "lucide-react";

interface AiStrategistChatProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const AiStrategistChat: React.FC<AiStrategistChatProps> = ({
  theme,
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-msg",
      role: "assistant",
      content: `👋 **Hey Creator! I'm Harzh AI**, your dedicated Chief Content Strategist.
      
Ask me for:
- ⚡ **5 Viral Hooks** for your next video concept
- 📈 **Pacing & Retention Breakdown** to avoid the 30-second dropoff
- 🎯 **High-CTR Title & Thumbnail Concepts**
- 💼 **Tailored Agency Packages** for your channel scale

What topic or video idea are we breaking down today?`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [niche, setNiche] = useState("Tech & AI");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isDark = theme === "dark";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          creatorNiche: niche,
        }),
      });

      const data = await res.json();
      const botReply = data.reply || "Strategy synthesized successfully.";

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          content: "⚠️ Strategist engine is synthesizing advice offline. Here is our core advice: Focus heavily on the first 3 seconds and eliminate intro fluff!",
          timestamp: "Now",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      id="ai-strategist-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        className={`relative w-full max-w-2xl h-[640px] max-h-[90vh] rounded-3xl border flex flex-col overflow-hidden shadow-2xl ${
          isDark
            ? "glass-card text-white shadow-black/90 border-white/20"
            : "bg-white border-slate-300 text-slate-900 shadow-2xl"
        }`}
      >
        <BorderBeam size={200} duration={8} colorFrom="#ffffff" colorTo="#818cf8" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HarzhLogo size="md" showText={false} isDark={isDark} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base leading-none">Harzh AI Strategist</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
              <p className="text-[11px] text-white/50 font-mono mt-0.5">
                Video Pacing, Viral Hooks & Channel Audits
              </p>
            </div>
          </div>

          {/* Niche selector & Close button */}
          <div className="flex items-center gap-2">
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                isDark ? "bg-black border-white/20 text-white" : "bg-slate-100 border-slate-300 text-slate-800"
              }`}
            >
              <option value="Tech & AI">Tech & AI</option>
              <option value="Finance & Wealth">Finance & Wealth</option>
              <option value="Lifestyle & Vlog">Lifestyle & Vlog</option>
              <option value="Gaming & Esports">Gaming & Esports</option>
              <option value="Fitness & Health">Fitness & Health</option>
              <option value="SaaS & Founders">SaaS & Founders</option>
            </select>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isBot = msg.role === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`relative max-w-[85%] group`}>
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isBot
                        ? isDark
                          ? "bg-white/[0.06] border border-white/10 text-white/90"
                          : "bg-slate-100 border border-slate-200 text-slate-800"
                        : "bg-white text-black font-medium shadow-md"
                    }`}
                  >
                    {/* Render message with line breaks and markdown format */}
                    <div className="whitespace-pre-line space-y-1 font-normal">
                      {msg.content}
                    </div>
                  </div>

                  {/* Copy & Action footer on bot message */}
                  {isBot && (
                    <div className="flex items-center gap-2 mt-1 px-1">
                      <span className="text-[10px] text-white/40 font-mono">{msg.timestamp}</span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="text-[11px] text-white/40 hover:text-white transition-colors flex items-center gap-1"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/30">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-xs text-white/70 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Synthesizing retention frameworks...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompt Chips */}
        <div className="px-4 py-2 border-t border-white/[0.08] dark:border-white/[0.08] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {AI_PROMPT_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleSendMessage(tmpl.prompt)}
              className={`shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full border transition-all ${
                isDark
                  ? "glass-card text-white/70 hover:text-white hover:bg-white/10"
                  : "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              {tmpl.title}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 border-t border-white/10 dark:border-white/10 bg-black/40 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask about hook ideas, pacing, or channel strategy..."
            className={`flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border focus:outline-none transition-colors ${
              isDark
                ? "bg-white/[0.06] border-white/15 text-white placeholder:text-white/40 focus:border-white/40"
                : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600"
            }`}
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || loading}
            className={`w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40 transition-all hover:scale-105 active:scale-95 shadow-md ${
              isDark ? "bg-white text-black font-bold" : "bg-slate-900 text-white"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
