import type { ReactNode } from "react";

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display font-extrabold uppercase text-2xl mb-6 flex items-center gap-3">
      <span className="block w-12 h-1 bg-glow shadow-[0_0_10px_var(--glow)]" />
      {children}
    </h2>
  );
}
