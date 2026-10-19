import Image from "next/image";
import { getHome, getNews, getPlayers, getUpcomingEvents } from "@/lib/content";
import { NewsList } from "@/components/NewsList";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 60;

function formatBadge(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return { day: "?", month: "" };
  return {
    day: date.toLocaleDateString("cs-CZ", { day: "numeric" }),
    month: date.toLocaleDateString("cs-CZ", { month: "short" }).replace(".", ""),
  };
}

export default async function HomePage() {
  const [home, news, upcomingEvents, players] = await Promise.all([
    getHome(),
    getNews(3),
    getUpcomingEvents(3),
    getPlayers(),
  ]);

  const stats = [
    { value: home.stat1Value, label: home.stat1Label },
    { value: home.stat2Value, label: home.stat2Label },
    { value: home.stat3Value, label: home.stat3Label },
  ].filter((s) => s.value && s.label);

  const featuredPlayers = players.slice(0, 4);

  return (
    <div>
      <section className="relative w-full h-[52vh] min-h-[360px] sm:h-[64vh] overflow-hidden">
        {home.heroImageUrl ? (
          <Image src={home.heroImageUrl} alt={home.title} fill priority className="object-cover" />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg, #0f9d76 0%, #142520 100%)" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto px-4 pb-10 sm:pb-14 w-full">
            <span className="font-mono text-xs tracking-widest uppercase text-white/90 block mb-3">
              Squashový klub · Praha
            </span>
            <h1 className="font-display font-black uppercase text-white text-4xl sm:text-6xl leading-[0.95] mb-4 text-balance">
              {home.title}
            </h1>
            <p className="text-white/85 text-lg leading-relaxed max-w-2xl whitespace-pre-line">
              {home.intro}
            </p>
          </div>
        </div>
      </section>

      {stats.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div key={i} className="font-mono text-center border border-line rounded-sm px-6 py-8 bg-surface">
                <b className="block text-4xl text-glow tabular-nums mb-1">{stat.value}</b>
                <span className="text-sm text-muted uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 py-14 border-t border-line">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading>Aktuality</SectionHeading>
            <NewsList posts={news} />
          </div>

          <div>
            <SectionHeading>Nejbližší akce</SectionHeading>
            {upcomingEvents.length === 0 ? (
              <p className="text-muted">Momentálně nejsou naplánované žádné akce.</p>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((event) => {
                  const badge = formatBadge(event.date);
                  return (
                    <div
                      key={event.id}
                      className="flex gap-4 border border-line rounded-sm p-4 hover:border-glow/50 transition-colors"
                    >
                      <div className="font-mono text-center shrink-0 border-r border-line pr-4">
                        <b className="block text-2xl text-glow tabular-nums leading-none">{badge.day}</b>
                        <span className="text-xs text-muted uppercase">{badge.month}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-bold text-base mb-1 truncate">{event.title}</p>
                        {event.location && <p className="text-muted text-xs">{event.location}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 border-t border-line">
        <SectionHeading>Naši hráči</SectionHeading>
        {featuredPlayers.length === 0 ? (
          <p className="text-muted">Zatím zde nejsou žádní hráči k zobrazení.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {featuredPlayers.map((player) => (
              <div key={player.id} className="text-center group">
                <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-surface border border-line group-hover:border-glow/60 transition-colors mb-3">
                  {player.photoUrl ? (
                    <Image src={player.photoUrl} alt={player.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display font-black text-3xl text-muted">
                      {player.name.charAt(0)}
                    </div>
                  )}
                </div>
                <p className="font-display font-bold uppercase tracking-wide text-sm">{player.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {home.groupPhotoUrl && (
        <section className="max-w-6xl mx-auto px-4 py-14 border-t border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={home.groupPhotoUrl}
            alt="Tým SquashEspecial"
            className="w-full h-auto rounded-sm border border-line"
          />
        </section>
      )}
    </div>
  );
}
