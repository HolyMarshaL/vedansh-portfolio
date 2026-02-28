"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
  delay?: number;
}

export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  duration = 2000,
  delay = 0,
}: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now() + delay;
    const endTime = startTime + duration;

    const tick = () => {
      const now = Date.now();
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration, delay]);

  const formatNumber = (num: number) => {
    if (value >= 1000000) {
      return num.toLocaleString("en-IN");
    }
    return num.toString();
  };

  return (
    <div
      ref={ref}
      className="group relative p-4 glass-card rounded-lg transition-all duration-300 hover:neon-box-cyan cursor-default"
    >
      <p
        className="text-[10px] tracking-[0.2em] text-neon-cyan/50 uppercase mb-2"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        {label}
      </p>
      <p
        className="text-2xl sm:text-3xl font-bold text-star-white"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          textShadow: "0 0 10px rgba(0,240,255,0.3)",
        }}
      >
        {prefix}
        {formatNumber(displayValue)}
        {suffix}
      </p>

      {/* Hover glow line */}
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-cyan transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
