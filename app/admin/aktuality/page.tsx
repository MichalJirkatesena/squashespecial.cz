import Link from "next/link";
import { CrudList } from "@/components/admin/CrudList";

export default function AdminAktualityPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Aktuality</h1>
      <CrudList
        collectionName="news"
        emptyItem={{ title: "Nová aktualita", date: "", body: "" }}
        revalidatePaths={["/"]}
        fields={[
          { key: "title", label: "Nadpis", type: "text" },
          { key: "date", label: "Datum", type: "date" },
          { key: "body", label: "Text", type: "textarea" },
        ]}
      />
    </div>
  );
}
