"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Preloader from "@/components/preloader/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import ArrivalPortalRing from "@/components/ArrivalPortalRing";
import Hero from "@/components/hero/Hero";
import MissionControl from "@/components/mission-control/MissionControl";
import ConstellationMap from "@/components/constellation/ConstellationMap";
import ExperienceTimeline from "@/components/wormholes/ExperienceTimeline";
import DesignPhilosophy from "@/components/nebula/DesignPhilosophy";
import Contact from "@/components/signal/Contact";
import Footer from "@/components/footer/Footer";

const ProjectSolarSystem = dynamic(
  () => import("@/components/planets/ProjectSolarSystem"),
  { ssr: false }
);

export default function Home() {
  // contentMounted: true as soon as YES is clicked — mounts heavy content in the
  // background (hidden behind preloader) so Three.js / WebGL can warm up fully
  // while the countdown + zoom animation plays (~8s of free loading time).
  const [contentMounted, setContentMounted] = useState(false);

  // revealed: true when onComplete fires — triggers the clip-path reveal animation.
  // By this point the content is already mounted and GPU-warm, so the transition
  // is smooth with no jank from mounting heavy components mid-animation.
  const [revealed, setRevealed] = useState(false);

  const [arrivalComplete, setArrivalComplete] = useState(false);
  const arrivalFiredRef = useRef(false);

  return (
    <main className="bg-space-black min-h-screen">
      {/* Preloader — hidden once revealed */}
      {!revealed && (
        <Preloader
          onStart={() => setContentMounted(true)}
          onComplete={() => setRevealed(true)}
        />
      )}

      {/* Main content — mounted on YES click (invisible), revealed on onComplete */}
      {contentMounted && (
        <SmoothScroll>
          {/* Clip-path stays circle(0%) until revealed — content is mounted but
              invisible, giving Three.js time to initialise while preloader runs */}
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={
              revealed
                ? { clipPath: "circle(150% at 50% 50%)" }
                : { clipPath: "circle(0% at 50% 50%)" }
            }
            transition={{ duration: 0.92, ease: [0.2, 0, 0.15, 1] }}
            onAnimationComplete={() => {
              if (revealed && !arrivalFiredRef.current) {
                arrivalFiredRef.current = true;
                setArrivalComplete(true);
              }
            }}
            style={{
              transformOrigin: "50% 50%",
              pointerEvents: revealed ? "auto" : "none",
            }}
          >
            <div>
              <Hero showDynamicElements={arrivalComplete} shouldAnimate={revealed} />

              <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent" />

              <MissionControl />

              <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent" />

              <ConstellationMap />

              <div className="h-px bg-gradient-to-r from-transparent via-neon-purple/10 to-transparent" />

              <ExperienceTimeline />

              <div className="h-px bg-gradient-to-r from-transparent via-neon-orange/10 to-transparent" />

              <ProjectSolarSystem />

              <div className="h-px bg-gradient-to-r from-transparent via-neon-pink/10 to-transparent" />

              <DesignPhilosophy />

              <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent" />

              <Contact />

              <Footer />
            </div>
          </motion.div>

          {/* Portal ring — only during the 0.92s clip-path reveal */}
          {revealed && !arrivalComplete && <ArrivalPortalRing />}
        </SmoothScroll>
      )}
    </main>
  );
}
