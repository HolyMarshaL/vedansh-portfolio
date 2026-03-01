export const SITE = {
  name: "VEDANSH.SPACE",
  title: "Vedansh Chauhan",
  subtitle: "Sr. Product Designer",
  tagline: "I make pixels go brrr",
};

export const STATS = [
  { label: "YEARS CAUSING CHAOS", value: 5, suffix: "+", icon: "clock" },
  { label: "HUMANS AFFECTED", value: 1000000, suffix: "+", icon: "users" },
  { label: "MONEY PRINTER GO", value: 5, prefix: "$", suffix: "M+ brrr", icon: "chart" },
  { label: "PRODUCTS SHIPPED", value: 6, suffix: " (and counting)", icon: "rocket" },
  { label: "SERIES A BAGGED", value: 3, prefix: "$", suffix: "M", icon: "trophy" },
] as const;

export const BIO = `Listen, I'm not your "move this button 2px left" kind of designer. I'm the guy who walks into a startup with zero users and walks out with 10 Lakh+. The guy who designs platforms that print $2M a year. I think in systems, ship with data, and accidentally make founders rich. Sorry not sorry.`;

export const EXPERIENCE = [
  {
    id: "promodome",
    company: "Promodome Digital",
    role: "Sr. Product Designer",
    period: "Nov 2023 — Present",
    stardate: "2023.11 — PRESENT",
    size: "blazing-star" as const,
    color: "#ff44cc",
    metrics: [
      { label: "Yearly Revenue", value: "$2M" },
      { label: "Monthly Revenue", value: "+15%" },
      { label: "Purchase Success", value: "2x" },
    ],
    description:
      "Built VeeFly from literally nothing. Now it's a $2M/yr machine. Designed the Extension, AI tools, PWA, Newsletter, and Dashboard. Made the user journey so smooth, purchases doubled. You're welcome, stakeholders.",
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
      { label: "Churn Killed", value: "-8%" },
      { label: "Paid Conversion", value: "+3%" },
    ],
    description:
      "Fixed their trial booking flow (it was rough, let's be honest). Designed the Artium Wallet that made people actually pay. Built a design system so good, last-minute changes became a myth.",
    highlights: ["Artium Wallet", "Design System", "Trial Booking Flow"],
  },
  {
    id: "seekho",
    company: "Seekho",
    role: "Sr. Product Designer",
    period: "Mar 2021 — Apr 2023",
    stardate: "2021.03 — 2023.04",
    size: "giant-planet" as const,
    color: "#4d7cff",
    metrics: [
      { label: "Downloads", value: "10L+" },
      { label: "Series A", value: "$3M" },
      { label: "Revenue Boost", value: "+25%" },
      { label: "CTR Boost", value: "+70%" },
    ],
    description:
      "Employee #1 (design department). Built the entire app and web platform from scratch. Literally from 'we have an idea' to '10 Lakh downloads and a $3M Series A'. My thumbnails boosted CTR by 70%. Yes, thumbnails. Don't underestimate thumbnails.",
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
      { label: "Churn Destroyed", value: "-22%" },
      { label: "CTR Boost", value: "+32%" },
    ],
    description:
      "Was an intern for 2 months. Reduced churn by 22% and boosted CTR by 32%. They probably should've promoted me but whatever, I had galaxies to conquer.",
    highlights: ["Onboarding", "Home Screen", "UX Documentation"],
  },
] as const;

export const PROJECTS = [
  {
    id: "seekho-app",
    name: "Seekho",
    tagline: "0 to 10L+ users. No big deal.",
    color: "#4d7cff",
    description:
      "The app that made 10 Lakh+ Indians skill up. Designed every pixel, from onboarding to monetization. We went from 'what's a design system' to '$3M Series A' in 2 years.",
    type: "Case Study",
  },
  {
    id: "veefly",
    name: "VeeFly",
    tagline: "$2M/yr go brrr",
    color: "#b44aff",
    description:
      "The entire VeeFly platform — Extension, AI tools, PWA, Newsletter, Dashboard. Every single screen. $2M yearly revenue and counting.",
    type: "Product Design",
  },
  {
    id: "zoupyu",
    name: "Zoupyu",
    tagline: "Built by talking to an AI. Seriously.",
    color: "#ff44cc",
    description:
      "A full-stack platform for Google Ads/YouTube campaigns. The twist? I built the entire thing by prompting Claude. No traditional coding. Just vibes and prompts.",
    type: "AI-Built Platform",
    liveUrl: "https://zoupyu.com",
  },
  {
    id: "jaguar",
    name: "Jaguar D-Type",
    tagline: "A legacy reimagined",
    color: "#f0f0ff",
    description:
      "A minimalistic redesign of Jaguar's D Type Landing page. Because even legendary cars deserve legendary pixels.",
    type: "Landing Page",
  },
] as const;

export const SKILLS = {
  designer: {
    name: "The Pixel Wizard",
    skills: ["UI/UX Design", "Product Design", "Wireframes", "Prototyping"],
  },
  researcher: {
    name: "The Mind Reader",
    skills: ["Design Research", "Usability Testing", "Market Research"],
  },
  toolsmith: {
    name: "The Arsenal",
    skills: ["Figma", "Adobe XD", "Photoshop", "Premiere Pro", "Framer"],
  },
  strategist: {
    name: "The Mastermind",
    skills: ["Product Management", "PRD Documentation", "KPIs", "Monetization"],
  },
  analyst: {
    name: "The Data Nerd",
    skills: ["Mixpanel", "GA4", "Redash", "Microsoft Clarity"],
  },
  builder: {
    name: "The Mad Scientist",
    skills: ["AI Prompt Engineering", "Lottie Animation", "Framer Motion"],
  },
  wanderer: {
    name: "The Wanderer",
    skills: ["Hiking", "Camping", "Nature Devotee", "Car Enthusiast", "Mountain Lover"],
  },
} as const;

export const PHILOSOPHY = [
  {
    title: "User First, Always",
    description: "Everything I build starts with one question: will the user not hate this?",
  },
  {
    title: "Data > Opinions",
    description: "Your gut feeling is cute. My Mixpanel dashboard is cuter.",
  },
  {
    title: "Systems Over Screens",
    description: "I don't design pages. I design systems that scale from 1 to 1 million.",
  },
  {
    title: "Ship It Yesterday",
    description: "Perfect is the enemy of shipped. Launch, measure, iterate, repeat till heat death of universe.",
  },
] as const;

export const SOCIALS = {
  email: "connectwithved@gmail.com",
  behance: "#",
  linkedin: "#",
  instagram: "#",
} as const;
