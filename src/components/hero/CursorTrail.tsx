"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}

const TRAIL_COLORS = [
  "rgba(255,45,123,0.8)",
  "rgba(180,74,255,0.8)",
  "rgba(77,124,255,0.7)",
  "rgba(255,68,204,0.8)",
];

const TRAIL_SHADOWS = [
  "0 0 6px 2px rgba(255,45,123,0.4)",
  "0 0 6px 2px rgba(180,74,255,0.4)",
  "0 0 6px 2px rgba(77,124,255,0.4)",
  "0 0 6px 2px rgba(255,68,204,0.4)",
];

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const [isTouch, setIsTouch] = useState(true); // default true (safe for SSR)
  const idCounter = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const colorIndex = useRef(0);

  useEffect(() => {
    // Detect touch device — no cursor trail on mobile/tablet
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
  }, []);

  useEffect(() => {
    if (isTouch) return; // Skip on touch devices

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 8) return;

      lastPos.current = { x: e.clientX, y: e.clientY };
      const ci = colorIndex.current++ % TRAIL_COLORS.length;
      const newParticle: TrailParticle = {
        id: idCounter.current++,
        x: e.clientX,
        y: e.clientY,
        color: TRAIL_COLORS[ci],
      };

      setTrail((prev) => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouch]);

  // Clean up old particles
  useEffect(() => {
    if (isTouch) return;
    const cleanup = setInterval(() => {
      setTrail((prev) => {
        if (prev.length === 0) return prev;
        return prev.slice(1);
      });
    }, 100);
    return () => clearInterval(cleanup);
  }, [isTouch]);

  // Don't render anything on touch devices
  if (isTouch) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((particle, i) => {
          const shadowIdx = i % TRAIL_SHADOWS.length;
          return (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: particle.x - 4,
                top: particle.y - 4,
                background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                boxShadow: TRAIL_SHADOWS[shadowIdx],
              }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 0, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
