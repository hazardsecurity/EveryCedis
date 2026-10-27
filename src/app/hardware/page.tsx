import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { DumsorDemo } from "@/components/interactive/DumsorDemo";
import { DrawerArt, PrinterArt, ScannerArt, TerminalArt, UpsArt } from "@/components/sections/Illustrations";

export const metadata: Metadata = {
  title: "Hardware showcase",
  description: "Dual-screen terminals, pure sine-wave UPS backup, 80mm thermal printers, omnidirectional 2D scanners and steel cash drawers — dumsor-ready retail hardware.",
  alternates: { canonical: "/hardware" },
};

const pieces = [
  { Art: TerminalArt, name: '15.6" dual-screen touch terminal', bar: "bg-red", specs: [["Cashier screen", '15.6" touch'], ["Customer display", "Facing the buyer: items, total, your promos"], ["Use", "All-day retail checkout"]] },
  { Art: UpsArt, name: "Pure sine-wave UPS", bar: "bg-gold", specs: [["Output", "Pure sine wave, same as mains"], ["Protects", "Terminal, printer, scanner, drawer"], ["Why", "Survives dumsor and the surge after"]] },
  { Art: PrinterArt, name: "80mm thermal receipt printer", bar: "bg-forest", specs: [["Paper", "80mm thermal roll"], ["Ink", "None needed"], ["Cutter", "Automatic"]] },
  { Art: ScannerArt, name: "Omnidirectional 2D scanner", bar: "bg-red", specs: [["Reads", "1D barcodes and QR codes"], ["Mode", "Hands-free, any angle"], ["Also reads", "Codes on phone screens"]] },
  { Art: DrawerArt, name: "Steel automatic cash drawer", bar: "bg-gold", specs: [["Build", "Heavy-duty steel"], ["Opens", "Only on a recorded sale (RJ11)"], ["Sensor", "Microswitch logs every opening"]] },
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Hardware showcase"
        colour="gold"
        title="Built for long days, hot counters and dumsor."
        lead="Every piece is chosen for Ghanaian shop conditions: heat, dust, queues and a power supply you can't count on."
      >
        <ButtonLink href="/pricing">Price a kit for your shop</ButtonLink>
      </PageHero>

      <Section labelledBy="power-title">
        <Heading id="power-title" title="Why an ordinary office UPS isn't enough." lead="Office units are made to give a computer a few minutes to shut down. A shop needs to keep selling." />
        <Reveal className="mt-10">
          <DumsorDemo />
        </Reveal>
      </Section>

      <Section tone="chalk" labelledBy="pieces-title">
        <Heading id="pieces-title" title="The five pieces on your counter" />
        <div className="mt-12 space-y-5">
          {pieces.map(({ Art, ...p }, i) => (
            <Reveal key={p.name} className={`grid items-center gap-6 overflow-hidden rounded-[24px] bg-white md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative flex aspect-[4/3] items-center justify-center bg-chalk p-10 md:aspect-auto md:h-full md:min-h-[280px]">
                <span className={`absolute left-0 top-0 h-full w-2 ${p.bar}`} />
                <Art className="h-full max-h-[220px] w-full" />
              </div>
              <div className="p-6 md:p-10">
                <h3 className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{p.name}</h3>
                <dl className="mt-6 divide-y divide-line border-y border-line">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 py-3">
                      <dt className="text-mute">{k}</dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-mute">Exact models and brands are confirmed in your written quote, based on stock available in Accra.</p>
      </Section>

      <div className="h-20 bg-white md:h-28" />
      <CtaBanner title="See the kit working in your own shop." />
    </>
  );
}
