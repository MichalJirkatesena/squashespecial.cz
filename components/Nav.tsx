"use client";

import Link from "next/link";
import { useState } from "react";

const leagues = [
  { href: "/tym#1-liga", label: "1. liga" },
  { href: "/tym#2-liga", label: "2. liga" },
  { href: "/tym#3-liga", label: "3. liga" },
];

const links = [
  { href: "/junior", label: "Junioři" },
  { href: "/trenere", label: "Trenéři" },
  { href: "/kalendar", label: "Kalendář akcí" },
  { href: "/galerie", label: "Fotogalerie" },
  { href: "/prazska-juniorska-tour", label: "Pražská Junior Tour" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-24">
        <Link
          href="/"
          className="font-display font-extrabold uppercase tracking-wide text-2xl sm:text-3xl"
          onClick={() => setOpen(false)}
        >
          Squash<span className="text-matchred">Especial</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-display font-bold uppercase text-base tracking-wide">
          <Link href="/junior" className="text-muted hover:text-glow transition-colors">
            Junioři
          </Link>

          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1.5 text-muted hover:text-glow transition-colors"
            >
              Ligové týmy
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all">
              <div className="bg-bg border border-line rounded-sm shadow-lg overflow-hidden min-w-[140px]">
                {leagues.map((league) => (
                  <Link
                    key={league.href}
                    href={league.href}
                    className="block px-4 py-3 text-sm text-muted hover:text-glow hover:bg-surface transition-colors"
                  >
                    {league.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/trenere" className="text-muted hover:text-glow transition-colors">
            Trenéři
          </Link>
          <Link href="/kalendar" className="text-muted hover:text-glow transition-colors">
            Kalendář akcí
          </Link>
          <Link href="/galerie" className="text-muted hover:text-glow transition-colors">
            Fotogalerie
          </Link>
          <Link href="/prazska-juniorska-tour" className="text-muted hover:text-glow transition-colors">
            Pražská Junior Tour
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
          <Link href="/junior" onClick={() => setOpen(false)} className="text-muted hover:text-glow py-2">
            Junioři
          </Link>

          <span className="text-fg py-2 mt-1">Ligové týmy</span>
          {leagues.map((league) => (
            <Link
              key={league.href}
              href={league.href}
              onClick={() => setOpen(false)}
              className="text-muted hover:text-glow py-2 pl-4 text-xs"
            >
              {league.label}
            </Link>
          ))}

          {links
            .filter((l) => l.href !== "/junior")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-muted hover:text-glow py-2 mt-1 first:mt-0"
              >
                {link.label}
              </Link>
            ))}
        </nav>
      )}
    </header>
  );
}
