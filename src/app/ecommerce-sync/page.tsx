import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SyncDemo } from "@/components/interactive/SyncDemo";

export const metadata: Metadata = {
  title: "E-commerce & live stock sync",
  description: "Mobile-first web shops linked to your till. Sell in the shop and the website updates instantly. MTN MoMo, Telecel Cash, AT Money and card checkout, with WhatsApp order alerts.",
  alternates: { canonical: "/ecommerce-sync" },
};

const pay = [
  { n: "MTN MoMo", c: "bg-gold text-star" },
  { n: "Telecel Cash", c: "bg-red text-white" },
  { n: "AT Money", c: "bg-star text-white dark:ring-1 dark:ring-white/20" },
  { n: "Visa", c: "bg-paper text-ink border border-line" },
  { n: "Mastercard", c: "bg-paper text-ink border border-line" },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Pillar 2 · Online"
        colour="gold"
        title="Your web shop knows what just sold at the counter."
        lead="A fast, mobile-first store for local buyers, with an instant automatic link between shop and website. Zero overselling, zero manual updates."
      >
        <ButtonLink href="/contact">Book a free demo</ButtonLink>
        <ButtonLink href="/pricing" variant="outline">Add a web shop to your estimate</ButtonLink>
      </PageHero>

      <Section labelledBy="sync-title">
        <Heading id="sync-title" title="Try it: one stock list, two ways to sell." lead="Sell a dress at the counter or order one online. Both sides read the same count, so the last one can only be sold once." />
        <Reveal className="mt-10"><SyncDemo /></Reveal>
      </Section>

      <Section tone="chalk" labelledBy="pay-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Heading id="pay-title" title="Checkout the way Ghana pays." lead="Direct checkout through Paystack, Hubtel or Flutterwave, with settlement for Mobile Money and cards straight to your account." />
            <Reveal stagger className="mt-8 flex flex-wrap gap-3">
              {pay.map((p) => (
                <span key={p.n} className={`rounded-full px-5 py-2.5 font-semibold ${p.c}`}>{p.n}</span>
              ))}
            </Reveal>
          </div>
          <Reveal className="rounded-[24px] bg-paper p-6 sm:p-8">
            <p className="font-semibold">Delivery fee, worked out at checkout</p>
            <table className="mt-4 w-full text-left">
              <caption className="sr-only">Example delivery zones</caption>
              <thead className="text-sm text-mute"><tr><th className="py-2 font-medium">Zone (example)</th><th className="py-2 text-right font-medium">Fee</th></tr></thead>
              <tbody className="tnum">
                {[["Osu, Labone, Cantonments", "GH₵ 25"], ["East Legon, Airport", "GH₵ 35"], ["Tema, Kasoa", "GH₵ 60"]].map(([z, f]) => (
                  <tr key={z} className="border-t border-line"><td className="py-3">{z}</td><td className="py-3 text-right font-semibold">{f}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-mute">You set your own zones and fees. Figures shown are examples.</p>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="alert-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-center">
          <Heading id="alert-title" title="Every order, straight to WhatsApp." lead="When a buyer checks out, the shop, the dispatcher and the buyer each get a WhatsApp message, SMS and email — so nobody has to keep refreshing a dashboard." />
          <Reveal stagger className="theme-light mx-auto w-full max-w-sm space-y-3 rounded-[28px] bg-[#e7e2d8] p-4 text-ink">
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#d9fdd3] p-3 text-[0.95rem] shadow-sm">
              <p className="font-semibold">New order #1042</p>
              <p>1 × Ankara wrap dress, size 12</p>
              <p className="tnum">GH₵ 380.00 · paid by MoMo</p>
              <p className="text-sm text-mute">Deliver to: East Legon</p>
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-paper p-3 text-[0.95rem] shadow-sm">
              <p>Dispatcher assigned. Rider leaves 2:30pm.</p>
            </div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#d9fdd3] p-3 text-[0.95rem] shadow-sm">
              <p>Stock updated: 2 left in shop and online.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBanner title="Open your shop online without opening a second stock book." />
    </>
  );
}
