import Link from "next/link";
import { CrudList } from "@/components/admin/CrudList";

export default function AdminHraciPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Hráči na homepage</h1>
      <p className="text-sm text-slate-500 mb-6">
        Tihle hráči se zobrazují jen na úvodní stránce (fotka + jméno). Plné profily hráčů spravuješ u jednotlivých lig a u Junioru.
      </p>
      <CrudList
        collectionName="players"
        emptyItem={{ name: "Nový hráč", photoUrl: "" }}
        revalidatePaths={["/"]}
        fields={[
          { key: "name", label: "Jméno", type: "text" },
          { key: "photoUrl", label: "Fotka", type: "photo", folder: "hraci" },
        ]}
      />
    </div>
  );
}
