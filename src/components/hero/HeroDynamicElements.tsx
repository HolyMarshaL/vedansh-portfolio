"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ====== TYPES ======
interface Meteor {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  tailLength: number;
  color: string;
  distance: number;
  delay: number;
}

interface Planet {
  id: number;
  size: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  color1: string;
  color2: string;
  hasRing: boolean;
}

interface Satellite {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  flip: boolean;
}

interface Astronaut {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  rotation: number;
}

// ====== CONSTANTS ======
const METEOR_COLORS = ["#ff2d7b", "#b44aff", "#4d7cff", "#ff44cc", "#ffffff"];
const PLANET_PALETTES = [
  ["#ff2d7b", "#ff44cc"],
  ["#b44aff", "#4d7cff"],
  ["#4d7cff", "#1a1a8e"],
  ["#ff6b35", "#ff2d7b"],
  ["#ff44cc", "#b44aff"],
];

export default function HeroDynamicElements() {
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  const idRef = useRef(0);
  const lastMouseMove = useRef(Date.now());

  useEffect(() => {
    const handleMouseMove = () => {
      lastMouseMove.current = Date.now();
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ====== SPAWN FUNCTIONS ======
  const spawnMeteorShower = useCallback(() => {
    const count = 3 + Math.floor(Math.random() * 5);
    const baseAngle = 200 + Math.random() * 40; // 200-240 degrees (top-right to bottom-left)
    const newMeteors: Meteor[] = [];

    for (let i = 0; i < count; i++) {
      const angle = baseAngle + (Math.random() - 0.5) * 15;
      const rad = (angle * Math.PI) / 180;
      newMeteors.push({
        id: idRef.current++,
        startX: 40 + Math.random() * 60, // start from right side
        startY: -5 - Math.random() * 10, // start above viewport
        angle,
        speed: 0.5 + Math.random() * 0.6,
        tailLength: 80 + Math.random() * 120,
        color: METEOR_COLORS[Math.floor(Math.random() * METEOR_COLORS.length)],
        distance: 600 + Math.random() * 400, // how far it travels in px
        delay: i * (0.08 + Math.random() * 0.15),
      });
    }

    setMeteors((prev) => [...prev, ...newMeteors]);
    setTimeout(() => {
      setMeteors((prev) =>
        prev.filter((m) => !newMeteors.find((nm) => nm.id === m.id))
      );
    }, 5000);
  }, []);

  const spawnPlanet = useCallback(() => {
    const fromRight = Math.random() > 0.5;
    const colors =
      PLANET_PALETTES[Math.floor(Math.random() * PLANET_PALETTES.length)];
    const planet: Planet = {
      id: idRef.current++,
      size: 30 + Math.random() * 90,
      startX: fromRight ? 105 : -15,
      startY: 15 + Math.random() * 65,
      endX: fromRight ? -15 : 105,
      endY: 15 + Math.random() * 65,
      duration: 14 + Math.random() * 10,
      color1: colors[0],
      color2: colors[1],
      hasRing: Math.random() > 0.5,
    };
    setPlanets((prev) => [...prev, planet]);
    setTimeout(() => {
      setPlanets((prev) => prev.filter((p) => p.id !== planet.id));
    }, (planet.duration + 2) * 1000);
  }, []);

  const spawnSatellite = useCallback(() => {
    const fromRight = Math.random() > 0.5;
    const sat: Satellite = {
      id: idRef.current++,
      startX: fromRight ? 105 : -5,
      startY: 5 + Math.random() * 45,
      endX: fromRight ? -5 : 105,
      endY: 25 + Math.random() * 45,
      duration: 10 + Math.random() * 8,
      flip: fromRight,
    };
    setSatellites((prev) => [...prev, sat]);
    setTimeout(() => {
      setSatellites((prev) => prev.filter((s) => s.id !== sat.id));
    }, (sat.duration + 2) * 1000);
  }, []);

  const spawnAstronaut = useCallback(() => {
    const fromRight = Math.random() > 0.5;
    const astro: Astronaut = {
      id: idRef.current++,
      startX: fromRight ? 110 : -10,
      startY: 25 + Math.random() * 45,
      endX: fromRight ? -10 : 110,
      endY: 20 + Math.random() * 45,
      duration: 18 + Math.random() * 12,
      rotation: -15 + Math.random() * 30,
    };
    setAstronauts((prev) => [...prev, astro]);
    setTimeout(() => {
      setAstronauts((prev) => prev.filter((a) => a.id !== astro.id));
    }, (astro.duration + 2) * 1000);
  }, []);

  // ====== SPAWNING LOOP ======
  useEffect(() => {
    const t1 = setTimeout(spawnMeteorShower, 2000);
    const t2 = setTimeout(spawnSatellite, 6000);
    const t3 = setTimeout(spawnPlanet, 10000);

    const meteorInterval = setInterval(spawnMeteorShower, 4000 + Math.random() * 5000);
    const satInterval = setInterval(spawnSatellite, 10000 + Math.random() * 8000);
    const planetInterval = setInterval(spawnPlanet, 18000 + Math.random() * 12000);
    const astroInterval = setInterval(spawnAstronaut, 30000 + Math.random() * 15000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(meteorInterval);
      clearInterval(satInterval);
      clearInterval(planetInterval);
      clearInterval(astroInterval);
    };
  }, [spawnMeteorShower, spawnSatellite, spawnPlanet, spawnAstronaut]);

  // Boost spawning when cursor idle
  useEffect(() => {
    const idleCheck = setInterval(() => {
      const idleTime = Date.now() - lastMouseMove.current;
      if (idleTime > 3000) {
        if (Math.random() > 0.4) spawnMeteorShower();
        if (Math.random() > 0.65) spawnSatellite();
        if (Math.random() > 0.8) spawnPlanet();
        if (Math.random() > 0.92) spawnAstronaut();
      }
    }, 4000);
    return () => clearInterval(idleCheck);
  }, [spawnMeteorShower, spawnSatellite, spawnPlanet, spawnAstronaut]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {/* ===== METEORS — Fixed linear path with glowing trail ===== */}
      <AnimatePresence>
        {meteors.map((meteor) => {
          const rad = (meteor.angle * Math.PI) / 180;
          const endX = Math.cos(rad) * meteor.distance;
          const endY = Math.sin(rad) * meteor.distance;

          return (
            <motion.div
              key={`meteor-${meteor.id}`}
              className="absolute"
              style={{
                left: `${meteor.startX}%`,
                top: `${meteor.startY}%`,
              }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: endX,
                y: endY,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: meteor.speed,
                ease: [0.25, 0.1, 0.25, 1],
                delay: meteor.delay,
              }}
            >
              {/* Meteor streak — rotated container with gradient trail */}
              <div
                style={{
                  position: "relative",
                  transform: `rotate(${meteor.angle}deg)`,
                  transformOrigin: "right center",
                }}
              >
                {/* Glowing tail */}
                <div
                  style={{
                    width: `${meteor.tailLength}px`,
                    height: "2px",
                    background: `linear-gradient(90deg, transparent 0%, ${meteor.color}30 20%, ${meteor.color}80 60%, ${meteor.color} 100%)`,
                    borderRadius: "1px",
                    filter: `drop-shadow(0 0 2px ${meteor.color}80)`,
                  }}
                />
                {/* Bright head */}
                <div
                  style={{
                    position: "absolute",
                    right: "-3px",
                    top: "-2px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, #fff 20%, ${meteor.color} 60%, transparent 100%)`,
                    boxShadow: `0 0 8px 2px ${meteor.color}, 0 0 16px 4px ${meteor.color}60`,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* ===== PLANETS ===== */}
      <AnimatePresence>
        {planets.map((planet) => (
          <motion.div
            key={`planet-${planet.id}`}
            className="absolute"
            style={{
              width: `${planet.size}px`,
              height: `${planet.size}px`,
            }}
            initial={{
              left: `${planet.startX}%`,
              top: `${planet.startY}%`,
              opacity: 0,
            }}
            animate={{
              left: `${planet.endX}%`,
              top: `${planet.endY}%`,
              opacity: [0, 0.25, 0.25, 0],
            }}
            transition={{ duration: planet.duration, ease: "linear" }}
          >
            <div
              className="w-full h-full rounded-full relative"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color1}50, ${planet.color2}30, ${planet.color2}10)`,
                boxShadow: `0 0 ${planet.size / 3}px ${planet.color1}20, inset -${planet.size / 5}px -${planet.size / 5}px ${planet.size / 3}px rgba(0,0,0,0.6)`,
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: "30%",
                  height: "20%",
                  top: "35%",
                  left: "20%",
                  background: `${planet.color1}15`,
                  borderRadius: "50%",
                  filter: "blur(3px)",
                }}
              />
            </div>
            {planet.hasRing && (
              <div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: `${planet.size * 1.7}px`,
                  height: `${planet.size * 0.35}px`,
                  border: `1.5px solid ${planet.color1}30`,
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%) rotateX(75deg)",
                  boxShadow: `0 0 8px ${planet.color1}10`,
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ===== SATELLITE — High-quality opaque ISS-style SVG ===== */}
      <AnimatePresence>
        {satellites.map((sat) => (
          <motion.div
            key={`sat-${sat.id}`}
            className="absolute"
            initial={{
              left: `${sat.startX}%`,
              top: `${sat.startY}%`,
              opacity: 0,
            }}
            animate={{
              left: `${sat.endX}%`,
              top: `${sat.endY}%`,
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: sat.duration, ease: "linear" }}
          >
            <svg
              width="56"
              height="28"
              viewBox="0 0 56 28"
              fill="none"
              style={{ transform: sat.flip ? "scaleX(-1)" : "none" }}
            >
              {/* Left solar panel array */}
              <rect x="0" y="6" width="16" height="16" rx="1" fill="#1e3a6e" stroke="#3b6fc0" strokeWidth="0.8" />
              {/* Panel grid lines */}
              <line x1="4" y1="6" x2="4" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
              <line x1="8" y1="6" x2="8" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
              <line x1="12" y1="6" x2="12" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
              <line x1="0" y1="10" x2="16" y2="10" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
              <line x1="0" y1="14" x2="16" y2="14" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
              <line x1="0" y1="18" x2="16" y2="18" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />

              {/* Panel connector strut left */}
              <rect x="16" y="12" width="4" height="4" fill="#8899aa" stroke="#aabbcc" strokeWidth="0.5" />

              {/* Main body — cylindrical module */}
              <rect x="20" y="7" width="16" height="14" rx="3" fill="#c0c8d4" stroke="#dde3ea" strokeWidth="0.6" />
              {/* Body detail band */}
              <rect x="20" y="11" width="16" height="6" fill="#a0aab8" />
              {/* Body highlight */}
              <rect x="21" y="8" width="4" height="2" rx="0.5" fill="#e8ecf0" opacity="0.7" />
              {/* Port window */}
              <circle cx="28" cy="14" r="2" fill="#0a1628" stroke="#4d7cff" strokeWidth="0.5" />
              <circle cx="28" cy="14" r="0.8" fill="#4d7cff" opacity="0.6" />

              {/* Panel connector strut right */}
              <rect x="36" y="12" width="4" height="4" fill="#8899aa" stroke="#aabbcc" strokeWidth="0.5" />

              {/* Right solar panel array */}
              <rect x="40" y="6" width="16" height="16" rx="1" fill="#1e3a6e" stroke="#3b6fc0" strokeWidth="0.8" />
              {/* Panel grid lines */}
              <line x1="44" y1="6" x2="44" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
              <line x1="48" y1="6" x2="48" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
              <line x1="52" y1="6" x2="52" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
              <line x1="40" y1="10" x2="56" y2="10" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
              <line x1="40" y1="14" x2="56" y2="14" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
              <line x1="40" y1="18" x2="56" y2="18" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />

              {/* Antenna dish on top */}
              <line x1="28" y1="7" x2="28" y2="2" stroke="#dde3ea" strokeWidth="0.6" />
              <circle cx="28" cy="1.5" r="1.5" fill="none" stroke="#dde3ea" strokeWidth="0.5" />

              {/* Blinking signal light */}
              <motion.circle
                cx="28"
                cy="1.5"
                r="1"
                fill="#ff2d7b"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {/* Signal light glow */}
              <motion.circle
                cx="28"
                cy="1.5"
                r="3"
                fill="none"
                stroke="#ff2d7b"
                strokeWidth="0.3"
                animate={{ opacity: [0, 0.6, 0], r: [2, 5, 2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ===== ASTRONAUT — High-quality opaque spacesuit SVG ===== */}
      <AnimatePresence>
        {astronauts.map((astro) => (
          <motion.div
            key={`astro-${astro.id}`}
            className="absolute"
            initial={{
              left: `${astro.startX}%`,
              top: `${astro.startY}%`,
              opacity: 0,
              rotate: astro.rotation,
            }}
            animate={{
              left: `${astro.endX}%`,
              top: `${astro.endY}%`,
              opacity: [0, 0.9, 0.9, 0],
              rotate: astro.rotation + 15,
            }}
            transition={{ duration: astro.duration, ease: "linear" }}
          >
            <svg width="40" height="52" viewBox="0 0 40 52" fill="none">
              <defs>
                <linearGradient id={`visor-${astro.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff8c00" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#ffc040" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ff6600" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id={`suit-${astro.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f0f0f0" />
                  <stop offset="100%" stopColor="#c8ccd4" />
                </linearGradient>
                <radialGradient id={`helmet-${astro.id}`} cx="0.4" cy="0.35">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#e0e4ea" />
                  <stop offset="100%" stopColor="#b8bcc4" />
                </radialGradient>
              </defs>

              {/* Life support backpack */}
              <rect x="5" y="16" width="7" height="18" rx="2" fill="#a0a8b4" stroke="#8890a0" strokeWidth="0.6" />
              <rect x="6.5" y="18" width="4" height="3" rx="0.5" fill="#7880a0" />
              <rect x="6.5" y="22" width="4" height="3" rx="0.5" fill="#7880a0" />
              <rect x="6.5" y="26" width="4" height="3" rx="0.5" fill="#7880a0" />
              {/* Backpack vent */}
              <rect x="6" y="31" width="5" height="1.5" rx="0.5" fill="#606878" />

              {/* Helmet */}
              <circle cx="20" cy="11" r="10" fill={`url(#helmet-${astro.id})`} stroke="#d0d4dc" strokeWidth="0.8" />
              {/* Helmet rim */}
              <ellipse cx="20" cy="18" rx="8" ry="2.5" fill="#b0b8c4" stroke="#c0c8d0" strokeWidth="0.4" />

              {/* Gold visor */}
              <ellipse cx="21" cy="11" rx="7" ry="5.5" fill={`url(#visor-${astro.id})`} stroke="#cc7700" strokeWidth="0.6" />
              {/* Visor reflection */}
              <ellipse cx="18" cy="9" rx="2.5" ry="1.5" fill="white" opacity="0.3" />

              {/* Torso */}
              <rect x="12" y="18" width="16" height="16" rx="4" fill={`url(#suit-${astro.id})`} stroke="#b0b8c0" strokeWidth="0.6" />
              {/* Chest pack / controls */}
              <rect x="15" y="20" width="10" height="6" rx="1" fill="#d8dce4" stroke="#b0b8c4" strokeWidth="0.5" />
              {/* Control buttons */}
              <circle cx="18" cy="22" r="1" fill="#ff2d7b" />
              <circle cx="22" cy="22" r="1" fill="#4d7cff" />
              <rect x="16" y="24" width="8" height="1" rx="0.5" fill="#a0a8b4" />

              {/* Left arm */}
              <motion.g
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "12px 20px" }}
              >
                <rect x="2" y="20" width="10" height="5" rx="2.5" fill={`url(#suit-${astro.id})`} stroke="#b0b8c0" strokeWidth="0.5" />
                {/* Glove */}
                <circle cx="3" cy="22.5" r="3" fill="#c8ccd4" stroke="#a0a8b0" strokeWidth="0.4" />
              </motion.g>

              {/* Right arm */}
              <motion.g
                animate={{ rotate: [6, -6, 6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "28px 20px" }}
              >
                <rect x="28" y="20" width="10" height="5" rx="2.5" fill={`url(#suit-${astro.id})`} stroke="#b0b8c0" strokeWidth="0.5" />
                {/* Glove */}
                <circle cx="37" cy="22.5" r="3" fill="#c8ccd4" stroke="#a0a8b0" strokeWidth="0.4" />
              </motion.g>

              {/* Left leg */}
              <rect x="13" y="33" width="6" height="12" rx="3" fill={`url(#suit-${astro.id})`} stroke="#b0b8c0" strokeWidth="0.5" />
              {/* Left boot */}
              <rect x="12" y="43" width="8" height="4" rx="2" fill="#a0a8b4" stroke="#8890a0" strokeWidth="0.4" />

              {/* Right leg */}
              <rect x="21" y="33" width="6" height="12" rx="3" fill={`url(#suit-${astro.id})`} stroke="#b0b8c0" strokeWidth="0.5" />
              {/* Right boot */}
              <rect x="20" y="43" width="8" height="4" rx="2" fill="#a0a8b4" stroke="#8890a0" strokeWidth="0.4" />

              {/* Tether line */}
              <motion.path
                d="M5 28 Q -8 25 -18 28 Q -28 31 -35 28"
                stroke="#c8ccd4"
                strokeWidth="0.8"
                fill="none"
                strokeDasharray="2 1"
                animate={{
                  d: [
                    "M5 28 Q -8 25 -18 28 Q -28 31 -35 28",
                    "M5 28 Q -8 31 -18 26 Q -28 28 -35 30",
                    "M5 28 Q -8 25 -18 28 Q -28 31 -35 28",
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Helmet light */}
              <motion.circle
                cx="28" cy="6" r="1.2"
                fill="#4d7cff"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="28" cy="6" r="3"
                fill="#4d7cff"
                opacity="0.15"
                animate={{ r: [2, 4, 2], opacity: [0.15, 0.05, 0.15] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
