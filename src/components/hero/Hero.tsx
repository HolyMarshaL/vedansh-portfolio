"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import StarField from "./StarField";
import CursorTrail from "./CursorTrail";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function Hero() {
  const mouse = useMousePosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* 3D Star Field Background */}
      {mounted && (
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 20], fov: 75 }}
            style={{ background: "transparent" }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <StarField
                count={3000}
                mouseX={mouse.normalizedX}
                mouseY={mouse.normalizedY}
              />
              <ambientLight intensity={0.1} />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Radial gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, #06060a 80%)",
        }}
      />

      {/* Cursor Trail */}
      <CursorTrail />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Name */}
        <motion.h1
          className="text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] font-bold leading-[0.9] tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <span
            className="block"
            style={{
              color: "#00f0ff",
              textShadow:
                "0 0 10px rgba(0,240,255,0.5), 0 0 20px rgba(0,240,255,0.3), 0 0 40px rgba(0,240,255,0.15)",
            }}
          >
            VEDANSH
          </span>
          <span
            className="block"
            style={{
              color: "#f0f0ff",
              textShadow:
                "0 0 10px rgba(240,240,255,0.3), 0 0 20px rgba(240,240,255,0.15)",
            }}
          >
            CHAUHAN
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-base sm:text-lg md:text-xl tracking-[0.25em] text-star-white/70 uppercase"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Sr. Product Designer
        </motion.p>

        <motion.p
          className="mt-2 text-sm sm:text-base tracking-[0.15em] text-neon-cyan/60"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Building Digital Universes
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1.2, delay: 1.5 }}
        />

        {/* Floating tool icons as text badges */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          {["Figma", "Framer", "Adobe XD", "Lottie", "Mixpanel"].map(
            (tool, i) => (
              <motion.span
                key={tool}
                className="px-3 py-1 text-[10px] sm:text-xs tracking-wider text-neon-cyan/40 border border-neon-cyan/10 rounded-full"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              >
                {tool}
              </motion.span>
            )
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <motion.p
          className="text-[10px] tracking-[0.3em] text-neon-cyan/40 uppercase"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Begin the Voyage
        </motion.p>
        <motion.div
          className="w-5 h-8 rounded-full border border-neon-cyan/30 flex justify-center pt-2"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-neon-cyan/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
