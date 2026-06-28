import { FileText } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { projects, research } from "@/data/portfolio";
import { isPlaceholder } from "@/lib/utils";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionLabel>projects</SectionLabel>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {/* Research — distinct visual treatment */}
      <Reveal delay={0.1}>
        <article className="mt-6 border border-gold/30 bg-surface p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 border border-gold/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-gold">
                <FileText className="h-3.5 w-3.5" />
                {research.badge}
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-cream">{research.title}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                {research.description}
              </p>
              <p className="mt-3 font-mono text-sm text-gold">▸ {research.highlight}</p>
            </div>

            <div className="shrink-0">
              {isPlaceholder(research.link) ? (
                <span className="inline-flex items-center gap-1.5 border border-dashed border-gold-dim/50 px-3 py-2 font-mono text-[10px] uppercase tracking-label text-gold-dim">
                  Read paper [add link]
                </span>
              ) : (
                <a
                  href={research.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="inline-flex items-center gap-2 border border-gold px-4 py-2 font-mono text-xs text-gold transition-colors hover:bg-gold hover:text-base"
                >
                  Read paper →
                </a>
              )}
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
