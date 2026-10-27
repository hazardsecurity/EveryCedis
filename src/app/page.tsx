import Link from "next/link";
import { HeroCounter } from "@/components/home/HeroCounter";
import { Marquee } from "@/components/home/Marquee";
import { RoleSpotlight } from "@/components/home/RoleSpotlight";
import { Star } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Heading, Section } from "@/components/ui/Section";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PhoneShopArt, ReportArt, TerminalArt } from "@/components/sections/Illustrations";

const pillars = [
  {
    href: "/pos-hardware",
    bar: "bg-red",
    title: "Smart POS terminals & heavy-duty hardware",
    body: "Dual-screen tills, pure sine-wave UPS, 80mm receipt printer, 2D scanner and steel cash drawer — installed, set up and tested in your shop.",
    points: ["Cash, MoMo, Telecel Cash, AT Money, card", "Cashier and owner permissions", "End-of-shift register closing"],
    Art: TerminalArt,
  },
  {
    href: "/ecommerce-sync",
    bar: "bg-gold",
    title: "Live-synced e-commerce stores",
    body: "A fast, mobile-first web shop with an instant automatic link to your till. Sell a blouse at the counter and the website knows straight away.",
    points: ["Zero overselling", "Paystack, Hubtel or Flutterwave checkout", "WhatsApp and SMS order alerts"],
    Art: PhoneShopArt,
  },
  {
    href: "/managed-services",
    bar: "bg-forest",
    title: "Managed cloud, daily backups & Google Ads",
    body: "A secure online server that stays up, backups every night, local Google Ads that bring buyers in, and a clear report at the end of every month.",
    points: ["Nightly database backups", "Search and local ads managed", "Month-end margin and stock report"],
    Art: ReportArt,
  },
];

