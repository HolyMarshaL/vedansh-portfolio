"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "question" | "response" | "countdown" | "warp" | "done";

interface PreloaderProps {
  onComplete: () => void;
}

const TERMINAL_LINES = [
  "> LOADING DESIGN SYSTEMS.......... OK",
  "> CALIBRATING MICRO-INTERACTIONS.. OK",
  "> SYNCING CREATIVE ENGINES........ OK",
  "> ALL SYSTEMS NOMINAL",
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("question");
  const [countdown, setCountdown] = useState(5);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Generate floating particles on mount
  useEffect(() => {
    const pts = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(pts);
  }, []);

  const handleYesClick = useCallback(() => {
    setPhase("response");

    // After "You're cool. Kinda crazy!" shows, transition to countdown
    setTimeout(() => {
      setPhase("countdown");
    }, 2500);
  }, []);

  // Countdown logic
  useEffect(() => {
    if (phase !== "countdown") return;

    // Start showing terminal lines
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, line]);
      }, i * 400);
    });

    // Start countdown after a brief pause
    const startDelay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            // Trigger warp phase
            setTimeout(() => setPhase("warp"), 300);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 600);

    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase]);

  // Warp phase → done
  useEffect(() => {
    if (phase !== "warp") return;
    const timeout = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1500);
    return () => clearTimeout(timeout);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-space-black overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-[2px] h-[2px] rounded-full bg-neon-cyan/30"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Phase 1: The Question */}
        <AnimatePresence mode="wait">
          {phase === "question" && (
            <motion.div
              key="question"
              className="flex flex-col items-center gap-10 px-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-2xl sm:text-4xl md:text-5xl font-light tracking-wide"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <span className="text-star-white">Are you ready to go on an</span>
                <br />
                <span className="neon-text-cyan font-semibold">epic adventure</span>
                <span className="text-star-white">?</span>
              </motion.h1>

              <motion.div
                className="flex gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <button
                  onClick={handleYesClick}
                  className="group relative px-10 py-4 text-lg font-semibold text-space-black bg-neon-cyan rounded-lg
                    transition-all duration-300 hover:scale-105 active:scale-95
                    hover:shadow-[0_0_20px_rgba(0,240,255,0.5),0_0_40px_rgba(0,240,255,0.3)]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  <span className="relative z-10">YES</span>
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-neon-cyan"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </button>

                <button
                  onClick={handleYesClick}
                  className="group relative px-10 py-4 text-lg font-semibold text-space-black bg-neon-cyan rounded-lg
                    transition-all duration-300 hover:scale-105 active:scale-95
                    hover:shadow-[0_0_20px_rgba(0,240,255,0.5),0_0_40px_rgba(0,240,255,0.3)]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  <span className="relative z-10">YES</span>
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-neon-cyan"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Phase 2: The Response */}
          {phase === "response" && (
            <motion.div
              key="response"
              className="flex flex-col items-center gap-4 px-6 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="text-3xl sm:text-5xl md:text-6xl font-bold neon-text-cyan"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                You&apos;re cool.
              </motion.p>
              <motion.p
                className="text-3xl sm:text-5xl md:text-6xl font-bold neon-text-purple"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                Kinda crazy!
              </motion.p>
            </motion.div>
          )}

          {/* Phase 3: The Countdown */}
          {phase === "countdown" && (
            <motion.div
              key="countdown"
              className="flex flex-col items-center gap-8 px-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Mission header */}
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p
                  className="text-xs sm:text-sm tracking-[0.3em] text-neon-cyan/60 uppercase"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  Mission: VEDANSH.SPACE
                </p>
                <p
                  className="text-xs tracking-[0.2em] text-star-white/40 uppercase"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  Initiating Launch Sequence...
                </p>
              </motion.div>

              {/* The Big Number */}
              <motion.div
                key={countdown}
                className="relative"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {countdown > 0 ? (
                  <span
                    className="text-[20vw] sm:text-[15vw] font-bold leading-none neon-text-cyan"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    T-{countdown}
                  </span>
                ) : (
                  <motion.span
                    className="text-[15vw] sm:text-[12vw] font-bold leading-none neon-text-pink"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    LAUNCH
                  </motion.span>
                )}

                {/* Pulse rings on each count */}
                <motion.div
                  key={`ring-${countdown}`}
                  className="absolute inset-0 rounded-full border-2 border-neon-cyan/30"
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </motion.div>

              {/* Terminal lines */}
              <div
                className="text-left max-w-md w-full"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {terminalLines.map((line, i) => (
                  <motion.p
                    key={i}
                    className="text-[10px] sm:text-xs text-neon-cyan/50"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Phase 4: Warp Speed */}
          {phase === "warp" && (
            <motion.div
              key="warp"
              className="fixed inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Warp lines */}
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i / 60) * 360;
                const rad = (angle * Math.PI) / 180;
                return (
                  <motion.div
                    key={i}
                    className="absolute h-[1px] bg-gradient-to-r from-neon-cyan via-neon-purple to-transparent"
                    style={{
                      width: "2px",
                      left: "50%",
                      top: "50%",
                      transformOrigin: "left center",
                      rotate: `${angle}deg`,
                    }}
                    initial={{ width: "2px", opacity: 0 }}
                    animate={{
                      width: ["2px", "60vw"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: Math.random() * 0.3,
                      ease: "easeIn",
                    }}
                  />
                );
              })}

              {/* Central flash */}
              <motion.div
                className="absolute w-8 h-8 rounded-full bg-star-white"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 100] }}
                transition={{ duration: 1.2, ease: "easeIn", delay: 0.5 }}
                style={{
                  boxShadow: "0 0 60px 30px rgba(240,240,255,0.8)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
