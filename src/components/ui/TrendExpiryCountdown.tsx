"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TrendExpiryCountdownProps {
  hours: number;
}

export default function TrendExpiryCountdown({ hours }: TrendExpiryCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(hours * 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [hours]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const urgency =
    hours <= 6 ? "text-red-400" : hours <= 24 ? "text-orange-400" : "text-emerald-400";

  return (
    <span className={`flex items-center gap-1 text-[11px] font-mono ${urgency} ${hours <= 24 ? "countdown-active" : ""}`}>
      <Clock className="w-3 h-3" />
      {h}h {m.toString().padStart(2, "0")}m {s.toString().padStart(2, "0")}s
    </span>
  );
}
