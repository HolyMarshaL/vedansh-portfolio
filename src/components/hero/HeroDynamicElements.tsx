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
  model: "iss" | "hubble" | "sputnik";
}

interface Astronaut {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  rotation: number;
  suitColor: "white" | "orange" | "black";
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
const SATELLITE_MODELS = ["iss", "hubble", "sputnik"] as const;
const SUIT_COLORS = ["white", "orange", "black"] as const;

// ====== SUIT THEMES ======
const SUIT_THEMES = {
  white: {
    suitFrom: "#f0f0f0",
    suitTo: "#c8ccd4",
    helmetOuter: "#ffffff",
    helmetMid: "#e0e4ea",
    helmetRim: "#b8bcc4",
    backpack: "#a0a8b4",
    boots: "#a0a8b4",
  },
  orange: {
    suitFrom: "#f07030",
    suitTo: "#c05020",
    helmetOuter: "#f8f0e0",
    helmetMid: "#e8c890",
    helmetRim: "#c89050",
    backpack: "#803820",
    boots: "#803820",
  },
  black: {
    suitFrom: "#383848",
    suitTo: "#1c1c2a",
    helmetOuter: "#484858",
    helmetMid: "#303040",
    helmetRim: "#202028",
    backpack: "#202028",
    boots: "#202028",
  },
};

// ====== SATELLITE SVG MODELS ======

function ISSModel({ flip }: { flip: boolean }) {
  return (
    <svg
      width="56"
      height="28"
      viewBox="0 0 56 28"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* Left solar panel array */}
      <rect x="0" y="6" width="16" height="16" rx="1" fill="#1e3a6e" stroke="#3b6fc0" strokeWidth="0.8" />
      <line x1="4" y1="6" x2="4" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      <line x1="8" y1="6" x2="8" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      <line x1="12" y1="6" x2="12" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      <line x1="0" y1="10" x2="16" y2="10" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      <line x1="0" y1="14" x2="16" y2="14" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      <line x1="0" y1="18" x2="16" y2="18" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      {/* Strut left */}
      <rect x="16" y="12" width="4" height="4" fill="#8899aa" stroke="#aabbcc" strokeWidth="0.5" />
      {/* Main cylindrical body */}
      <rect x="20" y="7" width="16" height="14" rx="3" fill="#c0c8d4" stroke="#dde3ea" strokeWidth="0.6" />
      <rect x="20" y="11" width="16" height="6" fill="#a0aab8" />
      <rect x="21" y="8" width="4" height="2" rx="0.5" fill="#e8ecf0" opacity="0.7" />
      <circle cx="28" cy="14" r="2" fill="#0a1628" stroke="#4d7cff" strokeWidth="0.5" />
      <circle cx="28" cy="14" r="0.8" fill="#4d7cff" opacity="0.6" />
      {/* Strut right */}
      <rect x="36" y="12" width="4" height="4" fill="#8899aa" stroke="#aabbcc" strokeWidth="0.5" />
      {/* Right solar panel array */}
      <rect x="40" y="6" width="16" height="16" rx="1" fill="#1e3a6e" stroke="#3b6fc0" strokeWidth="0.8" />
      <line x1="44" y1="6" x2="44" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      <line x1="48" y1="6" x2="48" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      <line x1="52" y1="6" x2="52" y2="22" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      <line x1="40" y1="10" x2="56" y2="10" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      <line x1="40" y1="14" x2="56" y2="14" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      <line x1="40" y1="18" x2="56" y2="18" stroke="#3b6fc0" strokeWidth="0.4" opacity="0.7" />
      {/* Antenna dish */}
      <line x1="28" y1="7" x2="28" y2="2" stroke="#dde3ea" strokeWidth="0.6" />
      <circle cx="28" cy="1.5" r="1.5" fill="none" stroke="#dde3ea" strokeWidth="0.5" />
      <motion.circle
        cx="28" cy="1.5" r="1" fill="#ff2d7b"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="28" cy="1.5" r="3" fill="none" stroke="#ff2d7b" strokeWidth="0.3"
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );
}

