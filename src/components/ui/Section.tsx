import type { ReactNode } from "react";

type Tone = "white" | "chalk" | "canopy" | "star";
const tones: Record<Tone, string> = {
  white: "bg-white text-star on-light",
  chalk: "bg-chalk text-star on-light",
  canopy: "bg-canopy text-white",
  star: "bg-star text-white",
};

export function Section({
  tone = "white",
  className = "",
  children,
  id,
  labelledBy,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto w-full max-w-[1240px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">{children}</div>
    </section>
  );
}

/** Section heading: no eyebrow by default; a kicker only when it carries real information. */
export function Heading({
  id,
  kicker,
  title,
  lead,
  className = "",
  dark = false,
}: {
  id?: string;
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {kicker ? (
        <p className={`mb-4 text-sm font-semibold ${dark ? "text-gold" : "text-forest"}`}>{kicker}</p>
      ) : null}
      <h2 id={id} className="font-display text-[2.1rem] font-bold leading-[1.05] tracking-[-0.025em] text-balance sm:text-5xl">
        {title}
      </h2>
      {lead ? <p className={`mt-5 text-lg text-pretty ${dark ? "text-white/75" : "text-mute"}`}>{lead}</p> : null}
    </div>
  );
}
