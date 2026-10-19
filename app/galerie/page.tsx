import Image from "next/image";
import Link from "next/link";
import { getGalleryAlbums, getGalleryPhotos } from "@/lib/content";

export const revalidate = 60;
export const metadata = { title: "Galerie | SquashEspecial" };

const NEZARAZENE_ID = "nezarazene";

function photoCountLabel(count: number) {
  if (count === 1) return "1 fotka";
  if (count >= 2 && count <= 4) return `${count} fotky`;
  return `${count} fotek`;
}

export default async function GaleriePage() {
  const [albums, photos] = await Promise.all([getGalleryAlbums(), getGalleryPhotos()]);

  const cards = albums.map((album) => {
    const albumPhotos = photos.filter((p) => p.albumId === album.id);
    return { id: album.id, name: album.name, cover: albumPhotos[0]?.url, count: albumPhotos.length };
  });

  const unassigned = photos.filter((p) => !p.albumId || !albums.some((a) => a.id === p.albumId));
  if (unassigned.length > 0) {
    cards.push({ id: NEZARAZENE_ID, name: "Nezařazené fotky", cover: unassigned[0]?.url, count: unassigned.length });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display font-black uppercase text-4xl mb-8">Galerie</h1>
      {cards.length === 0 ? (
        <p className="text-muted">Zatím zde nejsou žádné fotky.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link key={card.id} href={`/galerie/${card.id}`} className="group block">
              <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-surface border border-line group-hover:border-glow/60 transition-colors mb-3">
                {card.cover ? (
                  <Image src={card.cover} alt={card.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center font-display font-black text-3xl text-muted">
                    {card.name.charAt(0)}
                  </div>
                )}
              </div>
              <p className="font-display font-bold uppercase tracking-wide">{card.name}</p>
              <p className="text-xs text-muted font-mono">{photoCountLabel(card.count)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
