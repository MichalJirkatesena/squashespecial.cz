import "dotenv/config";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {
  seedCoaches,
  seedContact,
  seedHome,
  seedJunior,
  seedPlayers,
  seedPragueJuniorTour,
  seedTeams,
} from "../lib/seed-data";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    "Chybí FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY v .env.local — viz SETUP.md."
  );
  process.exit(1);
}

const app = getApps()[0] ?? initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
const db = getFirestore(app);

async function seed() {
  console.log("Nahrávám počáteční data do Firestore…");

  await db.doc("siteContent/home").set(seedHome, { merge: true });
  await db.doc("siteContent/junior").set(seedJunior, { merge: true });
  await db.doc("siteContent/pragueJuniorTour").set(seedPragueJuniorTour, { merge: true });
  await db.doc("siteSettings/contact").set(seedContact, { merge: true });

  for (const collectionName of ["players", "coaches", "teams"] as const) {
    const existing = await db.collection(collectionName).limit(1).get();
    if (!existing.empty) {
      console.log(`Kolekce "${collectionName}" už obsahuje data, přeskakuji.`);
      continue;
    }
    const items = collectionName === "players" ? seedPlayers : collectionName === "coaches" ? seedCoaches : seedTeams;
    for (const item of items) {
      await db.collection(collectionName).add(item);
    }
    console.log(`Naplněno ${items.length} záznamů do "${collectionName}".`);
  }

  console.log("Hotovo.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
