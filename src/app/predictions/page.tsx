"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Clock, Target } from "lucide-react";
import ViralityCurve from "@/components/charts/ViralityCurve";
import TrendDNA from "@/components/charts/TrendDNA";
import SentimentGauge from "@/components/charts/SentimentGauge";
import PlatformHeatmap from "@/components/charts/PlatformHeatmap";
import { trendTopics, viralityCurve7Day, viralityCurve30Day, audienceDemographics } from "@/lib/mock-data";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function PredictionsPage() {
  const [selectedTrend, setSelectedTrend] = useState(trendTopics[0]);
  const [timeRange, setTimeRange] = useState<"7d" | "30d">("7d");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrends = trendTopics.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-lg font-bold">Viral Forecast Engine</h1>
        <p className="text-xs text-[#6b6580] mt-0.5">
          AI-powered virality prediction with confidence intervals and launch window recommendations
        </p>
      </motion.div>

      {/* Search & Select Trend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <Search className="w-4 h-4 text-[#6b6580]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trend topics..."
            className="flex-1 bg-transparent text-sm text-[#e8e6f0] placeholder-[#6b6580] outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredTrends.map((trend) => (
            <button
              key={trend.id}
              onClick={() => setSelectedTrend(trend)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedTrend.id === trend.id
                  ? "bg-gradient-to-r from-[#8b5cf6]/20 to-[#f97316]/15 text-white border border-[#8b5cf6]/30"
                  : "bg-[#1a1825] text-[#9b97b0] border border-[#2e2a40] hover:border-[#8b5cf6]/20"
              }`}
            >
              {trend.name}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Virality Curve — 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#8b5cf6]" />
                Virality Probability Curve — {selectedTrend.name}
              </h2>
              <p className="text-[11px] text-[#6b6580] mt-0.5">
                Confidence interval shaded • Launch window marked
              </p>
            </div>
            <div className="flex items-center gap-1 bg-[#1a1825] rounded-lg p-0.5">
              <button
                onClick={() => setTimeRange("7d")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  timeRange === "7d"
                    ? "bg-[#8b5cf6]/20 text-white"
                    : "text-[#6b6580] hover:text-[#9b97b0]"
                }`}
              >
                7 Day
              </button>
              <button
                onClick={() => setTimeRange("30d")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  timeRange === "30d"
                    ? "bg-[#8b5cf6]/20 text-white"
                    : "text-[#6b6580] hover:text-[#9b97b0]"
                }`}
              >
                30 Day
              </button>
            </div>
          </div>
          <ViralityCurve
            data={timeRange === "7d" ? viralityCurve7Day : viralityCurve30Day}
            launchWindow={timeRange === "7d" ? { start: 2, end: 5 } : { start: 5, end: 15 }}
          />
        </motion.div>

        {/* Trend DNA Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-[#f97316]" />
            Trend DNA Fingerprint
          </h2>
          <p className="text-[11px] text-[#6b6580] mb-3">
            Comparing current pattern to historical viral DNA
          </p>
          <TrendDNA
            currentDNA={selectedTrend.trendDNA}
            viralDNA={[8, 9, 8, 9, 7, 9]}
          />
          <div className="mt-3 p-3 rounded-xl bg-[#1a1825] border border-[#2e2a40]">
            <p className="text-[11px] text-[#9b97b0]">
              DNA match: <span className="text-[#f97316] font-bold">73%</span> similarity to
              historical viral events. This trend shows early-stage patterns consistent with
              breakout potential.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sentiment Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <h2 className="text-sm font-semibold mb-3">Sentiment Breakdown</h2>
          <SentimentGauge
            positive={selectedTrend.sentiment.positive}
            neutral={selectedTrend.sentiment.neutral}
            negative={selectedTrend.sentiment.negative}
          />
        </motion.div>

        {/* Platform Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5"
        >
          <h2 className="text-sm font-semibold mb-3">Platform Distribution</h2>
          <PlatformHeatmap data={selectedTrend.platforms} />
        </motion.div>

        {/* Audience Demographics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-5"
        >
          <h2 className="text-sm font-semibold mb-3">Audience Demographics</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={audienceDemographics}
                cx="50%"
                cy="50%"
                outerRadius={75}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {audienceDemographics.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1e1b2e",
                  border: "1px solid #2e2a40",
                  borderRadius: 12,
                  fontSize: 12,
                  color: "#e8e6f0",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recommended Launch Window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-5"
      >
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          Recommended Launch Window
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#10b981]/10 to-transparent border border-[#10b981]/20">
            <p className="text-xs text-[#9b97b0]">Optimal Start</p>
            <p className="text-lg font-bold text-emerald-400 mt-1">Day 2 — Tomorrow</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#f97316]/10 to-transparent border border-[#f97316]/20">
            <p className="text-xs text-[#9b97b0]">Peak Window</p>
            <p className="text-lg font-bold text-orange-400 mt-1">Day 3-5</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#ef4444]/10 to-transparent border border-[#ef4444]/20">
            <p className="text-xs text-[#9b97b0]">Deadline</p>
            <p className="text-lg font-bold text-red-400 mt-1">Day 5 — Entry closes</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
