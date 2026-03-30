"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileDown,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Eye,
  Trophy,
  Target,
} from "lucide-react";
import { weeklyBrief, campaignHistory, competitorData } from "@/lib/mock-data";

export default function ReportsPage() {
  const [activeSection, setActiveSection] = useState<"brief" | "campaigns" | "competitors">(
    "brief"
  );

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-lg font-bold">Reports & Intelligence</h1>
          <p className="text-xs text-[#6b6580] mt-0.5">
            Weekly briefs, campaign history, and competitor trend intelligence
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#f97316] text-white text-sm font-medium"
        >
          <FileDown className="w-4 h-4" />
          Export PDF
        </motion.button>
      </motion.div>

      {/* Section Tabs */}
      <div className="flex items-center gap-1 bg-[#1a1825]/60 rounded-xl p-1 w-fit">
        {(
          [
            { key: "brief", label: "Weekly Brief", icon: Calendar },
            { key: "campaigns", label: "Campaign History", icon: Target },
            { key: "competitors", label: "Competitor Intel", icon: Eye },
          ] as { key: "brief" | "campaigns" | "competitors"; label: string; icon: typeof Calendar }[]
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSection === tab.key
                ? "bg-gradient-to-r from-[#8b5cf6]/20 to-[#f97316]/15 text-white"
                : "text-[#6b6580] hover:text-[#9b97b0]"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Weekly Brief */}
      {activeSection === "brief" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden"
        >
          <div className="p-5 border-b border-[#2e2a40]/50">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8b5cf6]" />
              Weekly Trend Brief — Week of Mar 24, 2026
            </h2>
            <p className="text-[11px] text-[#6b6580] mt-0.5">
              Top 10 trends with recommendations and 30-day outlook
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a1825]/80">
                  <th className="px-5 py-3 text-left text-[11px] text-[#6b6580] font-medium uppercase tracking-wide">
                    Rank
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] text-[#6b6580] font-medium uppercase tracking-wide">
                    Topic
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] text-[#6b6580] font-medium uppercase tracking-wide">
                    Recommendation
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] text-[#6b6580] font-medium uppercase tracking-wide">
                    30-Day Outlook
                  </th>
                </tr>
              </thead>
              <tbody>
                {weeklyBrief.map((item, i) => (
                  <motion.tr
                    key={item.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-t border-[#2e2a40]/30 hover:bg-[#1a1825]/40 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#8b5cf6]/20 to-[#f97316]/20 flex items-center justify-center text-xs font-bold text-[#f97316]">
                        {item.rank}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium text-[#e8e6f0]">{item.topic}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-md ${
                          item.recommendation.includes("Ride")
                            ? "bg-emerald-500/10 text-emerald-400"
                            : item.recommendation.includes("Avoid")
                            ? "bg-red-500/10 text-red-400"
                            : item.recommendation.includes("Monitor")
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-[#1a1825] text-[#9b97b0]"
                        }`}
                      >
                        {item.recommendation}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-[#9b97b0]">{item.outlook}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Campaign History */}
      {activeSection === "campaigns" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {campaignHistory.map((campaign, i) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-[#e8e6f0]">{campaign.name}</h3>
                  <p className="text-[11px] text-[#6b6580] mt-0.5">{campaign.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                    campaign.status === "Launched"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : campaign.status === "Scheduled"
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[11px] text-[#6b6580]">Viral Score</p>
                  <p className="text-xl font-bold text-[#8b5cf6]">{campaign.viralScore}%</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#6b6580]">Risk Level</p>
                  <p
                    className={`text-xl font-bold ${
                      campaign.risk === "Low"
                        ? "text-emerald-400"
                        : campaign.risk === "Medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {campaign.risk}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#6b6580]">Result</p>
                  <p className="text-sm text-[#9b97b0]">{campaign.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Competitor Intelligence */}
      {activeSection === "competitors" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="section-header">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#f97316]" />
              Competitor Trend Engagement Scores
            </h2>
          </div>
          {competitorData.map((comp, i) => (
            <motion.div
              key={comp.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#f97316]/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#f97316]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#e8e6f0]">{comp.name}</h3>
                <p className="text-[11px] text-[#6b6580]">
                  {comp.trendsEngaged} trends engaged • Timing: {comp.avgTiming}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#8b5cf6]">{comp.score}</p>
                <p className="text-[11px] text-[#6b6580]">score</p>
              </div>
              <div className="w-24">
                <div className="progress-track">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${comp.score}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className={`progress-fill bg-gradient-to-r ${
                      comp.score > 80
                        ? "from-[#10b981] to-[#06b6d4]"
                        : comp.score > 60
                        ? "from-[#f59e0b] to-[#f97316]"
                        : "from-[#ef4444] to-[#f97316]"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
