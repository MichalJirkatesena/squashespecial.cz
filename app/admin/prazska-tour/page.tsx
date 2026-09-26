import Link from "next/link";
import { DocEditor } from "@/components/admin/DocEditor";
import { CrudList } from "@/components/admin/CrudList";
import { seedPragueJuniorTour } from "@/lib/seed-data";

export default function AdminPragueTourPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Pražská juniorská tour</h1>
      <DocEditor
        path="siteContent/pragueJuniorTour"
        defaultValue={seedPragueJuniorTour}
        revalidatePaths={["/prazska-juniorska-tour"]}
        fields={[
          { key: "title", label: "Nadpis", type: "text" },
          { key: "body", label: "Text", type: "textarea" },
        ]}
      />
      <h2 className="text-xl font-semibold mt-10 mb-4">Fotky a výsledky</h2>
      <CrudList
        collectionName="siteContent/pragueJuniorTour/photos"
        emptyItem={{ url: "", caption: "" }}
        revalidatePaths={["/prazska-juniorska-tour"]}
        fields={[
          { key: "url", label: "Fotka", type: "photo", folder: "prazska-tour" },
          { key: "caption", label: "Popisek", type: "text" },
        ]}
      />
    </div>
  );
}
