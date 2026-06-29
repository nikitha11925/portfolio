/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
 * ─────────────────────────────────────────────────────────────────────────
 *  Nikitha: edit everything here. Anything marked "YOUR_..." shows up in the
 *  UI as a small gold [add link] badge until you replace it.
 */

export interface CaseStudy {
  problem: string;
  build: string[];
  interesting: string;
  results: { value: string; label: string }[];
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
    type: "Skill-Exchange Platform",
    description:
      "A community skill-exchange platform — teach what you know, learn what you don't. An AI matchmaker finds the best mutual exchange between members: you teach someone React, they teach you video editing. Real community, real value, zero money involved.",
    stack: ["Spring Boot", "React", "PostgreSQL", "Redis", "Gemini API", "WebSocket"],
    live: "https://frontend-qq1ke9zsg-nc-oder.vercel.app/",
    github: "https://github.com/nikitha11925/circleup",
    highlight: "AI-matched mutual skill exchange",
    color: "#c9b99a",
    caseStudy: {
      screenshot: "/circleupSS.png",
      problem:
        "People post skills they can teach (guitar, DSA, Figma, cooking) and skills they want to learn. The hard part is finding the best mutual exchange — pairing someone who can teach you React with someone who wants what you know — at real community scale, with no money changing hands.",
      build: [
        "AI matching engine — sends both user profiles and skill lists to Gemini and gets back a compatibility score with a reason. Cached in Redis so the API isn't hit on every page load (a RAG-lite pattern).",
        "Real-time session chat — WebSocket rooms per matched pair using Spring + STOMP, messages persisted to PostgreSQL, with Redis pub/sub for horizontal scaling.",
        "Session scheduling with conflict detection — booking a one-hour slot checks both users' calendars to prevent double-booking, enforced at the database level with row-level locking.",
        "Reputation system — both users rate each other after a session and the score affects future match priority; ratings update asynchronously so the main flow never blocks (eventual consistency).",
      ],
      interesting:
        "The matching engine. Instead of naive tag overlap, CircleUp sends both profiles and skill lists to Gemini and gets back a compatibility score and a human-readable reason — cached in Redis to keep it fast. A lightweight RAG-style approach to a genuine matchmaking problem.",
      results: [
        { value: "Gemini", label: "AI compatibility scoring" },
        { value: "Real-time", label: "WebSocket session chat" },
        { value: "Redis", label: "Caching + pub/sub scaling" },
      ],
    },
  },
  {
    slug: "pulsegate",
    title: "PulseGate",
    type: "Backend / Distributed Systems",
    description:
      "A background job processing engine. Any service can push a job (send email, resize image, generate report); PulseGate picks it up, routes it to the right worker, retries on failure, tracks status, and surfaces a live dashboard — the kind of infrastructure every company runs but few build from scratch.",
    stack: [
      "Spring WebFlux",
      "Redis Streams",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "Helm",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
    ],
    live: "https://pulsegate-tau.vercel.app/",
    github: "https://github.com/nikitha11925/PulseGate",
    highlight: "Autoscaling queue with full observability",
    color: "#9a8570",
    caseStudy: {
      screenshot: "/PulseGateSS.png",
      problem:
        "Background work — sending email, resizing images, generating reports — can't block the request path. You need a system that accepts jobs instantly and processes them reliably, even when individual jobs fail or a worker dies mid-task.",
      build: [
        "Redis Streams as the queue backbone — real consumer groups with acknowledgement, not a simple list. If a worker crashes mid-job, pending entries are reclaimed and retried, exactly how production queues work.",
        "Exponential backoff retry — failed jobs wait 5s, 25s, then 125s before retry; after max attempts they move to a dead-letter queue (the pattern Celery, Sidekiq and BullMQ use internally).",
        "Worker autoscaling — a Kubernetes HPA scales worker pods on a queue-depth metric exported to Prometheus, so workers spin up automatically as the queue grows.",
        "Reactive core (Spring WebFlux) — the dispatcher handles thousands of job-status polls without blocking, with backpressure built in.",
        "Full observability — jobs processed/sec, queue depth, worker saturation and p99 processing time, all on a Grafana dashboard.",
      ],
      interesting:
        "Building queue mechanics the way real production systems do — Redis Streams consumer groups with acknowledgement and reclaim, exponential-backoff retries into a dead-letter queue, and a Kubernetes HPA autoscaling workers on live queue-depth metrics.",
      results: [
        { value: "Redis Streams", label: "Consumer groups + reclaim" },
        { value: "K8s HPA", label: "Queue-depth autoscaling" },
        { value: "WebFlux", label: "Non-blocking dispatcher" },
      ],
    },
  },
  {
    slug: "paradecast",
    title: "ParadeCast",
    type: "Geospatial / ML Web App",
    description:
      "Geospatial Activity Intelligence — a web platform that uses machine learning to provide location-specific activity recommendations from global geospatial data. Pick any coordinate and get a tailored list of things to do.",
    stack: ["React.js", "JavaScript", "Google Maps API", "REST APIs", "ML Engine"],
    live: "YOUR_LIVE_LINK",
    github: "https://github.com/nikitha11925/ParadeCast",
    highlight: "ML-driven location activity recommendations",
    color: "#a09080",
    caseStudy: {
      screenshot: "/paradecast.png",
      problem:
        "Given any point on the globe, what should you actually do there? ParadeCast turns raw geospatial and location data into tailored activity recommendations — tourism, adventure, logistics — for any coordinate.",
      build: [
        "Dynamic mapping with the Google Maps SDK — users select any coordinate on a global scale (Maps, Places, Geocoding).",
        "A bridge between the React front-end and an ML-based analysis engine over RESTful APIs.",
        "Contextual insights — a tailored activity list based on analysed terrain and location data.",
        "Optimised deployment with environment variables and API keys configured for secure communication.",
      ],
      interesting:
        "The ML bridge. The front-end captures any coordinate via Google Maps and hands it to an ML analysis engine over REST, turning terrain and location data into a ranked, contextual list of activities.",
      results: [
        { value: "Google Maps", label: "Global coordinate selection" },
        { value: "ML", label: "Activity analysis engine" },
        { value: "REST", label: "Frontend ↔ ML bridge" },
      ],
    },
  },
  {
    slug: "meditrak",
    title: "MediTrak",
    type: "Android App",
    description:
      "An Android medication reminder app that helps users manage and track daily medications through smart scheduling and timely notifications — fully offline-first, with no internet required.",
    stack: ["Java", "Android Studio", "SQLite", "AlarmManager", "XML"],
    live: "YOUR_LIVE_LINK",
    github: "https://github.com/nikitha11925/MediTrack",
    highlight: "Offline-first medication reminders",
    color: "#b8a898",
    caseStudy: {
      screenshot: "/meditrak.png",
      problem:
        "Daily medications are easy to forget, and many reminder apps assume a constant network connection. The app needed reliable, on-time reminders that work entirely offline.",
      build: [
        "Native Android app in Java (Android Studio) with an MVC architecture and XML layouts.",
        "Add medications with name, dosage and notes, plus flexible daily, weekly or custom schedules.",
        "AlarmManager + NotificationManager for push reminders that fire at the exact dose time, even offline.",
        "Dose logging (taken / skipped / missed) with full history tracking, backed by local SQLite storage.",
      ],
      interesting:
        "Offline-first reliability. With all data in local SQLite and reminders driven by AlarmManager + NotificationManager, the app delivers on-time alerts and a complete dose history without ever needing the network.",
      results: [
        { value: "Offline", label: "Fully local-first" },
        { value: "SQLite", label: "Local data + history" },
        { value: "API 26+", label: "Android 8.0 and up" },
      ],
    },
  },
];

