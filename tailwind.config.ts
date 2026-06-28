import type { Config } from "tailwindcss";

/**
 * Design tokens live as CSS variables in app/globals.css (the single source of
 * truth for the "Dark Artisan" palette). Tailwind just maps utilities onto them
 * so we can use e.g. `text-gold`, `bg-surface`, `border-border` anywhere.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        cream: "var(--color-cream)",
        gold: "var(--color-gold)",
        "gold-dim": "var(--color-gold-dim)",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
      },
      letterSpacing: {
        label: "0.1em",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "float-y": "float-y 3s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
