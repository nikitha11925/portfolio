import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { bio, education } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 sm:px-10 lg:px-16">
      <SectionLabel>about</SectionLabel>

      <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
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

        {/* Education — glowing card, pushed to the right */}
        <Reveal delay={0.1}>
          <div className="education-card lg:ml-auto lg:max-w-sm">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-label text-gold-dim">
              education
            </p>
            <div className="space-y-6">
              {education.map((e) => (
                <div key={e.school}>
                  <h3 className="font-medium leading-snug text-cream">{e.school}</h3>
                  <p className="mt-0.5 text-sm text-muted">{e.location}</p>
                  <p className="mt-2 text-sm text-cream/90">{e.degree}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted">{e.period}</p>
                  <p className="mt-1 font-mono text-sm text-gold">{e.score}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
