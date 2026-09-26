"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, isFirebaseClientConfigured } from "@/lib/firebaseClient";
import { PhotoUploader } from "@/components/PhotoUploader";
import { triggerRevalidate } from "@/lib/revalidateClient";
import type { FieldConfig } from "./CrudList";

interface DocEditorProps {
  path: string;
  fields: FieldConfig[];
  defaultValue: object;
  revalidatePaths: string[];
}

export function DocEditor({ path, fields, defaultValue, revalidatePaths }: DocEditorProps) {
  const [values, setValues] = useState<Record<string, unknown>>(defaultValue as Record<string, unknown>);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      if (!db) {
        setLoading(false);
        return;
      }
      const snap = await getDoc(doc(db, path));
      if (snap.exists()) setValues({ ...defaultValue, ...snap.data() });
      setLoading(false);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  function update(key: string, value: unknown) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!db) return;
    await setDoc(doc(db, path), values, { merge: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    triggerRevalidate(revalidatePaths);
  }

  if (!isFirebaseClientConfigured) {
    return <p className="text-red-600">Firebase není nakonfigurován — viz SETUP.md.</p>;
  }
  if (loading) return <p>Načítám…</p>;

  return (
    <div className="space-y-4 max-w-2xl">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-slate-700 mb-1">{field.label}</label>
          {field.type === "text" && (
            <input
              type="text"
              value={(values[field.key] as string) ?? ""}
              onChange={(e) => update(field.key, e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
          )}
          {field.type === "textarea" && (
            <textarea
              value={(values[field.key] as string) ?? ""}
              onChange={(e) => update(field.key, e.target.value)}
              rows={6}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
          )}
          {field.type === "photo" && (
            <div className="flex items-center gap-3">
              {values[field.key] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={values[field.key] as string} alt="" className="w-24 h-24 object-cover rounded" />
              ) : null}
              <PhotoUploader folder={field.folder} onUploaded={(url) => update(field.key, url)} />
            </div>
          )}
        </div>
      ))}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-orange-700"
        >
          Uložit
        </button>
        {saved && <span className="text-sm text-green-600">Uloženo</span>}
      </div>
    </div>
  );
}
