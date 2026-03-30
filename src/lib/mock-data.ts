// ─── Trend Data ────────────────────────────────────────────
export interface TrendTopic {
  id: string;
  name: string;
  description: string;
  badge: "Rising" | "Stable" | "Hot" | "Declining" | "Emerging";
  sentiment: { positive: number; neutral: number; negative: number };
  velocity: number;
  peakEstimate: string;
  expiryHours: number;
  platforms: { name: string; percentage: number; color: string }[];
  category: string;
  trendDNA: number[];
}

export const PLATFORM_COLORS: Record<string, string> = {
  "Twitter/X": "#1DA1F2",
  LinkedIn: "#0A66C2",
  Reddit: "#FF4500",
  Instagram: "#E1306C",
  YouTube: "#FF0000",
  TikTok: "#00F2EA",
  "Google Search": "#4285F4",
  News: "#FFC107",
};

export const trendTopics: TrendTopic[] = [
  {
    id: "t1",
    name: "#AIRegulation2026",
    description:
      "Global policy debate exploding across LinkedIn, X, Reddit. Governments draft new AI safety frameworks.",
    badge: "Hot",
    sentiment: { positive: 34, neutral: 28, negative: 38 },
    velocity: 9.2,
    peakEstimate: "18h",
    expiryHours: 18,
    platforms: [
      { name: "Twitter/X", percentage: 88, color: "#1DA1F2" },
      { name: "LinkedIn", percentage: 62, color: "#0A66C2" },
      { name: "Reddit", percentage: 74, color: "#FF4500" },
      { name: "YouTube", percentage: 31, color: "#FF0000" },
    ],
    category: "Technology",
    trendDNA: [9, 7, 6, 8, 5, 4],
  },
  {
    id: "t2",
    name: "Sustainability campaigns",
    description:
      "Brand eco-pledges gaining traction on Instagram & YouTube. Green marketing surging 3.4x.",
    badge: "Rising",
    sentiment: { positive: 72, neutral: 19, negative: 9 },
    velocity: 7.8,
    peakEstimate: "3d",
    expiryHours: 72,
    platforms: [
      { name: "Instagram", percentage: 79, color: "#E1306C" },
      { name: "YouTube", percentage: 55, color: "#FF0000" },
      { name: "TikTok", percentage: 91, color: "#00F2EA" },
      { name: "Twitter/X", percentage: 41, color: "#1DA1F2" },
    ],
    category: "Marketing",
    trendDNA: [6, 8, 9, 7, 6, 5],
  },
  {
    id: "t3",
    name: "Gen Z finance content",
    description:
      "Personal finance / investing content surging on TikTok & YouTube. Fintech brands need to act fast.",
    badge: "Rising",
    sentiment: { positive: 64, neutral: 25, negative: 11 },
    velocity: 6.5,
    peakEstimate: "5d",
    expiryHours: 120,
    platforms: [
      { name: "TikTok", percentage: 93, color: "#00F2EA" },
      { name: "YouTube", percentage: 68, color: "#FF0000" },
      { name: "Reddit", percentage: 47, color: "#FF4500" },
      { name: "Instagram", percentage: 38, color: "#E1306C" },
    ],
    category: "Finance",
    trendDNA: [5, 6, 7, 8, 9, 7],
  },
  {
    id: "t4",
    name: "Retro gaming nostalgia",
    description:
      "Consistent engagement, not accelerating. Avoid as primary hook but great for millennial targeting.",
    badge: "Stable",
    sentiment: { positive: 81, neutral: 14, negative: 5 },
    velocity: 3.1,
    peakEstimate: "14d",
    expiryHours: 336,
    platforms: [
      { name: "Twitter/X", percentage: 41, color: "#1DA1F2" },
      { name: "Instagram", percentage: 38, color: "#E1306C" },
      { name: "Reddit", percentage: 52, color: "#FF4500" },
      { name: "YouTube", percentage: 45, color: "#FF0000" },
    ],
    category: "Entertainment",
    trendDNA: [4, 4, 5, 5, 4, 3],
  },
  {
    id: "t5",
    name: "Remote work backlash",
    description:
      "CEOs pushing return-to-office mandates sparking employee backlash across LinkedIn and Reddit.",
    badge: "Hot",
    sentiment: { positive: 22, neutral: 18, negative: 60 },
    velocity: 8.4,
    peakEstimate: "24h",
    expiryHours: 24,
    platforms: [
      { name: "LinkedIn", percentage: 91, color: "#0A66C2" },
      { name: "Reddit", percentage: 85, color: "#FF4500" },
      { name: "Twitter/X", percentage: 72, color: "#1DA1F2" },
      { name: "News", percentage: 55, color: "#FFC107" },
    ],
    category: "Workplace",
    trendDNA: [8, 9, 7, 6, 4, 3],
  },
  {
    id: "t6",
    name: "Creator economy tools",
    description:
      "New platforms empowering independent creators. Monetization and audience-building tools trending.",
    badge: "Emerging",
    sentiment: { positive: 76, neutral: 18, negative: 6 },
    velocity: 5.2,
    peakEstimate: "7d",
    expiryHours: 168,
    platforms: [
      { name: "TikTok", percentage: 74, color: "#00F2EA" },
      { name: "YouTube", percentage: 82, color: "#FF0000" },
      { name: "Twitter/X", percentage: 56, color: "#1DA1F2" },
      { name: "Instagram", percentage: 63, color: "#E1306C" },
    ],
    category: "Technology",
    trendDNA: [3, 5, 6, 7, 8, 8],
  },
];

