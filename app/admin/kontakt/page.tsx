import Link from "next/link";
import { DocEditor } from "@/components/admin/DocEditor";
import { seedContact } from "@/lib/seed-data";

export default function AdminKontaktPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-orange-600 hover:underline">
        ← Zpět do administrace
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">Kontaktní údaje</h1>
      <DocEditor
        path="siteSettings/contact"
        defaultValue={seedContact}
        revalidatePaths={["/"]}
        fields={[
          { key: "address", label: "Adresa", type: "text" },
          { key: "phone", label: "Telefon", type: "text" },
          { key: "email", label: "E-mail", type: "text" },
          { key: "openingHours", label: "Otevírací doba", type: "textarea" },
        ]}
      />
    </div>
  );
}
