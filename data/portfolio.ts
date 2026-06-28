/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
 * ─────────────────────────────────────────────────────────────────────────
 *  Nikitha: edit everything here. Anything marked "YOUR_..." or "#" shows up
 *  in the UI as a small gold [add link] badge until you replace it.
 *  See the SWAP / TODO comments for assets that live elsewhere.
 */

export interface CaseStudy {
  problem: string;
  build: string[];
  interesting: string;
  results: { value: string; label: string }[];
  /* TODO: drop a screenshot/mockup into /public and reference it here */
  screenshot?: string;
}

export interface Project {
  slug: string;
  title: string;
  type: string;
  description: string;
  stack: string[];
  live: string;
  github: string;
  highlight: string;
  color: string;
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "circleup",
    title: "CircleUp",
    type: "Social Platform",
    description:
      "A social app that matches user profiles using keyword analysis and AI — built for people who want to find their people, not just followers.",
    stack: ["React.js", "Spring Boot", "Python", "ML", "MySQL"],
    live: "YOUR_LIVE_LINK",
    github: "YOUR_GITHUB_LINK",
    highlight: "AI-powered profile matching",
    color: "#c9b99a",
    caseStudy: {
      problem:
        "Social networks optimise for follower counts, not for fit. Finding people who genuinely share your interests and goals is left to luck and endless scrolling.",
      build: [
        "React.js front-end with a focused, low-friction onboarding flow.",
        "Spring Boot REST API handling auth, profiles and the matching pipeline.",
        "A Python ML service that runs keyword analysis over free-text profiles.",
        "MySQL for durable profile and relationship storage.",
        "A scoring engine that ranks profile similarity rather than relying on naive tag overlap.",
      ],
      interesting:
        "The matching engine. Two people often describe themselves with completely different words while meaning the same thing. Instead of matching on exact tags, CircleUp does keyword analysis and scores semantic closeness — so the match is about substance, not vocabulary.",
      results: [
        { value: "AI", label: "Keyword-based matching" },
        { value: "Full-stack", label: "React + Spring + Python" },
        { value: "[add metric]", label: "Users / engagement" },
      ],
    },
  },
  {
    slug: "pulsegate",
    title: "PulseGate",
    type: "Backend / Systems",
    description:
      "A job queue simulation and backend architecture project — engineered for performance, built to understand what happens under the hood when systems scale.",
    stack: ["Java", "Spring Boot", "MySQL", "System Design"],
    live: "YOUR_LIVE_LINK",
    github: "YOUR_GITHUB_LINK",
    highlight: "Queue simulation engine",
    color: "#9a8570",
    caseStudy: {
      problem:
        "Background work — sending email, resizing images, generating reports, firing webhooks — can't block the request path. You need a system that accepts jobs instantly and processes them reliably, even when individual jobs fail or a worker dies mid-task.",
      build: [
        "A producer that persists each job and enqueues it, returning to the caller immediately.",
        "A worker pool that pulls jobs with a bounded concurrency limit — the backpressure that keeps the system stable under load.",
        "An exponential backoff retry policy (5s → 25s → 125s, max 3 attempts).",
        "A dead-letter path so permanently failed jobs are captured, never silently dropped.",
        "A reclaimer that detects jobs stuck on crashed workers and requeues them.",
        "Live metrics: queue depth, throughput, processing latency and dead-letter counts.",
      ],
      interesting:
        "Backpressure. The naive version grabs every available job at once and falls over under load. Capping concurrency means the engine degrades gracefully instead of crashing. Wiring the retry → dead-letter → reclaim loop so that no job is ever lost — even when a worker dies holding one — was the real systems puzzle.",
      results: [
        { value: "Exponential", label: "Backoff retries (max 3)" },
        { value: "Bounded", label: "Concurrency / backpressure" },
        { value: "Zero", label: "Silently dropped jobs" },
      ],
    },
  },
  {
    slug: "meditrak",
    title: "MediTrak",
    type: "Android App",
    description:
      "A high-contrast medication tracker for Alzheimer's patients. Minimalistic UI that reduced navigation errors by 40% in usability testing. Built with empathy first.",
    stack: ["Android Studio", "Java", "SQLite", "AlarmManager"],
    live: "YOUR_LIVE_LINK",
    github: "YOUR_GITHUB_LINK",
    highlight: "40% reduction in navigation errors",
    color: "#b8a898",
    caseStudy: {
      problem:
        "Alzheimer's patients miss medications because typical app UIs ask too much of them — too many taps, low contrast, and flows that assume short-term memory the user may not have.",
      build: [
        "Native Android app written in Java in Android Studio.",
        "A high-contrast, minimalist UI with large touch targets and one clear action per screen.",
        "SQLite for fully offline, local-first storage.",
        "AlarmManager for reliable medication reminders that fire even without a network.",
      ],
      interesting:
        "Designing for cognitive load instead of aesthetics. Every button removed was a usability win. Usability testing showed the empathy-first approach cut navigation errors by 40% — proof that restraint is a feature.",
      results: [
        { value: "40%", label: "Fewer navigation errors" },
        { value: "Offline", label: "AlarmManager reminders" },
        { value: "High-contrast", label: "Accessibility-first UI" },
      ],
    },
  },
  {
    slug: "paradecast",
    title: "ParadeCast",
    type: "Cross-Platform App",
    description:
      "Cross-platform web and mobile app with a custom ML engine bridge. 90% code reusability between web and mobile. Location-to-analysis latency cut by 20%.",
    stack: ["React.js", "Capacitor", "Google Maps API", "ML"],
    live: "YOUR_LIVE_LINK",
    github: "YOUR_GITHUB_LINK",
    highlight: "90% cross-platform code reuse",
    color: "#a09080",
    caseStudy: {
      problem:
        "Building the same product twice — once for web, once for mobile — wastes time and splits the codebase into two things that drift apart.",
      build: [
        "A single React.js codebase shipped to web and native mobile via Capacitor.",
        "Google Maps API for location capture and visualisation.",
        "A custom bridge to an ML engine so both platforms share one analysis path.",
        "Pipeline tuning that trimmed the location-to-analysis round trip.",
      ],
      interesting:
        "The ML engine bridge. By routing both web and mobile through one shared analysis path, ParadeCast hit 90% code reuse and shaved 20% off location-to-analysis latency — one brain, two front doors.",
      results: [
        { value: "90%", label: "Cross-platform code reuse" },
        { value: "20%", label: "Lower analysis latency" },
        { value: "1 codebase", label: "Web + mobile" },
      ],
    },
  },
];

