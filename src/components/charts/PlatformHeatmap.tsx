"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { PLATFORM_COLORS } from "@/lib/mock-data";

interface PlatformHeatmapProps {
  data: { name: string; percentage: number; color: string }[];
}

export default function PlatformHeatmap({ data }: PlatformHeatmapProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2e2a40" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fill: "#6b6580", fontSize: 11 }}
          axisLine={{ stroke: "#2e2a40" }}
          unit="%"
        />
        <YAxis
          type="category"
          dataKey="name"
          width={80}
          tick={{ fill: "#9b97b0", fontSize: 11 }}
          axisLine={false}
        />
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
        <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={14}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color || PLATFORM_COLORS[entry.name] || "#8b5cf6"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
