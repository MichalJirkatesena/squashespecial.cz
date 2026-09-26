"use client";

import { auth } from "@/lib/firebaseClient";

export async function triggerRevalidate(paths: string[]) {
  if (!auth?.currentUser) return;
  try {
    const token = await auth.currentUser.getIdToken();
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ paths }),
    });
  } catch (err) {
    // Best-effort — ISR still revalidates within a minute even if this fails.
    console.warn("Revalidate request failed:", err);
  }
}
