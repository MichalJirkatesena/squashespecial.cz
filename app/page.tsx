import Image from "next/image";
import { getHome, getNews } from "@/lib/content";

export const revalidate = 60;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
}

export default async function HomePage() {
  const [home, news] = await Promise.all([getHome(), getNews(3)]);

  const stats = [
    { value: home.stat1Value, label: home.stat1Label },
    { value: home.stat2Value, label: home.stat2Label },
    { value: home.stat3Value, label: home.stat3Label },
  ].filter((s) => s.value && s.label);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 82% 15%, rgba(63,235,172,0.14), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(255,68,51,0.10), transparent 60%)",
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
                  <div key={i} className="font-mono border border-line rounded-sm px-4 py-3 min-w-[130px]">
                    <b className="block text-2xl text-glow tabular-nums">{stat.value}</b>
                    <span className="text-xs text-muted uppercase tracking-wide">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {home.heroImageUrl ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
              <Image src={home.heroImageUrl} alt={home.title} fill className="object-cover" />
            </div>
          ) : (
            <div
              className="relative aspect-[4/5] w-full rounded-sm border border-line"
              style={{
                background: "linear-gradient(200deg, #17211f 0%, #0b0f10 70%)",
              }}
            />
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 border-t border-line">
        <h2 className="font-display font-extrabold uppercase text-2xl mb-6">Aktuality</h2>
        {news.length === 0 ? (
          <p className="text-muted">Zatím tu nejsou žádné aktuality.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            {news.map((post) => (
              <article key={post.id} className="border border-line rounded-sm p-5">
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
