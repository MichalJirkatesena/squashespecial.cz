"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/types";

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  if (photos.length === 0) {
    return <p className="text-muted">Zatím zde nejsou žádné fotky.</p>;
  }

  const current = openIndex !== null ? photos[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <figure
            key={photo.id}
            onClick={() => setOpenIndex(i)}
            className="relative aspect-square overflow-hidden rounded-sm bg-surface border border-line hover:border-glow/60 transition-colors cursor-pointer"
          >
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

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Zavřít"
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Předchozí fotka"
              className="absolute left-2 sm:left-4 text-white/80 hover:text-white p-2"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <div className="relative max-w-5xl max-h-[85vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image src={current.url} alt={current.caption ?? ""} fill className="object-contain" sizes="100vw" />
          </div>

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Další fotka"
              className="absolute right-2 sm:right-4 text-white/80 hover:text-white p-2"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {current.caption && (
            <p className="absolute bottom-4 inset-x-0 text-center text-white/80 text-sm font-mono px-4">
              {current.caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
