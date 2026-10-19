export const NEWS_CATEGORIES = [
  { slug: "junior", label: "Junioři" },
  { slug: "1-liga", label: "1. liga" },
  { slug: "2-liga", label: "2. liga" },
  { slug: "3-liga", label: "3. liga" },
] as const;

export type NewsCategorySlug = (typeof NEWS_CATEGORIES)[number]["slug"];

export function newsCategoryLabel(slug: string | undefined): string | undefined {
  return NEWS_CATEGORIES.find((c) => c.slug === slug)?.label;
}
