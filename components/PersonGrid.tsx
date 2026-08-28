import Image from "next/image";

interface Person {
  id: string;
  name: string;
  photoUrl?: string;
  bio?: string;
}

export function PersonGrid({ people }: { people: Person[] }) {
  if (people.length === 0) {
    return <p className="text-slate-500">Zatím zde nejsou žádní lidé k zobrazení.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {people.map((person) => (
        <div key={person.id} className="text-center">
          <div className="relative aspect-square w-full overflow-hidden rounded-full bg-slate-100 mb-3">
            {person.photoUrl ? (
              <Image src={person.photoUrl} alt={person.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-3xl font-semibold text-slate-400">
                {person.name.charAt(0)}
              </div>
            )}
          </div>
          <p className="font-semibold">{person.name}</p>
          {person.bio && <p className="text-sm text-slate-600 mt-1">{person.bio}</p>}
        </div>
      ))}
    </div>
  );
}
