import { contact } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-xs text-muted">
          © {year} Nikitha D — designed &amp; built from scratch.
        </p>
        <a
          href={`mailto:${contact.email}`}
          data-hover
          className="font-mono text-xs text-muted transition-colors hover:text-gold"
        >
          {contact.email}
        </a>
      </div>
    </footer>
  );
}
