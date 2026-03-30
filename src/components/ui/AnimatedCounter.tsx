"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target * Math.pow(10, decimals)) / Math.pow(10, decimals));
      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [target, duration, decimals]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
