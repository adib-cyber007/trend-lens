"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle, CheckCircle2, Eye, Filter } from "lucide-react";
import { trendTopics } from "@/lib/mock-data";

interface RiskAlert {
  id: string;
  level: "critical" | "warning" | "info";
  topic: string;
  message: string;
  time: string;
  action: string;
}

const riskAlerts: RiskAlert[] = [
  {
    id: "r1",
    level: "critical",
    topic: "#AIRegulation2026",
    message: "Sentiment has shifted to 61% negative in the last 4 hours. Brands engaging this topic are receiving backlash.",
    time: "12 min ago",
    action: "Pause any planned content touching AI policy. Monitor for 48h.",
  },
  {
    id: "r2",
    level: "critical",
    topic: "Remote work backlash",
    message: "Viral momentum accelerating (8.4x velocity) but 60% negative sentiment. High risk of brand association damage.",
    time: "1h ago",
    action: "Do NOT engage. If already posted, consider delisting content.",
  },
  {
    id: "r3",
    level: "warning",
    topic: "Gen Z finance content",
    message: "Regulatory bodies flagging some finance creators. Compliance risk for fintech brands.",
    time: "3h ago",
    action: "Ensure all content includes required disclaimers. Review compliance.",
  },
  {
    id: "r4",
    level: "warning",
    topic: "Retro gaming nostalgia",
    message: "Copyright concerns emerging around retro game IP usage in branded content.",
    time: "5h ago",
    action: "Avoid using specific game IPs without licensing.",
  },
  {
    id: "r5",
    level: "info",
    topic: "Sustainability campaigns",
    message: "Minor greenwashing accusations surfacing on Reddit. Currently <5% of conversation.",
    time: "6h ago",
    action: "Ensure all eco-claims are substantiated. Prepare response if escalates.",
  },
  {
    id: "r6",
    level: "info",
    topic: "Creator economy tools",
    message: "Platform policy changes may affect creator monetization. Watch for updates.",
    time: "8h ago",
    action: "Monitor platform announcements. No action needed yet.",
  },
];

export default function RiskAlertsPage() {
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const filteredAlerts = riskAlerts.filter(
    (a) => !dismissed.has(a.id) && (filter === "all" || a.level === filter)
  );

  const levelConfig = {
    critical: { bg: "from-red-500/10 to-transparent", border: "border-red-500/30", icon: AlertTriangle, iconColor: "text-red-400", label: "Critical" },
    warning: { bg: "from-yellow-500/10 to-transparent", border: "border-yellow-500/30", icon: AlertTriangle, iconColor: "text-yellow-400", label: "Warning" },
    info: { bg: "from-blue-500/10 to-transparent", border: "border-blue-500/30", icon: Eye, iconColor: "text-blue-400", label: "Info" },
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-400" />
          Risk Alerts
        </h1>
        <p className="text-xs text-[#6b6580] mt-0.5">
          Real-time risk monitoring for brand safety and campaign sentiment
        </p>
      </motion.div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-[#6b6580]" />
        {(["all", "critical", "warning", "info"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f
                ? "bg-gradient-to-r from-[#8b5cf6]/20 to-[#f97316]/15 text-white"
                : "text-[#6b6580] bg-[#1a1825] border border-[#2e2a40] hover:border-[#8b5cf6]/20"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== "all" && ` (${riskAlerts.filter((a) => a.level === f && !dismissed.has(a.id)).length})`}
          </button>
        ))}
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        {filteredAlerts.map((alert, i) => {
          const config = levelConfig[alert.level];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card p-5 border-l-4 ${config.border} bg-gradient-to-r ${config.bg}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <config.icon className={`w-4 h-4 ${config.iconColor}`} />
                  <span className={`text-xs font-semibold ${config.iconColor}`}>{config.label}</span>
                  <span className="text-xs text-[#6b6580]">•</span>
                  <span className="text-xs text-[#6b6580]">{alert.time}</span>
                </div>
                <button
                  onClick={() => setDismissed((prev) => new Set([...prev, alert.id]))}
                  className="text-[11px] text-[#6b6580] hover:text-[#9b97b0] transition-colors"
                >
                  Dismiss
                </button>
              </div>
              <h3 className="text-sm font-semibold mb-1">{alert.topic}</h3>
              <p className="text-xs text-[#9b97b0] leading-relaxed mb-3">{alert.message}</p>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-[#1a1825]/60 border border-[#2e2a40]/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-xs text-emerald-300">{alert.action}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="glass-card p-10 text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <p className="text-sm text-[#9b97b0]">No alerts matching your filter. All clear!</p>
        </div>
      )}
    </div>
  );
}
