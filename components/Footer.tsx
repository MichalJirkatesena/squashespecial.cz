import type { ContactInfo } from "@/lib/types";

export function Footer({ contact }: { contact: ContactInfo }) {
  const hasContact = contact.address || contact.phone || contact.email || contact.openingHours;

  return (
    <footer className="mt-auto bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-white font-semibold mb-1">SquashEspecial</p>
          {hasContact ? (
            <ul className="text-sm space-y-1">
              {contact.address && <li>{contact.address}</li>}
              {contact.phone && <li>Tel: {contact.phone}</li>}
              {contact.email && <li>E-mail: {contact.email}</li>}
              {contact.openingHours && <li>{contact.openingHours}</li>}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">Kontaktní údaje doplň v administraci.</p>
          )}
        </div>
        <div className="sm:text-right text-sm text-slate-500 self-end">
          © {new Date().getFullYear()} SquashEspecial
        </div>
      </div>
    </footer>
  );
}
