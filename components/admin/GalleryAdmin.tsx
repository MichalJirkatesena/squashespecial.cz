"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db, isFirebaseClientConfigured } from "@/lib/firebaseClient";
import { triggerRevalidate } from "@/lib/revalidateClient";
import { CrudList } from "./CrudList";

interface Album {
  id: string;
  name: string;
  order: number;
}

export function GalleryAdmin() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function load() {
      if (!db) {
        setLoading(false);
        return;
      }
      const snap = await getDocs(query(collection(db, "galleryAlbums"), orderBy("order", "asc")));
      setAlbums(snap.docs.map((d) => ({ id: d.id, order: 0, ...d.data() }) as Album));
      setLoading(false);
    }
    load();
  }, []);

  async function handleCreateAlbum() {
    const name = newAlbumName.trim();
    if (!db || !name) return;
    setCreating(true);
    try {
      const nextOrder = albums.length > 0 ? Math.max(...albums.map((a) => a.order ?? 0)) + 1 : 1;
      const ref = await addDoc(collection(db, "galleryAlbums"), { name, order: nextOrder });
      setAlbums((prev) => [...prev, { id: ref.id, name, order: nextOrder }]);
      setNewAlbumName("");
      triggerRevalidate(["/galerie"]);
    } finally {
      setCreating(false);
    }
  }

  if (!isFirebaseClientConfigured) {
    return <p className="text-red-600">Firebase není nakonfigurován — viz SETUP.md.</p>;
  }
  if (loading) return <p>Načítám…</p>;

  return (
    <div>
      <div className="mb-8 border border-slate-200 rounded-lg p-4 bg-white">
        <label className="block text-sm font-medium text-slate-700 mb-1">Vytvořit nové album</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
            placeholder="Např. Turnaj v Ostravě"
            className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={handleCreateAlbum}
            disabled={creating || !newAlbumName.trim()}
            className="bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
          >
            Vytvořit album
          </button>
        </div>
      </div>

      {albums.length === 0 ? (
        <p className="text-slate-500">Nejdřív vytvoř aspoň jedno album, pak budeš moct přidávat fotky.</p>
      ) : (
        <CrudList
          collectionName="galleryPhotos"
          emptyItem={{ url: "", caption: "", albumId: albums[0].id }}
          revalidatePaths={["/galerie"]}
          fields={[
            { key: "url", label: "Fotka", type: "photo", folder: "galerie" },
            { key: "caption", label: "Popisek", type: "text" },
            {
              key: "albumId",
              label: "Album",
              type: "select",
              placeholder: "— Vyber album —",
              options: albums.map((a) => ({ value: a.id, label: a.name })),
            },
          ]}
        />
      )}
    </div>
  );
}
