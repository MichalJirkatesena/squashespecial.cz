import Link from "next/link";
import { getTextPage } from "@/lib/content";
import { LEAGUES } from "@/lib/leagues";

export const revalidate = 60;
export const metadata = { title: "Team SquashEspecial | SquashEspecial" };

export default async function TymPage() {
  const teams = await Promise.all(LEAGUES.map((l) => getTextPage(l.slug)));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display font-black uppercase text-4xl mb-8">Team SquashEspecial</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        {LEAGUES.map((league, i) => {
          const content = teams[i];
          return (
            <Link
              key={league.slug}
              href={`/tym/${league.slug}`}
              className="block border border-line rounded-sm p-6 hover:border-glow/60 transition-colors"
            >
              <h2 className="font-display font-bold uppercase text-2xl mb-2">{content.title}</h2>
              {content.body ? (
                <p className="text-muted text-sm leading-relaxed line-clamp-3">{content.body}</p>
              ) : (
                <p className="text-muted text-sm">Zobrazit hráče a informace →</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
