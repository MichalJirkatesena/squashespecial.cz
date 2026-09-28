import Link from "next/link";
import { CrudList } from "@/components/admin/CrudList";

export default function AdminTrenerePage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Trenéři</h1>
      <CrudList
        collectionName="coaches"
        emptyItem={{ name: "Nový trenér", photoUrl: "", nickname: "", birthYear: "", squashSince: "", achievements: "", bio: "" }}
        revalidatePaths={["/trenere"]}
        fields={[
          { key: "name", label: "Jméno", type: "text" },
          { key: "photoUrl", label: "Fotka", type: "photo", folder: "trenere" },
          { key: "nickname", label: "Přezdívka", type: "text" },
          { key: "birthYear", label: "Ročník", type: "text" },
          { key: "squashSince", label: "Squash hraje od", type: "text" },
          { key: "achievements", label: "Úspěchy", type: "textarea" },
          { key: "bio", label: "Krátký profil", type: "textarea" },
        ]}
      />
    </div>
  );
}
