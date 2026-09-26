import Link from "next/link";
import { CrudList } from "@/components/admin/CrudList";

export default function AdminTymPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Team SquashEspecial</h1>
      <CrudList
        collectionName="teams"
        emptyItem={{ league: "Nová liga", description: "", photos: [] }}
        revalidatePaths={["/tym"]}
        fields={[
          { key: "league", label: "Liga (např. 1. liga)", type: "text" },
          { key: "description", label: "Informativní text", type: "textarea" },
          { key: "photos", label: "Fotky", type: "photos", folder: "tym" },
        ]}
      />
    </div>
  );
}
