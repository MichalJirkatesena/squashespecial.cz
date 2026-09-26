import { getTextPage, getTextPagePhotos } from "@/lib/content";
import { PhotoGrid } from "@/components/PhotoGrid";

export const revalidate = 60;
export const metadata = { title: "Junior | SquashEspecial" };

export default async function JuniorPage() {
  const [content, photos] = await Promise.all([
    getTextPage("junior"),
    getTextPagePhotos("junior"),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display font-black uppercase text-4xl mb-4">{content.title}</h1>
      <p className="text-muted whitespace-pre-line max-w-3xl mb-10 leading-relaxed">{content.body}</p>
      <h2 className="font-display font-bold uppercase text-xl mb-4">Fotky a výsledky</h2>
      <PhotoGrid photos={photos} />
    </div>
  );
}
