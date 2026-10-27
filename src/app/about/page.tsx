import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Weave } from "@/components/brand/Weave";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: "Every₵edi is an Accra commerce-technology firm giving Ghanaian retailers complete business operating systems: hardware, software, e-commerce and monthly growth support.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  ["Hardware, software and service belong together.", "A till without support is a box. A website without stock sync is a liability. We deliver all of it and stay on."],
  ["Every pesewa should be accounted for.", "Shop owners shouldn't have to trust luck at month-end. The system should know."],
  ["Plain words, real numbers.", "We explain things the way you'd explain them to your shop manager. No jargon, no vanity charts."],
  ["Built for here.", "Dumsor, Mobile Money, delivery zones across Accra — designed for how Ghana trades, not adapted from somewhere else."],
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="About Every₵edi"
        colour="star"
        title="We protect every pesewa and account for every cedi."
        lead="Every₵edi is a retail enablement and commerce technology firm in Accra. We give growing shops a complete business operating system, from the counter to the customer's phone."
      />
      <Section labelledBy="why-title">
        <Heading id="why-title" title="Why Every₵edi?" lead="Too many Ghanaian merchants lose stock to unaudited counters, sell items online they no longer have, and lose whole afternoons to power cuts. We started Every₵edi to fix that with one partner instead of four." />
        <Reveal stagger className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {beliefs.map(([t, d]) => (
            <div key={t}>
              <h3 className="font-display text-2xl font-bold leading-tight">{t}</h3>
              <p className="mt-3 text-mute">{d}</p>
            </div>
          ))}
        </Reveal>
      </Section>
      <section aria-label="Brand colours" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <Weave className="h-6 rounded-full" />
          <p className="mt-4 pb-20 text-sm text-mute md:pb-28">
            Our colours come from the flag: red for the courage it takes to build a business, gold for what it earns, green for steady growth, and the Black Star for the trust that holds it together. Based in {site.city}.
          </p>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
