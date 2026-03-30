"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TrendDNAProps {
  currentDNA: number[];
  viralDNA?: number[];
}

const labels = ["Velocity", "Sentiment", "Spread", "Engagement", "Longevity", "Virality"];

export default function TrendDNA({ currentDNA, viralDNA }: TrendDNAProps) {
  const data = labels.map((label, i) => ({
    subject: label,
    current: currentDNA[i] || 0,
    viral: viralDNA ? viralDNA[i] : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data}>
        <PolarGrid stroke="#2e2a40" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: "#9b97b0", fontSize: 11 }} />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 10]}
          tick={{ fill: "#6b6580", fontSize: 10 }}
          axisLine={false}
        />
        <Radar
          name="Current Trend"
          dataKey="current"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        {viralDNA && (
          <Radar
            name="Viral Pattern"
            dataKey="viral"
            stroke="#f97316"
            fill="#f97316"
            fillOpacity={0.1}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        )}
        <Legend wrapperStyle={{ fontSize: 11, color: "#9b97b0" }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
