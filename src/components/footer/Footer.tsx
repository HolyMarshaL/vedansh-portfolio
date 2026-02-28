"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const now = new Date();
  const stardate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;

  return (
    <footer className="relative py-16 px-6 sm:px-12 border-t border-neon-purple/5">
      <div className="max-w-4xl mx-auto text-center">
        {/* Back to top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mb-8 text-xs tracking-[0.3em] text-neon-pink/30 hover:text-neon-pink/70 uppercase transition-colors"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          whileHover={{ y: -3 }}
        >
          &uarr; Return to Launchpad
        </motion.button>

        <div className="flex flex-col items-center gap-3">
          <p
            className="text-xs text-star-white/30"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Designed & Built by{" "}
            <span className="gradient-text">Vedansh Chauhan</span>
          </p>
          <p
            className="text-[10px] text-star-white/15 tracking-wider"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Powered by ambition and an unhealthy amount of coffee
          </p>
          <p
            className="text-[9px] text-star-white/10 tracking-[0.3em]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            STARDATE: {stardate}
          </p>
        </div>

        {/* Coordinates */}
        <p
          className="mt-6 text-[8px] text-star-white/8 tracking-[0.5em]"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          LAT 28.6139 &middot; LONG 77.2090 &middot; SECTOR: EARTH
        </p>
      </div>
    </footer>
  );
}
