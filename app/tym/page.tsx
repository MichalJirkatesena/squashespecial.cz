import Image from "next/image";
import { getTeams } from "@/lib/content";

export const revalidate = 60;
export const metadata = { title: "Tým SquashEspecial | SquashEspecial" };

export default async function TymPage() {
  const teams = await getTeams();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display font-black uppercase text-4xl mb-8">Team SquashEspecial</h1>
      <div className="space-y-14">
        {teams.map((team) => (
          <section key={team.id}>
            <h2 className="font-display font-bold uppercase text-2xl mb-2">{team.league}</h2>
            {team.description && <p className="text-muted whitespace-pre-line mb-4 leading-relaxed">{team.description}</p>}
            {team.photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {team.photos.map((url, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-sm bg-surface border border-line">
                    <Image src={url} alt={`${team.league} foto ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">Zatím zde nejsou žádné fotky.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
