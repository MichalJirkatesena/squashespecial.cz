import type { ContactInfo } from "@/lib/types";

export function Footer({ contact }: { contact: ContactInfo }) {
  const hasContact = contact.address || contact.phone || contact.email || contact.openingHours;

  return (
    <footer className="mt-auto border-t border-line">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="font-display font-extrabold uppercase tracking-wide text-fg mb-2">
            Squash<span className="text-matchred">Especial</span>
          </p>
          {hasContact ? (
            <ul className="text-sm text-muted space-y-1">
              {contact.address && <li>{contact.address}</li>}
              {contact.phone && <li>Tel: {contact.phone}</li>}
              {contact.email && <li>E-mail: {contact.email}</li>}
              {contact.openingHours && <li>{contact.openingHours}</li>}
            </ul>
          ) : (
            <p className="text-sm text-muted">Kontaktní údaje doplň v administraci.</p>
          )}
        </div>
        <div className="sm:text-right text-sm text-muted self-end font-mono">
          © {new Date().getFullYear()} SquashEspecial
        </div>
      </div>
    </footer>
  );
}
