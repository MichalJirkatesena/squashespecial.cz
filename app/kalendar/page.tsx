import { getEvents } from "@/lib/content";

export const revalidate = 60;
export const metadata = { title: "Kalendář akcí | SquashEspecial" };

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
}

export default async function KalendarPage() {
  const events = await getEvents();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Kalendář akcí</h1>
      {events.length === 0 ? (
        <p className="text-slate-500">Momentálně nejsou naplánované žádné akce.</p>
      ) : (
        <ul className="divide-y divide-slate-200">
          {events.map((event) => (
            <li key={event.id} className="py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-lg">{event.title}</p>
                <p className="text-sm text-orange-600 font-medium">{formatDate(event.date)}</p>
              </div>
              {event.location && <p className="text-sm text-slate-500">{event.location}</p>}
              {event.description && <p className="text-slate-700 mt-1 whitespace-pre-line">{event.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
