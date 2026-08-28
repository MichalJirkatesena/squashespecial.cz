import Image from "next/image";
import { getTeams } from "@/lib/content";

export const revalidate = 60;
export const metadata = { title: "Tým SquashEspecial | SquashEspecial" };

export default async function TymPage() {
  const teams = await getTeams();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Team SquashEspecial</h1>
      <div className="space-y-12">
        {teams.map((team) => (
          <section key={team.id}>
            <h2 className="text-2xl font-semibold mb-2">{team.league}</h2>
            {team.description && <p className="text-slate-700 whitespace-pre-line mb-4">{team.description}</p>}
            {team.photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {team.photos.map((url, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
                    <Image src={url} alt={`${team.league} foto ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">Zatím zde nejsou žádné fotky.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
