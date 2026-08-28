import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const isFirebaseAdminConfigured = Boolean(projectId && clientEmail && privateKey);

let app: App | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

if (isFirebaseAdminConfigured) {
  app = getApps()[0] ?? initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
  db = getFirestore(app);
  auth = getAuth(app);
}

export function getAdminDb(): Firestore | null {
  return db ?? null;
}

export async function verifyAdminRequest(request: Request): Promise<boolean> {
  if (!auth) return false;
  const header = request.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return false;
  try {
    await auth.verifyIdToken(token);
    return true;
  } catch {
    return false;
  }
}
