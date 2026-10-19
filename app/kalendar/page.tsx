import type { CalendarEvent } from "@/lib/types";
import { getEvents } from "@/lib/content";

export const revalidate = 60;
export const metadata = { title: "Kalendář akcí | SquashEspecial" };

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
}

function EventList({ events, emptyText }: { events: CalendarEvent[]; emptyText: string }) {
  if (events.length === 0) {
    return <p className="text-muted">{emptyText}</p>;
  }
  return (
    <ul className="divide-y divide-line">
      {events.map((event) => (
        <li key={event.id} className="py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-display font-bold text-lg">{event.title}</p>
            <p className="text-sm text-glow font-mono uppercase tracking-wide">{formatDate(event.date)}</p>
          </div>
          {event.location && <p className="text-sm text-muted">{event.location}</p>}
          {event.description && <p className="text-muted mt-1 whitespace-pre-line">{event.description}</p>}
        </li>
      ))}
    </ul>
  );
}

export default async function KalendarPage() {
  const events = await getEvents();
  const todayIso = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= todayIso);
  const past = events.filter((e) => e.date < todayIso).reverse();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display font-black uppercase text-4xl mb-8">Kalendář akcí</h1>

      <h2 className="font-display font-bold uppercase text-xl mb-4">Budoucí akce</h2>
      <EventList events={upcoming} emptyText="Momentálně nejsou naplánované žádné akce." />

      <h2 className="font-display font-bold uppercase text-xl mb-4 mt-12">Proběhlé akce</h2>
      <EventList events={past} emptyText="Zatím zde nejsou žádné proběhlé akce." />
    </div>
  );
}
