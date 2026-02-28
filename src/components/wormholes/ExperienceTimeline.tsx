"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { EXPERIENCE } from "@/lib/content";

export default function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePortal, setActivePortal] = useState<string | null>(null);

  const activeExp = EXPERIENCE.find((e) => e.id === activePortal);

  return (
    <section
      id="wormholes"
      className="relative min-h-screen py-24 px-6 sm:px-12 lg:px-24 overflow-hidden"
      ref={ref}
    >
      {/* Section label */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-[10px] tracking-[0.4em] text-neon-purple/40 uppercase mb-2"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          // Section 04
        </p>
        <h2
          className="text-3xl sm:text-5xl font-bold gradient-text-glow"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          THE VOYAGE
        </h2>
        <p
          className="mt-2 text-sm text-star-white/40 tracking-wider"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Dimensions Traversed
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto relative">
        {/* Central line */}
        <motion.div
          className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-neon-pink/50 via-neon-purple/30 to-neon-blue/50"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 2, delay: 0.3 }}
          style={{ transformOrigin: "top" }}
        />

        {/* Traveling light dot */}
        {isInView && (
          <motion.div
            className="absolute left-6 sm:left-1/2 w-2 h-2 -ml-1 rounded-full bg-neon-pink"
            style={{ boxShadow: "0 0 10px rgba(255,45,123,0.8)" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Experience entries */}
        {EXPERIENCE.map((exp, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={exp.id}
              className={`relative flex items-start mb-16 sm:mb-24 ${
                isLeft
                  ? "sm:flex-row pl-16 sm:pl-0"
                  : "sm:flex-row-reverse pl-16 sm:pl-0"
              }`}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
            >
              {/* Wormhole node */}
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-10">
                <button
                  onClick={() =>
                    setActivePortal(activePortal === exp.id ? null : exp.id)
                  }
                  className="relative group"
                >
                  <motion.div
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300"
                    style={{
                      borderColor: exp.color,
                      boxShadow: `0 0 15px ${exp.color}40`,
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Inner swirl */}
                    <motion.div
                      className="w-6 h-6 rounded-full"
                      style={{
                        background: `conic-gradient(from 0deg, ${exp.color}, transparent, ${exp.color})`,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>

                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: `${exp.color}40` }}
                    animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </button>
              </div>

              {/* Card */}
              <div
                className={`w-full sm:w-[calc(50%-40px)] ${
                  isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:text-left"
                }`}
              >
                <motion.div
                  className="glass-card rounded-lg p-6 cursor-pointer transition-all duration-300"
                  onClick={() =>
                    setActivePortal(activePortal === exp.id ? null : exp.id)
                  }
                  whileHover={{ y: -4 }}
                  style={{
                    ["--hover-color" as string]: exp.color,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 5px ${exp.color}40, 0 0 10px ${exp.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <p
                    className="text-[9px] tracking-[0.3em] uppercase mb-1"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      color: `${exp.color}80`,
                    }}
                  >
                    STARDATE: {exp.stardate}
                  </p>
                  <h3
                    className="text-xl sm:text-2xl font-bold text-star-white mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {exp.company}
                  </h3>
                  <p
                    className="text-xs text-star-white/50 mb-3"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {exp.role} &middot; {exp.period}
                  </p>

                  {/* Metrics */}
                  <div
                    className={`flex flex-wrap gap-2 ${
                      isLeft ? "sm:justify-end" : "sm:justify-start"
                    }`}
                  >
                    {exp.metrics.map((m) => (
                      <span
                        key={m.label}
                        className="px-2 py-1 text-[10px] rounded-md font-semibold"
                        style={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          color: exp.color,
                          background: `${exp.color}15`,
                          border: `1px solid ${exp.color}30`,
                        }}
                      >
                        {m.label}: {m.value}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Portal Overlay */}
      <AnimatePresence>
        {activeExp && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-space-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePortal(null)}
          >
            <motion.div
              className="max-w-xl w-full glass-card rounded-2xl p-8 relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                border: `1px solid ${activeExp.color}30`,
                boxShadow: `0 0 30px ${activeExp.color}20`,
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setActivePortal(null)}
                className="absolute top-4 right-4 text-star-white/40 hover:text-star-white text-xl transition-colors"
              >
                &times;
              </button>

              <p
                className="text-[9px] tracking-[0.3em] uppercase mb-2"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  color: `${activeExp.color}80`,
                }}
              >
                STARDATE: {activeExp.stardate}
              </p>

              <h3
                className="text-3xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color: activeExp.color,
                  textShadow: `0 0 10px ${activeExp.color}40`,
                }}
              >
                {activeExp.company}
              </h3>

              <p
                className="text-sm text-star-white/50 mb-6"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {activeExp.role}
              </p>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {activeExp.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="p-3 rounded-lg text-center"
                    style={{
                      background: `${activeExp.color}10`,
                      border: `1px solid ${activeExp.color}20`,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <p
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        color: activeExp.color,
                      }}
                    >
                      {m.value}
                    </p>
                    <p
                      className="text-[9px] text-star-white/40 tracking-wider uppercase mt-1"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      {m.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p
                className="text-xs text-star-white/60 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {activeExp.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {activeExp.highlights.map((h) => (
                  <span
                    key={h}
                    className="px-2 py-1 text-[9px] rounded-full tracking-wider"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      color: `${activeExp.color}90`,
                      border: `1px solid ${activeExp.color}25`,
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
