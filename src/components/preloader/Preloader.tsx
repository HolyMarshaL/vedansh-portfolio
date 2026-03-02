"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WarpCanvas from "./WarpCanvas";

type Phase = "question" | "response" | "countdown" | "warp" | "done";

interface PreloaderProps {
  onStart: () => void;
  onComplete: () => void;
}

interface PreloaderMeteor {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  tailLength: number;
  color: string;
  distance: number;
}

const TERMINAL_LINES = [
  "> LOADING DESIGN SYSTEMS.......... OK",
  "> CALIBRATING MICRO-INTERACTIONS.. OK",
  "> SYNCING CREATIVE ENGINES........ OK",
  "> ALL SYSTEMS NOMINAL",
];

const METEOR_COLORS = ["#ff2d7b", "#b44aff", "#4d7cff", "#ff44cc", "#ffffff"];
const PARTICLE_COLORS = [
  "rgba(255,45,123,0.4)",
  "rgba(180,74,255,0.4)",
  "rgba(77,124,255,0.4)",
  "rgba(255,68,204,0.35)",
];

export default function Preloader({ onStart, onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("question");
  const [countdown, setCountdown] = useState(5);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number; size: number; color: string }>
  >([]);
  const [meteors, setMeteors] = useState<PreloaderMeteor[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [launchZoomActive, setLaunchZoomActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const meteorIdRef = useRef(0);
  const onStartRef = useRef(onStart);
  const onCompleteRef = useRef(onComplete);
  onStartRef.current = onStart;
  onCompleteRef.current = onComplete;

  // Generate floating particles on mount
  useEffect(() => {
    const pts = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() > 0.85 ? 3 : 2,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    }));
    setParticles(pts);
  }, []);

  // Mouse parallax tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,  // -1 to 1
        y: (e.clientY / window.innerHeight - 0.5) * 2, // -1 to 1
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Meteor spawning
  const spawnMeteor = useCallback(() => {
    const angle = 120 + Math.random() * 40;
    const m: PreloaderMeteor = {
      id: meteorIdRef.current++,
      startX: 50 + Math.random() * 45,
      startY: 2 + Math.random() * 20,
      angle,
      speed: 1.4 + Math.random() * 0.8,
      tailLength: 120 + Math.random() * 100,
      color: METEOR_COLORS[Math.floor(Math.random() * METEOR_COLORS.length)],
      distance: 800 + Math.random() * 400,
    };
    setMeteors((prev) => [...prev, m]);
    setTimeout(() => setMeteors((prev) => prev.filter((x) => x.id !== m.id)), 4000);
  }, []);

  useEffect(() => {
    spawnMeteor();
    const id = setInterval(() => spawnMeteor(), 4000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, [spawnMeteor]);

  const handleYesClick = useCallback(() => {
    setPhase("response");
    setTimeout(() => setPhase("countdown"), 2500);
  }, []);

  // Countdown logic
  useEffect(() => {
    if (phase !== "countdown") return;

    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setTerminalLines((prev) => [...prev, line]), i * 400);
    });

    const startDelay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
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

  // When countdown reaches 0 → activate LAUNCH zoom overlay + mount content
  useEffect(() => {
    if (countdown !== 0 || phase !== "countdown") return;
    setLaunchZoomActive(true);
    onStartRef.current(); // mount content in background NOW
    const warpTimer = setTimeout(() => setPhase("warp"), 250);
    return () => clearTimeout(warpTimer);
  }, [countdown, phase]);

  // Warp phase: wormhole only (zoom is handled by the launchZoomActive overlay)
  useEffect(() => {
    if (phase !== "warp") return;
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onCompleteRef.current();
    }, 1900);
    return () => clearTimeout(doneTimer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-space-black overflow-hidden"
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.55 }}
      >
        {/* ── Layer 1: Parallax star particles — moves OPPOSITE to mouse (depth) ── */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -8}px)`,
            transition: "transform 0.8s ease-out",
          }}
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* ── Layer 2: Meteors ── */}
        <AnimatePresence>
          {meteors.map((meteor) => {
            const rad = (meteor.angle * Math.PI) / 180;
            return (
              <motion.div
                key={`meteor-${meteor.id}`}
                className="absolute pointer-events-none z-[1]"
                style={{ left: `${meteor.startX}%`, top: `${meteor.startY}%` }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: Math.cos(rad) * meteor.distance,
                  y: Math.sin(rad) * meteor.distance,
                  opacity: [0, 1, 1, 0.3, 0],
                }}
                transition={{ duration: meteor.speed, ease: "linear" }}
              >
                <div style={{ transform: `rotate(${meteor.angle}deg)`, transformOrigin: "right center" }}>
                  {/* Gradient tail */}
                  <div
                    style={{
                      width: `${meteor.tailLength}px`,
                      height: "2px",
                      background: `linear-gradient(90deg, transparent 0%, ${meteor.color}20 15%, ${meteor.color}70 55%, ${meteor.color} 100%)`,
                      borderRadius: "1px",
                      filter: `drop-shadow(0 0 3px ${meteor.color}90)`,
                    }}
                  />
                  {/* Glowing head */}
                  <div
                    style={{
                      position: "absolute",
                      right: "-4px",
                      top: "-3px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: `radial-gradient(circle, #ffffff 15%, ${meteor.color} 50%, transparent 100%)`,
                      boxShadow: `0 0 10px 3px ${meteor.color}, 0 0 22px 6px ${meteor.color}50`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* ── Content phases ── */}
        <AnimatePresence mode="wait">

          {/* ── PHASE 1: Question ── */}
          {phase === "question" && (
            <motion.div
              key="question"
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Inner div carries the parallax — moves WITH mouse */}
              <div
                className="flex flex-col items-center gap-12 px-6 text-center"
                style={{
                  transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 10}px)`,
                  transition: "transform 0.3s ease-out",
                }}
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
                  <span className="gradient-text-glow font-semibold">epic adventure</span>
                  <span className="text-star-white">?</span>
                </motion.h1>

                {/* Single YES! CTA */}
                <motion.button
                  onClick={handleYesClick}
                  className="relative px-16 py-5 text-xl font-bold text-white rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    background: "linear-gradient(135deg, #ff2d7b, #b44aff, #4d7cff)",
                    letterSpacing: "0.2em",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 0 30px rgba(255,45,123,0.7), 0 0 60px rgba(180,74,255,0.5), 0 0 90px rgba(77,124,255,0.3)",
                  }}
                  whileTap={{ scale: 0.94 }}
                >
                  <span className="relative z-10">YES!</span>

                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-1/2"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
                      skewX: "-12deg",
                    }}
                    animate={{ x: ["-110%", "290%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
                  />

                  {/* Outer glow pulse */}
                  <motion.div
                    className="absolute inset-0 rounded-xl -z-10"
                    style={{
                      background: "linear-gradient(135deg, #ff2d7b, #b44aff, #4d7cff)",
                      filter: "blur(14px)",
                    }}
                    animate={{ opacity: [0.3, 0.75, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── PHASE 2: Response ── */}
          {phase === "response" && (
            <motion.div
              key="response"
              className="flex flex-col items-center gap-4 px-6 text-center relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="text-3xl sm:text-5xl md:text-6xl font-bold neon-text-pink"
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

          {/* ── PHASE 3: Countdown ── */}
          {phase === "countdown" && (
            <motion.div
              key="countdown"
              className="flex flex-col items-center gap-8 px-6 text-center relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Mission text — fades out when zoom starts */}
              <motion.div
                className="flex flex-col items-center gap-2"
                animate={{
                  opacity: launchZoomActive ? 0 : 1,
                  y: launchZoomActive ? -10 : 0,
                }}
                transition={{ duration: launchZoomActive ? 0.2 : 0.5 }}
              >
                <p className="text-xs sm:text-sm tracking-[0.3em] text-neon-purple/60 uppercase" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  Mission: VEDANSH.SPACE
                </p>
                <p className="text-xs tracking-[0.2em] text-star-white/40 uppercase" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  Initiating Launch Sequence...
                </p>
              </motion.div>

              <motion.div
                key={countdown}
                className="relative"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {countdown > 0 ? (
                  <span className="text-[20vw] sm:text-[15vw] font-bold leading-none gradient-text-glow" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    T-{countdown}
                  </span>
                ) : (
                  /* Matches zoom overlay starting state exactly — invisible swap */
                  <span
                    className="neon-text-pink font-bold whitespace-nowrap leading-none"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontSize: "clamp(80px, 18vw, 200px)",
                    }}
                  >
                    LAUNCH
                  </span>
                )}
                {!launchZoomActive && (
                  <motion.div
                    key={`ring-${countdown}`}
                    className="absolute inset-0 rounded-full border-2 border-neon-pink/30"
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                )}
              </motion.div>

              {/* Terminal lines — fade out when zooming */}
              <motion.div
                className="text-left max-w-md w-full"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                animate={{ opacity: launchZoomActive ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {terminalLines.map((line, i) => (
                  <motion.p
                    key={i}
                    className="text-[10px] sm:text-xs text-neon-purple/50"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ── PHASE 4: WORMHOLE — single canvas, one GPU layer ── */}
          {phase === "warp" && (
            <motion.div
              key="warp"
              className="fixed inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              <WarpCanvas duration={1300} />
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── LAUNCH ZOOM OVERLAY — sits on top of everything, seamless from countdown ── */}
        {/* This is the ONLY zoom element — no separate "static LAUNCH" then "zooming LAUNCH". */}
        {/* It starts at scale 1 (matching the countdown LAUNCH text exactly) and continuously */}
        {/* scales to 8× to guarantee full-screen coverage before fading to reveal wormhole. */}
        {launchZoomActive && (
          <motion.div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.span
              className="neon-text-pink font-bold whitespace-nowrap select-none"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(80px, 18vw, 200px)",
                lineHeight: 1,
                willChange: "transform, opacity",
              }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 8, opacity: [1, 1, 1, 0] }}
              transition={{
                scale: { duration: 1.2, ease: [0.35, 0, 0.65, 1] },
                opacity: { duration: 1.2, times: [0, 0.55, 0.82, 1], ease: "easeIn" },
              }}
            >
              LAUNCH
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
