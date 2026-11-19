import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-sm text-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl text-ink">{site.name}</p>
          <p>{site.role} · {site.city} · Solo con cita previa</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Instagram</a>
          <a href={`mailto:${site.email}`} className="hover:text-ink">Email</a>
          <Link href="/privacidad" className="hover:text-ink">Privacidad</Link>
          <Link href="/aviso-legal" className="hover:text-ink">Aviso legal</Link>
        </div>
      </div>
    </footer>
  );
}