/** Special "Research" card — gets a distinct visual treatment in the Projects grid. */
export const research = {
  badge: "Published Research",
  title: "Parkinson's Symptom Detection via ML",
  type: "Research Paper",
  description:
    "Feature-engineered tremor and tapping data to detect Parkinson's symptoms. Trained, evaluated, and published.",
  highlight: "Published & peer-reviewed",
  link: "YOUR_PAPER_LINK", // TODO: add DOI / publication link
};

/** RPG-style character card shown in the About section. */
export const characterCard = {
  name: "NIKITHA D",
  subtitle: "Full-Stack · ML · UX",
  meta: [
    { label: "CLASS", value: "Engineer / Maker" },
    { label: "LEVEL", value: "2nd year" },
    { label: "BASE", value: "Bangalore" },
    { label: "STATUS", value: "Building" },
  ],
  stats: [
    { label: "Creativity", value: 90 },
    { label: "Debug-fu", value: 85 },
    { label: "Frontend", value: 82 },
    { label: "Backend", value: 75 },
    { label: "ML/AI", value: 70 },
    { label: "Math", value: null as number | null, note: "returning" },
  ],
};

export const bio = [
  "I'm Nikitha — a second-year CS engineer at Dayananda Sagar University, Bangalore. I build full-stack systems, train ML models, and somehow also design dresses and solder jewellery.",
  "I came to tech because it's where math, creativity, and the future collide. I'm fascinated by AIML — the kind of problems that sit at the edge of what machines can understand. I published a research paper on Parkinson's symptom detection using tremor and tapping data. I vibe-code. I debug obsessively. I care deeply about how things look AND how they work.",
  "Math and I had a complicated relationship — I stepped away for a few years, and now I'm finding my way back to it. Slowly, deliberately. That's the kind of person I am: I return to things that matter.",
];

