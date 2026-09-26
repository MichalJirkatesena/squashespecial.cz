import { getPlayers } from "@/lib/content";
import { PersonGrid } from "@/components/PersonGrid";

export const revalidate = 60;
export const metadata = { title: "Naši hráči | SquashEspecial" };

export default async function HraciPage() {
  const players = await getPlayers();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display font-black uppercase text-4xl mb-8">Naši hráči</h1>
      <PersonGrid people={players} />
    </div>
  );
}
