import Image from "next/image";

interface Person {
  id: string;
  name: string;
  photoUrl?: string;
  bio?: string;
}

export function PersonGrid({ people }: { people: Person[] }) {
  if (people.length === 0) {
    return <p className="text-muted">Zatím zde nejsou žádní lidé k zobrazení.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {people.map((person) => (
        <div key={person.id} className="text-center">
          <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-surface border border-line mb-3">
            {person.photoUrl ? (
              <Image src={person.photoUrl} alt={person.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center font-display font-black text-3xl text-muted">
                {person.name.charAt(0)}
              </div>
            )}
          </div>
          <p className="font-display font-bold uppercase tracking-wide">{person.name}</p>
          {person.bio && <p className="text-sm text-muted mt-1">{person.bio}</p>}
        </div>
      ))}
    </div>
  );
}
