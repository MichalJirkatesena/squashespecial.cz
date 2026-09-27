import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getHome, getNews, getPlayers, getUpcomingEvents } from "@/lib/content";

export const revalidate = 60;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
}

function formatBadge(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return { day: "?", month: "" };
  return {
    day: date.toLocaleDateString("cs-CZ", { day: "numeric" }),
    month: date.toLocaleDateString("cs-CZ", { month: "short" }).replace(".", ""),
  };
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display font-extrabold uppercase text-2xl mb-6 flex items-center gap-3">
      <span className="block w-10 h-[3px] bg-glow" />
      {children}
    </h2>
  );
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
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 82% 15%, rgba(63,235,172,0.20), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(63,235,172,0.10), transparent 60%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-glow block mb-4">
              Squashový klub · Praha
            </span>
            <h1 className="font-display font-black uppercase text-4xl sm:text-6xl leading-[0.95] mb-5 text-balance">
              {home.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-xl whitespace-pre-line mb-8">
              {home.intro}
            </p>
            {stats.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {stats.map((stat, i) => (
                  <div key={i} className="font-mono border border-glow/30 rounded-sm px-4 py-3 min-w-[130px]">
                    <b className="block text-2xl text-glow tabular-nums">{stat.value}</b>
                    <span className="text-xs text-muted uppercase tracking-wide">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {home.heroImageUrl ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-glow/20">
              <Image src={home.heroImageUrl} alt={home.title} fill className="object-cover" />
            </div>
          ) : (
            <div
              className="relative aspect-[4/5] w-full rounded-sm border border-glow/20"
              style={{
                background: "linear-gradient(200deg, #172b25 0%, #0b0f10 70%)",
              }}
            />
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 border-t border-line">
        <SectionHeading>Nejbližší akce</SectionHeading>
        {upcomingEvents.length === 0 ? (
          <p className="text-muted">Momentálně nejsou naplánované žádné akce.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
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
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 border-t border-line">
        <div className="flex items-center justify-between mb-6">
          <SectionHeading>Naši hráči</SectionHeading>
          <Link href="/hraci" className="font-mono text-xs uppercase tracking-wide text-glow hover:underline">
            Všichni hráči →
          </Link>
        </div>
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

      <section className="max-w-6xl mx-auto px-4 py-14 border-t border-line">
        <SectionHeading>Aktuality</SectionHeading>
        {news.length === 0 ? (
          <p className="text-muted">Zatím tu nejsou žádné aktuality.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            {news.map((post) => (
              <article key={post.id} className="border border-line rounded-sm p-5 hover:border-glow/50 transition-colors">
                <span className="font-mono text-xs text-glow uppercase tracking-wide block mb-2">
                  {formatDate(post.date)}
                </span>
                <h3 className="font-display font-bold text-lg mb-2 text-balance">{post.title}</h3>
                <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{post.body}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
