import { ReactNode } from "react";

/** `// section` eyebrow label, Space Mono / muted, used to head each section. */
export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="section-label mb-6">
      <span className="text-gold-dim">{"// "}</span>
      {children}
    </p>
  );
}
