"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Radar,
  TrendingUp,
  FlaskConical,
  Users,
  Upload,
  Rss,
  Bot,
  ShieldAlert,
  Zap,
} from "lucide-react";

const sections = [
  {
    label: "ANALYTICS",
    items: [
      { name: "Trend Radar", icon: Radar, href: "/" },
      { name: "Viral Forecast", icon: TrendingUp, href: "/predictions" },
      { name: "Campaign Sim", icon: FlaskConical, href: "/campaign" },
      { name: "Audience Intel", icon: Users, href: "/audience" },
    ],
  },
  {
    label: "DATA",
    items: [
      { name: "Upload CSV", icon: Upload, href: "/data-upload" },
      { name: "Raw Feed", icon: Rss, href: "/raw-feed" },
    ],
  },
  {
    label: "AI",
    items: [
      { name: "Pulse AI Chat", icon: Bot, href: "/chat" },
      { name: "Risk Alerts", icon: ShieldAlert, href: "/risk-alerts" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="sidebar w-60 h-screen fixed left-0 top-0 z-30 flex flex-col py-6 overflow-y-auto">
      {/* Logo */}
      <div className="px-5 mb-8 flex items-center gap-2.5">
        <div className="relative">
          <Zap className="w-6 h-6 text-[#f97316]" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#1a1825]" />
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-[#f97316] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
          Digital Pulse
        </span>
      </div>

      {/* Navigation Sections */}
      {sections.map((section, sIdx) => (
        <div key={section.label} className={sIdx > 0 ? "mt-5" : ""}>
          <span className="px-5 text-[11px] font-semibold tracking-widest text-[#6b6580] uppercase">
            {section.label}
          </span>
          <div className="mt-2 px-3 flex flex-col gap-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <motion.button
                  key={item.name}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push(item.href)}
                  className={`sidebar-item ${isActive ? "active" : ""}`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Bottom glow decoration */}
      <div className="mt-auto px-5 pb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent" />
        <p className="text-[11px] text-[#4a4660] mt-3 text-center">
          © 2026 Digital Pulse
        </p>
      </div>
    </aside>
  );
}
