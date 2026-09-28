import Image from "next/image";

interface Person {
  id: string;
  name: string;
  photoUrl?: string;
  nickname?: string;
  birthYear?: string;
  squashSince?: string;
  achievements?: string;
  bio?: string;
}

export function PersonGrid({ people }: { people: Person[] }) {
  if (people.length === 0) {
    return <p className="text-muted">Zatím zde nejsou žádní lidé k zobrazení.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
      {people.map((person) => (
        <div key={person.id} className="group">
          <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-surface border border-line group-hover:border-glow/60 transition-colors mb-3">
            {person.photoUrl ? (
              <Image src={person.photoUrl} alt={person.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center font-display font-black text-3xl text-muted">
                {person.name.charAt(0)}
              </div>
            )}
          </div>
          <p className="font-display font-bold uppercase tracking-wide text-lg">
            {person.name}
            {person.nickname && (
              <span className="text-muted normal-case font-body italic text-base"> „{person.nickname}“</span>
            )}
          </p>
          {(person.birthYear || person.squashSince) && (
            <p className="font-mono text-xs text-muted uppercase tracking-wide mt-1">
              {person.birthYear && <>Ročník {person.birthYear}</>}
              {person.birthYear && person.squashSince && " · "}
              {person.squashSince && <>Squash od {person.squashSince}</>}
            </p>
          )}
          {person.achievements && (
            <p className="text-sm text-glow mt-2 whitespace-pre-line">{person.achievements}</p>
          )}
          {person.bio && <p className="text-sm text-muted mt-2 whitespace-pre-line">{person.bio}</p>}
        </div>
      ))}
    </div>
  );
}
