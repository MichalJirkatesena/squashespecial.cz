import Link from "next/link";
import { DocEditor } from "@/components/admin/DocEditor";
import { seedHome } from "@/lib/seed-data";

export default function AdminUvodPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Úvod / O klubu</h1>
      <DocEditor
        path="siteContent/home"
        defaultValue={seedHome}
        fields={[
          { key: "title", label: "Název", type: "text" },
          { key: "intro", label: "Úvodní text", type: "textarea" },
          { key: "heroImageUrl", label: "Hlavní fotka", type: "photo", folder: "home" },
        ]}
      />
    </div>
  );
}
