import Link from "next/link";
import { CrudList } from "@/components/admin/CrudList";

export default function AdminKalendarPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Kalendář akcí</h1>
      <CrudList
        collectionName="events"
        emptyItem={{ title: "Nová akce", date: "", location: "", description: "" }}
        fields={[
          { key: "title", label: "Název akce", type: "text" },
          { key: "date", label: "Datum", type: "date" },
          { key: "location", label: "Místo", type: "text" },
          { key: "description", label: "Popis", type: "textarea" },
        ]}
      />
    </div>
  );
}
