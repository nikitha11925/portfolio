"use client";

import { AnimatePresence, motion } from "framer-motion";
import { hobbies } from "@/data/portfolio";

// Fan-out positions around the avatar (desktop). Each card animates in with a
// stagger and floats slightly.
const positions = [
  "left-1/2 top-0 -translate-x-[120%] -translate-y-1/2",
  "right-0 top-0 translate-x-[60%] -translate-y-1/3",
  "left-1/2 bottom-0 -translate-x-[120%] translate-y-1/2",
  "right-0 bottom-0 translate-x-[60%] translate-y-1/3",
];

export default function HobbyTooltips({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.label}
              className={`absolute ${positions[i]} w-max max-w-[180px]`}
              initial={{ opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 6 }}
              transition={{ duration: 0.28, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-2 border border-border bg-surface/95 px-3 py-2 shadow-[0_0_0_1px_rgba(201,185,154,0.12)] backdrop-blur-sm">
                <span className="text-sm leading-none">{hobby.icon}</span>
                <span className="font-mono text-[11px] leading-tight text-cream">
                  {hobby.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
