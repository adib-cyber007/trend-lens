"use client";

import { motion } from "framer-motion";
import { Users, Globe2, BarChart3 } from "lucide-react";
import { trendTopics, audienceDemographics } from "@/lib/mock-data";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const regionData = [
  { region: "North America", engagement: 42, color: "#8b5cf6" },
  { region: "Europe", engagement: 28, color: "#f97316" },
  { region: "Asia Pacific", engagement: 18, color: "#06b6d4" },
  { region: "Latin America", engagement: 8, color: "#10b981" },
  { region: "Middle East", engagement: 4, color: "#f59e0b" },
];

const platformDemographics = [
  { platform: "TikTok", "18-24": 45, "25-34": 30, "35-44": 15, "45+": 10 },
  { platform: "Instagram", "18-24": 35, "25-34": 35, "35-44": 20, "45+": 10 },
  { platform: "Twitter/X", "18-24": 20, "25-34": 35, "35-44": 25, "45+": 20 },
  { platform: "LinkedIn", "18-24": 10, "25-34": 30, "35-44": 35, "45+": 25 },
  { platform: "YouTube", "18-24": 30, "25-34": 30, "35-44": 25, "45+": 15 },
  { platform: "Reddit", "18-24": 35, "25-34": 40, "35-44": 15, "45+": 10 },
];

export default function AudiencePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-lg font-bold">Audience Intelligence</h1>
        <p className="text-xs text-[#6b6580] mt-0.5">
          Demographic breakdown, regional segmentation, and platform audience overlap
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Age Demographics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#8b5cf6]" />
            Age Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={audienceDemographics} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                {audienceDemographics.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1e1b2e", border: "1px solid #2e2a40", borderRadius: 12, fontSize: 12, color: "#e8e6f0" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Regional Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-[#f97316]" />
            Regional Engagement
          </h2>
          <div className="space-y-3 mt-4">
            {regionData.map((r, i) => (
              <motion.div key={r.region} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} className="flex items-center gap-3">
                <span className="text-xs text-[#9b97b0] w-28 shrink-0">{r.region}</span>
                <div className="flex-1 progress-track">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${r.engagement}%` }} transition={{ duration: 1.5, delay: 0.2 * i }} className="progress-fill" style={{ background: r.color }} />
                </div>
                <span className="text-xs font-mono w-8 text-right" style={{ color: r.color }}>{r.engagement}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Platform × Age Breakdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#06b6d4]" />
          Platform × Age Group Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={platformDemographics} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2a40" />
            <XAxis dataKey="platform" tick={{ fill: "#9b97b0", fontSize: 11 }} axisLine={{ stroke: "#2e2a40" }} />
            <YAxis tick={{ fill: "#6b6580", fontSize: 11 }} axisLine={{ stroke: "#2e2a40" }} unit="%" />
            <Tooltip contentStyle={{ background: "#1e1b2e", border: "1px solid #2e2a40", borderRadius: 12, fontSize: 12, color: "#e8e6f0" }} />
            <Bar dataKey="18-24" stackId="a" fill="#f97316" radius={[0, 0, 0, 0]} />
            <Bar dataKey="25-34" stackId="a" fill="#8b5cf6" />
            <Bar dataKey="35-44" stackId="a" fill="#06b6d4" />
            <Bar dataKey="45+" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Top Trends by Audience */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
        <h2 className="text-sm font-semibold mb-4">Top Trends by Audience Reach</h2>
        <div className="space-y-3">
          {trendTopics.slice(0, 5).map((trend, i) => {
            const reach = Math.round(trend.velocity * 12 + trend.sentiment.positive * 0.5);
            return (
              <motion.div key={trend.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-gradient-to-br from-[#8b5cf6]/20 to-[#f97316]/20 flex items-center justify-center text-[11px] font-bold text-[#f97316]">{i + 1}</span>
                <span className="text-sm flex-1">{trend.name}</span>
                <span className="text-sm font-bold text-[#8b5cf6]">{reach}K</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