function HubbleModel({ flip }: { flip: boolean }) {
  return (
    <svg
      width="60"
      height="24"
      viewBox="0 0 60 24"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* Main cylindrical tube body */}
      <rect x="10" y="7" width="38" height="10" rx="4" fill="#888ea0" stroke="#aab0c0" strokeWidth="0.7" />
      {/* Inner tube shading */}
      <rect x="11" y="8" width="36" height="8" rx="3" fill="#687080" />
      {/* Aperture doors — open (top + bottom flaps) */}
      <rect x="44" y="4" width="8" height="7" rx="2" fill="#5a6a80" stroke="#7a8a98" strokeWidth="0.6" />
      <rect x="44" y="13" width="8" height="7" rx="2" fill="#5a6a80" stroke="#7a8a98" strokeWidth="0.6" />
      {/* Lens aperture ring */}
      <circle cx="48" cy="12" r="4" fill="#1a2030" stroke="#406080" strokeWidth="0.8" />
      <circle cx="48" cy="12" r="2" fill="#0a1020" stroke="#306080" strokeWidth="0.5" />
      {/* Lens reflective highlight */}
      <ellipse cx="47" cy="11" rx="1.5" ry="0.8" fill="white" opacity="0.2" />
      {/* Solar panel struts */}
      <rect x="22" y="2" width="2" height="5" fill="#8890a0" />
      <rect x="22" y="17" width="2" height="5" fill="#8890a0" />
      {/* Solar panels — top */}
      <rect x="12" y="0" width="14" height="7" rx="1" fill="#1e3a6e" stroke="#3b6fc0" strokeWidth="0.7" />
      <line x1="16" y1="0" x2="16" y2="7" stroke="#3b6fc0" strokeWidth="0.35" opacity="0.7" />
      <line x1="20" y1="0" x2="20" y2="7" stroke="#3b6fc0" strokeWidth="0.35" opacity="0.7" />
      <line x1="12" y1="3.5" x2="26" y2="3.5" stroke="#3b6fc0" strokeWidth="0.35" opacity="0.7" />
      {/* Solar panels — bottom */}
      <rect x="12" y="17" width="14" height="7" rx="1" fill="#1e3a6e" stroke="#3b6fc0" strokeWidth="0.7" />
      <line x1="16" y1="17" x2="16" y2="24" stroke="#3b6fc0" strokeWidth="0.35" opacity="0.7" />
      <line x1="20" y1="17" x2="20" y2="24" stroke="#3b6fc0" strokeWidth="0.35" opacity="0.7" />
      <line x1="12" y1="20.5" x2="26" y2="20.5" stroke="#3b6fc0" strokeWidth="0.35" opacity="0.7" />
      {/* Aft electronics bay */}
      <rect x="10" y="7" width="6" height="10" rx="2" fill="#707888" stroke="#9098a8" strokeWidth="0.5" />
      {/* High gain antenna */}
      <line x1="15" y1="7" x2="8" y2="2" stroke="#c0c8d4" strokeWidth="0.5" />
      <circle cx="8" cy="2" r="1" fill="#c0c8d4" />
      {/* Status beacon */}
      <motion.circle
        cx="18" cy="12" r="0.8" fill="#b44aff"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

function SputnikModel({ flip }: { flip: boolean }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      <defs>
        <radialGradient id="sputnik-body" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#e0e8f0" />
          <stop offset="50%" stopColor="#a0aabb" />
          <stop offset="100%" stopColor="#5a6070" />
        </radialGradient>
      </defs>
      {/* 4 antennae radiating out from sphere */}
      <line x1="18" y1="18" x2="33" y2="4" stroke="#c0cad4" strokeWidth="1" />
      <line x1="18" y1="18" x2="33" y2="31" stroke="#c0cad4" strokeWidth="1" />
      <line x1="18" y1="18" x2="4" y2="6" stroke="#c0cad4" strokeWidth="1" />
      <line x1="18" y1="18" x2="4" y2="29" stroke="#c0cad4" strokeWidth="1" />
      {/* Antenna tips */}
      <circle cx="33" cy="4" r="0.8" fill="#c0cad4" />
      <circle cx="33" cy="31" r="0.8" fill="#c0cad4" />
      <circle cx="4" cy="6" r="0.8" fill="#c0cad4" />
      <circle cx="4" cy="29" r="0.8" fill="#c0cad4" />
      {/* Main sphere */}
      <circle cx="18" cy="18" r="8" fill="url(#sputnik-body)" stroke="#8898a8" strokeWidth="0.8" />
      {/* Equator seam */}
      <ellipse cx="18" cy="18" rx="8" ry="2.5" fill="none" stroke="#788898" strokeWidth="0.4" opacity="0.5" />
      {/* Specular highlight */}
      <circle cx="15" cy="15" r="2.5" fill="white" opacity="0.25" />
      {/* Blinking radio beacon */}
      <motion.circle
        cx="18" cy="18" r="1" fill="#ff6600"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
    </svg>
  );
}

