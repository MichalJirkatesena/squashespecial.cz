import Link from "next/link";
import { notFound } from "next/navigation";
import { getRosterPlayers, getTextPage, getTextPagePhotos } from "@/lib/content";
import { isLeagueSlug, LEAGUES } from "@/lib/leagues";
import { PersonGrid } from "@/components/PersonGrid";
import { PhotoGrid } from "@/components/PhotoGrid";

export const revalidate = 60;

export function generateStaticParams() {
  return LEAGUES.map((l) => ({ league: l.slug }));
}

export default async function LeaguePage({ params }: { params: Promise<{ league: string }> }) {
  const { league } = await params;
  if (!isLeagueSlug(league)) notFound();

  const [content, players, photos] = await Promise.all([
    getTextPage(league),
    getRosterPlayers(league),
    getTextPagePhotos(league),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/tym" className="font-mono text-xs uppercase tracking-wide text-glow hover:underline">
        ← Team SquashEspecial
      </Link>
      <h1 className="font-display font-black uppercase text-4xl mt-2 mb-4">{content.title}</h1>
      {content.body && (
        <p className="text-muted whitespace-pre-line max-w-3xl mb-10 leading-relaxed">{content.body}</p>
      )}

      <h2 className="font-display font-bold uppercase text-xl mb-4">Hráči</h2>
      <PersonGrid people={players} />

      {photos.length > 0 && (
        <>
          <h2 className="font-display font-bold uppercase text-xl mb-4 mt-12">Fotky</h2>
          <PhotoGrid photos={photos} />
        </>
      )}
    </div>
  );
}
