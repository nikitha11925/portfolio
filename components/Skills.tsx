import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { techStack, specializations } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-28 sm:px-10 lg:px-16">
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

        {/* Specializations — concrete focus areas, not self-ratings */}
        <Reveal delay={0.1}>
          <div>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-label text-gold-dim">
              specializations
            </p>
            <div className="space-y-6">
              {specializations.map((s) => (
                <div key={s.title} className="border-l border-border pl-4">
                  <h3 className="text-base font-medium text-cream">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
