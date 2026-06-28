import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { stats, achievements } from "@/data/portfolio";

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-6 py-28">
      <SectionLabel>achievements</SectionLabel>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface px-5 py-8 text-center">
            <p className="font-serif text-4xl italic text-gold sm:text-5xl">
              {stat.value === null ? (
                stat.display
              ) : (
                <CountUp value={stat.value} decimals={stat.decimals ?? 0} />
              )}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-label text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Achievement badge cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.05}>
            <div className="group h-full border border-border bg-surface p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-[inset_0_0_30px_rgba(201,185,154,0.06)]">
              <div className="flex items-start gap-4">
                <span className="text-2xl leading-none">{a.icon}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-semibold text-cream">{a.title}</h3>
                    {a.venue && (
                      <span className="font-mono text-[11px] text-gold-dim">— {a.venue}</span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-gold">{a.result}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.detail}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
