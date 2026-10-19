import { getGalleryPhotos } from "@/lib/content";
import { PhotoGrid } from "@/components/PhotoGrid";
import { SectionHeading } from "@/components/SectionHeading";
import type { Photo } from "@/lib/types";

export const revalidate = 60;
export const metadata = { title: "Galerie | SquashEspecial" };

const NO_ALBUM = "Ostatní fotky";

function groupByAlbum(photos: Photo[]) {
  const groups = new Map<string, Photo[]>();
  for (const photo of photos) {
    const key = photo.album?.trim() || NO_ALBUM;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(photo);
  }
  return groups;
}

export default async function GaleriePage() {
  const photos = await getGalleryPhotos();
  const groups = groupByAlbum(photos);
  const showFlat = photos.length === 0 || (groups.size <= 1 && groups.has(NO_ALBUM));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display font-black uppercase text-4xl mb-8">Galerie</h1>
      {showFlat ? (
        <PhotoGrid photos={photos} />
      ) : (
        <div className="space-y-14">
          {Array.from(groups.entries()).map(([album, albumPhotos]) => (
            <section key={album}>
              <SectionHeading>{album}</SectionHeading>
              <PhotoGrid photos={albumPhotos} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
