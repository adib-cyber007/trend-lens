"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  Send,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  Flame,
  History,
} from "lucide-react";

interface SimulationResult {
  viralProbability: number;
  audienceAlignment: number;
  timingRisk: number;
  sentimentRisk: number;
  overallScore: number;
  recommendation: "safe" | "risk" | "caution";
  reasoning: string;
  historicalAnalogy: string;
}

export default function CampaignPage() {
  const [concept, setConcept] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const runSimulation = () => {
    if (!concept.trim()) return;
    setIsSimulating(true);

    setTimeout(() => {
      const conceptLower = concept.toLowerCase();
      const isRisky =
        conceptLower.includes("politic") ||
        conceptLower.includes("controversy") ||
        conceptLower.includes("ai regulation") ||
        conceptLower.includes("remote work");
      const isSafe =
        conceptLower.includes("sustain") ||
        conceptLower.includes("eco") ||
        conceptLower.includes("green") ||
        conceptLower.includes("finance") ||
        conceptLower.includes("creator");

      const viralProb = isSafe ? 78 : isRisky ? 89 : 65;
      const audienceAlign = isSafe ? 84 : isRisky ? 42 : 71;
      const timingRisk = isSafe ? 18 : isRisky ? 76 : 38;
      const sentimentRisk = isSafe ? 12 : isRisky ? 61 : 28;
      const overall = Math.round((viralProb + audienceAlign + (100 - timingRisk) + (100 - sentimentRisk)) / 4);

      setResult({
        viralProbability: viralProb,
        audienceAlignment: audienceAlign,
        timingRisk: timingRisk,
        sentimentRisk: sentimentRisk,
        overallScore: overall,
        recommendation: isSafe ? "safe" : isRisky ? "risk" : "caution",
        reasoning: isSafe
          ? "Your concept aligns well with current trending sustainability and finance themes. Positive sentiment is dominant (72% positive). The audience demographic overlap with Gen Z and millennials is strong. Recommended to launch within the next 48 hours for maximum impact."
          : isRisky
          ? "⚠️ Your concept touches topics currently showing high negative sentiment (61% negative). While visibility is high (velocity 9.2x), the polarizing nature creates significant backlash risk. Historical data shows brands entering this space early faced rapid negative engagement."
          : "Your concept has moderate potential. Consider refining the message to align more closely with current positive trends like sustainability or Gen Z finance content for better results.",
        historicalAnalogy: isRisky
          ? 'Your campaign concept is 87% similar to Brand X\'s Q1 2025 campaign on AI policy that received 40K negative mentions within 72 hours. Reason: it touched a politically sensitive topic during peak controversy. Recommended: wait for sentiment cooling (est. 5-7 days) or reframe as "listening" content.'
          : isSafe
          ? "Your concept matches the trajectory of GreenBrand Co's 2025 Earth Day campaign which generated 120K positive engagements in 48 hours and achieved 4.2x ROI. Key similarity: eco-forward messaging during rising sustainability trend."
          : "Your concept shares 62% DNA with average-performing campaigns in this category. To improve, consider adding a timely hook connected to trending topics like #GenZFinance or sustainability.",
      });
      setIsSimulating(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-lg font-bold">Campaign Simulator</h1>
        <p className="text-xs text-[#6b6580] mt-0.5">
          Describe your campaign concept and we&apos;ll cross-reference it against current + predicted trends
        </p>
      </motion.div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-[#8b5cf6]" />
          Describe Your Campaign Concept
        </h2>
        <textarea
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="E.g., 'We're launching a sustainability-focused social media campaign targeting Gen Z, with eco-friendly product unboxings on TikTok and Instagram Reels, paired with a #GoGreen challenge...'"
          className="w-full h-32 bg-[#1a1825] rounded-xl p-4 text-sm text-[#e8e6f0] placeholder-[#6b6580] border border-[#2e2a40] outline-none focus:border-[#8b5cf6]/40 transition-colors resize-none"
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <button
              onClick={() => setConcept("Launching a sustainability-focused TikTok campaign with eco-friendly product showcases targeting Gen Z consumers")}
              className="text-[11px] px-3 py-1.5 rounded-lg bg-[#1a1825] text-[#9b97b0] border border-[#2e2a40] hover:border-[#8b5cf6]/30 transition-colors"
            >
              Try: Eco campaign
            </button>
            <button
              onClick={() => setConcept("Running an AI regulation thought leadership series across LinkedIn and Twitter, taking a strong stance on upcoming AI policy changes")}
              className="text-[11px] px-3 py-1.5 rounded-lg bg-[#1a1825] text-[#9b97b0] border border-[#2e2a40] hover:border-[#8b5cf6]/30 transition-colors"
            >
              Try: AI policy campaign
            </button>
            <button
              onClick={() => setConcept("Creating a personal finance education series for Gen Z on TikTok and YouTube, featuring budgeting tips and investment basics")}
              className="text-[11px] px-3 py-1.5 rounded-lg bg-[#1a1825] text-[#9b97b0] border border-[#2e2a40] hover:border-[#8b5cf6]/30 transition-colors"
            >
              Try: Finance content
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runSimulation}
            disabled={!concept.trim() || isSimulating}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#f97316] text-white text-sm font-semibold disabled:opacity-40 transition-opacity"
          >
            {isSimulating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Simulating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Simulate Campaign
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Overall Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`glass-card p-6 border-l-4 ${
                result.recommendation === "safe"
                  ? "border-l-emerald-400"
                  : result.recommendation === "risk"
                  ? "border-l-red-400"
                  : "border-l-yellow-400"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {result.recommendation === "safe" ? (
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                ) : result.recommendation === "risk" ? (
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold">
                    {result.recommendation === "safe"
                      ? "✅ Safe to Launch"
                      : result.recommendation === "risk"
                      ? "🚨 Risk Alert"
                      : "⚠️ Proceed with Caution"}
                  </h3>
                  <p className="text-sm text-[#9b97b0]">
                    Overall Score: <span className="font-bold text-[#e8e6f0]">{result.overallScore}/100</span>
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#9b97b0] leading-relaxed">{result.reasoning}</p>
            </motion.div>

            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Viral Probability",
                  value: result.viralProbability,
                  icon: TrendingUp,
                  color: "#8b5cf6",
                },
                {
                  label: "Audience Alignment",
                  value: result.audienceAlignment,
                  icon: Users,
                  color: "#06b6d4",
                },
                {
                  label: "Timing Risk",
                  value: result.timingRisk,
                  icon: Clock,
                  color: result.timingRisk > 50 ? "#ef4444" : "#10b981",
                },
                {
                  label: "Sentiment Risk",
                  value: result.sentimentRisk,
                  icon: Flame,
                  color: result.sentimentRisk > 50 ? "#ef4444" : "#10b981",
                },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="glass-card p-4 text-center"
                >
                  <metric.icon
                    className="w-5 h-5 mx-auto mb-2"
                    style={{ color: metric.color }}
                  />
                  <p className="text-2xl font-bold" style={{ color: metric.color }}>
                    {metric.value}%
                  </p>
                  <p className="text-[11px] text-[#6b6580] mt-1">{metric.label}</p>
                  <div className="mt-2 progress-track">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                      className="progress-fill"
                      style={{ background: metric.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Historical Analogy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-5"
            >
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <History className="w-4 h-4 text-[#f97316]" />
                Historical Analogy — Ghost of Campaigns Past
              </h3>
              <p className="text-sm text-[#9b97b0] leading-relaxed">
                {result.historicalAnalogy}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
