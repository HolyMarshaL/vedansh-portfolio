"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { SKILLS } from "@/lib/content";

const CONSTELLATION_COLORS = [
  "#ff2d7b",
  "#b44aff",
  "#4d7cff",
  "#ff44cc",
  "#ff6b35",
  "#4d7cff",
  "#00f0ff",
];

const CONSTELLATION_POSITIONS: Record<
  string,
  { x: number; y: number; stars: Array<{ x: number; y: number }> }
> = {
  designer: {
    x: 15,
    y: 25,
    stars: [
      { x: 12, y: 18 },
      { x: 18, y: 22 },
      { x: 14, y: 30 },
      { x: 20, y: 28 },
    ],
  },
  researcher: {
    x: 45,
    y: 15,
    stars: [
      { x: 42, y: 10 },
      { x: 48, y: 14 },
      { x: 45, y: 20 },
    ],
  },
  toolsmith: {
    x: 78,
    y: 22,
    stars: [
      { x: 74, y: 16 },
      { x: 80, y: 20 },
      { x: 76, y: 26 },
      { x: 82, y: 24 },
      { x: 78, y: 28 },
    ],
  },
  strategist: {
    x: 25,
    y: 65,
    stars: [
      { x: 22, y: 60 },
      { x: 28, y: 62 },
      { x: 24, y: 68 },
      { x: 30, y: 70 },
    ],
  },
  analyst: {
    x: 55,
    y: 60,
    stars: [
      { x: 52, y: 55 },
      { x: 58, y: 58 },
      { x: 54, y: 64 },
      { x: 60, y: 62 },
    ],
  },
  builder: {
    x: 80,
    y: 65,
    stars: [
      { x: 77, y: 60 },
      { x: 83, y: 63 },
      { x: 80, y: 70 },
    ],
  },
  wanderer: {
    x: 50,
    y: 43,
    stars: [
      { x: 46, y: 39 },
      { x: 52, y: 37 },
      { x: 55, y: 43 },
      { x: 49, y: 47 },
      { x: 53, y: 49 },
    ],
  },
};

