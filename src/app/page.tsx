"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/preloader/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
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

  useEffect(() => {
    if (launched) {
      // Small delay after preloader completes to let the warp effect finish
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [launched]);

  return (
    <main className="bg-space-black min-h-screen">
      {/* Preloader */}
      {!launched && <Preloader onComplete={() => setLaunched(true)} />}

      {/* Main content — only rendered after launch, wrapped in Lenis smooth scroll */}
      {showContent && (
        <SmoothScroll>
        <div>
          <Hero />

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
        </SmoothScroll>
      )}
    </main>
  );
}
