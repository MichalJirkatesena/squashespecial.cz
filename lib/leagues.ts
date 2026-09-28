export const LEAGUES = [
  { slug: "1-liga", label: "1. liga" },
  { slug: "2-liga", label: "2. liga" },
  { slug: "3-liga", label: "3. liga" },
] as const;

export type LeagueSlug = (typeof LEAGUES)[number]["slug"];

export function isLeagueSlug(value: string): value is LeagueSlug {
  return LEAGUES.some((l) => l.slug === value);
}
