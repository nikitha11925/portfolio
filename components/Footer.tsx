import { contact } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 text-center">
      <a
        href={`mailto:${contact.email}`}
        data-hover
        className="font-mono text-xs text-muted transition-colors hover:text-gold"
      >
        {contact.email}
      </a>
    </footer>
  );
}
