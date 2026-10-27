type MarkProps = { className?: string; title?: string };

/**
 * The ₵ mark: an open "C" woven from the three flag colours,
 * crossed by one straight stroke (the audited line) in ink.
 */
export function Mark({ className, title }: MarkProps) {
  return (
    <svg viewBox="5 3 33 42" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      {/* arc: centre 24,24 r15, opening on the right between -48° and 48° */}
      <path d="M34.04 12.85 A15 15 0 0 0 9.5 20.1" fill="none" stroke="#CE1126" strokeWidth="7" strokeLinecap="butt" />
      <path d="M9.5 20.1 A15 15 0 0 0 13.4 34.6" fill="none" stroke="#FCD116" strokeWidth="7" strokeLinecap="butt" />
      <path d="M13.4 34.6 A15 15 0 0 0 34.04 35.15" fill="none" stroke="#006B3F" strokeWidth="7" strokeLinecap="butt" />
      <rect x="21.75" y="3.5" width="4.5" height="41" rx="1" fill="currentColor" />
    </svg>
  );
}

type LogoProps = { className?: string; markClassName?: string; tone?: "ink" | "light" };

/** Wordmark: "Every₵edi" — the ₵ is always the mark, never a typed letter. */
export function Logo({ className = "", markClassName = "h-[0.84em] w-[0.66em]", tone = "ink" }: LogoProps) {
  const ink = tone === "ink" ? "text-star" : "text-white";
  return (
    <span className={`inline-flex items-center gap-2 font-display text-[1.35rem] font-bold leading-none tracking-[-0.02em] ${ink} ${className}`}>
      <span aria-hidden="true" className="whitespace-nowrap">
        Every
        <Mark className={`${markClassName} ml-[0.05em] mr-[0.02em] inline-block translate-y-[0.06em] align-baseline`} />
        edi
      </span>
      <span className="sr-only">Every₵edi</span>
    </span>
  );
}

/** The Black Star seal, used to mark things that are audited / verified. */
export function Star({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1.8l2.9 7.1 7.6.5-5.9 4.9 1.9 7.4L12 17.6l-6.5 4.1 1.9-7.4-5.9-4.9 7.6-.5z"
        fill="currentColor"
      />
    </svg>
  );
}
