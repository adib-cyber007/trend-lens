import { trendTopics, campaignPrediction, type ChatMessage } from "./mock-data";

const trendSummary = trendTopics
  .slice(0, 5)
  .map((t) => `• ${t.name} (${t.badge}, velocity ${t.velocity}x, sentiment +${t.sentiment.positive}%/-${t.sentiment.negative}%)`)
  .join("\n");

const responses: Record<string, string> = {
  trending:
    `📊 **Trending Today Across the Internet:**\n\n${trendSummary}\n\nThe highest-velocity trends are #AIRegulation2026 (9.2x) and Remote work backlash (8.4x). Sustainability campaigns have the strongest positive sentiment at 72%.`,
  viral:
    `🚀 **Highest Viral Probability Trends:**\n\n1. **Sustainability campaigns** — 91% TikTok velocity, 72% positive sentiment. Perfect wave to ride.\n2. **Gen Z finance content** — 93% TikTok penetration, strong cross-platform spread.\n3. **Creator economy tools** — Emerging trend with 76% positive sentiment, expected to accelerate.\n\n⏰ Recommended action window: next 48-72 hours for maximum impact.`,
  campaign:
    `🎯 **Campaign Analysis:**\n\nBased on current trend alignment:\n• **Viral probability**: ${campaignPrediction.viralProbability}%\n• **Audience alignment**: ${campaignPrediction.audienceAlignment}%\n• **Timing risk**: ${campaignPrediction.timingRisk}% (low — good timing)\n• **Sentiment forecast**: ${campaignPrediction.sentimentForecast}% positive\n\n✅ **Recommendation**: Safe to launch. Align messaging with sustainability + Gen Z finance themes for maximum reach.`,
  risk:
    `⚠️ **Risk Assessment:**\n\nCurrent high-risk trends to AVOID:\n1. **#AIRegulation2026** — 61% negative sentiment, politically charged\n2. **Remote work backlash** — 60% negative, divisive employer-employee topic\n\n🛡️ Safe trends to embrace:\n1. **Sustainability campaigns** — only 9% negative sentiment\n2. **Retro gaming nostalgia** — 81% positive, low controversy\n\nHistorical analogy: Brands entering AI regulation debates early in 2025 saw 40K+ negative mentions within 72 hours.`,
  competitor:
    `🔍 **Competitor Intelligence:**\n\n• Competitor A is engaging 12 trends with EARLY timing (score: 82/100)\n• Competitor D has the highest score (91/100) but only engaging 6 trends\n• Competitor C is consistently LATE to trends (score: 45/100)\n\n💡 Opportunity: Competitor C's poor timing on sustainability leaves a gap you can exploit by launching this week.`,
  sustainability:
    `🌿 **Sustainability Trend Deep Dive:**\n\nThis trend is your golden ticket right now:\n• TikTok velocity: 91% and climbing\n• Instagram: 79% engagement rate\n• YouTube: 55% — growing via long-form content\n\nBrand eco-pledges are outperforming traditional marketing by 3.4x. The "eco + savings" messaging angle resonates strongest with 18-34 demographic.\n\n⏰ Peak estimate: 3 days. You have a solid 72-hour window.`,
  default:
    `I can help you with trend analysis, campaign planning, and risk assessment. Here are some things you can ask me:\n\n• "What's trending today?"\n• "Which trends are most likely to go viral?"\n• "Analyze my campaign idea"\n• "What are the risks right now?"\n• "Show competitor intelligence"\n• "Tell me about sustainability trends"\n\nI have real-time data on ${trendTopics.length} active trends across all major platforms.`,
};

function matchQuery(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("trending") || q.includes("today") || q.includes("what's hot"))
    return responses.trending;
  if (q.includes("viral") || q.includes("probability") || q.includes("go viral"))
    return responses.viral;
  if (q.includes("campaign") || q.includes("launch") || q.includes("my idea") || q.includes("simulate"))
    return responses.campaign;
  if (q.includes("risk") || q.includes("avoid") || q.includes("danger") || q.includes("safe"))
    return responses.risk;
  if (q.includes("competitor") || q.includes("competition") || q.includes("rival"))
    return responses.competitor;
  if (q.includes("sustainability") || q.includes("eco") || q.includes("green"))
    return responses.sustainability;
  if (q.includes("gen z") || q.includes("finance") || q.includes("tiktok"))
    return `📱 **Gen Z Finance Content:**\n\nThis trend has 93% TikTok penetration — the highest of any active trend. YouTube follows at 68%.\n\nKey insight: combine financial literacy with entertainment ("finfluencer" format). Brands like fintech startups are seeing 5x engagement by using short-form budget tips.\n\n⏰ Peak estimate: 5 days. Plenty of time to create content.`;
  if (q.includes("ai") || q.includes("regulation") || q.includes("policy"))
    return `🤖 **#AIRegulation2026 Analysis:**\n\n⚠️ HIGH RISK trend. Velocity is 9.2x but sentiment is 61% negative.\n\nPlatform breakdown:\n• Twitter/X: 88% — heated debates\n• LinkedIn: 62% — professional discourse\n• Reddit: 74% — deep technical discussions\n\nRecommendation: Do NOT lead with a brand opinion. If engaging, use a "listen and learn" approach. Brands that took strong positions on AI policy in 2025 faced backlash.`;
  return responses.default;
}

export function generateResponse(query: string): ChatMessage {
  return {
    id: `msg-${Date.now()}`,
    role: "assistant",
    content: matchQuery(query),
    timestamp: new Date(),
  };
}
