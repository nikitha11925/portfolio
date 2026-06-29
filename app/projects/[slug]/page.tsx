import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/portfolio";
import { isPlaceholder } from "@/lib/utils";

/** Pre-render every case-study page at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
  };
}

function LinkOrBadge({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  if (isPlaceholder(href)) {
    return (
      <span className="inline-flex items-center gap-2 border border-dashed border-gold-dim/50 px-4 py-2.5 font-mono text-xs uppercase tracking-label text-gold-dim">
        {label} [add link]
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-hover
      className="inline-flex items-center gap-2 border border-gold px-4 py-2.5 font-mono text-xs uppercase tracking-label text-gold transition-colors hover:bg-gold hover:text-base"
    >
      {icon}
      {label}
    </a>
  );
}

export default function ProjectCaseStudy({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const { caseStudy } = project;

  return (
    <article className="mx-auto max-w-4xl px-6 pb-28 pt-28">
      <Link
        href="/#projects"
        data-hover
        className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-gold"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <header className="mt-10">
        <p className="section-label">{project.type}</p>
        <h1 className="mt-3 font-sans text-[clamp(2.5rem,8vw,4.5rem)] font-bold tracking-tight leading-[0.95] text-cream">
          {project.title}
        </h1>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border border-gold-dim/40 px-2.5 py-1 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Hero visual — screenshot when available, otherwise a placeholder */}
      {caseStudy.screenshot ? (
        <div className="relative mt-12 aspect-[16/10] w-full overflow-hidden border border-border bg-base">
          <Image
            src={caseStudy.screenshot}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-contain"
            priority
          />
        </div>
      ) : (
        <div className="mt-12 flex aspect-[16/10] w-full items-center justify-center border border-border bg-surface">
          <p className="font-mono text-xs uppercase tracking-label text-muted">
            [ demo video coming soon ]
          </p>
        </div>
      )}

      {/* Undeployed projects: the video demo lives in the repo README */}
      {isPlaceholder(project.live) && (
        <p className="mt-3 font-mono text-xs text-muted">
          ▸ Video demo on the{" "}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="text-gold transition-colors hover:text-cream"
          >
            GitHub README ↗
          </a>
        </p>
      )}

      <div className="mt-16 space-y-14">
        <Reveal>
          <section>
            <h2 className="section-label mb-4">the problem</h2>
            <p className="text-lg leading-relaxed text-cream">{caseStudy.problem}</p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="section-label mb-4">what I built</h2>
            <ul className="space-y-3">
              {caseStudy.build.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed text-muted">
                  <span className="select-none pt-1 text-gold">▸</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="section-label mb-4">the interesting part</h2>
            <p className="text-lg leading-relaxed text-cream">{caseStudy.interesting}</p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="section-label mb-5">results</h2>
            <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
              {caseStudy.results.map((r) => (
                <div key={r.label} className="bg-surface px-5 py-7 text-center">
                  <p className="font-sans text-3xl font-bold text-gold">{r.value}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-label text-muted">
                    {r.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </div>

      <div className="mt-14 flex flex-wrap gap-4 border-t border-border pt-10">
        {!isPlaceholder(project.live) ? (
          <LinkOrBadge
            href={project.live}
            label="Live demo"
            icon={<ArrowUpRight className="h-4 w-4" />}
          />
        ) : (
          <LinkOrBadge
            href={project.github}
            label="Video demo"
            icon={<ArrowUpRight className="h-4 w-4" />}
          />
        )}
        <LinkOrBadge
          href={project.github}
          label="GitHub repo"
          icon={<GithubIcon className="h-4 w-4" />}
        />
      </div>
    </article>
  );
}
