import Link from "next/link";
import { CrudList } from "@/components/admin/CrudList";
import { NEWS_CATEGORIES } from "@/lib/newsCategories";

export default function AdminAktualityPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Aktuality</h1>
      <p className="text-sm text-slate-500 mb-6">
        Kategorie určuje, na které podstránce se aktualita zobrazí v Archivu aktualit (kromě toho se vždy zobrazuje i na
        homepage).
      </p>
      <CrudList
        collectionName="news"
        emptyItem={{ title: "Nová aktualita", date: "", category: "", body: "" }}
        revalidatePaths={["/", "/junior", "/tym/1-liga", "/tym/2-liga", "/tym/3-liga"]}
        fields={[
          { key: "title", label: "Nadpis", type: "text" },
          { key: "date", label: "Datum", type: "date" },
          {
            key: "category",
            label: "Kategorie",
            type: "select",
            options: NEWS_CATEGORIES.map((c) => ({ value: c.slug, label: c.label })),
          },
          { key: "body", label: "Text", type: "textarea" },
        ]}
      />
    </div>
  );
}
