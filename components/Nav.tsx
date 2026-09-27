"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/junior", label: "Junior" },
  { href: "/hraci", label: "Hráči" },
  { href: "/trenere", label: "Trenéři" },
  { href: "/tym", label: "Tým" },
  { href: "/galerie", label: "Galerie" },
  { href: "/prazska-juniorska-tour", label: "Pražská tour" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-display font-extrabold uppercase tracking-wide text-lg"
          onClick={() => setOpen(false)}
        >
          Squash<span className="text-matchred">Especial</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-display font-bold uppercase text-sm tracking-wide">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted hover:text-glow transition-colors">
              {link.label}
            </Link>
          ))}
          <Link
            href="/kalendar"
            className="bg-glow text-[#05130d] px-4 py-2 rounded-sm font-mono text-xs tracking-wide"
          >
            Kalendář
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-fg p-2 -mr-2"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line px-4 py-4 flex flex-col gap-1 font-display font-bold uppercase text-sm tracking-wide">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-muted hover:text-glow py-2"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kalendar"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block bg-glow text-[#05130d] px-4 py-2 rounded-sm font-mono text-xs tracking-wide w-fit"
          >
            Kalendář
          </Link>
        </nav>
      )}
    </header>
  );
}
