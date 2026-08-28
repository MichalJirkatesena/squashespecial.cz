import { getTextPage, getTextPagePhotos } from "@/lib/content";
import { PhotoGrid } from "@/components/PhotoGrid";

export const revalidate = 60;
export const metadata = { title: "Pražská juniorská tour | SquashEspecial" };

export default async function PragueJuniorTourPage() {
  const [content, photos] = await Promise.all([
    getTextPage("pragueJuniorTour"),
    getTextPagePhotos("pragueJuniorTour"),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
      <p className="text-slate-700 whitespace-pre-line max-w-3xl mb-8">{content.body}</p>
      <h2 className="text-xl font-semibold mb-4">Fotky a výsledky</h2>
      <PhotoGrid photos={photos} />
    </div>
  );
}
