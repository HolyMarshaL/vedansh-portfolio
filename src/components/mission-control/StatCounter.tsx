"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const STAT_COLORS = [
  { accent: "#ff2d7b", shadow: "rgba(255,45,123,0.3)" },
  { accent: "#b44aff", shadow: "rgba(180,74,255,0.3)" },
  { accent: "#4d7cff", shadow: "rgba(77,124,255,0.3)" },
  { accent: "#ff44cc", shadow: "rgba(255,68,204,0.3)" },
  { accent: "#ff6b35", shadow: "rgba(255,107,53,0.3)" },
];

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
  delay?: number;
  colorIndex?: number;
}

export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  duration = 2000,
  delay = 0,
  colorIndex = 0,
}: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);
  const color = STAT_COLORS[colorIndex % STAT_COLORS.length];

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
      className="group relative p-4 glass-card rounded-lg transition-all duration-300 cursor-default"
      style={{
        ["--hover-color" as string]: color.accent,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 5px ${color.accent}60, 0 0 10px ${color.accent}30, inset 0 0 5px ${color.accent}10`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <p
        className="text-[10px] tracking-[0.2em] uppercase mb-2"
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          color: `${color.accent}80`,
        }}
      >
        {label}
      </p>
      <p
        className="text-2xl sm:text-3xl font-bold text-star-white"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          textShadow: `0 0 10px ${color.shadow}`,
        }}
      >
        {prefix}
        {formatNumber(displayValue)}
        {suffix}
      </p>

      {/* Hover glow line */}
      <div
        className="absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full"
        style={{ background: color.accent }}
      />
    </div>
  );
}
