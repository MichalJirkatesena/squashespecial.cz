import { getCoaches } from "@/lib/content";
import { PersonGrid } from "@/components/PersonGrid";

export const revalidate = 60;
export const metadata = { title: "Trenéři | SquashEspecial" };

export default async function TrenerePage() {
  const coaches = await getCoaches();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Trenéři</h1>
      <PersonGrid people={coaches} />
    </div>
  );
}
