"use client";

import { useState, useEffect, useRef } from "react";
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
  const [launched, setLaunched] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [arrivalComplete, setArrivalComplete] = useState(false);
  const arrivalFiredRef = useRef(false);

  useEffect(() => {
    if (launched) {
      // Show content immediately — ArrivalPortalRing handles the cinematic transition
      setShowContent(true);
    }
  }, [launched]);

  return (
    <main className="bg-space-black min-h-screen">
      {/* Preloader */}
      {!launched && <Preloader onComplete={() => setLaunched(true)} />}

      {/* Main content — only rendered after launch, wrapped in Lenis smooth scroll */}
      {showContent && (
        <SmoothScroll>
        {/* Arrival: clip-path circle expands from center + scale zoom-in = warp arrival feel */}
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)", scale: 0.88 }}
          animate={{ clipPath: "circle(150% at 50% 50%)", scale: 1 }}
          transition={{ duration: 0.92, ease: [0.2, 0, 0.15, 1] }}
          onAnimationComplete={() => {
            if (!arrivalFiredRef.current) {
              arrivalFiredRef.current = true;
              setArrivalComplete(true);
            }
          }}
          style={{ transformOrigin: "50% 50%" }}
        >
        <div>
          <Hero showDynamicElements={arrivalComplete} />

          {/* Divider */}
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
        {/* Portal ring overlay — synced with clip-path expansion above */}
        {!arrivalComplete && <ArrivalPortalRing />}
        </SmoothScroll>
      )}
    </main>
  );
}
