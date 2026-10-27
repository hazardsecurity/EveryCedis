import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "How it works",
  description: "Four steps from pen-and-paper to an audited, online shop: a free onsite visit, setup and stock loading, installation and staff training, then go live with monthly care.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  { t: "Free onsite visit", d: "A technician visits your shop, looks at your counter, power supply and stock, and asks how you sell today. You get a written quote.", you: "Show us around for about an hour.", bar: "bg-red" },
  { t: "Setup and stock loading", d: "We load your products, prices, barcodes and staff logins, and build your web shop if you're adding one.", you: "Send your price list (a photo of your book is fine).", bar: "bg-gold" },
  { t: "Install and train", d: "We install the hardware, test it on UPS, and train your cashiers and supervisor on the real system with your real products.", you: "Give your staff a morning with us.", bar: "bg-forest" },
  { t: "Go live, then monthly care", d: "We stay close for the first busy days, then look after hosting, backups, ads and your month-end report.", you: "Sell. Call us if anything isn't right.", bar: "bg-star" },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="How it works"
        colour="star"
        title="From the exercise book to an audited shop in four steps."
        lead="No long contracts to decode and no software to figure out on your own. We do the setup; you keep selling."
      >
        <ButtonLink href="/contact">Start with a free visit</ButtonLink>
      </PageHero>

      <Section labelledBy="steps-title">
        <h2 id="steps-title" className="sr-only">The four steps</h2>
        <ol className="relative space-y-6">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.t} className="grid gap-6 rounded-[24px] border border-line p-6 sm:p-10 md:grid-cols-[120px_minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
              <div className="flex items-center gap-3 md:block">
                <span className={`block h-2 w-12 rounded-full ${s.bar}`} />
                <span className="tnum font-display text-6xl font-bold leading-none tracking-[-0.04em] md:mt-4 md:block">{i + 1}</span>
              </div>
              <div>
                <h3 className="font-display text-3xl font-bold tracking-[-0.02em]">{s.t}</h3>
                <p className="mt-3 text-lg text-mute">{s.d}</p>
              </div>
              <div className="rounded-2xl bg-chalk p-5">
                <p className="text-sm font-semibold text-leaf">What you do</p>
                <p className="mt-1.5 font-medium">{s.you}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBanner />
    </>
  );
}
