"use client";

import { useEffect, useRef } from "react";
import { lerp, clamp } from "@/lib/utils";

/**
 * THE AURA WAVE — the signature background of the hero.
 *
 * A handful of large, soft, blurred blobs in warm gold/cream drift on slow
 * sine/cosine paths against the near-black base, like quiet northern lights.
 * Move the cursor and the aura is "disrupted": nearby blobs are pushed away
 * and brighten; when the cursor leaves, they lerp back onto their paths and
 * re-fuse. Pure Canvas — no library.
 *
 * Performance: renders at 0.5× device pixel ratio, pauses when the tab is
 * hidden, and falls back to a single static frame under reduced-motion.
 */

interface Blob {
  baseX: number; // 0..1 fraction of width
  baseY: number; // 0..1 fraction of height
  radius: number; // px
  orbitX: number; // px — horizontal drift amplitude
  orbitY: number; // px — vertical drift amplitude
  speed: number; // radians/sec
  phase: number; // starting offset
  tint: number; // 0..1 — gold (0) <-> cream (1)
  x: number; // current (lerped) center
  y: number;
}

const GOLD = [201, 185, 154]; // #c9b99a
const CREAM = [232, 224, 213]; // #e8e0d5
const DISRUPT_RADIUS = 220; // px around cursor that pushes blobs
const RENDER_SCALE = 0.5; // draw at half DPR for performance

function makeBlobs(): Blob[] {
  return [
    { baseX: 0.28, baseY: 0.38, radius: 320, orbitX: 90, orbitY: 60, speed: 0.07, phase: 0, tint: 0.1 },
    { baseX: 0.62, baseY: 0.3, radius: 280, orbitX: 70, orbitY: 80, speed: 0.05, phase: 1.7, tint: 0.5 },
    { baseX: 0.5, baseY: 0.6, radius: 360, orbitX: 110, orbitY: 70, speed: 0.045, phase: 3.1, tint: 0.25 },
    { baseX: 0.78, baseY: 0.58, radius: 240, orbitX: 80, orbitY: 60, speed: 0.08, phase: 4.4, tint: 0.7 },
    { baseX: 0.4, baseY: 0.74, radius: 300, orbitX: 95, orbitY: 55, speed: 0.06, phase: 5.6, tint: 0.35 },
  ].map((b) => ({ ...b, x: b.baseX, y: b.baseY }));
}

export default function AuraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.max(1, window.devicePixelRatio || 1) * RENDER_SCALE;

    let width = 0;
    let height = 0;
    const blobs = makeBlobs();

    // Mouse, tracked in CSS pixels; starts off-screen so there's no initial disruption.
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Initialise current positions on first layout.
      blobs.forEach((b) => {
        b.x = b.baseX * width;
        b.y = b.baseY * height;
      });
    };

    const colorFor = (tint: number, alpha: number) => {
      const r = Math.round(lerp(GOLD[0], CREAM[0], tint));
      const g = Math.round(lerp(GOLD[1], CREAM[1], tint));
      const b = Math.round(lerp(GOLD[2], CREAM[2], tint));
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const drawBlob = (b: Blob, glow: number) => {
      const baseAlpha = lerp(0.1, 0.22, b.tint);
      const alpha = clamp(baseAlpha + glow * 0.18, 0, 0.4);
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
      grad.addColorStop(0, colorFor(b.tint, alpha));
      grad.addColorStop(0.6, colorFor(b.tint, alpha * 0.35));
      grad.addColorStop(1, colorFor(b.tint, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const renderFrame = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      // Additive blending gives the soft, fused "plasma" look.
      ctx.globalCompositeOperation = "lighter";
      // A gentle blur softens the gradients further into northern-lights wisps.
      ctx.filter = "blur(40px)";

      for (const b of blobs) {
        // 1) Where the blob "wants" to be on its slow orbit.
        const pathX = b.baseX * width + Math.cos(t * b.speed + b.phase) * b.orbitX;
        const pathY = b.baseY * height + Math.sin(t * b.speed + b.phase) * b.orbitY;

        // 2) Cursor disruption: push the blob away within DISRUPT_RADIUS.
        let targetX = pathX;
        let targetY = pathY;
        let glow = 0;
        if (mouse.active) {
          const dx = pathX - mouse.x;
          const dy = pathY - mouse.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          if (dist < DISRUPT_RADIUS) {
            const force = (1 - dist / DISRUPT_RADIUS) ** 2;
            const push = force * 140;
            targetX = pathX + (dx / dist) * push;
            targetY = pathY + (dy / dist) * push;
            glow = force; // brighten where the cursor parts the aura
          }
        }

        // 3) Smoothly lerp toward target — disrupt fast, re-fuse slowly.
        b.x = lerp(b.x, targetX, 0.06);
        b.y = lerp(b.y, targetY, 0.06);

        drawBlob(b, glow);
      }

      // Reset context state for anything drawn after this.
      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    let start = performance.now();
    const animate = (now: number) => {
      const t = (now - start) / 1000;
      renderFrame(t);
      raf = requestAnimationFrame(animate);
    };

    // Event wiring
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        start = performance.now();
        raf = requestAnimationFrame(animate);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      // Static single frame — no animation loop.
      renderFrame(0);
    } else {
      raf = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
