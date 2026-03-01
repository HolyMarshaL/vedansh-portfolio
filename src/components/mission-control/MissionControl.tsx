"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import StatCounter from "./StatCounter";
import { STATS, BIO } from "@/lib/content";

export default function MissionControl() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="mission-control"
      className="relative min-h-screen py-24 px-6 sm:px-12 lg:px-24 hud-grid overflow-hidden"
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
          // Section 02
        </p>
        <h2
          className="text-3xl sm:text-5xl font-bold gradient-text-glow"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          MISSION CONTROL
        </h2>
        <p
          className="mt-2 text-sm text-star-white/40 tracking-wider"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          The Commander&apos;s Brief
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Holographic Photo + Bio */}
        <motion.div
          className="flex flex-col items-center lg:items-start gap-8"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Holographic frame — portrait rectangle */}
          <div className="relative">
            <div
              className="w-48 sm:w-56 rounded-xl overflow-hidden scan-lines relative"
              style={{ height: "320px" }}
            >
              {/* Photo */}
              <Image
                src="/images/vedansh.png"
                alt="Vedansh Chauhan"
                fill
                className="object-cover object-top"
                priority
              />

              {/* Scan line overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent pointer-events-none"
                animate={{ y: ["-100%", "100%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ height: "30%" }}
              />

              {/* Bottom gradient fade */}
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-space-black/60 to-transparent pointer-events-none" />
            </div>

            {/* Glow border */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                boxShadow:
                  "0 0 15px rgba(180,74,255,0.3), inset 0 0 15px rgba(255,45,123,0.1)",
              }}
            />
          </div>

          {/* Bio terminal */}
          <motion.div
            className="w-full glass-card rounded-lg p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-neon-pink/60" />
              <p
                className="text-[9px] tracking-[0.3em] text-neon-purple/40 uppercase"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                commander_brief.log
              </p>
            </div>
            <p
              className="text-xs sm:text-sm text-star-white/70 leading-relaxed"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              {BIO}
            </p>
          </motion.div>
        </motion.div>

        {/* Right: Stats Dashboard */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {STATS.map((stat, i) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              prefix={"prefix" in stat ? stat.prefix : ""}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 200}
              colorIndex={i}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="mt-24 mx-auto h-[1px] bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: "80%" } : {}}
        transition={{ duration: 2, delay: 1 }}
        style={{ maxWidth: "600px" }}
      />
    </section>
  );
}
