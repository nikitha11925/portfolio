import Image from "next/image";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { achievements } from "@/data/portfolio";

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-6 py-28 sm:px-10 lg:px-16">
      <SectionLabel>achievements</SectionLabel>

      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.05} className={a.wide ? "sm:col-span-2" : undefined}>
            <div className="group flex h-full flex-col border border-border bg-surface p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-[inset_0_0_30px_rgba(201,185,154,0.06)]">
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

              {/* Proof image (certificate) — click to open full size */}
              {a.image && (
                <a
                  href={a.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/img mt-5 block overflow-hidden border border-border bg-base"
                >
                  <span className="relative block aspect-[3/2] w-full">
                    <Image
                      src={a.image}
                      alt={`${a.title} certificate`}
                      fill
                      sizes="(max-width: 640px) 90vw, 540px"
                      className="object-contain transition-transform duration-300 group-hover/img:scale-[1.02]"
                    />
                  </span>
                  <span className="block border-t border-border px-3 py-2 font-mono text-[10px] uppercase tracking-label text-muted transition-colors group-hover/img:text-gold">
                    View certificate ↗
                  </span>
                </a>
              )}

              {/* Research paper — embedded + scrollable within the card */}
              {a.pdf && (
                <div className="mt-5">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-label text-muted">
                    paper
                  </p>
                  <div className="h-[480px] w-full overflow-hidden border border-border bg-base">
                    <iframe src={a.pdf} title={a.title} className="h-full w-full" />
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
