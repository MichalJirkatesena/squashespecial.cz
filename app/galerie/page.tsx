import { getGalleryPhotos } from "@/lib/content";
import { PhotoGrid } from "@/components/PhotoGrid";

export const revalidate = 60;
export const metadata = { title: "Galerie | SquashEspecial" };

export default async function GaleriePage() {
  const photos = await getGalleryPhotos();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Galerie</h1>
      <PhotoGrid photos={photos} />
    </div>
  );
}
