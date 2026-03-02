"use client";

import { useEffect, useRef } from "react";

/**
 * WarpCanvas — GPU-friendly wormhole renderer.
 *
 * Replaces the old 50 × motion.div streak approach (which animated CSS `width`
 * — a layout property — on each element, causing 50 layout-reflows per frame).
 *
 * Now: ONE <canvas>, ONE requestAnimationFrame loop, ONE GPU composite layer.
 * Everything is drawn with 2D canvas primitives → zero DOM overhead, zero
 * layout reflow, crisp at any resolution via devicePixelRatio scaling.
 *
 * Visual output is identical to the old version but renders at 60fps even on
 * integrated/mobile GPUs.  `globalCompositeOperation: "screen"` gives additive
 * neon blending for free (overlapping streaks add like real light sources).
 */

// Pre-computed RGB values — avoids string-parsing hex on every frame
const RGB: [number, number, number][] = [
  [255, 45, 123],  // #ff2d7b  pink
  [180, 74, 255],  // #b44aff  purple
  [77, 124, 255],  // #4d7cff  blue
  [255, 68, 204],  // #ff44cc  magenta
  [255, 107, 53],  // #ff6b35  orange
  [255, 255, 255], // #ffffff  white
];

const STREAK_COUNT = 50;
const RING_COUNT = 5;

// Cubic ease-out — streak growth decelerates nicely
const easeOut3 = (t: number) => 1 - (1 - t) ** 3;

export default function WarpCanvas({ duration = 1300 }: { duration?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── HiDPI / Retina scaling ── (no pixelation at any screen density)
    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const cy = H / 2;
    // Diagonal distance guarantees every streak reaches beyond the screen edge
    const diag = Math.hypot(W, H);

    // ── Pre-compute geometry ONCE (not per frame) ──────────────────────────
    const streaks = Array.from({ length: STREAK_COUNT }, (_, i) => {
      const rad = (i / STREAK_COUNT) * 2 * Math.PI;
      return {
        cosA: Math.cos(rad),
        sinA: Math.sin(rad),
        rgb: RGB[i % RGB.length],
        // Earlier streaks appear sooner — spread start across 0..22% of duration
        stagger: (i / STREAK_COUNT) * 0.22,
        // Vary max length slightly so streaks fill different depths of field
        maxLen: diag * (0.62 + (i % 20) / 100),
      };
    });

    const rings = Array.from({ length: RING_COUNT }, (_, i) => ({
      rgb: RGB[i % RGB.length],
      stagger: i * 0.07,
      // Each ring expands to fill the viewport
      maxR: Math.max(W, H) * (0.45 + i * 0.12),
    }));

    // ── Animation loop ──────────────────────────────────────────────────────
    const t0 = performance.now();
    let rafId: number;

    const frame = (now: number) => {
      const t = Math.min((now - t0) / duration, 1); // normalised 0→1

      ctx.clearRect(0, 0, W, H);

      // ── Nebula radial glow (rises and falls with the warp) ──
      const nbIntensity = t < 0.5 ? easeOut3(t * 2) : 1 - easeOut3((t - 0.5) * 2);
      const ng = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.55);
      ng.addColorStop(0, `rgba(180,74,255,${nbIntensity * 0.12})`);
      ng.addColorStop(0.5, `rgba(255,45,123,${nbIntensity * 0.05})`);
      ng.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = ng;
      ctx.fillRect(0, 0, W, H);

      // ── Warp streaks — additive neon blending via "screen" mode ──────────
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < STREAK_COUNT; i++) {
        const s = streaks[i];
        // Normalise t to this streak's local timeline (accounting for stagger)
        const lt = Math.max(0, (t - s.stagger * 0.35) / (1 - s.stagger * 0.35));
        if (lt <= 0) continue;

        const grown = easeOut3(lt);
        const len = grown * s.maxLen;

        // Opacity envelope: ramp up (first 18%), plateau, ramp down (last 28%)
        const alpha =
          lt < 0.18
            ? (lt / 0.18) * 0.78
            : lt < 0.72
            ? 0.78
            : Math.max(0, ((1 - lt) / 0.28)) * 0.78;

        if (len < 1 || alpha < 0.01) continue;

        const ex = cx + s.cosA * len;
        const ey = cy + s.sinA * len;
        const [r, g, b] = s.rgb;

        // Gradient: transparent at center → full colour at tip
        // This creates the "speed line" visual: dark core → bright edge
        const gr = ctx.createLinearGradient(cx, cy, ex, ey);
        gr.addColorStop(0,    `rgba(${r},${g},${b},0)`);
        gr.addColorStop(0.18, `rgba(${r},${g},${b},${alpha * 0.12})`);
        gr.addColorStop(1,    `rgba(${r},${g},${b},${alpha})`);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = gr;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }

      ctx.restore();

      // ── Expanding tunnel rings ────────────────────────────────────────────
      for (let i = 0; i < RING_COUNT; i++) {
        const ring = rings[i];
        const lt = Math.max(0, (t - ring.stagger) / (1 - ring.stagger));
        if (lt <= 0) continue;

        const radius = easeOut3(lt) * ring.maxR;
        const alpha = Math.max(0, 0.8 * (1 - lt));
        const [r, g, b] = ring.rgb;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // ── Central white spark (brief energy burst at warp ignition) ─────────
      if (t < 0.30) {
        const st = t / 0.30;
        // Spark grows then shrinks
        const size = st < 0.2 ? (st / 0.2) * 20 : 20 * (0.45 + 0.55 * (1 - st));
        // Bright for a flash, then fades
        const a = st < 0.1 ? st / 0.1 : Math.max(0, 1 - (st - 0.1) / 0.9);

        const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 2.8);
        sg.addColorStop(0,   `rgba(255,255,255,${a})`);
        sg.addColorStop(0.4, `rgba(255,255,255,${a * 0.45})`);
        sg.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(cx, cy, size * 2.8, 0, 2 * Math.PI);
        ctx.fill();
      }

      if (t < 1) rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [duration]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
