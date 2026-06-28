import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { currently } from "@/data/portfolio";

function List({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <p className="mb-5 font-mono text-[11px] uppercase tracking-label text-gold-dim">
        {heading}
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-lg leading-snug text-cream">
            <span className="select-none text-gold">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Currently() {
  return (
    <section id="currently" className="mx-auto max-w-6xl px-6 py-28">
      <SectionLabel>currently</SectionLabel>
      <Reveal>
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
          <List heading="what I'm doing" items={currently.doing} />
          <List heading="what I'm into" items={currently.into} />
        </div>
      </Reveal>
    </section>
  );
}
