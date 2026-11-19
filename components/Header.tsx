"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl tracking-wide">
          {site.name}
        </Link>

        <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="text-xl md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-5 border-t border-white/10 px-6 py-6 text-sm uppercase tracking-[0.2em] md:hidden">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}