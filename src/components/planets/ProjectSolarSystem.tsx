"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { PROJECTS } from "@/lib/content";

export default function ProjectSolarSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePlanet, setActivePlanet] = useState<string | null>(null);

  const activeProject = PROJECTS.find((p) => p.id === activePlanet);

  return (
    <section
      id="planets"
      className="relative min-h-screen py-24 px-6 sm:px-12 lg:px-24 overflow-hidden"
      ref={ref}
    >
      {/* Section label */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-[10px] tracking-[0.4em] text-neon-orange/40 uppercase mb-2"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          // Section 05
        </p>
        <h2
          className="text-3xl sm:text-5xl font-bold neon-text-orange"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          WORLDS I&apos;VE BUILT
        </h2>
        <p
          className="mt-2 text-sm text-star-white/40 tracking-wider"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Click a planet to land
        </p>
      </motion.div>

      {/* Solar System Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {PROJECTS.map((project, i) => {
          const sizes = [
            "w-40 h-40 sm:w-48 sm:h-48",
            "w-36 h-36 sm:w-44 sm:h-44",
            "w-32 h-32 sm:w-40 sm:h-40",
            "w-28 h-28 sm:w-36 sm:h-36",
          ];

          return (
            <motion.div
              key={project.id}
              className="flex flex-col items-center gap-6 cursor-pointer group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
              onClick={() => setActivePlanet(project.id)}
            >
              {/* Planet */}
              <div className="relative">
                <motion.div
                  className={`${sizes[i]} rounded-full relative overflow-hidden cursor-pointer transition-transform duration-500 group-hover:scale-110`}
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${project.color}40, ${project.color}15 50%, ${project.color}05 80%)`,
                    border: `1px solid ${project.color}30`,
                    boxShadow: `0 0 30px ${project.color}15, inset 0 0 30px ${project.color}10`,
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 60 + i * 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Surface texture */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from ${i * 90}deg, transparent, ${project.color}10, transparent, ${project.color}08, transparent)`,
                    }}
                  />

                  {/* Highlight */}
                  <div
                    className="absolute top-[15%] left-[20%] w-[30%] h-[20%] rounded-full"
                    style={{
                      background: `radial-gradient(ellipse, ${project.color}30, transparent)`,
                      filter: "blur(8px)",
                    }}
                  />
                </motion.div>

                {/* Orbit ring */}
                <motion.div
                  className="absolute inset-[-20%] rounded-full border border-dashed"
                  style={{
                    borderColor: `${project.color}15`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `0 0 40px ${project.color}30, 0 0 80px ${project.color}15`,
                  }}
                />
              </div>

              {/* Planet label */}
              <div className="text-center">
                <h3
                  className="text-lg font-bold transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: project.color,
                  }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-[10px] text-star-white/40 tracking-wider"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {project.tagline}
                </p>
                <p
                  className="text-[9px] text-star-white/20 tracking-widest uppercase mt-1"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {project.type}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Project Detail Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-space-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePlanet(null)}
          >
            <motion.div
              className="max-w-lg w-full glass-card rounded-2xl p-8 relative"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                border: `1px solid ${activeProject.color}30`,
                boxShadow: `0 0 40px ${activeProject.color}15`,
              }}
            >
              <button
                onClick={() => setActivePlanet(null)}
                className="absolute top-4 right-4 text-star-white/40 hover:text-star-white text-xl"
              >
                &times;
              </button>

              {/* Planet mini */}
              <motion.div
                className="w-16 h-16 rounded-full mx-auto mb-6"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${activeProject.color}50, ${activeProject.color}20)`,
                  boxShadow: `0 0 20px ${activeProject.color}30`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              <p
                className="text-[9px] tracking-[0.3em] text-center uppercase mb-1"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  color: `${activeProject.color}60`,
                }}
              >
                {activeProject.type}
              </p>

              <h3
                className="text-3xl font-bold text-center mb-2"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color: activeProject.color,
                  textShadow: `0 0 15px ${activeProject.color}40`,
                }}
              >
                {activeProject.name}
              </h3>

              <p
                className="text-sm text-center text-star-white/50 mb-6"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {activeProject.tagline}
              </p>

              <p
                className="text-xs text-star-white/60 leading-relaxed text-center mb-6"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {activeProject.description}
              </p>

              {/* Placeholder for mockup */}
              <div
                className="w-full h-40 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: `linear-gradient(135deg, ${activeProject.color}10, ${activeProject.color}05)`,
                  border: `1px dashed ${activeProject.color}20`,
                }}
              >
                <p
                  className="text-[10px] tracking-wider uppercase"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    color: `${activeProject.color}40`,
                  }}
                >
                  [ Project Mockup Coming Soon ]
                </p>
              </div>

              {"liveUrl" in activeProject && activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    color: activeProject.color,
                    border: `1px solid ${activeProject.color}40`,
                    background: `${activeProject.color}10`,
                  }}
                >
                  Visit This World &rarr;
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
