import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { createRemoteJWKSet, jwtVerify } from "jose";

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

// Verifies the Firebase ID token ourselves via jose instead of
// firebase-admin/auth's verifyIdToken(): that path requires jwks-rsa, which
// requires the ESM-only jose package and breaks Vercel's serverless bundling
// (ERR_REQUIRE_ESM) — crashing every page that imports this file (including
// public pages via lib/content.ts) whenever it runs.
const googleJwks = projectId
  ? createRemoteJWKSet(
      new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com")
    )
  : undefined;

export async function verifyAdminRequest(request: Request): Promise<boolean> {
  if (!projectId || !googleJwks) return false;
  const header = request.headers.get("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, googleJwks, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });
    return typeof payload.sub === "string" && payload.sub.length > 0;
  } catch {
    return false;
  }
}