const problems = [
  { tag: "Stock leakage", text: "Every sale, refund and stock change is tied to a named staff member and shift. Missing items show up the same day, not at month-end." },
  { tag: "Double selling", text: "Your shop and website read the same stock count. When it's gone at the counter, it's gone online." },
  { tag: "Dumsor & surges", text: "A pure sine-wave UPS keeps the till, printer and drawer running through the outage — and protects them from the surge after." },
  { tag: "No clear numbers", text: "Gross margin, best sellers and dead stock, in plain cedis, every month." },
];

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-paper">
        <div className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6 md:pt-20 lg:px-8">
          <Reveal immediate stagger className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end">
            <h1 className="font-display text-[2.75rem] font-bold leading-[0.98] tracking-[-0.035em] text-balance sm:text-[4.2rem] lg:text-[5.1rem]">
              Run your shop, sell online, and account for every cedi.
            </h1>
            <div className="lg:pb-3">
              <p className="text-lg text-mute text-pretty sm:text-xl">
                We equip growing Ghanaian businesses with modern touchscreen POS machines, heavy-duty UPS battery backups, automated stock tracking and synchronised e-commerce websites.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/contact">Book a free onsite demo</ButtonLink>
                <ButtonLink href="/pricing" variant="outline">Calculate your setup cost</ButtonLink>
              </div>
            </div>
          </Reveal>
          <Reveal immediate className="mt-12 md:mt-16">
            <HeroCounter />
          </Reveal>
        </div>

        {/* ---------- Credibility ticker ---------- */}
        <div className="mt-14 border-y border-star bg-gold text-star md:mt-20">
          <Marquee className="py-4">
            {[
              "Built for Ghanaian retail",
              "100% dumsor-ready hardware",
              "Supermarkets",
              "Direct MoMo settlement",
              "Boutiques",
              "Zero inventory overselling",
              "Beauty bars",
              "Pharmacies",
              "Wholesale stores",
            ].map((t) => (
              <span key={t} className="flex items-center gap-6 pr-6 font-display text-lg font-bold whitespace-nowrap sm:text-xl">
                {t}
                <Star className="h-4 w-4" />
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ---------- Three pillars ---------- */}
      <Section labelledBy="pillars-title">
        <Heading
          id="pillars-title"
          title="One partner for the till, the website and the month-end numbers."
          lead="Most agencies build a pretty website or drop off a cash box and disappear. We put in the hardware, connect it to your online shop, and stay on to run it with you."
        />
        <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map(({ Art, ...p }) => (
            <Link
              key={p.href}
              href={p.href}
              className="press focus-dark group flex flex-col overflow-hidden rounded-[22px] border border-line bg-paper hover:border-ink"
            >
              <span className={`h-2 ${p.bar}`} />
              <div className="flex aspect-[6/4] items-center justify-center bg-tile px-8">
                <Art className="h-full w-full max-w-[240px] transition-transform duration-300 ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:-translate-y-1" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 text-mute">{p.body}</p>
                <ul className="mt-5 space-y-2 text-[0.95rem]">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5"><Star className="mt-1.5 h-3 w-3 shrink-0" />{pt}</li>
                  ))}
                </ul>
                <span className="mt-auto pt-6 font-semibold underline decoration-line decoration-2 underline-offset-4 group-hover:decoration-gold">
                  See how it works
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </Section>

      {/* ---------- Role-based control ---------- */}
      <Section tone="canopy" labelledBy="roles-title">
        <Heading
          dark
          id="roles-title"
          kicker="Role-based control"
          title="Your cashier sees the price. You see the profit."
          lead="Sales staff can only ring up sales and print receipts. Buying prices, margins and supplier costs stay hidden. The owner sees everything — shift reports, net margin and stock value — on their phone."
        />
        <Reveal className="mt-12">
          <RoleSpotlight />
        </Reveal>
      </Section>

      {/* ---------- Where the money goes missing ---------- */}
      <Section labelledBy="leak-title">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
          <div>
            <Heading
              id="leak-title"
              title="Find out where the money goes missing — on the same day."
              lead="Automatic stock tracking compares what the system says against what is on the shelf and in the drawer, shift by shift."
            />
            <Reveal stagger className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {problems.map((p) => (
                <div key={p.tag} className="border-t-2 border-ink pt-4">
                  <h3 className="font-display text-xl font-bold">{p.tag}</h3>
                  <p className="mt-2 text-mute">{p.text}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal className="mx-auto w-full max-w-[380px] lg:sticky lg:top-28">
            <ShiftReceipt />
          </Reveal>
        </div>
      </Section>

      {/* ---------- Showcase preview ---------- */}
      <Section tone="chalk" labelledBy="show-title">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
          <Reveal className="relative aspect-[5/4] overflow-hidden rounded-[24px] bg-star">
            <div className="absolute inset-0 grid grid-cols-6 opacity-90">
              {["#CE1126", "#FCD116", "#006B3F", "#0E0E0C", "#FCD116", "#CE1126"].map((c, i) => (
                <span key={i} style={{ background: c }} />
              ))}
            </div>
            <div className="absolute inset-6 flex flex-col justify-end rounded-2xl bg-paper p-6 sm:inset-10">
              <p className="text-sm font-semibold text-leaf">Live setup · East Legon, Accra</p>
              <p className="mt-2 font-display text-5xl font-bold tracking-[-0.03em]">Ìfẹ́mi</p>
              <p className="mt-3 text-mute">Shop photography to come — we&apos;ll add real pictures of the counter and storefront here.</p>
            </div>
          </Reveal>
          <div>
            <Heading
              id="show-title"
              kicker="Case study"
              title="Ìfẹ́mi runs its counter and its web shop from one stock list."
              lead="A full Every₵edi setup in East Legon: dual-screen till, UPS backup, live-synced online store and monthly care."
            />
            <div className="mt-8">
              <ButtonLink href="/case-studies" variant="ink">Read the Ìfẹ́mi story</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <div className="h-20 bg-paper md:h-28" />
      <CtaBanner />
    </>
  );
}

function ShiftReceipt() {
  const lines = [
    ["Opening float", "500.00"],
    ["Cash sales", "3,715.00"],
    ["Expected in drawer", "4,215.00"],
    ["Counted by Ama", "4,215.00"],
  ];
  return (
    <figure className="rotate-[1.2deg]">
      <div className="theme-light receipt-edge bg-paper px-6 pb-10 pt-7 font-mono text-[13px] leading-7 shadow-[0_30px_50px_-30px_rgba(14,14,12,0.45)] ring-1 ring-line">
        <p className="text-center font-bold">SHIFT CLOSE · TILL 2</p>
        <p className="text-center text-mute">Sat 14:00 – 21:00 · Example</p>
        <p className="my-2 border-b border-dashed border-ink/40" />
        {lines.map(([k, v]) => (
          <p key={k} className="flex justify-between"><span>{k}</span><span className="tnum">{v}</span></p>
        ))}
        <p className="mt-1 flex justify-between border-t border-dashed border-ink/40 pt-1 font-bold">
          <span>Shortage</span><span className="tnum">0.00</span>
        </p>
        <p className="my-2 border-b border-dashed border-ink/40" />
        <p className="flex justify-between"><span>MoMo (settled)</span><span className="tnum">2,140.00</span></p>
        <p className="flex justify-between"><span>Card</span><span className="tnum">860.00</span></p>
        <p className="flex justify-between text-alert"><span>Stock check: Shea 250g</span><span className="tnum">−1</span></p>
        <p className="mt-4 flex items-center justify-center gap-2 rounded-md bg-gold py-1.5 font-bold text-star">
          <Star className="h-3.5 w-3.5" /> Supervisor signed off
        </p>
      </div>
      <figcaption className="mt-5 text-center text-sm text-mute">Example end-of-shift report. A one-item stock gap is flagged before the next shift opens.</figcaption>
    </figure>
  );
}
