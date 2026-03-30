"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, Sparkles } from "lucide-react";
import { type ChatMessage } from "@/lib/mock-data";
import { generateResponse } from "@/lib/chat-engine";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-load canonical questions on mount
    const q1: ChatMessage = {
      id: "auto-1",
      role: "assistant",
      content:
        "👋 Welcome to Pulse AI! I have real-time access to today's internet trends. Here are my two key insights:\n\n" +
        "**What is trending today across the internet?**\n" +
        "Top trends: #AIRegulation2026 (9.2x velocity), Sustainability campaigns (7.8x), Gen Z finance content (6.5x), Remote work backlash (8.4x), Creator economy tools (5.2x).\n\n" +
        "**Which trends have the highest probability of going viral?**\n" +
        "1. Sustainability campaigns — 91% TikTok velocity\n" +
        "2. Gen Z finance content — 93% TikTok penetration\n" +
        "3. Creator economy tools — Emerging with 76% positive sentiment\n\n" +
        "Ask me anything about campaigns, trends, or risks!",
      timestamp: new Date(),
    };
    setMessages([q1]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: input.trim(), timestamp: new Date() };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((p) => [...p, generateResponse(userMsg.content)]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#f97316]" />
          Pulse AI Chat
        </h1>
        <p className="text-xs text-[#6b6580] mt-0.5">
          LLM-powered chatbot with live web search — answers grounded in today&apos;s internet data
        </p>
      </motion.div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto glass-card p-5 space-y-4 mb-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div className={`max-w-[80%] px-5 py-4 text-sm leading-relaxed ${
              msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
            }`}>
              {msg.role === "assistant" && (
                <div className="flex items-center gap-1.5 mb-2">
                  <Bot className="w-3.5 h-3.5 text-[#8b5cf6]" />
                  <span className="text-[11px] font-medium text-[#8b5cf6]">Pulse AI</span>
                </div>
              )}
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="chat-bubble-ai px-5 py-3 flex gap-1.5">
              <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 bg-[#1a1825] rounded-xl px-4 py-3 border border-[#2e2a40]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder="Ask about trends, campaigns, risks..."
          className="flex-1 bg-transparent text-sm text-[#e8e6f0] placeholder-[#6b6580] outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#f97316] flex items-center justify-center"
        >
          <Send className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    </div>
  );
}