/** Tech-stack pill grid for the Skills section. */
export const techStack: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Java", "Python", "JavaScript", "TypeScript", "C"] },
  { category: "Frameworks", items: ["React.js", "Spring Boot", "Next.js", "Tailwind CSS"] },
  { category: "Data & ML", items: ["MySQL", "SQLite", "Python ML stack"] },
  { category: "Tools", items: ["Git", "GitHub", "Android Studio", "VS Code", "Linux"] },
];

/** Larger RPG skill bars (Skills section) — each has a one-line tooltip. */
export const skillBars: { label: string; value: number; note: string }[] = [
  { label: "UI/UX Design", value: 82, note: "Interfaces that feel intentional, not templated." },
  { label: "Full-Stack Dev", value: 75, note: "Comfortable from the database up to the pixel." },
  { label: "ML / AI", value: 68, note: "Feature engineering, training, evaluating, shipping." },
  { label: "Feature Engineering", value: 88, note: "Turning messy raw signals into models that learn." },
  { label: "Debugging", value: 90, note: "The 2am kind. I don't stop until it makes sense." },
  { label: "Creative Direction", value: 92, note: "Designing the whole feel, not just the layout." },
];

/** Count-up stats row. Use `display` for non-numeric values. */
export const stats: {
  value: number | null;
  display?: string;
  decimals?: number;
  label: string;
}[] = [
  { value: 2, label: "Deployed Projects" },
  { value: 1, label: "Published Research Paper" },
  { value: 8.51, decimals: 2, label: "CGPA" },
  { value: null, display: "1st", label: "Fashion Design Contest Winner" },
];

export const achievements: {
  icon: string;
  title: string;
  venue: string;
  result: string;
  detail: string;
}[] = [
  {
    icon: "🥉",
    title: "IDEAVERSE'25",
    venue: "IEEE, DSU",
    result: "3rd Place — AI solution for ethical social media",
    detail: "Built with a team.",
  },
  {
    icon: "🥈",
    title: "MAGNOVITE'25",
    venue: "Christ University",
    result: "2nd Place — Grid Restoration Challenge",
    detail: "Circuit debugging, quizzes, on-the-spot problem solving.",
  },
  {
    icon: "🏆",
    title: "Fashion Design Contest",
    venue: "",
    result: "1st Place — Designed and conceptualised a full garment",
    detail: "The only non-code win in the list. That's the point.",
  },
  {
    icon: "📄",
    title: "Research Publication",
    venue: "",
    result: "Parkinson's Symptom Detection via ML",
    detail: "Feature-engineered tremor and tapping data. Trained and published.",
  },
];

export const currently = {
  doing: [
    "Building CircleUp and PulseGate",
    "Returning to mathematics (slowly, intentionally)",
    "Exploring AIML and quantum computing concepts",
    "Open to internships and interesting problems",
  ],
  into: [
    "Soldering jewellery",
    "Chess (looking for opponents)",
    "Reading — ask me what",
    "Fashion — always thinking about it",
  ],
};

/** Hobby cards that fan out when you hover the hero avatar. */
export const hobbies: { icon: string; label: string }[] = [
  { icon: "🎨", label: "Fashion designer — contest winner" },
  { icon: "♟️", label: "Chess player" },
  { icon: "💎", label: "Jewellery maker & ex-entrepreneur" },
  { icon: "📚", label: "Currently reading math again" },
];

export const contact = {
  email: "nikithad11925@gmail.com",
  phone: "+91 8050120456",
  location: "Bangalore, India",
  linkedin: "YOUR_LINKEDIN_LINK", // TODO: add LinkedIn URL
  github: "YOUR_GITHUB_LINK", // TODO: add GitHub profile URL
};

export const terminalTagline = "thinking in N dimensions";
