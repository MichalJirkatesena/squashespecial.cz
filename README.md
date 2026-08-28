# SquashEspecial.cz

Webová prezentace squashového klubu SquashEspecial s jednoduchou administrací obsahu.

- **Frontend/hosting:** Next.js + Vercel
- **Obsah, přihlašování:** Firebase (Firestore, Auth)
- **Fotky:** Vercel Blob

## První spuštění

Bez nastaveného Firebase projektu se veřejné stránky zobrazí s výchozím ukázkovým textem, ale administrace (přihlášení) nebude fungovat.

```bash
npm install
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000).

## Napojení na Firebase a nasazení na Vercel

Postupuj podle **[SETUP.md](./SETUP.md)** — je tam návod krok za krokem, i pro nikoho, kdo Firebase ani Vercel předtím nepoužíval.

## Struktura projektu

- `app/` — veřejné stránky a administrace (`app/admin`)
- `lib/` — napojení na Firebase a načítání obsahu
- `components/` — sdílené UI komponenty
- `scripts/seed.ts` — jednorázové nahrání počátečních dat do Firestore (`npm run seed`)
- `firestore.rules` — bezpečnostní pravidla (čtení pro všechny, zápis jen po přihlášení)
- `app/api/upload/` — server endpoint pro upload fotek do Vercel Blob (ověřuje přihlášení přes Firebase ID token)
