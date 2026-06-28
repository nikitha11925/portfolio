"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { bio, characterCard } from "@/data/portfolio";

function StatBar({
  label,
  value,
  note,
  index,
}: {
  label: string;
  value: number | null;
  note?: string;
  index: number;
}) {
  // `value === null` is the "Math — returning" case: a quiet, partial, dashed bar.
  const isReturning = value === null;
  const pct = isReturning ? 35 : value;

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 font-mono text-[11px] text-muted">{label}</span>
      <div className="relative h-2 flex-1 bg-base">
        <motion.div
          className={isReturning ? "h-full bg-gold-dim/60" : "h-full bg-gold"}
          style={isReturning ? { backgroundImage: "repeating-linear-gradient(90deg, var(--color-gold-dim) 0 4px, transparent 4px 8px)" } : undefined}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 + index * 0.08, ease: "easeOut" }}
        />
      </div>
      <span className="w-20 shrink-0 text-right font-mono text-[11px] text-gold">
        {isReturning ? note : value}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionLabel>about</SectionLabel>

      <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
        {/* Bio */}
        <Reveal>
          <div className="space-y-6">
            {bio.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-xl leading-relaxed text-cream sm:text-2xl"
                    : "leading-relaxed text-muted"
                }
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        {/* RPG character card */}
        <Reveal delay={0.1}>
          <div className="border border-border bg-surface p-6 font-mono">
            <div className="border-b border-border pb-4">
              <p className="text-lg text-cream">{characterCard.name}</p>
              <p className="text-[11px] uppercase tracking-label text-gold-dim">
                {characterCard.subtitle}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-y-2 border-b border-border py-4 text-xs">
              {characterCard.meta.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <dt className="text-muted">{m.label}</dt>
                  <dd className="text-cream">{m.value}</dd>
                </div>
              ))}
            </dl>

            <p className="py-4 text-[11px] uppercase tracking-label text-muted">
              core stats
            </p>
            <div className="space-y-3 pb-1">
              {characterCard.stats.map((s, i) => (
                <StatBar
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  note={"note" in s ? (s.note as string) : undefined}
                  index={i}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
