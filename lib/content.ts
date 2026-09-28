import "server-only";
import { getAdminDb } from "./firebaseAdmin";
import type { LeagueSlug } from "./leagues";
import {
  seedCoaches,
  seedContact,
  seedEvents,
  seedGallery,
  seedHome,
  seedJunior,
  seedNews,
  seedPlayers,
  seedPragueJuniorTour,
  seedTeam1,
  seedTeam2,
  seedTeam3,
  withSeedIds,
} from "./seed-data";
import type {
  CalendarEvent,
  Coach,
  ContactInfo,
  HomeContent,
  NewsPost,
  Photo,
  Player,
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

type TextPageSlug = "junior" | "pragueJuniorTour" | LeagueSlug;

const textPageFallbacks: Record<TextPageSlug, TextPageContent> = {
  junior: seedJunior,
  pragueJuniorTour: seedPragueJuniorTour,
  "1-liga": seedTeam1,
  "2-liga": seedTeam2,
  "3-liga": seedTeam3,
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

export async function getRosterPlayers(slug: TextPageSlug): Promise<Player[]> {
  return safeGet(async () => {
    const snap = await getAdminDb()!
      .collection(`siteContent/${slug}/players`)
      .orderBy("order", "asc")
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Player, "id">) }));
  }, []);
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

export async function getUpcomingEvents(limit: number): Promise<CalendarEvent[]> {
  const todayIso = new Date().toISOString().slice(0, 10);
  return safeGet(async () => {
    const snap = await getAdminDb()!
      .collection("events")
      .where("date", ">=", todayIso)
      .orderBy("date", "asc")
      .limit(limit)
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<CalendarEvent, "id">) }));
  }, withSeedIds(seedEvents, "event").filter((e) => e.date >= todayIso).slice(0, limit));
}

export async function getNews(limit?: number): Promise<NewsPost[]> {
  return safeGet(async () => {
    let query = getAdminDb()!.collection("news").orderBy("date", "desc");
    if (limit) query = query.limit(limit);
    const snap = await query.get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<NewsPost, "id">) }));
  }, withSeedIds(seedNews, "news").slice(0, limit));
}

export async function getContact(): Promise<ContactInfo> {
  return safeGet(async () => {
    const snap = await getAdminDb()!.doc("siteSettings/contact").get();
    return snap.exists ? (snap.data() as ContactInfo) : seedContact;
  }, seedContact);
}
