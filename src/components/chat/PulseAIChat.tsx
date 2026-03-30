"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, X, MessageSquare } from "lucide-react";
import { initialChatMessages, type ChatMessage } from "@/lib/mock-data";
import { generateResponse } from "@/lib/chat-engine";

export default function PulseAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateResponse(userMsg.content);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle button for mobile */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#f97316] flex items-center justify-center shadow-lg shadow-purple-500/20"
      >
        {isOpen ? <X className="w-5 h-5 text-white" /> : <MessageSquare className="w-5 h-5 text-white" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="chat-panel w-80 xl:w-[340px] h-screen fixed right-0 top-0 z-20 flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#2e2a40]/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Pulse AI</h3>
                  <p className="text-[11px] text-[#6b6580]">Live trend intelligence</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={`max-w-[90%] px-4 py-3 text-[13px] leading-relaxed ${
                      msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="chat-bubble-ai px-5 py-3 flex gap-1.5 items-center">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-[#2e2a40]/50">
              <div className="flex items-center gap-2 bg-[#1a1825] rounded-xl px-3 py-2 border border-[#2e2a40]">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Pulse AI..."
                  className="flex-1 bg-transparent text-sm text-[#e8e6f0] placeholder-[#6b6580] outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#f97316] flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
