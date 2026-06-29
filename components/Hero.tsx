"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import IconWall from "@/components/IconWall";
import { contact } from "@/data/portfolio";
import { isPlaceholder } from "@/lib/utils";

/**
 * Types `text` in one character at a time after `startDelay`. When motion is
 * disabled (prefers-reduced-motion) the full string is shown immediately so the
 * content is never gated behind an animation.
 */
function useTypewriter(text: string, startDelay: number, speed: number, animate: boolean) {
  const [out, setOut] = useState(animate ? "" : text);

  useEffect(() => {
    if (!animate) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, startDelay, speed, animate]);

  return out;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  // Typed-in copy. Delays are sequenced: greeting → name.
  const bonjour = useTypewriter("Bonjour!", 600, 70, animate);
  const here = useTypewriter("Nikitha here...", 1300, 55, animate);

  const githubHref = isPlaceholder(contact.github) ? "#" : contact.github;

  // Helper so framer renders the final state instantly under reduced motion.
  const reveal = (delay: number, y = 14) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  return (
    // Flat near-black section — no canvas, no background gradient (by design).
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-14 overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:px-16"
    >
      {/* Raining tech-icon field over the right ~60%, behind the hero content */}
      <IconWall />

      <div className="relative z-10 grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        {/* ── Left: terminal prompt + greeting speech bubble ── */}
        <div className="flex flex-col items-start">
          <motion.p className="mb-5 font-mono text-[13px] text-gold" {...reveal(0.2, 0)}>
            nikitha@dev:~$ <span className="cursor-blink" />
          </motion.p>

          <motion.div
            className="speech-bubble relative max-w-xl border border-border bg-surface px-7 py-6"
            {...(reduce
              ? { initial: false }
              : {
                  initial: { opacity: 0, scale: 0.94, y: 10 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  transition: {
                    delay: 0.4,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  },
                })}
          >
            <p className="font-mono text-cream">
              <span className="block text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight">
                {bonjour}
                {bonjour.length < "Bonjour!".length && <span className="cursor-blink" />}
              </span>
              <span className="mt-1.5 block text-[clamp(1.1rem,3vw,1.6rem)] leading-tight text-cream/75">
                {here}
                {bonjour.length === "Bonjour!".length && here.length < "Nikitha here...".length && (
                  <span className="cursor-blink" />
                )}
              </span>
            </p>
          </motion.div>

          {/* Role / status line — contrasting pill so it stands out */}
          <motion.p
            className="mt-6 inline-flex items-center gap-2 border border-gold/40 bg-gold/10 px-3.5 py-1.5 font-mono text-sm text-cream"
            {...reveal(1.1, 0)}
          >
            <span className="text-gold">▸</span>
            Final-year Computer Science student at DSU
          </motion.p>
        </div>

        {/* ── Right: glowing gold portal, pixel girl emerging out the top ── */}
        <motion.div
          className="flex justify-center lg:justify-end"
          {...(reduce
            ? { initial: false }
            : {
                initial: { opacity: 0, scale: 0.92 },
                animate: { opacity: 1, scale: 1 },
                transition: {
                  delay: 0.1,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                },
              })}
        >
          <div className="relative">
            {/* Breathing gold halo behind the TV for depth (solid colour + blur,
                not a section background). */}
            <div
              aria-hidden
              className="animate-breathe pointer-events-none absolute -inset-6 -z-10 bg-gold opacity-30 blur-[60px]"
            />

            {/* The neon TV — a 5:4 tube, deliberately SHORTER than the square
                portrait so she pops out the top. overflow-visible lets her breach
                the frame; the black screen below stays a retro CRT. */}
            <div className="neon-frame relative aspect-[5/4] w-[clamp(260px,72vw,340px)] overflow-visible bg-[#050505]">
              {/* The waving pixel girl. Square box anchored to the TV's base, so
                  the bottom of the box is the screen floor and her head/headphones
                  rise above the top edge. */}
              <div className="animate-float-y absolute inset-x-0 bottom-0 z-10 aspect-square">
                <Image
                  src="/pixel2.png"
                  alt="Pixel-art portrait of Nikitha waving"
                  fill
                  priority
                  sizes="(max-width: 1024px) 72vw, 340px"
                  className="portal-screen-img select-none object-contain"
                />
                {/* Retro scanlines over the WHOLE portrait (incl. the popped-out
                    head), masked to her alpha so they never touch transparent
                    pixels or the black screen behind her. */}
                <div className="retro-lines pointer-events-none absolute inset-0" />
              </div>

              {/* Retro power indicator */}
              <span className="absolute bottom-2 right-3 z-30 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-label text-gold/70">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                on air
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Below: call-to-action buttons ── */}
      <motion.div className="relative z-10 flex w-full max-w-6xl flex-col items-start gap-7" {...reveal(1.4)}>
        <div className="flex flex-wrap items-center justify-start gap-4">
          <a
            href="#projects"
            data-hover
            className="group inline-flex items-center gap-2 border border-gold px-6 py-3 font-mono text-sm text-gold transition-colors duration-300 hover:bg-gold hover:text-base"
          >
            view work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href={githubHref}
            target={githubHref === "#" ? undefined : "_blank"}
            rel="noopener noreferrer"
            data-hover
            className="group inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-sm text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/5"
          >
            github
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
