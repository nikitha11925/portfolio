"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { techStack, skillBars } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-28">
      <SectionLabel>stack</SectionLabel>

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Tech stack pill grid */}
        <Reveal>
          <div className="space-y-7">
            {techStack.map((group) => (
              <div key={group.category}>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-label text-gold-dim">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      data-hover
                      className="cursor-default border border-border px-3 py-1.5 font-mono text-xs text-muted transition-colors duration-200 hover:border-gold hover:text-cream"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Skill bars with hover tooltips */}
        <Reveal delay={0.1}>
          <div className="space-y-5">
            {skillBars.map((skill, i) => (
              <div key={skill.label} className="group relative">
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="text-sm text-cream">{skill.label}</span>
                  <span className="font-mono text-xs text-gold">{skill.value}%</span>
                </div>
                <div className="relative h-2.5 bg-base">
                  <motion.div
                    className="h-full bg-gold"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
                  />
                </div>
                {/* tooltip */}
                <div className="pointer-events-none absolute -top-2 left-0 z-20 -translate-y-full opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="block max-w-xs border border-border bg-surface px-3 py-1.5 font-mono text-[11px] text-cream">
                    {skill.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
