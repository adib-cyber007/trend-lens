"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Zap,
  ShieldCheck,
  Activity,
  Flame,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TrendExpiryCountdown from "@/components/ui/TrendExpiryCountdown";
import { trendTopics, overviewStats, campaignPrediction } from "@/lib/mock-data";

const badgeClass: Record<string, string> = {
  Rising: "badge-rising",
  Hot: "badge-hot",
  Stable: "badge-stable",
  Declining: "badge-declining",
  Emerging: "badge-emerging",
};

type Tab = "current" | "viral" | "prediction";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("current");
  const [expandedTrend, setExpandedTrend] = useState<string | null>(null);

  const viralCandidates = trendTopics
    .filter((t) => t.badge === "Rising" || t.badge === "Hot")
    .sort((a, b) => b.velocity - a.velocity);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-lg font-bold text-[#e8e6f0]">LIVE OVERVIEW</h1>
          <p className="text-xs text-[#6b6580] mt-0.5">
            TODAY, {new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </motion.div>

      {/* ─── Stat Cards ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Trending topics",
            value: 2841,
            suffix: "",
            sub: overviewStats.trendingTopics.change + " vs yesterday",
            icon: TrendingUp,
            gradient: "stat-gradient-1",
            color: "#f97316",
          },
          {
            label: "Viral probability",
            value: 73,
            suffix: "%",
            sub: overviewStats.viralProbability.label,
            icon: Zap,
            gradient: "stat-gradient-2",
            color: "#8b5cf6",
          },
          {
            label: "Risk score",
            value: 18,
            suffix: "/10",
            sub: overviewStats.riskScore.label,
            icon: ShieldCheck,
            gradient: "stat-gradient-3",
            color: "#10b981",
          },
          {
            label: "Trend velocity",
            value: 9.2,
            suffix: "x",
            sub: overviewStats.trendVelocity.label,
            icon: Activity,
            gradient: "stat-gradient-4",
            color: "#06b6d4",
            decimals: 1,
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card ${stat.gradient} p-5`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#9b97b0] uppercase tracking-wide">
                {stat.label}
              </span>
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <div className="text-2xl font-bold" style={{ color: stat.color }}>
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals || 0}
              />
            </div>
            <p className="text-[11px] text-[#6b6580] mt-1">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* ─── Tab Navigation ────────────────────────────────────── */}
      <div className="flex items-center gap-1 bg-[#1a1825]/60 rounded-xl p-1 w-fit">
        {(
          [
            { key: "current", label: "Current trends" },
            { key: "viral", label: "Viral candidates" },
            { key: "prediction", label: "Prediction engine" },
          ] as { key: Tab; label: string }[]
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-[#8b5cf6]/20 to-[#f97316]/15 text-white"
                : "text-[#6b6580] hover:text-[#9b97b0]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Content by Tab ────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === "current" && (
          <motion.div
            key="current"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {trendTopics.map((trend, i) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-5 cursor-pointer"
                onClick={() =>
                  setExpandedTrend(expandedTrend === trend.id ? null : trend.id)
                }
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-[#e8e6f0]">
                        {trend.name}
                      </h3>
                      <span
                        className={`${badgeClass[trend.badge]} px-2 py-0.5 rounded-full text-[10px] font-semibold`}
                      >
                        {trend.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#9b97b0] leading-relaxed">
                      {trend.description}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6b6580] ml-2 shrink-0 transition-transform ${
                      expandedTrend === trend.id ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Platform Bars */}
                <div className="space-y-2 mt-3">
                  {trend.platforms.map((p) => (
                    <div key={p.name} className="flex items-center gap-2">
                      <span className="text-[11px] text-[#6b6580] w-16 truncate">
                        {p.name}
                      </span>
                      <div className="flex-1 bg-[#1a1825] rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${p.percentage}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="platform-bar"
                          style={{ backgroundColor: p.color }}
                        />
                      </div>
                      <span className="text-[11px] text-[#9b97b0] w-8 text-right font-mono">
                        {p.percentage}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Expiry & Velocity */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#2e2a40]/50">
                  <TrendExpiryCountdown hours={trend.expiryHours} />
                  <div className="flex items-center gap-1 text-[11px] text-[#9b97b0]">
                    <Flame className="w-3 h-3 text-orange-400" />
                    {trend.velocity}x velocity
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedTrend === trend.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-3 border-t border-[#2e2a40]/50 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#9b97b0]">Category</span>
                          <span className="text-[#e8e6f0]">{trend.category}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#9b97b0]">Sentiment</span>
                          <div className="flex items-center gap-2">
                            <span className="text-green-400">+{trend.sentiment.positive}%</span>
                            <span className="text-yellow-400">{trend.sentiment.neutral}%</span>
                            <span className="text-red-400">-{trend.sentiment.negative}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#9b97b0]">Peak estimate</span>
                          <span className="text-[#e8e6f0]">{trend.peakEstimate}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "viral" && (
          <motion.div
            key="viral"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="section-header">
              <h2 className="text-sm font-semibold">🚀 Top Viral Candidates</h2>
              <p className="text-[11px] text-[#6b6580] mt-0.5">
                Trends with highest probability of going viral in the next 48-72 hours
              </p>
            </div>
            {viralCandidates.map((trend, i) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#f97316]/20 flex items-center justify-center text-lg font-bold text-[#f97316]">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#e8e6f0]">{trend.name}</h3>
                    <span className={`${badgeClass[trend.badge]} px-2 py-0.5 rounded-full text-[10px] font-semibold`}>
                      {trend.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#9b97b0] mt-0.5">{trend.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#f97316]">
                    {trend.velocity}x
                  </div>
                  <span className="text-[11px] text-[#6b6580]">velocity</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#8b5cf6]" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "prediction" && (
          <motion.div
            key="prediction"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="section-header mb-4">
              <h2 className="text-sm font-semibold">
                🎯 CAMPAIGN PREDICTION — YOUR IDEA VS TRENDS
              </h2>
            </div>
            <div className="glass-card p-6 space-y-5">
              {[
                {
                  label: "Viral probability",
                  value: campaignPrediction.viralProbability,
                  color: "#ef4444",
                  gradient: "from-[#ef4444] to-[#f97316]",
                },
                {
                  label: "Audience alignment",
                  value: campaignPrediction.audienceAlignment,
                  color: "#10b981",
                  gradient: "from-[#10b981] to-[#06b6d4]",
                },
                {
                  label: "Timing risk",
                  value: campaignPrediction.timingRisk,
                  color: "#ef4444",
                  gradient: "from-[#ef4444] to-[#f59e0b]",
                },
                {
                  label: "Sentiment forecast",
                  value: campaignPrediction.sentimentForecast,
                  color: "#8b5cf6",
                  gradient: "from-[#8b5cf6] to-[#06b6d4]",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-sm text-[#9b97b0] w-44 shrink-0">{item.label}</span>
                  <div className="flex-1 progress-track">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1.5, delay: 0.3 + i * 0.15 }}
                      className={`progress-fill bg-gradient-to-r ${item.gradient}`}
                    />
                  </div>
                  <span className="text-sm font-bold w-12 text-right" style={{ color: item.color }}>
                    {item.value}%
                  </span>
                </motion.div>
              ))}

              <div className="mt-6 pt-4 border-t border-[#2e2a40]/50">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-[#10b981]/10 to-transparent border border-[#10b981]/20">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <p className="text-sm text-emerald-300">
                    <strong>Safe to launch.</strong> Low timing risk (22%) with strong audience alignment (81%).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
