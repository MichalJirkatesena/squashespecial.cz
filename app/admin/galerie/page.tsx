import Link from "next/link";
import { GalleryAdmin } from "@/components/admin/GalleryAdmin";

export default function AdminGaleriePage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Galerie fotek</h1>
      <GalleryAdmin />
    </div>
  );
}
