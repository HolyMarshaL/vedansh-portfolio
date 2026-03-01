"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Exponential easing — fast start, smooth deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Foundation for GSAP ScrollTrigger integration (Phase 4 step 2)
      // When ScrollTrigger is added, wire: lenis.on("scroll", ScrollTrigger.update)
    });

    // Use Lenis built-in autoRaf (v1.1+) — no manual requestAnimationFrame needed
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
