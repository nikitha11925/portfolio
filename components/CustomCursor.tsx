"use client";

import { useEffect, useRef, useState } from "react";
import { lerp } from "@/lib/utils";

/**
 * A small gold dot that trails the real cursor with a touch of lag, growing
 * into a ring over interactive elements. Desktop / fine-pointer only — on
 * touch devices it renders nothing and the native cursor is untouched.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Mutable positions kept in refs so the rAF loop never triggers re-renders.
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const interactive = (e.target as HTMLElement)?.closest(
        "a, button, [data-hover], input, textarea, [role='button']"
      );
      setHovering(Boolean(interactive));
    };

    let raf = 0;
    const loop = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.18);
      current.current.y = lerp(current.current.y, target.current.y, 0.18);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-difference transition-[width,height,background-color,border-color] duration-200 ease-out"
      style={{
        width: hovering ? 26 : 9,
        height: hovering ? 26 : 9,
        backgroundColor: hovering ? "transparent" : "var(--color-gold)",
        border: hovering ? "1.5px solid var(--color-gold)" : "1.5px solid transparent",
      }}
    />
  );
}
