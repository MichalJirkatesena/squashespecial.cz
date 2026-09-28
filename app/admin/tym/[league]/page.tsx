import Link from "next/link";
import { notFound } from "next/navigation";
import { DocEditor } from "@/components/admin/DocEditor";
import { CrudList } from "@/components/admin/CrudList";
import { isLeagueSlug, LEAGUES, type LeagueSlug } from "@/lib/leagues";
import { seedTeam1, seedTeam2, seedTeam3 } from "@/lib/seed-data";
import type { TextPageContent } from "@/lib/types";

const defaultsBySlug: Record<LeagueSlug, TextPageContent> = {
  "1-liga": seedTeam1,
  "2-liga": seedTeam2,
  "3-liga": seedTeam3,
};

export function generateStaticParams() {
  return LEAGUES.map((l) => ({ league: l.slug }));
}

export default async function AdminLeaguePage({ params }: { params: Promise<{ league: string }> }) {
  const { league } = await params;
  if (!isLeagueSlug(league)) notFound();

  const leagueLabel = LEAGUES.find((l) => l.slug === league)!.label;

  return (
    <div>
      <Link href="/admin/tym" className="text-sm text-orange-600 hover:underline">
        ← Zpět na týmy
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">{leagueLabel}</h1>

      <DocEditor
        path={`siteContent/${league}`}
        defaultValue={defaultsBySlug[league]}
        revalidatePaths={[`/tym/${league}`, "/tym"]}
        fields={[
          { key: "title", label: "Název ligy", type: "text" },
          { key: "body", label: "Informativní text", type: "textarea" },
        ]}
      />

      <h2 className="text-xl font-semibold mt-10 mb-4">Hráči</h2>
      <CrudList
        collectionName={`siteContent/${league}/players`}
        emptyItem={{ name: "Nový hráč", photoUrl: "", bio: "" }}
        revalidatePaths={[`/tym/${league}`]}
        fields={[
          { key: "name", label: "Jméno", type: "text" },
          { key: "photoUrl", label: "Fotka", type: "photo", folder: `tym-${league}` },
          { key: "bio", label: "Krátký profil", type: "textarea" },
        ]}
      />

      <h2 className="text-xl font-semibold mt-10 mb-4">Fotky</h2>
      <CrudList
        collectionName={`siteContent/${league}/photos`}
        emptyItem={{ url: "", caption: "" }}
        revalidatePaths={[`/tym/${league}`]}
        fields={[
          { key: "url", label: "Fotka", type: "photo", folder: `tym-${league}` },
          { key: "caption", label: "Popisek", type: "text" },
        ]}
      />
    </div>
  );
}
