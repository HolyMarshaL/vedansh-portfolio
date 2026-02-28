export const SITE = {
  name: "VEDANSH.SPACE",
  title: "Vedansh Chauhan",
  subtitle: "Sr. Product Designer",
  tagline: "Building Digital Universes",
};

export const STATS = [
  { label: "YEARS IN ORBIT", value: 5, suffix: "+", icon: "clock" },
  { label: "USERS IMPACTED", value: 1000000, suffix: "+", icon: "users" },
  { label: "REVENUE GENERATED", value: 5, prefix: "$", suffix: "M+", icon: "chart" },
  { label: "PRODUCTS LAUNCHED", value: 6, suffix: "+", icon: "rocket" },
  { label: "SERIES A SECURED", value: 3, prefix: "$", suffix: "M", icon: "trophy" },
] as const;

export const BIO = `A Product Designer who doesn't just push pixels — I build products from zero that generate millions. From being the first designer at a startup that scaled to 10 Lakh+ users, to leading design for platforms generating $2M+ yearly revenue. I think in systems, ship with data, and design for impact.`;

export const EXPERIENCE = [
  {
    id: "promodome",
    company: "Promodome Digital",
    role: "Sr. Product Designer",
    period: "Nov 2023 — Present",
    stardate: "2023.11 — PRESENT",
    size: "blazing-star" as const,
    color: "#ff6b35",
    metrics: [
      { label: "Yearly Revenue", value: "$2M" },
      { label: "Monthly Revenue", value: "+15%" },
      { label: "Purchase Success", value: "2x" },
    ],
    description:
      "Designed the entire VeeFly platform from scratch. Led design for VeeFly Extension, AI tools, PWA, Newsletter, and Dashboard. Optimized user journeys from landing pages to dashboard funnels.",
    highlights: [
      "VeeFly Platform",
      "AI Tools",
      "Chrome Extension",
      "PWA",
      "Dashboard",
    ],
  },
  {
    id: "artium",
    company: "Artium Academy",
    role: "Product Designer",
    period: "May 2023 — Sept 2023",
    stardate: "2023.05 — 2023.09",
    size: "medium-planet" as const,
    color: "#b44aff",
    metrics: [
      { label: "Churn Reduction", value: "-8%" },
      { label: "Paid Conversion", value: "+3%" },
    ],
    description:
      "Optimised the Trial class booking flow. Designed and developed the 'Artium Wallet' feature. Standardised a design system with multi-level feedback loops.",
    highlights: ["Artium Wallet", "Design System", "Trial Booking Flow"],
  },
  {
    id: "seekho",
    company: "Seekho",
    role: "Sr. Product Designer",
    period: "Mar 2021 — Apr 2023",
    stardate: "2021.03 — 2023.04",
    size: "giant-planet" as const,
    color: "#00f0ff",
    metrics: [
      { label: "Downloads", value: "10L+" },
      { label: "Series A", value: "$3M" },
      { label: "Revenue Increase", value: "+25%" },
      { label: "CTR Boost", value: "+70%" },
    ],
    description:
      "First designer on board. Designed entire Mobile and Web platform from scratch to MVP launch. Built the design team and established the design system. Developed monetization strategy resulting in 25% revenue increase and 40% ARPU increase.",
    highlights: [
      "Mobile App",
      "Web Platform",
      "Design System",
      "Monetization",
      "Team Building",
    ],
  },
  {
    id: "kukufm",
    company: "KUKU FM",
    role: "UI/UX Design Intern",
    period: "Sep 2019 — Oct 2019",
    stardate: "2019.09 — 2019.10",
    size: "small-asteroid" as const,
    color: "#ff2d7b",
    metrics: [
      { label: "Churn Reduction", value: "-22%" },
      { label: "CTR Boost", value: "+32%" },
    ],
    description:
      "Optimized KUKU FM's onboarding flow. Simplified the Language selection screen and decluttered the Home Screen. Devised high fidelity prototypes and UX documentation.",
    highlights: ["Onboarding", "Home Screen", "UX Documentation"],
  },
] as const;

export const PROJECTS = [
  {
    id: "seekho-app",
    name: "Seekho",
    tagline: "Designed from 0 to 10L+ users",
    color: "#00f0ff",
    description:
      "A brief journey through my Design Process that empowered 10L+ users to learn and acquire necessary online skills.",
    type: "Case Study",
  },
  {
    id: "veefly",
    name: "VeeFly",
    tagline: "Platform generating $2M/yr",
    color: "#b44aff",
    description:
      "Designed the entire VeeFly platform — Extension, AI tools, PWA, Newsletter, Dashboard — generating $2M yearly revenue.",
    type: "Product Design",
  },
  {
    id: "zoupyu",
    name: "Zoupyu",
    tagline: "Built entirely with AI (Claude)",
    color: "#ff6b35",
    description:
      "A platform to create Google Ads/YouTube campaigns. End to end programming done simply by prompting Claude.",
    type: "AI-Built Platform",
    liveUrl: "https://zoupyu.com",
  },
  {
    id: "jaguar",
    name: "Jaguar D-Type",
    tagline: "A legacy reimagined",
    color: "#f0f0ff",
    description:
      "A minimalistic redesign of Jaguar's D Type Landing page to achieve the aesthetics of the legacy of this miraculous car.",
    type: "Landing Page",
  },
] as const;

export const SKILLS = {
  designer: {
    name: "The Designer",
    skills: ["UI/UX Design", "Product Design", "Wireframes", "Prototyping"],
  },
  researcher: {
    name: "The Researcher",
    skills: ["Design Research", "Usability Testing", "Market Research"],
  },
  toolsmith: {
    name: "The Toolsmith",
    skills: ["Figma", "Adobe XD", "Photoshop", "Premiere Pro", "Framer"],
  },
  strategist: {
    name: "The Strategist",
    skills: ["Product Management", "PRD Documentation", "KPIs", "Monetization"],
  },
  analyst: {
    name: "The Analyst",
    skills: ["Mixpanel", "GA4", "Redash", "Microsoft Clarity"],
  },
  builder: {
    name: "The Builder",
    skills: ["AI Prompt Engineering", "Lottie Animation", "Framer Motion"],
  },
} as const;

export const PHILOSOPHY = [
  {
    title: "User First, Always",
    description: "Every pixel serves the user",
  },
  {
    title: "Data Drives Decisions",
    description: "Metrics are the north star",
  },
  {
    title: "Design Systems Scale",
    description: "From 1 to 1 million",
  },
  {
    title: "Ship, Measure, Iterate",
    description: "Speed with intention",
  },
] as const;

export const SOCIALS = {
  email: "connectwithved@gmail.com",
  behance: "#",
  linkedin: "#",
  instagram: "#",
} as const;
