"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { auth, db, isFirebaseClientConfigured } from "@/lib/firebaseClient";
import { triggerRevalidate } from "@/lib/revalidateClient";
import { compressImage } from "@/lib/compressImage";
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
  const [refreshKey, setRefreshKey] = useState(0);

  const [bulkAlbumId, setBulkAlbumId] = useState("");
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ done: 0, total: 0 });
  const [bulkError, setBulkError] = useState<string | null>(null);
  const bulkInputRef = useRef<HTMLInputElement>(null);

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

  async function handleBulkUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0 || !bulkAlbumId || !db || !auth?.currentUser) return;

    setBulkUploading(true);
    setBulkError(null);
    setBulkProgress({ done: 0, total: files.length });

    try {
      const token = await auth.currentUser.getIdToken();
      const lastSnap = await getDocs(
        query(collection(db, "galleryPhotos"), orderBy("order", "desc"), limit(1))
      );
      let nextOrder = lastSnap.empty ? 1 : ((lastSnap.docs[0].data().order as number | undefined) ?? 0) + 1;

      for (const file of files) {
        const compressed = await compressImage(file);
        const formData = new FormData();
        formData.append("file", compressed);
        formData.append("folder", "galerie");

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (!res.ok) throw new Error(`Nahrání selhalo: ${file.name}`);
        const { url } = await res.json();

        await addDoc(collection(db, "galleryPhotos"), {
          url,
          caption: "",
          albumId: bulkAlbumId,
          order: nextOrder++,
        });
        setBulkProgress((p) => ({ ...p, done: p.done + 1 }));
      }

      triggerRevalidate(["/galerie"]);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setBulkError("Některé fotky se nepodařilo nahrát. Zkus to prosím znovu.");
      console.error(err);
    } finally {
      setBulkUploading(false);
      if (bulkInputRef.current) bulkInputRef.current.value = "";
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

      {albums.length > 0 && (
        <div className="mb-8 border border-slate-200 rounded-lg p-4 bg-white">
          <label className="block text-sm font-medium text-slate-700 mb-1">Hromadně nahrát fotky do alba</label>
          <select
            value={bulkAlbumId}
            onChange={(e) => setBulkAlbumId(e.target.value)}
            disabled={bulkUploading}
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white mb-2"
          >
            <option value="">— Vyber album —</option>
            {albums.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <input
            ref={bulkInputRef}
            type="file"
            accept="image/*"
            multiple
            disabled={!bulkAlbumId || bulkUploading}
            onChange={handleBulkUpload}
            className="text-sm"
          />
          {bulkUploading && (
            <p className="text-xs text-slate-500 mt-1">
              Nahrávám {bulkProgress.done}/{bulkProgress.total}…
            </p>
          )}
          {bulkError && <p className="text-xs text-red-600 mt-1">{bulkError}</p>}
        </div>
      )}

      {albums.length === 0 ? (
        <p className="text-slate-500">Nejdřív vytvoř aspoň jedno album, pak budeš moct přidávat fotky.</p>
      ) : (
        <CrudList
          key={refreshKey}
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
