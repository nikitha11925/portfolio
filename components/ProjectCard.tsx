"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/data/portfolio";
import { isPlaceholder } from "@/lib/utils";

/** Renders an external link, or a gold "[add link]" badge if it's still a placeholder. */
function ExternalLink({
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
      <span className="inline-flex items-center gap-1.5 border border-dashed border-gold-dim/50 px-2 py-1 font-mono text-[10px] uppercase tracking-label text-gold-dim">
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
      className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-gold"
    >
      {icon}
      {label}
    </a>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group flex flex-col border border-border bg-surface p-6 transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(201,185,154,0.4)] sm:p-8"
    >
      <p className="section-label">{project.type}</p>

      <Link
        href={`/projects/${project.slug}`}
        data-hover
        className="mt-3 inline-flex w-fit items-center gap-2 text-2xl font-semibold text-cream transition-colors hover:text-gold sm:text-3xl"
      >
        {project.title}
        <ArrowUpRight className="h-5 w-5 text-gold-dim transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>

      <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

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

      <p className="mt-5 font-mono text-sm text-gold">▸ {project.highlight}</p>

      <div className="mt-6 flex items-center gap-5 border-t border-border pt-5">
        <ExternalLink
          href={project.live}
          label="Live"
          icon={<ArrowUpRight className="h-3.5 w-3.5" />}
        />
        <ExternalLink
          href={project.github}
          label="GitHub"
          icon={<GithubIcon className="h-3.5 w-3.5" />}
        />
        <Link
          href={`/projects/${project.slug}`}
          data-hover
          className="ml-auto font-mono text-xs text-gold transition-colors hover:text-cream"
        >
          Case study →
        </Link>
      </div>
    </motion.article>
  );
}
