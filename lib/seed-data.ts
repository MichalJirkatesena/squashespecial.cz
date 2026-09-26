import type {
  CalendarEvent,
  Coach,
  ContactInfo,
  HomeContent,
  NewsPost,
  Photo,
  Player,
  TeamGroup,
  TextPageContent,
} from "./types";

export const seedHome: HomeContent = {
  title: "SquashEspecial",
  intro:
    "Vítejte na stránkách squashového klubu SquashEspecial. Věnujeme se výchově mladých hráčů, přípravě týmů do ligových soutěží i squashi pro radost. Tento text uprav v administraci.",
  stat1Value: "3",
  stat1Label: "ligové týmy",
  stat2Value: "12",
  stat2Label: "aktivních juniorů",
  stat3Value: "7/7",
  stat3Label: "trénujeme každý den",
};

export const seedJunior: TextPageContent = {
  title: "Juniorské akce a turnaje",
  body:
    "Zde najdete informace o juniorských turnajích, squash campech a výsledcích našich nejmladších hráčů. Obsah této stránky uprav v administraci.",
};

export const seedPragueJuniorTour: TextPageContent = {
  title: "Pražská juniorská tour",
  body:
    "Informace o seriálu Pražské juniorské tour a výsledcích našich hráčů. Obsah této stránky uprav v administraci.",
};

export const seedPlayers: Omit<Player, "id">[] = [
  { name: "Aneta", order: 1 },
  { name: "Kryštof", order: 2 },
  { name: "Tonda", order: 3 },
  { name: "Honza", order: 4 },
  { name: "Jonáš", order: 5 },
];

export const seedCoaches: Omit<Coach, "id">[] = [
  { name: "Jarda", order: 1 },
  { name: "Michal", order: 2 },
  { name: "Miky", order: 3 },
];

export const seedTeams: Omit<TeamGroup, "id">[] = [
  { league: "1. liga", description: "", photos: [], order: 1 },
  { league: "2. liga", description: "", photos: [], order: 2 },
  { league: "3. liga", description: "", photos: [], order: 3 },
];

export const seedEvents: Omit<CalendarEvent, "id">[] = [];

export const seedNews: Omit<NewsPost, "id">[] = [];

export const seedGallery: Omit<Photo, "id">[] = [];

export const seedContact: ContactInfo = {
  address: "",
  phone: "",
  email: "",
  openingHours: "",
};

export function withSeedIds<T>(items: T[], prefix: string): (T & { id: string })[] {
  return items.map((item, i) => ({ ...item, id: `${prefix}-${i}` }));
}
