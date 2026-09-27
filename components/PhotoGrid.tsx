import Image from "next/image";
import type { Photo } from "@/lib/types";

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) {
    return <p className="text-muted">Zatím zde nejsou žádné fotky.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <figure key={photo.id} className="relative aspect-square overflow-hidden rounded-sm bg-surface border border-line hover:border-glow/60 transition-colors">
          <Image
            src={photo.url}
            alt={photo.caption ?? ""}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 25vw, 50vw"
          />
          {photo.caption && (
            <figcaption className="absolute bottom-0 inset-x-0 bg-bg/80 text-fg text-xs font-mono px-2 py-1">
              {photo.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
