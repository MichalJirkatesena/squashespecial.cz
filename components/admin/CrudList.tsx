"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, isFirebaseClientConfigured } from "@/lib/firebaseClient";
import { PhotoUploader } from "@/components/PhotoUploader";

export type FieldConfig =
  | { key: string; label: string; type: "text" }
  | { key: string; label: string; type: "date" }
  | { key: string; label: string; type: "textarea" }
  | { key: string; label: string; type: "photo"; folder: string }
  | { key: string; label: string; type: "photos"; folder: string };

type Item = { id: string; order: number; [key: string]: unknown };

interface CrudListProps {
  collectionName: string;
  fields: FieldConfig[];
  emptyItem: Record<string, unknown>;
}

export function CrudList({ collectionName, fields, emptyItem }: CrudListProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!db) {
        setLoading(false);
        return;
      }
      const snap = await getDocs(query(collection(db, collectionName), orderBy("order", "asc")));
      setItems(snap.docs.map((d) => ({ id: d.id, order: 0, ...d.data() }) as Item));
      setLoading(false);
    }
    load();
  }, [collectionName]);

  function updateField(id: string, key: string, value: unknown) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  }

  async function handleAdd() {
    if (!db) return;
    const nextOrder = items.length > 0 ? Math.max(...items.map((i) => i.order ?? 0)) + 1 : 1;
    const data = { ...emptyItem, order: nextOrder };
    const ref = await addDoc(collection(db, collectionName), data);
    setItems((prev) => [...prev, { id: ref.id, ...data } as Item]);
  }

  async function handleSave(item: Item) {
    if (!db) return;
    const { id, ...data } = item;
    await updateDoc(doc(db, collectionName, id), data);
    setSavedId(id);
    setTimeout(() => setSavedId((cur) => (cur === id ? null : cur)), 1500);
  }

  async function handleDelete(id: string) {
    if (!db) return;
    if (!confirm("Opravdu smazat?")) return;
    await deleteDoc(doc(db, collectionName, id));
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  if (!isFirebaseClientConfigured) {
    return <p className="text-red-600">Firebase není nakonfigurován — viz SETUP.md.</p>;
  }

  if (loading) return <p>Načítám…</p>;

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="border border-slate-200 rounded-lg p-4 bg-white">
          <div className="grid gap-3">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">{field.label}</label>
                {field.type === "text" && (
                  <input
                    type="text"
                    value={(item[field.key] as string) ?? ""}
                    onChange={(e) => updateField(item.id, field.key, e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                  />
                )}
                {field.type === "date" && (
                  <input
                    type="date"
                    value={(item[field.key] as string) ?? ""}
                    onChange={(e) => updateField(item.id, field.key, e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    value={(item[field.key] as string) ?? ""}
                    onChange={(e) => updateField(item.id, field.key, e.target.value)}
                    rows={3}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                  />
                )}
                {field.type === "photo" && (
                  <div className="flex items-center gap-3">
                    {item[field.key] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item[field.key] as string} alt="" className="w-16 h-16 object-cover rounded" />
                    ) : null}
                    <PhotoUploader folder={field.folder} onUploaded={(url) => updateField(item.id, field.key, url)} />
                  </div>
                )}
                {field.type === "photos" && (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {((item[field.key] as string[]) ?? []).map((url, i) => (
                        <div key={i} className="relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="" className="w-16 h-16 object-cover rounded" />
                          <button
                            type="button"
                            onClick={() =>
                              updateField(
                                item.id,
                                field.key,
                                ((item[field.key] as string[]) ?? []).filter((_, idx) => idx !== i)
                              )
                            }
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs leading-5"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <PhotoUploader
                      folder={field.folder}
                      onUploaded={(url) =>
                        updateField(item.id, field.key, [...((item[field.key] as string[]) ?? []), url])
                      }
                    />
                  </div>
                )}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pořadí</label>
              <input
                type="number"
                value={item.order ?? 0}
                onChange={(e) => updateField(item.id, "order", Number(e.target.value))}
                className="w-24 border border-slate-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => handleSave(item)}
              className="bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-orange-700"
            >
              Uložit
            </button>
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="text-red-600 text-sm font-medium px-4 py-2 hover:underline"
            >
              Smazat
            </button>
            {savedId === item.id && <span className="text-sm text-green-600">Uloženo</span>}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="border border-dashed border-slate-400 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:border-orange-500 hover:text-orange-600 w-full"
      >
        + Přidat nové
      </button>
    </div>
  );
}