/** Published research — shown in the Projects section and the Achievements section. */
export const research = {
  badge: "Published Research",
  title: "Parkinson's Symptom Detection using Machine Learning",
  type: "Research Paper",
  description:
    "A machine-learning approach to early Parkinson's screening from movement signals. I engineered features from tremor and finger-tapping data — frequency, amplitude, rhythm and inter-tap variability — and trained classifiers to separate Parkinsonian patterns from healthy motion. The model was evaluated, written up, and published.",
  points: [
    "Feature engineering on tremor and tapping signals — extracting frequency, amplitude and timing-variability features that carry the diagnostic signal.",
    "Trained and compared classification models, tuning for sensitivity so early/subtle cases aren't missed.",
    "Full research workflow — problem framing, dataset preparation, evaluation, and a published, peer-reviewed write-up.",
  ],
  highlight: "Published & peer-reviewed",
  link: "https://github.com/nikitha11925/NeuroTrack",
  pdf: "/paper.pdf",
  screenshot: "/parkinsons.png",
};

/** Education — shown as a glowing card in the About section. */
export const education = [
  {
    school: "Dayananda Sagar University",
    location: "Harohalli, Karnataka, India",
    degree: "B.Tech in Computer Science and Engineering",
    period: "Aug 2023 – July 2027",
    score: "CGPA: 8.51",
  },
  {
    school: "Dayananda Sagar PU College",
    location: "Kumaraswamy Layout, Karnataka, India",
    degree: "PCMC (Pre-University)",
    period: "Aug 2021 – April 2023",
    score: "Percentage: 92.3%",
  },
];

