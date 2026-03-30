"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SentimentGaugeProps {
  positive: number;
  neutral: number;
  negative: number;
}

export default function SentimentGauge({ positive, neutral, negative }: SentimentGaugeProps) {
  const data = [
    { name: "Positive", value: positive, color: "#22c55e" },
    { name: "Neutral", value: neutral, color: "#f59e0b" },
    { name: "Negative", value: negative, color: "#ef4444" },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={75}
          paddingAngle={3}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} stroke="transparent" />
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
          formatter={(value: number) => `${value}%`}
        />
        <Legend
          wrapperStyle={{ fontSize: 11, color: "#9b97b0" }}
          formatter={(value: string) => <span style={{ color: "#9b97b0" }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