// ─── Overview Stats ────────────────────────────────────────
export const overviewStats = {
  trendingTopics: { value: 2841, change: "+12%", label: "vs yesterday" },
  viralProbability: { value: 73, label: "Your campaign idea" },
  riskScore: { value: "18/10", label: "Low — safe to launch" },
  trendVelocity: { value: "9.2x", label: "Cooling since 4h ago" },
};

// ─── Campaign Prediction ───────────────────────────────────
export const campaignPrediction = {
  viralProbability: 73,
  audienceAlignment: 81,
  timingRisk: 22,
  sentimentForecast: 88,
};

// ─── Virality Curve (7-day) ────────────────────────────────
export const viralityCurve7Day = Array.from({ length: 7 }, (_, i) => ({
  day: `Day ${i + 1}`,
  probability: Math.round(30 + 50 * Math.sin((i / 6) * Math.PI) + Math.random() * 10),
  upper: Math.round(40 + 55 * Math.sin((i / 6) * Math.PI) + Math.random() * 8),
  lower: Math.round(20 + 45 * Math.sin((i / 6) * Math.PI) + Math.random() * 8),
}));

// ─── Virality Curve (30-day) ───────────────────────────────
export const viralityCurve30Day = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  probability: Math.round(
    20 + 60 * Math.sin((i / 29) * Math.PI) * (1 - i / 60) + Math.random() * 8
  ),
  upper: Math.round(
    30 + 65 * Math.sin((i / 29) * Math.PI) * (1 - i / 60) + Math.random() * 6
  ),
  lower: Math.round(
    10 + 55 * Math.sin((i / 29) * Math.PI) * (1 - i / 60) + Math.random() * 6
  ),
}));

// ─── Audience Demographics ─────────────────────────────────
export const audienceDemographics = [
  { name: "18-24", value: 35, color: "#f97316" },
  { name: "25-34", value: 28, color: "#8b5cf6" },
  { name: "35-44", value: 20, color: "#06b6d4" },
  { name: "45-54", value: 11, color: "#10b981" },
  { name: "55+", value: 6, color: "#6366f1" },
];

// ─── Campaign History ──────────────────────────────────────
export const campaignHistory = [
  {
    id: "c1",
    name: "Eco-Brand Spring Launch",
    date: "2026-03-25",
    viralScore: 78,
    risk: "Low",
    status: "Launched",
    result: "42K engagements in 48h",
  },
  {
    id: "c2",
    name: "AI Tech Conference Promo",
    date: "2026-03-18",
    viralScore: 65,
    risk: "Medium",
    status: "Launched",
    result: "28K engagements in 72h",
  },
  {
    id: "c3",
    name: "Summer Finance Webinar",
    date: "2026-03-10",
    viralScore: 52,
    risk: "Low",
    status: "Scheduled",
    result: "Pending",
  },
  {
    id: "c4",
    name: "Political Commentary Series",
    date: "2026-03-05",
    viralScore: 89,
    risk: "High",
    status: "Cancelled",
    result: "Risk alert: 61% negative sentiment",
  },
];

// ─── Competitor Data ───────────────────────────────────────
export const competitorData = [
  { name: "Competitor A", trendsEngaged: 12, avgTiming: "Early", score: 82 },
  { name: "Competitor B", trendsEngaged: 8, avgTiming: "On-time", score: 68 },
  { name: "Competitor C", trendsEngaged: 15, avgTiming: "Late", score: 45 },
  { name: "Competitor D", trendsEngaged: 6, avgTiming: "Early", score: 91 },
];

// ─── Weekly Trend Brief ────────────────────────────────────
export const weeklyBrief = [
  { rank: 1, topic: "#AIRegulation2026", recommendation: "Monitor — high risk", outlook: "Declining in 2d" },
  { rank: 2, topic: "Sustainability campaigns", recommendation: "Ride — perfect timing", outlook: "Rising for 5d" },
  { rank: 3, topic: "Gen Z finance content", recommendation: "Ride — align messaging", outlook: "Peaking in 3d" },
  { rank: 4, topic: "Remote work backlash", recommendation: "Avoid — negative sentiment", outlook: "Peaking now" },
  { rank: 5, topic: "Creator economy tools", recommendation: "Explore — early stage", outlook: "Rising for 7d" },
  { rank: 6, topic: "Retro gaming nostalgia", recommendation: "Optional — niche audience", outlook: "Stable 14d" },
  { rank: 7, topic: "Mental health awareness", recommendation: "Ride — with sensitivity", outlook: "Rising for 10d" },
  { rank: 8, topic: "EV price wars", recommendation: "Monitor — volatile", outlook: "Peaking in 1d" },
  { rank: 9, topic: "Space exploration hype", recommendation: "Ride — positive sentiment", outlook: "Rising for 4d" },
  { rank: 10, topic: "Crypto regulation update", recommendation: "Avoid — polarizing", outlook: "Declining in 1d" },
];

// ─── Chatbot Responses ─────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const initialChatMessages: ChatMessage[] = [
  {
    id: "init-1",
    role: "user",
    content: "What trends should my eco-brand campaign ride right now?",
    timestamp: new Date(),
  },
  {
    id: "init-2",
    role: "assistant",
    content:
      'Sustainability content is spiking on TikTok (+91% velocity). Pair it with Gen Z finance anxiety — brands offering "eco + savings" messaging are outperforming pure green campaigns by 3.4x this week.',
    timestamp: new Date(),
  },
  {
    id: "init-3",
    role: "user",
    content: "Will #AIRegulation2026 work for a tech company?",
    timestamp: new Date(),
  },
  {
    id: "init-4",
    role: "assistant",
    content:
      "High visibility, but polarizing. Sentiment is 61% negative. Recommended: observe for 48h, then enter with a nuanced take — not advocacy. Brands that jumped early faced backlash.",
    timestamp: new Date(),
  },
];
