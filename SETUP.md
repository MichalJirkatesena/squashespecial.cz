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

## 3. Zapnutí úložiště fotek (Storage)

1. V levém menu klikni na **Build > Storage**.
2. Klikni **Get started** a projdi průvodce (výchozí nastavení stačí).

## 4. Zapnutí přihlašování a založení admin účtu

1. V levém menu klikni na **Build > Authentication**.
2. Klikni **Get started**.
3. V seznamu přihlašovacích metod klikni na **Email/Password**, zapni přepínač **Enable** a ulož.
4. Přepni se na záložku **Users** a klikni **Add user**.
5. Zadej e-mail a heslo, kterým se budeš přihlašovat do administrace webu. Tohle je tvůj jediný admin účet.

## 5. Získání webové konfigurace (veřejné hodnoty)

1. Klikni na ozubené kolečko vlevo nahoře **Project settings**.
2. V sekci **Your apps** klikni na ikonu `</>` (Web app).
3. Zadej název (např. `web`) a klikni **Register app**. Netřeba zaškrtávat hosting.
4. Zobrazí se blok kódu s `firebaseConfig` — hodnoty z něj (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId) přepiš do souboru `.env.local` (viz krok 7).

## 6. Získání admin klíče (tajné hodnoty)

1. Pořád v **Project settings** přejdi na záložku **Service accounts**.
2. Klikni **Generate new private key** a potvrď. Stáhne se `.json` soubor.
3. Otevři ho v poznámkovém bloku — obsahuje `project_id`, `client_email` a `private_key`. Tyto hodnoty přepiš do `.env.local` (viz krok 7).
4. Tento soubor nikomu neposílej ani ho nedávej do gitu/GitHubu — kdokoliv s ním by mohl mazat/měnit obsah webu.

## 7. Vyplnění `.env.local`

1. V projektu zkopíruj soubor `.env.local.example` a přejmenuj kopii na `.env.local`.
2. Vyplň do něj hodnoty z kroků 5 a 6. U `FIREBASE_PRIVATE_KEY` zkopíruj celou hodnotu `private_key` ze staženého JSON souboru (i s `-----BEGIN PRIVATE KEY-----` a `-----END PRIVATE KEY-----`), a vlož ji mezi uvozovky na jeden řádek.
3. Ulož soubor. Tento soubor se automaticky nikdy nenahraje do gitu.

## 8. Vyzkoušení lokálně

```bash
npm run dev
```

- Otevři [http://localhost:3000](http://localhost:3000) — veřejné stránky.
- Otevři [http://localhost:3000/admin](http://localhost:3000/admin) a přihlas se e-mailem a heslem z kroku 4.
- Volitelně spusť `npm run seed` — nahraje do Firestore počáteční ukázková data (jména hráčů a trenérů, prázdné ligy), aby admin nezačínal z úplně prázdné databáze.

## 9. Nahrání bezpečnostních pravidel do Firebase

Pravidla v `firestore.rules` a `storage.rules` (veřejné čtení, zápis jen po přihlášení) je potřeba nahrát do Firebase projektu:

```bash
npx firebase-tools login
npx firebase-tools use --add        # vyber svůj Firebase projekt
npx firebase-tools deploy --only firestore:rules,storage:rules
```

## 10. Nasazení webu na Vercel

1. Nahraj projekt na GitHub (pokud tam ještě není — repo je již propojené s `github.com/MichalJirkatesena/squashespecial.cz`).
2. Jdi na [vercel.com](https://vercel.com), přihlas se přes GitHub.
3. Klikni **Add New > Project** a vyber repozitář `squashespecial.cz`.
4. V sekci **Environment Variables** vlož úplně stejné proměnné, jaké máš v `.env.local` (jednu po druhé, název a hodnotu).
5. Klikni **Deploy**.
6. Po dokončení dostaneš adresu webu (např. `squashespecial-cz.vercel.app`). Vlastní doménu `squashespecial.cz` pak jde přidat v **Project Settings > Domains**.

## Shrnutí, co je kde

| Co | Kde |
|---|---|
| Texty, fotky, hráči, trenéři, kalendář | Administrace na `/admin` na tvém webu |
| Přihlašovací účet do administrace | Firebase Console > Authentication > Users |
| Záloha/přehled dat | Firebase Console > Firestore Database |
| Nastavení webu (env proměnné, doména) | Vercel Dashboard |
