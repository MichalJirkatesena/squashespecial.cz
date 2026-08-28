"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useAuth } from "@/lib/auth-context";

const sections = [
  { href: "/admin/uvod", label: "Úvod / O klubu" },
  { href: "/admin/galerie", label: "Galerie fotek" },
  { href: "/admin/junior", label: "Juniorské akce a turnaje" },
  { href: "/admin/prazska-tour", label: "Pražská juniorská tour" },
  { href: "/admin/hraci", label: "Naši hráči" },
  { href: "/admin/trenere", label: "Trenéři" },
  { href: "/admin/tym", label: "Team SquashEspecial (ligy)" },
  { href: "/admin/kalendar", label: "Kalendář akcí" },
  { href: "/admin/kontakt", label: "Kontaktní údaje" },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Administrace</h1>
        <div className="flex items-center gap-3 text-sm">
          {user && <span className="text-slate-500">{user.email}</span>}
          <button
            type="button"
            onClick={() => auth && signOut(auth)}
            className="text-orange-600 hover:underline"
          >
            Odhlásit se
          </button>
        </div>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {sections.map((section) => (
          <li key={section.href}>
            <Link
              href={section.href}
              className="block border border-slate-200 rounded-lg px-4 py-3 bg-white hover:border-orange-500 hover:text-orange-600"
            >
              {section.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
