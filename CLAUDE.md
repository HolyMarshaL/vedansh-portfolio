# VEDANSH.SPACE — The Portfolio That Breaks The Internet

## Context

Vedansh Chauhan is a Sr. Product Designer who has built products from zero to millions — Seekho (0 to 10L+ users, $3M Series A), VeeFly ($2M/yr revenue), and Zoupyu (built entirely with AI). This is a **cinematic, gamified journey through space** that makes design leaders spend 15+ minutes exploring.

## The Concept

**Metaphor**: Career = voyage through the design universe. Companies = planets. Skills = constellations. Visitor = astronaut.

**Core Principles**: Progressive disclosure, weighted interactions with sound, gamification, cinematic not decorative, space + neon + light DNA.

## Tech Stack

- **Next.js 15** (App Router) | **React Three Fiber** + Drei | **GSAP** + ScrollTrigger | **Framer Motion** | **Lenis** | **Howler.js** | **Tailwind CSS v4**
- Fonts: Space Grotesk (headings) + JetBrains Mono (accents)

## Color System (Updated v2)

Primary palette: Pink (#ff2d7b), Purple (#b44aff), Blue (#4d7cff), Magenta (#ff44cc), Orange (#ff6b35)
Animated gradient text used for all section headings (`gradient-text-glow` class).
Cyan (#00f0ff) kept as secondary accent only.

```
--space-black: #06060a | --space-navy: #0d1117
--neon-pink: #ff2d7b | --neon-purple: #b44aff | --neon-blue: #4d7cff
--neon-magenta: #ff44cc | --neon-orange: #ff6b35
--star-white: #f0f0ff | --nebula-blue: #1a1a3e | --neon-cyan: #00f0ff (secondary)
```

## Journey Sections

0. **PRELOADER** — "Are you ready for an epic adventure?" → [YES] [YES] (pink→purple / purple→blue gradient buttons) → "You're cool. Kinda crazy!" → T-5 countdown with gradient text → Warp speed with multi-color streaks
1. **HERO** — 3D starfield (circular glowy particles in pink/purple/blue/white), massive gradient-glow name, cursor trail (cycling pink/purple/blue colors), floating tool icons with per-color accents, dynamic elements (meteor showers, passing planets, satellites, astronaut)
2. **MISSION CONTROL** — Holographic photo (pink/purple gradient + purple glow border), animated stat counters with per-stat accent colors, edgy copy
3. **CONSTELLATION MAP** — 6 interactive skill constellations with per-constellation colors, discovery counter
4. **WORMHOLES** — Experience timeline with pink timeline line & traveling pink dot, per-company accent colors (Promodome=#ff44cc, Artium=#b44aff, Seekho=#4d7cff, KUKU FM=#ff2d7b)
5. **PLANETS** — Projects as solar system with per-project accent colors
6. **NEBULA** — Design philosophy cards with colored number badges, animated nebula blobs, gradient-glow quote
7. **SIGNAL** — Contact as transmission terminal with purple/pink accents, gradient submit button
8. **FOOTER** — Gradient text credits, pink accent back-to-top

## Dynamic Hero Elements

- **Meteor showers**: Streaks with glowing head + fading tail, every 4-8s (more when cursor idle)
- **Passing planets**: Large glowing spheres with rings, subtle opacity, every 15-25s
- **Satellites**: Detailed SVG with solar panels + blinking signal light, every 10-18s
- **Astronaut**: Full SVG figure with helmet, visor, limbs, tether, every 25-40s (rare)
- **Idle boost**: Extra spawns when cursor idle > 3 seconds

## Gamification (Planned)

7 achievements: First Contact, Star Mapper, Dimension Traveler, World Explorer, Signal Sender, Time Traveler, Cosmic Collector. Progress ring (bottom-right). Easter eggs: Konami code, triple-click name, hidden star hover, scroll-past-footer astronaut.

## Sound (Planned)

Retro synth + modern beats + phonk + epic space (Hans Zimmer F1 x Resonance "Home"). Section-specific shifts. UI sounds on hover/click/achievements. Mute by default with prompt.

## Vedansh's Profile

- **Current**: Sr. Product Designer @ Promodome Digital (Nov 2023+) — VeeFly platform, $2M/yr, AI tools, Extension, PWA
- **Seekho**: Sr. Product Designer (Mar 2021 - Apr 2023) — First designer, 0→10L+ users, $3M Series A, 25% revenue increase, 70% CTR boost
- **Artium Academy**: Product Designer (May-Sep 2023) — 8% churn reduction, Artium Wallet (3% conversion lift)
- **KUKU FM**: UI/UX Intern (Sep-Oct 2019) — 22% churn reduction, 32% CTR boost
- **Education**: B.Tech CS, Jaypee University (2016-2020)
- **Projects**: Seekho app, VeeFly, Zoupyu.com (built with Claude), Jaguar D-Type landing page
- **Tools**: Figma, Adobe XD, Lottie, Framer, Photoshop, Premiere Pro, Mixpanel, Redash, Clarity, GA4, AI Prompting

## Build Status

### ✅ Completed (Phase 1)
- [x] Preloader with 4-phase animation (question → response → countdown → warp)
- [x] Hero section with 3D starfield (React Three Fiber), cursor trail, name with glow
- [x] Mission Control with holographic avatar, stat counters, bio terminal
- [x] Constellation Map with 6 interactive skill constellations + discovery counter
- [x] Wormholes experience timeline with portals, metrics, expandable overlays
- [x] Planets project solar system with orbit rings, expandable detail cards
- [x] Nebula design philosophy with 3D tilt cards, nebula blobs, quote
- [x] Signal contact form as transmission terminal
- [x] Footer with stardate, coordinates, back-to-launchpad

### ✅ Completed (Phase 2 — Polish)
- [x] Color palette overhaul: cyan → diverse pink/purple/blue/magenta
- [x] Animated gradient text (gradient-text-glow) for all section headings
- [x] Edgy, personality-driven copy across all sections
- [x] Circular glowy star particles (canvas texture + AdditiveBlending)
- [x] Dynamic hero elements (meteors, planets, satellites, astronaut)
- [x] Multi-color cursor trail
- [x] Per-item accent colors (stats, constellations, timeline entries, social links)

### 🔲 TODO
- [ ] Fix meteor animation (linear path + trail)
- [ ] Upgrade astronaut/satellite to high-quality opaque SVG models
- [ ] Lenis smooth scroll integration
- [ ] GSAP ScrollTrigger for section entrance animations
- [ ] Sound design (Howler.js)
- [ ] Gamification system (achievements, progress ring, easter eggs)
- [ ] Real photos/assets replacing placeholders
- [ ] Mobile responsive polish
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] Deployment (GitHub + Vercel)

## File Structure

```
src/
├── app/
│   ├── globals.css          # Theme, animations, utilities (gradient-text, neon-glow, glass-card, etc.)
│   ├── layout.tsx           # Fonts (Space Grotesk + JetBrains Mono), metadata
│   └── page.tsx             # Main orchestrator (preloader → sections)
├── components/
│   ├── preloader/Preloader.tsx     # 4-phase animated preloader
│   ├── hero/
│   │   ├── Hero.tsx                # Main hero with Canvas, dynamic elements
│   │   ├── StarField.tsx           # Three.js 3000-star system with canvas texture
│   │   ├── CursorTrail.tsx         # Multi-color cursor particle trail
│   │   └── HeroDynamicElements.tsx # Meteors, planets, satellites, astronaut
│   ├── mission-control/
│   │   ├── MissionControl.tsx      # Bio + stats section
│   │   └── StatCounter.tsx         # Animated count-up with accent colors
│   ├── constellation/ConstellationMap.tsx  # SVG skill constellations
│   ├── wormholes/ExperienceTimeline.tsx   # Career timeline with portals
│   ├── planets/ProjectSolarSystem.tsx     # Project showcase as solar system
│   ├── nebula/DesignPhilosophy.tsx        # Philosophy cards with 3D tilt
│   ├── signal/Contact.tsx                 # Transmission terminal contact form
│   └── footer/Footer.tsx                  # Stardate footer
├── hooks/
│   └── useMousePosition.ts  # Mouse position hook with normalized coordinates
└── lib/
    └── content.ts           # All portfolio data, copy, metrics, social links
```
