import type { ReactNode } from "react";

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display font-extrabold uppercase text-2xl mb-6 flex items-center gap-3">
      <span className="block w-10 h-[3px] bg-glow" />
      {children}
    </h2>
  );
}
