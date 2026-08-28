import "server-only";
import { getAdminDb } from "./firebaseAdmin";
import {
  seedCoaches,
  seedContact,
  seedEvents,
  seedGallery,
  seedHome,
  seedJunior,
  seedPlayers,
  seedPragueJuniorTour,
  seedTeams,
  withSeedIds,
} from "./seed-data";
import type {
  CalendarEvent,
  Coach,
  ContactInfo,
  HomeContent,
  Photo,
  Player,
  TeamGroup,
  TextPageContent,
} from "./types";

async function safeGet<T>(fn: () => Promise<T>, fallbackValue: T): Promise<T> {
  const db = getAdminDb();
  if (!db) return fallbackValue;
  try {
    return await fn();
  } catch (err) {
    console.warn("Firestore read failed, using fallback content:", err);
    return fallbackValue;
  }
}

export async function getHome(): Promise<HomeContent> {
  return safeGet(async () => {
    const snap = await getAdminDb()!.doc("siteContent/home").get();
    return snap.exists ? (snap.data() as HomeContent) : seedHome;
  }, seedHome);
}

type TextPageSlug = "junior" | "pragueJuniorTour";

const textPageFallbacks: Record<TextPageSlug, TextPageContent> = {
  junior: seedJunior,
  pragueJuniorTour: seedPragueJuniorTour,
};

export async function getTextPage(slug: TextPageSlug): Promise<TextPageContent> {
  const fallback = textPageFallbacks[slug];
  return safeGet(async () => {
    const snap = await getAdminDb()!.doc(`siteContent/${slug}`).get();
    return snap.exists ? (snap.data() as TextPageContent) : fallback;
  }, fallback);
}

export async function getTextPagePhotos(slug: TextPageSlug): Promise<Photo[]> {
  return safeGet(async () => {
    const snap = await getAdminDb()!
      .collection(`siteContent/${slug}/photos`)
      .orderBy("order", "asc")
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Photo, "id">) }));
  }, []);
}

export async function getPlayers(): Promise<Player[]> {
  return safeGet(async () => {
    const snap = await getAdminDb()!.collection("players").orderBy("order", "asc").get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Player, "id">) }));
  }, withSeedIds(seedPlayers, "player"));
}

export async function getCoaches(): Promise<Coach[]> {
  return safeGet(async () => {
    const snap = await getAdminDb()!.collection("coaches").orderBy("order", "asc").get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Coach, "id">) }));
  }, withSeedIds(seedCoaches, "coach"));
}

export async function getTeams(): Promise<TeamGroup[]> {
  return safeGet(async () => {
    const snap = await getAdminDb()!.collection("teams").orderBy("order", "asc").get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TeamGroup, "id">) }));
  }, withSeedIds(seedTeams, "team"));
}

export async function getGalleryPhotos(): Promise<Photo[]> {
  return safeGet(async () => {
    const snap = await getAdminDb()!.collection("galleryPhotos").orderBy("order", "asc").get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Photo, "id">) }));
  }, withSeedIds(seedGallery, "photo"));
}

export async function getEvents(): Promise<CalendarEvent[]> {
  return safeGet(async () => {
    const snap = await getAdminDb()!.collection("events").orderBy("date", "asc").get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<CalendarEvent, "id">) }));
  }, withSeedIds(seedEvents, "event"));
}

export async function getContact(): Promise<ContactInfo> {
  return safeGet(async () => {
    const snap = await getAdminDb()!.doc("siteSettings/contact").get();
    return snap.exists ? (snap.data() as ContactInfo) : seedContact;
  }, seedContact);
}
