import Link from "next/link";
import { notFound } from "next/navigation";
import { getGalleryAlbums, getGalleryPhotos } from "@/lib/content";
import { PhotoGrid } from "@/components/PhotoGrid";

export const revalidate = 60;

export async function generateStaticParams() {
  const albums = await getGalleryAlbums();
  return albums.map((a) => ({ albumId: a.id }));
}

export default async function AlbumPage({ params }: { params: Promise<{ albumId: string }> }) {
  const { albumId } = await params;
  const [albums, allPhotos] = await Promise.all([getGalleryAlbums(), getGalleryPhotos()]);

  let title: string;
  let photos;

  if (albumId === "nezarazene") {
    title = "Nezařazené fotky";
    photos = allPhotos.filter((p) => !p.albumId || !albums.some((a) => a.id === p.albumId));
  } else {
    const album = albums.find((a) => a.id === albumId);
    if (!album) notFound();
    title = album.name;
    photos = allPhotos.filter((p) => p.albumId === albumId);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/galerie" className="font-mono text-xs uppercase tracking-wide text-glow hover:underline">
        ← Galerie
      </Link>
      <h1 className="font-display font-black uppercase text-4xl mt-2 mb-8">{title}</h1>
      <PhotoGrid photos={photos} />
    </div>
  );
}
