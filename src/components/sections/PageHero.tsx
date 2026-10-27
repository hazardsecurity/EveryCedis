import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

const bars: Record<string, string> = { red: "bg-red", gold: "bg-gold", green: "bg-forest", star: "bg-star" };

export function PageHero({
  kicker,
  title,
  lead,
  colour = "green",
  children,
}: {
  kicker: string;
  title: ReactNode;
  lead: ReactNode;
  colour?: "red" | "gold" | "green" | "star";
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-white">
      <Reveal immediate stagger className="mx-auto max-w-[1240px] px-4 pb-16 pt-14 sm:px-6 md:pb-20 md:pt-20 lg:px-8">
        <p className="inline-flex items-center gap-2.5 text-sm font-semibold text-star">
          <span className={`h-3 w-3 rounded-[3px] ${bars[colour]}`} />
          {kicker}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.4rem]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-mute text-pretty sm:text-xl">{lead}</p>
        {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
      </Reveal>
    </section>
  );
}
