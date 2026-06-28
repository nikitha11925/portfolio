"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import HobbyTooltips from "@/components/HobbyTooltips";
import { contact, terminalTagline } from "@/data/portfolio";
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
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  const animate = !reduce;

  // Typed-in copy. Delays are sequenced: greeting → name → echo tagline.
  const bonjour = useTypewriter("Bonjour!", 600, 70, animate);
  const here = useTypewriter("Nikitha here...", 1300, 55, animate);
  const echo = useTypewriter(terminalTagline, 2350, 45, animate);

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
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-14 px-6 pb-16 pt-28"
    >
      <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        {/* ── Left: terminal prompt + greeting speech bubble ── */}
        <div className="flex flex-col items-start">
          <motion.p className="mb-5 font-mono text-[13px] text-gold" {...reveal(0.2, 0)}>
            nikitha@dev:~$ <span className="cursor-blink" />
          </motion.p>

          <motion.div
            className="speech-bubble relative max-w-md border border-border bg-surface px-6 py-5"
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
              <span className="block text-[clamp(2.25rem,7vw,3.5rem)] leading-[1.05]">
                {bonjour}
                {bonjour.length < "Bonjour!".length && <span className="cursor-blink" />}
              </span>
              <span className="mt-1 block text-[clamp(1.4rem,5vw,2.25rem)] leading-[1.1] text-cream/85">
                {here}
                {bonjour.length === "Bonjour!".length && here.length < "Nikitha here...".length && (
                  <span className="cursor-blink" />
                )}
              </span>
            </p>
          </motion.div>
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
          <div
            className="group relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Breathing gold halo behind the portal (solid colour + blur — not a
                background gradient). Extends above the frame so the emerging head
                sits in warm light rather than against raw black. */}
            <div
              aria-hidden
              className="animate-breathe pointer-events-none absolute -inset-7 -z-10 bg-gold opacity-40 blur-[64px]"
              style={{ borderRadius: "44% 56% 50% 50% / 60% 60% 40% 40%" }}
            />

            {/* The portal frame */}
            <div
              data-hover
              className="relative aspect-[4/5] w-[clamp(232px,66vw,300px)] border-2 border-gold bg-surface shadow-[0_0_30px_rgba(201,185,154,0.28),inset_0_0_24px_rgba(201,185,154,0.10)] transition-shadow duration-300 group-hover:shadow-[0_0_50px_rgba(201,185,154,0.45),inset_0_0_28px_rgba(201,185,154,0.16)]"
            >
              {/* Retro screen status chrome */}
              <span className="absolute left-2 top-2 z-30 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-label text-gold/80">
                <span className="h-1.5 w-1.5 animate-pulse bg-gold" />
                online
              </span>

              {/* The pixel-art portrait. The wrapper rises above the frame's top
                  edge so she appears to emerge from the portal. SWAP: drop a
                  transparent-background cut-out here for an even cleaner effect. */}
              <div className="animate-float-y absolute inset-x-0 bottom-0 top-[-9%] overflow-visible">
                <Image
                  src="/pixel.jpeg"
                  alt="Pixel-art portrait of Nikitha"
                  fill
                  priority
                  sizes="(max-width: 1024px) 66vw, 300px"
                  className="portal-img select-none object-cover"
                />
              </div>

              {/* Scanlines + sweeping shimmer — clipped to the screen so the
                  emerged head (above the frame) stays clean. */}
              <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                <div className="crt-scanlines absolute inset-0" />
                <div className="crt-shimmer" />
              </div>

              {/* Corner ticks for the retro-monitor feel */}
              <span className="pointer-events-none absolute -left-px -top-px z-30 h-3 w-3 border-l-2 border-t-2 border-gold" />
              <span className="pointer-events-none absolute -right-px -top-px z-30 h-3 w-3 border-r-2 border-t-2 border-gold" />
              <span className="pointer-events-none absolute -bottom-px -left-px z-30 h-3 w-3 border-b-2 border-l-2 border-gold" />
              <span className="pointer-events-none absolute -bottom-px -right-px z-30 h-3 w-3 border-b-2 border-r-2 border-gold" />
            </div>

            {/* Hobby cards fan out around the portal on hover */}
            <HobbyTooltips show={hovered} />

            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-label text-muted">
              hover me
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Below: neon terminal echo line + CTAs ── */}
      <motion.div className="flex w-full max-w-6xl flex-col items-center gap-7" {...reveal(2.2)}>
        <p className="text-center font-mono text-sm sm:text-base">
          <span className="text-muted">nikitha@dev$ echo </span>
          <span className="neon-gold animate-neon-flicker">&quot;{echo}&quot;</span>
          {echo.length < terminalTagline.length && <span className="cursor-blink" />}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
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
