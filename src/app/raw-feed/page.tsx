"use client";

import { motion } from "framer-motion";
import { Rss, RefreshCw } from "lucide-react";
import { trendTopics } from "@/lib/mock-data";
import { useState } from "react";

const badgeClass: Record<string, string> = {
  Rising: "badge-rising",
  Hot: "badge-hot",
  Stable: "badge-stable",
  Declining: "badge-declining",
  Emerging: "badge-emerging",
};

interface FeedItem {
  id: string;
  source: string;
  platform: string;
  content: string;
  engagement: string;
  time: string;
  sentiment: "positive" | "neutral" | "negative";
}

const feedItems: FeedItem[] = [
  { id: "f1", source: "@TechCrunch", platform: "Twitter/X", content: "Breaking: EU proposes sweeping AI regulation framework targeting foundation models. Industry pushback expected. #AIRegulation2026", engagement: "12.4K", time: "2m ago", sentiment: "neutral" },
  { id: "f2", source: "@GreenBiz", platform: "LinkedIn", content: "New report: 78% of Gen Z consumers willing to pay premium for sustainable brands. The green wave is real.", engagement: "8.2K", time: "5m ago", sentiment: "positive" },
  { id: "f3", source: "u/financeforbeginners", platform: "Reddit", content: "PSA: These 5 free budgeting apps changed my financial life. Thread below 🧵", engagement: "22.1K", time: "8m ago", sentiment: "positive" },
  { id: "f4", source: "@WorkplaceInsider", platform: "Twitter/X", content: "Amazon's latest RTO mandate sparks employee petition with 15K signatures. The remote work battle intensifies.", engagement: "34.7K", time: "12m ago", sentiment: "negative" },
  { id: "f5", source: "@CreatorEconomy", platform: "TikTok", content: "New creator fund announced: $500M for independent creators. Apply now before it closes!", engagement: "45.8K", time: "15m ago", sentiment: "positive" },
  { id: "f6", source: "@NostalgiaGaming", platform: "YouTube", content: "I spent 24 hours playing every N64 game ever made. Here's what happened...", engagement: "1.2M", time: "22m ago", sentiment: "positive" },
  { id: "f7", source: "@ClimateAction", platform: "Instagram", content: "Before and after: How this brand reduced packaging waste by 90%. The results are stunning 🌿", engagement: "67.3K", time: "30m ago", sentiment: "positive" },
  { id: "f8", source: "@AIDebates", platform: "Reddit", content: "Unpopular opinion: AI regulation will kill innovation before it kills jobs. Change my mind.", engagement: "5.6K", time: "35m ago", sentiment: "negative" },
];

export default function RawFeedPage() {
  const [feed, setFeed] = useState(feedItems);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setFeed([...feedItems].sort(() => Math.random() - 0.5));
      setIsRefreshing(false);
    }, 1000);
  };

  const sentimentColor = { positive: "text-emerald-400", neutral: "text-yellow-400", negative: "text-red-400" };
  const sentimentDot = { positive: "bg-emerald-400", neutral: "bg-yellow-400", negative: "bg-red-400" };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0}} className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Rss className="w-5 h-5 text-[#f97316]" />
            Raw Feed
          </h1>
          <p className="text-xs text-[#6b6580] mt-0.5">Live social feed from all monitored platforms</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={refresh} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1825] text-sm text-[#9b97b0] border border-[#2e2a40] hover:border-[#8b5cf6]/30">
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </motion.button>
      </motion.div>

      <div className="space-y-3">
        {feed.map((item, i) => (
          <motion.div
            key={item.id + i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 flex gap-4"
          >
            <div className={`w-2 rounded-full shrink-0 ${sentimentDot[item.sentiment]}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-[#e8e6f0]">{item.source}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#1a1825] text-[#9b97b0] border border-[#2e2a40]">{item.platform}</span>
                <span className="text-[11px] text-[#6b6580]">{item.time}</span>
              </div>
              <p className="text-sm text-[#9b97b0] leading-relaxed">{item.content}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[11px] text-[#6b6580]">♥ {item.engagement}</span>
                <span className={`text-[11px] ${sentimentColor[item.sentiment]}`}>{item.sentiment}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
