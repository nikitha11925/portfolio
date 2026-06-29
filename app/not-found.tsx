import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-gold-dim">404 — not found</p>
      <h1 className="mt-4 font-sans text-[clamp(3rem,10vw,6rem)] font-bold tracking-tight text-cream">
        Lost the thread.
      </h1>
      <p className="mt-4 max-w-md font-mono text-sm text-muted">
        nikitha@dev$ cd {"<this-page>"} → no such file or directory
      </p>
      <Link
        href="/"
        data-hover
        className="mt-10 inline-flex items-center gap-2 border border-gold px-6 py-3 font-mono text-sm text-gold transition-colors hover:bg-gold hover:text-base"
      >
        ← back home
      </Link>
    </section>
  );
}
