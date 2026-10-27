import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Star } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "Case studies",
  description: "How Ìfẹ́mi in East Legon, Accra runs its counter and online shop from one stock list with Every₵edi.",
  alternates: { canonical: "/case-studies" },
};

const setup = [
  ["Counter", "Dual-screen till, 2D scanner, thermal printer, steel drawer"],
  ["Power", "Pure sine-wave UPS"],
  ["Online", "Live-synced web shop with MoMo and card checkout"],
  ["Monthly", "Hosting, nightly backups and month-end report"],
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Case study · East Legon, Accra"
        colour="red"
        title="Ìfẹ́mi: one stock list for the shop floor and the web shop."
        lead="A live Every₵edi implementation, from the counter to the cart on a customer's phone."
      />

      <Section labelledBy="setup-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Heading id="setup-title" title="What we installed" />
            <Reveal as="dl" className="mt-8 divide-y divide-line border-y border-line">
              {setup.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] gap-4 py-4">
                  <dt className="font-semibold">{k}</dt>
                  <dd className="text-mute">{v}</dd>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal className="rounded-[24px] border-2 border-dashed border-line p-8">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-leaf"><Star className="h-3.5 w-3.5" /> Coming soon</p>
            <h3 className="mt-3 font-display text-2xl font-bold">Results and a word from the owner</h3>
            <p className="mt-3 text-mute">
              We&apos;re gathering Ìfẹ́mi&apos;s before-and-after figures (shortages, stock accuracy, online orders) and a quote from the owner. We publish only numbers the shop has approved.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="chalk" labelledBy="next-title">
        <Heading id="next-title" title="Your shop could be next on this page." lead="Boutiques, supermarkets, pharmacies, beauty bars and wholesalers across Accra, Kumasi and Takoradi." />
      </Section>
      <div className="h-20 bg-chalk md:h-28" />
      <CtaBanner />
    </>
  );
}
