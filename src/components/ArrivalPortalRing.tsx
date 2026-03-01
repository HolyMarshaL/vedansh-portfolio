"use client";

import { motion } from "framer-motion";

// Cinematic portal ring — renders on top of the hero during the warp→hero transition.
// The ring expands from center in sync with the clip-path circle opening on the
// content wrapper in page.tsx, creating the "punching through a wormhole" arrival feel.
export default function ArrivalPortalRing() {
  return (
    <div className="fixed inset-0 z-[88] flex items-center justify-center pointer-events-none overflow-hidden">

      {/* Outer neon glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          border: "1.5px solid #b44aff",
          boxShadow:
            "0 0 20px 4px #b44aff90, 0 0 50px 10px #ff2d7b50, 0 0 90px 20px #4d7cff30",
        }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ width: "165vw", height: "165vw", opacity: [0, 1, 0.7, 0] }}
        transition={{
          width:   { duration: 0.92, ease: [0.2, 0, 0.15, 1] },
          height:  { duration: 0.92, ease: [0.2, 0, 0.15, 1] },
          opacity: { duration: 0.92, times: [0, 0.08, 0.65, 1] },
        }}
      />

      {/* Inner bright white ring — brief flash at the portal edge */}
      <motion.div
        className="absolute rounded-full"
        style={{
          border: "3px solid rgba(255,255,255,0.85)",
          boxShadow: "0 0 12px 3px rgba(255,255,255,0.6), 0 0 35px 8px #b44aff70",
        }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ width: "165vw", height: "165vw", opacity: [0, 0.7, 0] }}
        transition={{
          width:   { duration: 0.92, ease: [0.2, 0, 0.15, 1] },
          height:  { duration: 0.92, ease: [0.2, 0, 0.15, 1] },
          opacity: { duration: 0.45, times: [0, 0.1, 1] },
        }}
      />

      {/* Central energy burst — fills the portal just before it opens */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(180,74,255,0.12) 40%, transparent 70%)",
        }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ width: "165vw", height: "165vw", opacity: [0, 0.9, 0] }}
        transition={{
          width:   { duration: 0.92, ease: [0.2, 0, 0.15, 1] },
          height:  { duration: 0.92, ease: [0.2, 0, 0.15, 1] },
          opacity: { duration: 0.92, times: [0, 0.05, 0.55] },
        }}
      />

    </div>
  );
}
