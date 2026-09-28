import Link from "next/link";
import { LEAGUES } from "@/lib/leagues";

export default function AdminTymPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Team SquashEspecial</h1>
      <ul className="grid sm:grid-cols-3 gap-3">
        {LEAGUES.map((league) => (
          <li key={league.slug}>
            <Link
              href={`/admin/tym/${league.slug}`}
              className="block border border-slate-200 rounded-lg px-4 py-3 bg-white hover:border-orange-500 hover:text-orange-600"
            >
              {league.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
