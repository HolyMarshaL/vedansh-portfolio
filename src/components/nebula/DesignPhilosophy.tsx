"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PHILOSOPHY } from "@/lib/content";

export default function DesignPhilosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="nebula"
      className="relative min-h-screen py-24 px-6 sm:px-12 lg:px-24 overflow-hidden"
      ref={ref}
    >
      {/* Nebula background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, #b44aff, transparent 70%)",
            left: "10%",
            top: "20%",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, #00f0ff, transparent 70%)",
            right: "10%",
            bottom: "20%",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, #ff2d7b, transparent 70%)",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Section label */}
      <motion.div
        className="mb-16 relative z-10"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-[10px] tracking-[0.4em] text-neon-pink/40 uppercase mb-2"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          // Section 06
        </p>
        <h2
          className="text-3xl sm:text-5xl font-bold neon-text-pink"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          THE NEBULA
        </h2>
        <p
          className="mt-2 text-sm text-star-white/40 tracking-wider"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Design Philosophy
        </p>
      </motion.div>

      {/* Philosophy cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
        {PHILOSOPHY.map((item, i) => (
          <motion.div
            key={item.title}
            className="glass-card rounded-xl p-8 cursor-default group"
            style={{
              perspective: "1000px",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
            whileHover={{
              rotateX: -5,
              rotateY: 5,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${
                    ["#00f0ff", "#b44aff", "#ff2d7b", "#ff6b35"][i]
                  }20, transparent)`,
                  border: `1px solid ${
                    ["#00f0ff", "#b44aff", "#ff2d7b", "#ff6b35"][i]
                  }30`,
                }}
              >
                {["01", "02", "03", "04"][i]}
              </div>
              <div>
                <h3
                  className="text-lg font-bold text-star-white mb-2 group-hover:text-neon-cyan transition-colors"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs text-star-white/50"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Personal quote */}
      <motion.div
        className="max-w-3xl mx-auto mt-20 text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.blockquote
          className="text-xl sm:text-3xl font-light text-star-white/80 leading-relaxed"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          &ldquo;I don&apos;t just design interfaces.{" "}
          <span className="neon-text-cyan font-semibold">
            I build the universes
          </span>{" "}
          people live in every day.&rdquo;
        </motion.blockquote>
        <p
          className="mt-4 text-xs text-star-white/30 tracking-wider"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          &mdash; Vedansh Chauhan
        </p>
      </motion.div>
    </section>
  );
}
