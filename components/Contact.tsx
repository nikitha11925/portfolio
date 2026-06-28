import { ArrowUpRight, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import { contact } from "@/data/portfolio";
import { isPlaceholder } from "@/lib/utils";

function SocialLink({ href, label }: { href: string; label: string }) {
  if (isPlaceholder(href)) {
    return (
      <span className="inline-flex items-center gap-1.5 border border-dashed border-gold-dim/50 px-4 py-2 font-mono text-xs uppercase tracking-label text-gold-dim">
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
      className="group inline-flex items-center gap-1.5 border border-border px-4 py-2 font-mono text-xs uppercase tracking-label text-cream transition-colors hover:border-gold hover:text-gold"
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-32 text-center">
      <Reveal>
        <h2 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] italic text-cream">
          Let&apos;s build something.
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            data-hover
            className="group inline-flex items-center gap-2 border border-gold px-5 py-2.5 font-mono text-sm text-gold transition-colors hover:bg-gold hover:text-base"
          >
            <Mail className="h-4 w-4" />
            {contact.email}
          </a>
          <SocialLink href={contact.linkedin} label="LinkedIn" />
          <SocialLink href={contact.github} label="GitHub" />
        </div>

        <div className="mt-10 space-y-1 font-mono text-sm text-muted">
          <p>{contact.phone}</p>
          <p>{contact.location}</p>
        </div>

        <p className="mt-12 font-mono text-sm text-gold">
          nikitha@dev$ <span className="cursor-blink" />
        </p>
      </Reveal>
    </section>
  );
}
