"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/**
 * Wraps the app so Framer Motion respects the user's OS-level
 * "reduce motion" setting: transforms/movement are dropped while
 * opacity fades still play, so content is never left hidden.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
