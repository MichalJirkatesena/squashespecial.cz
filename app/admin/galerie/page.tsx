import Link from "next/link";
import { CrudList } from "@/components/admin/CrudList";

export default function AdminGaleriePage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Galerie fotek</h1>
      <CrudList
        collectionName="galleryPhotos"
        emptyItem={{ url: "", caption: "" }}
        fields={[
          { key: "url", label: "Fotka", type: "photo", folder: "galerie" },
          { key: "caption", label: "Popisek", type: "text" },
        ]}
      />
    </div>
  );
}
