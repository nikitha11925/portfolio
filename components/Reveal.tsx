"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Vertical travel distance in px. */
  y?: number;
  delay?: number;
  duration?: number;
}

/**
 * Standard scroll reveal used across every section. Fires once when it enters
 * the viewport. Movement is automatically suppressed under reduced-motion
 * (see Providers / MotionConfig), leaving a clean opacity fade.
 */
export default function Reveal({
  children,
  className,
  y = 24,
  delay = 0,
  duration = 0.6,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
