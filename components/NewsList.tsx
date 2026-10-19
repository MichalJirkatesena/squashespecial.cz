import type { NewsPost } from "@/lib/types";
import { newsCategoryLabel } from "@/lib/newsCategories";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
}

export function NewsList({ posts }: { posts: NewsPost[] }) {
  if (posts.length === 0) {
    return <p className="text-muted">Zatím tu nejsou žádné aktuality.</p>;
  }

  return (
    <div className="space-y-5">
      {posts.map((post) => {
        const categoryLabel = newsCategoryLabel(post.category);
        return (
          <article key={post.id} className="border border-line rounded-sm p-5 hover:border-glow/50 transition-colors">
            <span className="font-mono text-xs text-glow uppercase tracking-wide block mb-2">
              {formatDate(post.date)}
            </span>
            <h3 className="font-display font-bold text-lg text-balance">{post.title}</h3>
            {categoryLabel && (
              <span className="inline-block font-mono text-[0.68rem] uppercase tracking-wide text-muted border border-line rounded-sm px-2 py-0.5 mt-1 mb-2">
                {categoryLabel}
              </span>
            )}
            <p className="text-muted text-sm leading-relaxed whitespace-pre-line mt-2">{post.body}</p>
          </article>
        );
      })}
    </div>
  );
}