export const bio = [
  "I'm Nikitha — a final-year Computer Science engineering student at Dayananda Sagar University, Bangalore. I design and build full-stack web applications and machine learning systems, carrying them from initial concept through to deployment.",
  "My work spans backend and distributed systems, applied machine learning, and product-focused front-ends — Redis-backed queues and reactive services, AI integrations, geospatial ML, and a published research paper on Parkinson's symptom detection from tremor and tapping signals.",
  "I care equally about engineering rigour and product experience — building systems that are correct, performant, and genuinely usable. Outside of engineering, I have a strong creative practice in art and design that shapes how I approach interfaces and user experience.",
];

/** Tech-stack pill grid for the Skills section. */
export const techStack: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Java", "Python", "JavaScript", "TypeScript", "C", "SQL"] },
  {
    category: "Frameworks",
    items: ["Spring Boot", "Spring WebFlux", "FastAPI", "React", "Next.js", "Tailwind CSS"],
  },
  { category: "Data & Cache", items: ["PostgreSQL", "MySQL", "Redis", "SQLite"] },
  {
    category: "ML & APIs",
    items: ["Gemini API", "Google Maps API", "REST APIs", "WebSocket / STOMP"],
  },
  {
    category: "DevOps & Infra",
    items: ["Docker", "Kubernetes", "Helm", "Prometheus", "Grafana", "GitHub Actions"],
  },
  { category: "Tools", items: ["Git", "Android Studio", "VS Code", "Linux"] },
];

/** Specialization areas (Skills section) — concrete focus areas, not self-ratings. */
export const specializations: { title: string; detail: string }[] = [
  {
    title: "Backend & Distributed Systems",
    detail: "Reactive services, Redis-backed queues, retries and observability, deployed on Docker and Kubernetes.",
  },
  {
    title: "Full-Stack Web Development",
    detail: "End-to-end applications — Spring Boot REST APIs through to React and Next.js front-ends.",
  },
  {
    title: "Applied Machine Learning",
    detail: "Feature engineering, model training and evaluation, AI integrations, and published research.",
  },
  {
    title: "UI / UX Engineering",
    detail: "Accessible, performant interfaces built faithfully from design to code.",
  },
];

export const achievements: {
  icon: string;
  title: string;
  venue: string;
  result: string;
  detail: string;
  image?: string;
  pdf?: string;
  wide?: boolean;
}[] = [
  {
    icon: "🥉",
    title: "IDEAVERSE'25",
    venue: "IEEE, DSU",
    result: "3rd Place — ethical social media platform",
    detail: "Designed a machine learning solution for healthier social interaction, built with a team.",
    image: "/ideaverse.png",
  },
  {
    icon: "🥈",
    title: "MAGNOVITE'25",
    venue: "Christ University",
    result: "2nd Place — Grid Restoration Challenge",
    detail: "Circuit debugging and applied problem-solving under time constraints.",
    image: "/magnovite.png",
  },
  {
    icon: "📄",
    title: "Research Publication",
    venue: "",
    result: "Parkinson's Symptom Detection using Machine Learning",
    detail: "Engineered features from tremor and tapping signals; trained, evaluated, and published the model.",
    pdf: "/paper.pdf",
    wide: true,
  },
];

/** Hobbies — an intro line + a moving tape of craft images. */
export const hobbiesIntro =
  "Away from the screen I keep a hands-on creative practice. I paint watercolours and sketch, make clay bookmarks, soft-solder jewellery, and run a small business selling phone charms and hand-made custom keychains. I've won a fashion design contest and can design garments from a concept — and I play chess and read whenever I can.";

export const hobbyImages: { src: string; alt: string }[] = [
  { src: "/hobbies/art1.jpeg", alt: "Watercolour artwork" },
  { src: "/hobbies/art2.jpeg", alt: "Watercolour artwork" },
  { src: "/hobbies/chess.jpeg", alt: "Chess" },
  { src: "/hobbies/keycharms.png", alt: "Hand-made phone charms" },
  { src: "/hobbies/art3.jpeg", alt: "Sketch" },
  { src: "/hobbies/bookmarks.png", alt: "Clay bookmarks" },
  { src: "/hobbies/pendant.png", alt: "Soft-soldered pendant" },
  { src: "/hobbies/art4.jpeg", alt: "Watercolour artwork" },
  { src: "/hobbies/key.png", alt: "Custom keychain" },
  { src: "/hobbies/art6.jpeg", alt: "Sketch" },
  { src: "/hobbies/heart.png", alt: "Hand-made charm" },
  { src: "/hobbies/art7.jpeg", alt: "Watercolour artwork" },
];

export const contact = {
  email: "nikithad.11.9@gmail.com",
  phone: "+91 8050120456",
  location: "Bangalore, India",
  linkedin: "https://www.linkedin.com/in/nikitha-d-475048299/",
  github: "https://github.com/nikitha11925",
};
