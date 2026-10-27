"use client";

import { useReveal } from "@/components/ui/Reveal";

/**
 * The Ledger Weave — a band of flag-coloured blocks set out like a kente strip
 * and ruled like a ledger. It draws in once from the left.
 */
const blocks = [
  ["#CE1126", 6], ["#0E0E0C", 2], ["#FCD116", 4], ["#006B3F", 7], ["#FCD116", 2],
  ["#0E0E0C", 5], ["#CE1126", 3], ["#FCD116", 6], ["#006B3F", 3], ["#0E0E0C", 2],
  ["#CE1126", 8], ["#FCD116", 3], ["#006B3F", 5], ["#0E0E0C", 3], ["#FCD116", 5],
] as const;

export function Weave({ className = "h-2", static: isStatic = false }: { className?: string; static?: boolean }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const total = blocks.reduce((s, [, w]) => s + w, 0);
  return (
    // observe an unclipped wrapper: Chrome counts the clip-path, so the band itself reads as 0% visible
    <div ref={ref} aria-hidden="true" className={`w-full overflow-hidden ${className}`}>
    <div data-visible={isStatic || visible ? "" : undefined} className="weave flex h-full w-full">
      {Array.from({ length: 3 }).flatMap((_, r) =>
        blocks.map(([c, w], i) => (
          <span key={`${r}-${i}`} style={{ background: c, flexGrow: w, flexBasis: `${(w / total) * 33.3}%` }} className="relative">
            {i % 3 === 0 ? <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/35" /> : null}
          </span>
        )),
      )}
    </div>
    </div>
  );
}
