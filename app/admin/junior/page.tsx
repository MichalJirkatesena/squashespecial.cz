import Link from "next/link";
import { DocEditor } from "@/components/admin/DocEditor";
import { CrudList } from "@/components/admin/CrudList";
import { seedJunior } from "@/lib/seed-data";

export default function AdminJuniorPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Juniorské akce a turnaje</h1>
      <DocEditor
        path="siteContent/junior"
        defaultValue={seedJunior}
        revalidatePaths={["/junior"]}
        fields={[
          { key: "title", label: "Nadpis", type: "text" },
          { key: "body", label: "Text (squash camp, výsledky…)", type: "textarea" },
        ]}
      />
      <h2 className="text-xl font-semibold mt-10 mb-4">Hráči</h2>
      <CrudList
        collectionName="siteContent/junior/players"
        emptyItem={{ name: "Nový hráč", photoUrl: "", nickname: "", birthYear: "", squashSince: "", achievements: "", bio: "" }}
        revalidatePaths={["/junior"]}
        fields={[
          { key: "name", label: "Jméno", type: "text" },
          { key: "photoUrl", label: "Fotka", type: "photo", folder: "junior" },
          { key: "nickname", label: "Přezdívka", type: "text" },
          { key: "birthYear", label: "Ročník", type: "text" },
          { key: "squashSince", label: "Squash hraje od", type: "text" },
          { key: "achievements", label: "Úspěchy", type: "textarea" },
          { key: "bio", label: "Krátký profil", type: "textarea" },
        ]}
      />

      <h2 className="text-xl font-semibold mt-10 mb-4">Fotky a výsledky</h2>
      <CrudList
        collectionName="siteContent/junior/photos"
        emptyItem={{ url: "", caption: "" }}
        revalidatePaths={["/junior"]}
        fields={[
          { key: "url", label: "Fotka", type: "photo", folder: "junior" },
          { key: "caption", label: "Popisek", type: "text" },
        ]}
      />
    </div>
  );
}