export default function ConstellationMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());
  const [activeConstellation, setActiveConstellation] = useState<string | null>(
    null
  );

  const handleDiscover = (key: string) => {
    setDiscovered((prev) => new Set([...prev, key]));
    setActiveConstellation(activeConstellation === key ? null : key);
  };

  const skillEntries = Object.entries(SKILLS) as [
    keyof typeof SKILLS,
    (typeof SKILLS)[keyof typeof SKILLS],
  ][];

  return (
    <section
      id="constellation"
      className="relative min-h-screen py-16 sm:py-24 px-5 sm:px-12 lg:px-24 overflow-hidden"
      ref={ref}
    >
      {/* Section label */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-[10px] tracking-[0.4em] text-neon-purple/40 uppercase mb-2"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          // Section 03
        </p>
        <h2
          className="text-3xl sm:text-5xl font-bold gradient-text-glow"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          CONSTELLATION MAP
        </h2>
        <p
          className="mt-2 text-sm text-star-white/40 tracking-wider"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Skills & Arsenal
        </p>
      </motion.div>

      {/* Discovery counter */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <p
          className="text-xs tracking-[0.3em] text-neon-purple/50"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          CONSTELLATIONS DISCOVERED:{" "}
          <span className="text-neon-pink font-bold">{discovered.size}</span>
          /7
        </p>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          MOBILE VIEW: Tap-to-reveal card grid
          (hidden on md+ where the star map takes over)
          ═══════════════════════════════════════════════ */}
      <div className="block md:hidden">
        <div className="grid grid-cols-2 gap-3">
          {skillEntries.map(([key, data], index) => {
            const color = CONSTELLATION_COLORS[index % CONSTELLATION_COLORS.length];
            const isActive = activeConstellation === key;
            const isDiscoveredItem = discovered.has(key);

            return (
              <motion.div
                key={`mobile-${key}`}
                className="relative rounded-xl p-4 cursor-pointer overflow-hidden"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${color}12, ${color}06)`
                    : "rgba(13,17,23,0.8)",
                  border: `1px solid ${isActive ? color + "50" : color + "18"}`,
                  backdropFilter: "blur(10px)",
                  boxShadow: isActive ? `0 0 20px ${color}15` : "none",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onClick={() => handleDiscover(key)}
              >
                {/* Mini constellation dots */}
                <div className="flex gap-1 mb-3 flex-wrap">
                  {data.skills.slice(0, 5).map((_, i) => (
                    <motion.div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: i === 0 ? "6px" : "4px",
                        height: i === 0 ? "6px" : "4px",
                        background: color,
                        opacity: isDiscoveredItem ? 1 : 0.35,
                        boxShadow: isDiscoveredItem ? `0 0 4px ${color}` : "none",
                      }}
                      animate={
                        isDiscoveredItem
                          ? { opacity: [0.6, 1, 0.6], scale: [0.9, 1.2, 0.9] }
                          : {}
                      }
                      transition={{
                        duration: 1.5 + i * 0.4,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>

                {/* Name */}
                <h3
                  className="font-bold text-sm mb-1 leading-tight"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: isActive ? color : `${color}cc`,
                    textShadow: isActive ? `0 0 8px ${color}60` : "none",
                  }}
                >
                  {data.name}
                </h3>

                {/* Status */}
                <p
                  className="text-[9px] tracking-wider"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    color: isDiscoveredItem ? `${color}80` : "rgba(240,240,255,0.25)",
                  }}
                >
                  {isDiscoveredItem
                    ? `${data.skills.length} skills`
                    : "tap to map"}
                </p>

                {/* Expanded skills */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="mt-3 flex flex-wrap gap-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {data.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-1.5 py-0.5 text-[8px] rounded-md"
                          style={{
                            fontFamily: "var(--font-jetbrains-mono)",
                            color: `${color}dd`,
                            border: `1px solid ${color}30`,
                            background: `${color}10`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Discovered glow overlay */}
                {isDiscoveredItem && (
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ boxShadow: `inset 0 0 16px ${color}08` }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* All-discovered celebration */}
        <AnimatePresence>
          {discovered.size === 7 && (
            <motion.div
              className="mt-6 text-center py-4 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,45,123,0.1), rgba(180,74,255,0.1))",
                border: "1px solid rgba(255,45,123,0.2)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p
                className="text-sm gradient-text-glow font-bold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                All Constellations Mapped ✦
              </p>
              <p
                className="text-[9px] text-star-white/30 mt-1 tracking-wider"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                You&apos;ve charted the entire skill universe
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════
          DESKTOP VIEW: Interactive SVG star map
          (hidden on mobile, visible on md+)
          ═══════════════════════════════════════════════ */}
      <div className="hidden md:block">
        <div className="relative w-full max-w-5xl mx-auto aspect-[16/10]">
          {/* Background stars */}
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={`bg-star-${i}`}
              className="absolute w-[1px] h-[1px] bg-star-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* Constellations */}
          {skillEntries.map(([key, data], index) => {
            const pos = CONSTELLATION_POSITIONS[key];
            const isActive = activeConstellation === key;
            const isDiscoveredItem = discovered.has(key);
            const color = CONSTELLATION_COLORS[index % CONSTELLATION_COLORS.length];
            const dimColor = `${color}80`;
            const veryDimColor = `${color}40`;

            return (
              <motion.div
                key={key}
                className="absolute cursor-pointer group"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.15 }}
                onClick={() => handleDiscover(key)}
              >
                {/* Stars of the constellation */}
                <svg
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  width="200"
                  height="150"
                  viewBox="-100 -75 200 150"
                  style={{ overflow: "visible" }}
                >
                  {/* Lines between stars */}
                  {pos.stars.map((star, si) => {
                    if (si === pos.stars.length - 1) return null;
                    const next = pos.stars[si + 1];
                    return (
                      <motion.line
                        key={`line-${si}`}
                        x1={(star.x - pos.x) * 10}
                        y1={(star.y - pos.y) * 10}
                        x2={(next.x - pos.x) * 10}
                        y2={(next.y - pos.y) * 10}
                        stroke={isDiscoveredItem ? color : veryDimColor}
                        strokeWidth={0.5}
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : {}}
                        transition={{ duration: 1, delay: 1 + index * 0.2 }}
                      />
                    );
                  })}

                  {/* Star points */}
                  {pos.stars.map((star, si) => (
                    <motion.circle
                      key={`star-${si}`}
                      cx={(star.x - pos.x) * 10}
                      cy={(star.y - pos.y) * 10}
                      r={isActive ? 4 : 2.5}
                      fill={isDiscoveredItem ? color : dimColor}
                      animate={{
                        r: isActive ? [3, 5, 3] : [2, 3, 2],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2 + si * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </svg>

                {/* Constellation label */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap text-center"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.5 + index * 0.15 }}
                >
                  <p
                    className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      color: isActive ? color : `${color}50`,
                      textShadow: isActive
                        ? `0 0 10px ${color}80`
                        : "none",
                    }}
                  >
                    {data.name}
                  </p>
                </motion.div>

                {/* Expanded skill card */}
                {isActive && (
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 mt-10 glass-card rounded-lg p-4 z-20 min-w-[200px]"
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      border: `1px solid ${color}30`,
                      boxShadow: `0 0 20px ${color}15`,
                    }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-[9px] rounded-md"
                          style={{
                            fontFamily: "var(--font-jetbrains-mono)",
                            color: `${color}cc`,
                            border: `1px solid ${color}30`,
                            background: `${color}08`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
