import Link from "next/link";

const links = [
  { href: "/", label: "Úvod" },
  { href: "/galerie", label: "Galerie" },
  { href: "/junior", label: "Junior" },
  { href: "/hraci", label: "Naši hráči" },
  { href: "/trenere", label: "Trenéři" },
  { href: "/tym", label: "Tým" },
  { href: "/kalendar", label: "Kalendář akcí" },
  { href: "/prazska-juniorska-tour", label: "Pražská juniorská tour" },
];

export function Nav() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Squash<span className="text-orange-500">Especial</span>
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-orange-400 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
