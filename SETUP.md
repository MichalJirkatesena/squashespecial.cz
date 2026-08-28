# Návod: nastavení Firebase a nasazení na Vercel

Tento návod tě provede úplně od začátku — nepředpokládá žádnou předchozí zkušenost s Firebase ani Vercel. Udělej kroky popořadě.

## 1. Založení Firebase projektu

1. Jdi na [console.firebase.google.com](https://console.firebase.google.com) a přihlas se svým Google účtem.
2. Klikni na **Add project** (Přidat projekt).
3. Zadej název, např. `squashespecial`, klikni **Continue**.
4. Google Analytics není potřeba — můžeš ho vypnout. Klikni **Create project**.

## 2. Zapnutí databáze (Firestore)

1. V levém menu klikni na **Build > Firestore Database**.
2. Klikni **Create database**.
3. Zvol lokaci blízko ČR, např. `eur3 (europe-west)`.
4. Zvol **Start in production mode** a pokračuj.

## 3. Zapnutí přihlašování a založení admin účtu

1. V levém menu klikni na **Build > Authentication**.
2. Klikni **Get started**.
3. V seznamu přihlašovacích metod klikni na **Email/Password**, zapni přepínač **Enable** a ulož.
4. Přepni se na záložku **Users** a klikni **Add user**.
5. Zadej e-mail a heslo, kterým se budeš přihlašovat do administrace webu. Tohle je tvůj jediný admin účet.

## 4. Získání webové konfigurace (veřejné hodnoty)

1. Klikni na ozubené kolečko vlevo nahoře **Project settings**.
2. V sekci **Your apps** klikni na ikonu `</>` (Web app).
3. Zadej název (např. `web`) a klikni **Register app**. Netřeba zaškrtávat hosting.
4. Zobrazí se blok kódu s `firebaseConfig` — hodnoty z něj (apiKey, authDomain, projectId, messagingSenderId, appId) přepiš do souboru `.env.local` (viz krok 6). Hodnotu `storageBucket` nepotřebuješ — fotky se nahrávají přes Vercel Blob (krok 9), ne přes Firebase.

## 5. Získání admin klíče (tajné hodnoty)

1. Pořád v **Project settings** přejdi na záložku **Service accounts**.
2. Klikni **Generate new private key** a potvrď. Stáhne se `.json` soubor.
3. Otevři ho v poznámkovém bloku — obsahuje `project_id`, `client_email` a `private_key`. Tyto hodnoty přepiš do `.env.local` (viz krok 6).
4. Tento soubor nikomu neposílej ani ho nedávej do gitu/GitHubu — kdokoliv s ním by mohl mazat/měnit obsah webu.

## 6. Vyplnění `.env.local`

1. V projektu zkopíruj soubor `.env.local.example` a přejmenuj kopii na `.env.local`.
2. Vyplň do něj hodnoty z kroků 4 a 5. U `FIREBASE_PRIVATE_KEY` zkopíruj celou hodnotu `private_key` ze staženého JSON souboru (i s `-----BEGIN PRIVATE KEY-----` a `-----END PRIVATE KEY-----`), a vlož ji mezi uvozovky na jeden řádek.
3. `BLOB_READ_WRITE_TOKEN` zatím nech prázdné — doplní se až v kroku 9, po nasazení na Vercel.
4. Ulož soubor. Tento soubor se automaticky nikdy nenahraje do gitu.

## 7. Vyzkoušení lokálně

```bash
npm run dev
```

- Otevři [http://localhost:3000](http://localhost:3000) — veřejné stránky.
- Otevři [http://localhost:3000/admin](http://localhost:3000/admin) a přihlas se e-mailem a heslem z kroku 3.
- Volitelně spusť `npm run seed` — nahraje do Firestore počáteční ukázková data (jména hráčů a trenérů, prázdné ligy), aby admin nezačínal z úplně prázdné databáze.
- Nahrávání fotek v administraci zatím fungovat nebude (chybí `BLOB_READ_WRITE_TOKEN`) — vyřeší se v kroku 9.

## 8. Nahrání bezpečnostních pravidel do Firebase

Pravidla v `firestore.rules` (veřejné čtení, zápis jen po přihlášení) je potřeba nahrát do Firebase projektu:

```bash
npx firebase-tools login
npx firebase-tools use --add        # vyber svůj Firebase projekt
npx firebase-tools deploy --only firestore:rules
```

## 9. Nasazení webu na Vercel

1. Nahraj projekt na GitHub (pokud tam ještě není — repo je již propojené s `github.com/MichalJirkatesena/squashespecial.cz`).
2. Jdi na [vercel.com](https://vercel.com), přihlas se přes GitHub.
3. Klikni **Add New > Project** a vyber repozitář `squashespecial.cz`.
4. V sekci **Environment Variables** vlož proměnné z `.env.local` (jednu po druhé, název a hodnotu) — kromě `BLOB_READ_WRITE_TOKEN`, ten se doplní až v dalším kroku.
5. Klikni **Deploy**.
6. Po dokončení dostaneš adresu webu (např. `squashespecial-cz.vercel.app`). Vlastní doménu `squashespecial.cz` pak jde přidat v **Project Settings > Domains**.
7. V dashboardu projektu klikni na záložku **Storage > Create Database > Blob** — tohle je úložiště fotek, náhrada za Firebase Storage (to teď vyžaduje placený plán, Vercel Blob má vlastní free tier). Pojmenuj ho a vytvoř. Vercel k projektu automaticky přidá proměnnou `BLOB_READ_WRITE_TOKEN` — nic dalšího vyplňovat nemusíš.
8. Pokud chceš nahrávání fotek vyzkoušet i lokálně, spusť v projektu `npx vercel link` (propojí složku s projektem na Vercelu) a pak `npx vercel env pull .env.local` — stáhne to i `BLOB_READ_WRITE_TOKEN` do lokálního souboru.

## Shrnutí, co je kde

| Co | Kde |
|---|---|
| Texty, fotky, hráči, trenéři, kalendář | Administrace na `/admin` na tvém webu |
| Přihlašovací účet do administrace | Firebase Console > Authentication > Users |
| Záloha/přehled dat | Firebase Console > Firestore Database |
| Nastavení webu (env proměnné, doména, úložiště fotek) | Vercel Dashboard |
