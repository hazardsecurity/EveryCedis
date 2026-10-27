import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Star } from "@/components/brand/Logo";
import { DrawerArt, PrinterArt, ScannerArt, TerminalArt, UpsArt } from "@/components/sections/Illustrations";

export const metadata: Metadata = {
  title: "In-store POS & hardware kits",
  description: "Dual-screen touch tills, pure sine-wave UPS, 80mm thermal printers, 2D scanners and steel cash drawers, with cashier and owner permissions and audited shift closing.",
  alternates: { canonical: "/pos-hardware" },
};

const kit = [
  { Art: TerminalArt, name: '15.6" dual-screen touch terminal', text: "Cashier screen on one side, customer price display on the other. Customers see each item and the total as it's rung up." },
  { Art: UpsArt, name: "Heavy-duty pure sine-wave UPS", text: "Keeps the counter running through dumsor and cleans up the surge when the power returns." },
  { Art: PrinterArt, name: "80mm auto-cut thermal printer", text: "Fast, inkless receipts that cut themselves. No ribbons, no cartridges." },
  { Art: ScannerArt, name: "Hands-free 2D barcode scanner", text: "Reads 1D barcodes and QR codes from any angle, including off a phone screen." },
  { Art: DrawerArt, name: "Steel automatic cash drawer", text: "Opens only on a recorded sale. A microswitch logs every time it's opened." },
];

const roles = [
  { role: "Receptionist", can: ["Look up prices and stock", "Take bookings and enquiries"], cannot: ["Ring up sales", "See costs or margins"] },
  { role: "Sales attendant / cashier", can: ["Ring up sales, print receipts", "Take cash, MoMo, Telecel Cash, AT Money, card"], cannot: ["See buying prices or supplier costs", "Adjust stock or void a sale alone"] },
  { role: "Supervisor / owner", can: ["Full audit trail of every action", "Stock adjustments, reports, margins", "Approve refunds and voids"], cannot: [] },
];

const closing = [
  { t: "Open the shift", d: "The cashier counts the opening float. The system records the amount and who counted it." },
  { t: "Sell", d: "Every sale is tagged with the till, the cashier and the payment method. MoMo and card payments are matched automatically." },
  { t: "Count the drawer", d: "At close, the cashier counts the cash. The system already knows what should be there." },
  { t: "Sign off", d: "Any shortage is shown in cedis and pesewas. The supervisor signs off before the next shift opens." },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Pillar 1 · In-store"
        colour="red"
        title="A checkout counter that keeps its own books."
        lead="Turnkey tills built with industrial hardware and a sales and stock engine that knows who sold what, when, and for how much."
      >
        <ButtonLink href="/contact">Book a free onsite demo</ButtonLink>
        <ButtonLink href="/hardware" variant="outline">See the hardware up close</ButtonLink>
      </PageHero>

      <Section labelledBy="kit-title">
        <Heading id="kit-title" title="What comes in the kit" lead="Delivered, installed and tested at your counter. One number to call if anything goes wrong." />
        <Reveal stagger className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {kit.map(({ Art, name, text }) => (
            <div key={name} className="flex flex-col bg-white p-6">
              <Art className="mx-auto h-28 w-full max-w-[160px]" />
              <h3 className="mt-5 font-display text-lg font-bold leading-snug">{name}</h3>
              <p className="mt-2 text-[0.95rem] text-mute">{text}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="chalk" labelledBy="soft-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Heading
            id="soft-title"
            title="Software that counts the way you do."
            lead="Fast checkout for any payment, real-time low-stock alerts, barcode label printing for items that arrive without one, and margin tracking on every line."
          />
          <Reveal stagger className="grid gap-4 sm:grid-cols-2">
            {[
              ["Every way to pay", "Cash, MTN Mobile Money, Telecel Cash, AT Money and cards, on one screen."],
              ["Low-stock alerts", "Know before the shelf is empty, not after a customer asks."],
              ["Barcode labels", "Print your own labels for local goods and loose items."],
              ["Margin on every sale", "Owners see profit per item, per day and per staff member."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-white p-6">
                <h3 className="font-display text-lg font-bold">{t}</h3>
                <p className="mt-2 text-mute">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="roles-title">
        <Heading id="roles-title" title="Each person sees only what their job needs." lead="Permissions are set per staff login. The cashier's screen never shows what you paid your supplier." />
        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {roles.map((r, i) => (
            <div key={r.role} className={`rounded-[22px] p-6 ${i === 2 ? "bg-star text-white" : "border border-line"}`}>
              <h3 className="font-display text-xl font-bold">{r.role}</h3>
              <ul className="mt-5 space-y-2.5">
                {r.can.map((c) => (
                  <li key={c} className="flex gap-2.5"><Star className={`mt-1.5 h-3 w-3 shrink-0 ${i === 2 ? "text-gold" : "text-forest"}`} />{c}</li>
                ))}
                {r.cannot.map((c) => (
                  <li key={c} className={`flex gap-2.5 ${i === 2 ? "text-white/60" : "text-mute"}`}>
                    <span aria-hidden="true" className="mt-0.5 font-bold text-red">×</span><span><span className="sr-only">Cannot: </span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="canopy" labelledBy="close-title">
        <Heading dark id="close-title" kicker="Daily register closing" title="Zero shortages is a routine, not a hope." />
        <Reveal stagger as="ol" className="mt-12 grid gap-px overflow-hidden rounded-[22px] bg-white/15 md:grid-cols-4">
          {closing.map((c, i) => (
            <li key={c.t} className="bg-canopy p-6">
              <span className="tnum font-display text-4xl font-bold text-gold">{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-bold">{c.t}</h3>
              <p className="mt-2 text-white/75">{c.d}</p>
            </li>
          ))}
        </Reveal>
        <p className="mt-8 text-white/70">
          Want the website to sell the same stock? <Link href="/ecommerce-sync" className="font-semibold text-gold underline underline-offset-4">See live stock sync</Link>
        </p>
      </Section>

      <div className="h-20 bg-white md:h-28" />
      <CtaBanner />
    </>
  );
}