// ====== MAIN COMPONENT ======
export default function HeroDynamicElements({ isMobile = false }: { isMobile?: boolean }) {
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  const idRef = useRef(0);
  const lastMouseMove = useRef(Date.now());

  useEffect(() => {
    const handleMouseMove = () => { lastMouseMove.current = Date.now(); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ====== SPAWN FUNCTIONS ======

  // Single meteor — clean linear path with glowing trail
  const spawnMeteor = useCallback(() => {
    // 120-160°: cos is negative (moves LEFT), sin is positive (moves DOWN in DOM)
    // This sends the meteor from upper-right → lower-left diagonally across the screen
    const angle = 120 + Math.random() * 40;
    const meteor: Meteor = {
      id: idRef.current++,
      startX: 50 + Math.random() * 45, // right half of screen
      startY: 2 + Math.random() * 20,  // near the top of the viewport (visible)
      angle,
      speed: 1.4 + Math.random() * 0.8,
      tailLength: 120 + Math.random() * 100,
      color: METEOR_COLORS[Math.floor(Math.random() * METEOR_COLORS.length)],
      distance: 800 + Math.random() * 400,
    };
    setMeteors((prev) => [...prev, meteor]);
    setTimeout(() => {
      setMeteors((prev) => prev.filter((m) => m.id !== meteor.id));
    }, 4000);
  }, []);

  const spawnPlanet = useCallback(() => {
    const fromRight = Math.random() > 0.5;
    const colors = PLANET_PALETTES[Math.floor(Math.random() * PLANET_PALETTES.length)];
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

  // Satellite — 50% less frequent, 3 different models
  const spawnSatellite = useCallback(() => {
    const fromRight = Math.random() > 0.5;
    const model = SATELLITE_MODELS[Math.floor(Math.random() * SATELLITE_MODELS.length)];
    const sat: Satellite = {
      id: idRef.current++,
      startX: fromRight ? 108 : -8,
      startY: 5 + Math.random() * 45,
      endX: fromRight ? -8 : 108,
      endY: 25 + Math.random() * 45,
      duration: 14 + Math.random() * 10,
      flip: fromRight,
      model,
    };
    setSatellites((prev) => [...prev, sat]);
    setTimeout(() => {
      setSatellites((prev) => prev.filter((s) => s.id !== sat.id));
    }, (sat.duration + 2) * 1000);
  }, []);

  // Astronaut — 50% less frequent, 3 suit color options
  const spawnAstronaut = useCallback(() => {
    const fromRight = Math.random() > 0.5;
    const suitColor = SUIT_COLORS[Math.floor(Math.random() * SUIT_COLORS.length)];
    const astro: Astronaut = {
      id: idRef.current++,
      startX: fromRight ? 110 : -10,
      startY: 25 + Math.random() * 45,
      endX: fromRight ? -10 : 110,
      endY: 20 + Math.random() * 45,
      duration: 22 + Math.random() * 14,
      rotation: -15 + Math.random() * 30,
      suitColor,
    };
    setAstronauts((prev) => [...prev, astro]);
    setTimeout(() => {
      setAstronauts((prev) => prev.filter((a) => a.id !== astro.id));
    }, (astro.duration + 2) * 1000);
  }, []);

  // ====== SPAWNING LOOP ======
  useEffect(() => {
    // Spawn first meteor immediately, then stagger others
    spawnMeteor();

    if (isMobile) {
      // ── Mobile: all elements, +40% spawn rate (intervals × 0.6)
      const t1 = setTimeout(spawnMeteor, 3600);
      const t2 = setTimeout(spawnSatellite, 7200);
      const t3 = setTimeout(spawnPlanet, 11000);
      const t4 = setTimeout(spawnAstronaut, 14000);
      const meteorInterval = setInterval(spawnMeteor, 7200 + Math.random() * 4800);
      const satInterval = setInterval(spawnSatellite, 18000 + Math.random() * 12000);
      const planetInterval = setInterval(spawnPlanet, 18000 + Math.random() * 9000);
      const astroInterval = setInterval(spawnAstronaut, 18000 + Math.random() * 9000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearInterval(meteorInterval);
        clearInterval(satInterval);
        clearInterval(planetInterval);
        clearInterval(astroInterval);
      };
    } else {
      // ── Desktop: full experience
      const t1 = setTimeout(spawnMeteor, 5000);
      const t2 = setTimeout(spawnSatellite, 9000);
      const t3 = setTimeout(spawnPlanet, 15000);
      const meteorInterval = setInterval(spawnMeteor, 8000 + Math.random() * 7000);
      const satInterval = setInterval(spawnSatellite, 22000 + Math.random() * 16000);
      const planetInterval = setInterval(spawnPlanet, 20000 + Math.random() * 12000);
      const astroInterval = setInterval(spawnAstronaut, 65000 + Math.random() * 25000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearInterval(meteorInterval);
        clearInterval(satInterval);
        clearInterval(planetInterval);
        clearInterval(astroInterval);
      };
    }
  }, [isMobile, spawnMeteor, spawnSatellite, spawnPlanet, spawnAstronaut]);

  // Boost when cursor is idle — desktop only
  useEffect(() => {
    if (isMobile) return;
    const idleCheck = setInterval(() => {
      const idleTime = Date.now() - lastMouseMove.current;
      if (idleTime > 5000) {
        if (Math.random() > 0.5) spawnMeteor();
        if (Math.random() > 0.78) spawnSatellite();
        if (Math.random() > 0.85) spawnPlanet();
        if (Math.random() > 0.96) spawnAstronaut();
      }
    }, 6000);
    return () => clearInterval(idleCheck);
  }, [isMobile, spawnMeteor, spawnSatellite, spawnPlanet, spawnAstronaut]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">

      {/* ===== METEOR — Single, linear path with glowing trail ===== */}
      <AnimatePresence>
        {meteors.map((meteor) => {
          const rad = (meteor.angle * Math.PI) / 180;
          const endX = Math.cos(rad) * meteor.distance;
          const endY = Math.sin(rad) * meteor.distance;

          return (
            <motion.div
              key={`meteor-${meteor.id}`}
              className="absolute"
              style={{ left: `${meteor.startX}%`, top: `${meteor.startY}%` }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: endX, y: endY, opacity: [0, 1, 1, 0.3, 0] }}
              transition={{ duration: meteor.speed, ease: "linear" }}
            >
              <div
                style={{
                  transform: `rotate(${meteor.angle}deg)`,
                  transformOrigin: "right center",
                }}
              >
                {/* Glowing gradient tail */}
                <div
                  style={{
                    width: `${meteor.tailLength}px`,
                    height: "2px",
                    background: `linear-gradient(90deg, transparent 0%, ${meteor.color}20 15%, ${meteor.color}70 55%, ${meteor.color} 100%)`,
                    borderRadius: "1px",
                    filter: `drop-shadow(0 0 3px ${meteor.color}90)`,
                  }}
                />
                {/* Bright glowing head */}
                <div
                  style={{
                    position: "absolute",
                    right: "-4px",
                    top: "-3px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, #ffffff 15%, ${meteor.color} 50%, transparent 100%)`,
                    boxShadow: `0 0 10px 3px ${meteor.color}, 0 0 22px 6px ${meteor.color}50`,
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
            style={{ width: `${planet.size}px`, height: `${planet.size}px` }}
            initial={{ left: `${planet.startX}%`, top: `${planet.startY}%`, opacity: 0 }}
            animate={{ left: `${planet.endX}%`, top: `${planet.endY}%`, opacity: [0, 0.25, 0.25, 0] }}
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
                  width: "30%", height: "20%", top: "35%", left: "20%",
                  background: `${planet.color1}15`, filter: "blur(3px)",
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

      {/* ===== SATELLITES — ISS, Hubble, or Sputnik ===== */}
      <AnimatePresence>
        {satellites.map((sat) => (
          <motion.div
            key={`sat-${sat.id}`}
            className="absolute"
            style={isMobile ? { transform: "scale(0.7)", transformOrigin: "top left" } : undefined}
            initial={{ left: `${sat.startX}%`, top: `${sat.startY}%`, opacity: 0 }}
            animate={{ left: `${sat.endX}%`, top: `${sat.endY}%`, opacity: [0, 1, 1, 0] }}
            transition={{ duration: sat.duration, ease: "linear" }}
          >
            {sat.model === "iss" && <ISSModel flip={sat.flip} />}
            {sat.model === "hubble" && <HubbleModel flip={sat.flip} />}
            {sat.model === "sputnik" && <SputnikModel flip={sat.flip} />}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ===== ASTRONAUT — White, Orange, or Black suit ===== */}
      <AnimatePresence>
        {astronauts.map((astro) => {
          const theme = SUIT_THEMES[astro.suitColor];
          return (
            <motion.div
              key={`astro-${astro.id}`}
              className="absolute"
              style={isMobile ? { transform: "scale(0.75)", transformOrigin: "top left" } : undefined}
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
                    <stop offset="0%" stopColor={theme.suitFrom} />
                    <stop offset="100%" stopColor={theme.suitTo} />
                  </linearGradient>
                  <radialGradient id={`helmet-${astro.id}`} cx="0.4" cy="0.35" r="0.7">
                    <stop offset="0%" stopColor={theme.helmetOuter} />
                    <stop offset="70%" stopColor={theme.helmetMid} />
                    <stop offset="100%" stopColor={theme.helmetRim} />
                  </radialGradient>
                </defs>

                {/* Life support backpack */}
                <rect x="5" y="16" width="7" height="18" rx="2" fill={theme.backpack} stroke="#8890a0" strokeWidth="0.6" />
                <rect x="6.5" y="18" width="4" height="3" rx="0.5" fill="#7880a0" />
                <rect x="6.5" y="22" width="4" height="3" rx="0.5" fill="#7880a0" />
                <rect x="6.5" y="26" width="4" height="3" rx="0.5" fill="#7880a0" />
                <rect x="6" y="31" width="5" height="1.5" rx="0.5" fill="#606878" />

                {/* Helmet */}
                <circle cx="20" cy="11" r="10" fill={`url(#helmet-${astro.id})`} stroke="#d0d4dc" strokeWidth="0.8" />
                <ellipse cx="20" cy="18" rx="8" ry="2.5" fill={theme.helmetRim} stroke="#c0c8d0" strokeWidth="0.4" />

                {/* Gold visor */}
                <ellipse cx="21" cy="11" rx="7" ry="5.5" fill={`url(#visor-${astro.id})`} stroke="#cc7700" strokeWidth="0.6" />
                <ellipse cx="18" cy="9" rx="2.5" ry="1.5" fill="white" opacity="0.3" />

                {/* Torso */}
                <rect x="12" y="18" width="16" height="16" rx="4" fill={`url(#suit-${astro.id})`} stroke="#b0b8c0" strokeWidth="0.6" />
                {/* Chest control panel */}
                <rect x="15" y="20" width="10" height="6" rx="1" fill="#d8dce4" stroke="#b0b8c4" strokeWidth="0.5" />
                <circle cx="18" cy="22" r="1" fill="#ff2d7b" />
                <circle cx="22" cy="22" r="1" fill="#4d7cff" />
                <rect x="16" y="24" width="8" height="1" rx="0.5" fill="#a0a8b4" />

                {/* Left arm — waving */}
                <motion.g
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "12px 20px" }}
                >
                  <rect x="2" y="20" width="10" height="5" rx="2.5" fill={`url(#suit-${astro.id})`} stroke="#b0b8c0" strokeWidth="0.5" />
                  <circle cx="3" cy="22.5" r="3" fill={theme.helmetRim} stroke="#a0a8b0" strokeWidth="0.4" />
                </motion.g>

                {/* Right arm — waving */}
                <motion.g
                  animate={{ rotate: [6, -6, 6] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "28px 20px" }}
                >
                  <rect x="28" y="20" width="10" height="5" rx="2.5" fill={`url(#suit-${astro.id})`} stroke="#b0b8c0" strokeWidth="0.5" />
                  <circle cx="37" cy="22.5" r="3" fill={theme.helmetRim} stroke="#a0a8b0" strokeWidth="0.4" />
                </motion.g>

                {/* Legs */}
                <rect x="13" y="33" width="6" height="12" rx="3" fill={`url(#suit-${astro.id})`} stroke="#b0b8c0" strokeWidth="0.5" />
                <rect x="12" y="43" width="8" height="4" rx="2" fill={theme.boots} stroke="#8890a0" strokeWidth="0.4" />
                <rect x="21" y="33" width="6" height="12" rx="3" fill={`url(#suit-${astro.id})`} stroke="#b0b8c0" strokeWidth="0.5" />
                <rect x="20" y="43" width="8" height="4" rx="2" fill={theme.boots} stroke="#8890a0" strokeWidth="0.4" />

                {/* Floating tether */}
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
                  cx="28" cy="6" r="1.2" fill="#4d7cff"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                  cx="28" cy="6" r="3" fill="#4d7cff" opacity="0.15"
                  animate={{ opacity: [0.15, 0.05, 0.15] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
