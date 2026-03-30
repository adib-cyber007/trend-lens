"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface ViralityCurveProps {
  data: { day: string; probability: number; upper: number; lower: number }[];
  launchWindow?: { start: number; end: number };
}

export default function ViralityCurve({ data, launchWindow }: ViralityCurveProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="viralGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#f97316" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2e2a40" />
        <XAxis dataKey="day" tick={{ fill: "#6b6580", fontSize: 11 }} axisLine={{ stroke: "#2e2a40" }} />
        <YAxis tick={{ fill: "#6b6580", fontSize: 11 }} axisLine={{ stroke: "#2e2a40" }} domain={[0, 100]} unit="%" />
        <Tooltip
          contentStyle={{
            background: "#1e1b2e",
            border: "1px solid #2e2a40",
            borderRadius: 12,
            fontSize: 12,
            color: "#e8e6f0",
          }}
        />
        {/* Confidence band */}
        <Area type="monotone" dataKey="upper" stackId="1" stroke="none" fill="transparent" />
        <Area type="monotone" dataKey="lower" stackId="2" stroke="none" fill="url(#confGrad)" />
        {/* Main probability line */}
        <Area
          type="monotone"
          dataKey="probability"
          stroke="#8b5cf6"
          strokeWidth={2.5}
          fill="url(#viralGrad)"
          dot={false}
          activeDot={{ r: 5, fill: "#8b5cf6", stroke: "#1e1b2e", strokeWidth: 2 }}
        />
        {/* Launch window markers */}
        {launchWindow && (
          <>
            <ReferenceLine
              x={`Day ${launchWindow.start}`}
              stroke="#10b981"
              strokeDasharray="5 5"
              label={{ value: "Launch ▸", fill: "#10b981", fontSize: 10 }}
            />
            <ReferenceLine
              x={`Day ${launchWindow.end}`}
              stroke="#ef4444"
              strokeDasharray="5 5"
              label={{ value: "◂ End", fill: "#ef4444", fontSize: 10 }}
            />
          </>
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
