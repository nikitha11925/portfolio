import Hero from "@/components/Hero";

/**
 * Landing page — for now this is just the Navbar (in the layout) + the new Hero,
 * with empty placeholder sections so the nav scroll links resolve immediately.
 * The full About / Projects / Skills / etc. components still live in /components
 * and can be slotted back in here when their sections are rebuilt.
 */
function Placeholder({ id, label }: { id: string; label: string }) {
  return (
    <section
      id={id}
      className="mx-auto flex min-h-[55vh] max-w-6xl flex-col justify-center border-t border-border px-6 py-24"
    >
      <span className="section-label">{label}</span>
      <p className="mt-4 font-mono text-sm text-muted">
        $ coming soon
        <span className="cursor-blink" />
      </p>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Placeholder id="about" label="// about" />
      <Placeholder id="projects" label="// projects" />
      <Placeholder id="contact" label="// contact" />
    </>
  );
}
