import Image from "next/image";
import { getHome } from "@/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const home = await getHome();

  return (
    <div>
      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{home.title}</h1>
          <p className="text-lg text-slate-300 max-w-2xl whitespace-pre-line">{home.intro}</p>
        </div>
      </section>
      {home.heroImageUrl && (
        <div className="max-w-6xl mx-auto px-4 -mt-8 sm:-mt-12">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <Image src={home.heroImageUrl} alt={home.title} fill className="object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}
