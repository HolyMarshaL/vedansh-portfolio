"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import StarField from "./StarField";
import CursorTrail from "./CursorTrail";
import HeroDynamicElements from "./HeroDynamicElements";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";

export default function Hero({ showDynamicElements = true }: { showDynamicElements?: boolean }) {
  const mouse = useMousePosition();
  const deviceOrientation = useDeviceOrientation();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile: use gyroscope (or zeros for auto-rotate). On desktop: use mouse.
  const parallaxX = isMobile ? deviceOrientation.normalizedX : mouse.normalizedX;
  const parallaxY = isMobile ? deviceOrientation.normalizedY : mouse.normalizedY;

  // Fewer stars on mobile for performance
  const starCount = isMobile ? 1200 : 3000;

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
                count={starCount}
                mouseX={parallaxX}
                mouseY={parallaxY}
                isMobile={isMobile}
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

      {/* Dynamic Hero Elements — gated until arrival animation completes */}
      {mounted && showDynamicElements && <HeroDynamicElements isMobile={isMobile} />}

      {/* Cursor Trail — desktop only (no cursor on touch) */}
      {!isMobile && <CursorTrail />}

      {/* Gyroscope hint on mobile (shows briefly then fades) */}
      {mounted && isMobile && deviceOrientation.isActive && (
        <motion.div
          className="absolute top-6 right-6 z-20 flex items-center gap-2 pointer-events-none"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: 4, delay: 2, times: [0, 0.2, 0.8, 1] }}
        >
          <span
            className="text-[9px] tracking-widest text-neon-purple/60 uppercase"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Tilt to explore
          </span>
          <span className="text-neon-purple/40 text-xs">↗</span>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Name */}
        <motion.h1
          className="text-[13vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] font-bold leading-[0.9] tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <span className="block gradient-text-glow">VEDANSH</span>
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
          className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl tracking-[0.2em] sm:tracking-[0.25em] text-star-white/70 uppercase"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Commander Design
        </motion.p>

        <motion.p
          className="mt-2 text-xs sm:text-base tracking-[0.12em] sm:tracking-[0.15em] neon-text-purple"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            opacity: 0.7,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Building Digital Universes
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mt-6 sm:mt-8 h-[1px] bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1.2, delay: 1.5 }}
        />

        {/* Floating tool icons */}
        <motion.div
          className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-xs sm:max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          {["Figma", "Framer", "Vibe Coding with AI", "Lottie", "Mixpanel"].map(
            (tool, i) => {
              const colors = ["#ff2d7b", "#b44aff", "#4d7cff", "#ff44cc", "#ff6b35"];
              const color = colors[i % colors.length];
              return (
                <motion.span
                  key={tool}
                  className="px-2.5 py-1 text-[9px] sm:text-[10px] tracking-wider rounded-full"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    color: `${color}90`,
                    border: `1px solid ${color}25`,
                  }}
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
              );
            }
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <motion.p
          className="text-[9px] sm:text-[10px] tracking-[0.3em] text-neon-pink/40 uppercase"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Begin the Voyage
        </motion.p>
        <motion.div
          className="w-5 h-8 rounded-full border border-neon-purple/30 flex justify-center pt-2"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-neon-pink/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
