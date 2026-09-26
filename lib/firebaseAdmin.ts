import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const isFirebaseAdminConfigured = Boolean(projectId && clientEmail && privateKey);

let app: App | undefined;
let db: Firestore | undefined;

if (isFirebaseAdminConfigured) {
  app = getApps()[0] ?? initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
  db = getFirestore(app);
}

export function getAdminDb(): Firestore | null {
  return db ?? null;
}

// Loaded lazily: firebase-admin/auth pulls in jwks-rsa/jose, which breaks
// Vercel's serverless bundling if imported at module scope, crashing every
// page that imports this file (including public pages via lib/content.ts).
export async function verifyAdminRequest(request: Request): Promise<boolean> {
  if (!app) return false;
  const header = request.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return false;
  try {
    const { getAuth } = await import("firebase-admin/auth");
    await getAuth(app).verifyIdToken(token);
    return true;
  } catch {
    return false;
  }
}
