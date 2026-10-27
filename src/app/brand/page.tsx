import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logo, Mark, Star } from "@/components/brand/Logo";
import { Weave } from "@/components/brand/Weave";
import { Reveal } from "@/components/ui/Reveal";
import { BrandMotionDemo } from "@/components/interactive/BrandMotionDemo";
import { PrinterArt, ScannerArt, TerminalArt, UpsArt } from "@/components/sections/Illustrations";

export const metadata: Metadata =
  process.env.NODE_ENV === "production"
    ? { robots: { index: false, follow: false } }
    : {
      title: "Brand guidelines",
      description: "The Every₵edi brand: the ₵ mark, the Ghana flag palette, typography, the Ledger Weave, the Black Star seal, motion and voice.",
      robots: { index: false, follow: false },
      };

const colours = [
  { name: "Liberty Red", hex: "#CE1126", rgb: "206 17 38", role: "Urgency and loss: shortages, sold out, errors. Small doses.", fg: "text-white", bg: "bg-red", share: "3%" },
  { name: "Gold Coast", hex: "#FCD116", rgb: "252 209 22", role: "The call to act: primary buttons, highlights, the seal. Never as text on white.", fg: "text-star", bg: "bg-gold", share: "7%" },
  { name: "Forest", hex: "#006B3F", rgb: "0 107 63", role: "Money that's accounted for: paid, settled, margins, success.", fg: "text-white", bg: "bg-forest", share: "6%" },
  { name: "Canopy", hex: "#00331E", rgb: "0 51 30", role: "Deep surface for feature sections. Pairs with gold.", fg: "text-white", bg: "bg-canopy", share: "8%" },
  { name: "Black Star", hex: "#0E0E0C", rgb: "14 14 12", role: "Text, ink outlines, the footer, the mark's audited stroke.", fg: "text-white", bg: "bg-star", share: "16%" },
  { name: "Chalk", hex: "#F3F3EE", rgb: "243 243 238", role: "Quiet surface behind illustrations and alternating sections.", fg: "text-ink theme-light", bg: "bg-chalk", share: "—" },
];

const contrast = [
  ["Black Star on white", "19.4 : 1", "AAA", "All text"],
  ["Forest on white", "6.9 : 1", "AA", "Text, links, success"],
  ["Liberty Red on white", "5.9 : 1", "AA", "Text 16px+, errors"],
  ["White on Forest", "6.9 : 1", "AA", "Text"],
  ["Gold on Canopy", "9.6 : 1", "AAA", "Text on dark green"],
  ["Black Star on Gold", "14.1 : 1", "AAA", "Gold buttons"],
  ["Gold on white", "1.4 : 1", "Fail", "Never text — fills only"],
];

const darkTokens = [
  { role: "Page", light: "#FFFFFF", dark: "#0C110E", note: "Near-black with a forest tint — never flat grey" },
  { role: "Surface", light: "#F3F3EE", dark: "#151C18", note: "Cards, inputs, alternating sections" },
  { role: "Text", light: "#0E0E0C", dark: "#EEF0EA", note: "16.6 : 1 on the dark page" },
  { role: "Muted text", light: "#5B5C55", dark: "#A3ADA6", note: "8.2 : 1" },
  { role: "Lines", light: "#DEDFD6", dark: "#29332D", note: "Borders and dividers" },
  { role: "Money / success", light: "#006B3F", dark: "#3DBE7E", note: "Forest, lifted to stay readable (8.0 : 1)" },
  { role: "Loss / error", light: "#CE1126", dark: "#FF5A6B", note: "Liberty Red, lifted for text (6.3 : 1)" },
];

const voice = [
  ["API endpoints", "An instant automatic link between shop and website"],
  ["Fault-tolerant cloud VPS infrastructure", "A secure online server that never goes offline"],
  ["Inventory reconciliation module", "End-of-shift count: what should be there vs what is"],
  ["Unleash seamless omnichannel growth", "Sell in the shop and online from one stock list"],
  ["User permissions matrix", "Your cashier sees the price. You see the profit."],
];

const vocabulary = ["Every₵edi", "gross margins", "audited register", "pure sine-wave UPS", "live stock sync", "zero shortages", "Mobile Money", "business peace of mind"];

const toc = [
  ["essence", "Essence"],
  ["logo", "Logo"],
  ["colour", "Colour"],
  ["dark", "Dark mode"],
  ["type", "Typography"],
  ["devices", "Weave & Star"],
  ["illustration", "Illustration"],
  ["motion", "Motion"],
  ["voice", "Voice"],
  ["apply", "Applications"],
];

function H({ id, n, title, lead }: { id: string; n: string; title: string; lead?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="tnum text-sm font-semibold text-mute">{n}</p>
      <h2 id={id} className="mt-2 font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">{title}</h2>
      {lead ? <p className="mt-4 text-lg text-mute">{lead}</p> : null}
    </div>
  );
}

/* Internal reference: viewable on `npm run dev` only; the live site returns 404. */
export default function BrandPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <>
      {/* ---------- Cover ---------- */}
      <section className="relative overflow-hidden bg-star text-white">
        <div className="mx-auto max-w-[1240px] px-4 pb-16 pt-16 sm:px-6 md:pb-24 md:pt-24 lg:px-8">
          <Reveal immediate stagger>
            <p className="text-sm font-semibold text-gold">Brand guidelines · Version 1.0 · 2026</p>
            <h1 className="mt-8">
              <Logo tone="light" className="!text-[3.4rem] sm:!text-[6rem] lg:!text-[8.5rem]" />
            </h1>
            <p className="mt-8 max-w-2xl text-xl text-white/75">
              A brand made from the flag of Ghana and the paper trail of a well-run shop. How to use the mark, the colours, the type and the voice so every touchpoint feels like it accounts for every cedi.
            </p>
          </Reveal>
        </div>
        <Weave className="h-4" />
      </section>

      {/* ---------- TOC ---------- */}
      <nav aria-label="Guideline sections" className="sticky top-[68px] z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto max-w-[1240px] overflow-x-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex w-max gap-1 py-2.5">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="press focus-dark inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium text-ink/75 hover:bg-chalk hover:text-ink">{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mx-auto max-w-[1240px] space-y-28 px-4 py-20 sm:px-6 md:space-y-36 md:py-28 lg:px-8">
        {/* ---------- 01 Essence ---------- */}
        <section aria-labelledby="essence" className="scroll-mt-36">
          <H id="essence" n="01" title="Essence" />
          <Reveal className="mt-10 rounded-[28px] bg-canopy p-8 text-white sm:p-14">
            <p className="text-sm font-semibold text-gold">The promise</p>
            <p className="mt-4 max-w-4xl font-display text-3xl font-bold leading-[1.15] tracking-[-0.02em] sm:text-[2.8rem]">
              “We protect every pesewa and account for every cedi. From the counter in your physical shop to the shopping cart on your customer&apos;s phone.”
            </p>
          </Reveal>
          <Reveal stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Protective", "We stand between the merchant and loss: theft, overselling, outages, guesswork."],
              ["Practical", "Every feature is explained by what it does at the counter today."],
              ["Precise", "Numbers are exact, aligned and never decorative. Pesewas matter."],
              ["Proudly Ghanaian", "Built for dumsor, MoMo and Makola-to-East-Legon trade — not adapted from elsewhere."],
            ].map(([t, d], i) => (
              <div key={t} className="rounded-[22px] border border-line p-6">
                <span className={`block h-1.5 w-10 rounded-full ${["bg-red", "bg-gold", "bg-forest", "bg-star"][i]}`} />
                <h3 className="mt-5 font-display text-2xl font-bold">{t}</h3>
                <p className="mt-2 text-mute">{d}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* ---------- 02 Logo ---------- */}
        <section aria-labelledby="logo" className="scroll-mt-36">
          <H id="logo" n="02" title="Logo" lead="The wordmark spells the name with the mark standing in for the C. The ₵ is always the drawn mark — never a typed character — so the colours and the audited stroke are always present." />
          <Reveal stagger className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="theme-light flex min-h-[260px] items-center justify-center rounded-[24px] border border-line bg-paper p-10"><Logo className="!text-5xl sm:!text-6xl" /></div>
            <div className="flex min-h-[260px] items-center justify-center rounded-[24px] bg-star p-10 dark:ring-1 dark:ring-white/12"><Logo tone="light" className="!text-5xl sm:!text-6xl" /></div>
            <div className="flex min-h-[260px] items-center justify-center rounded-[24px] bg-canopy p-10"><Logo tone="light" className="!text-5xl sm:!text-6xl" /></div>
            <div className="flex min-h-[260px] items-center justify-center rounded-[24px] bg-gold p-10 text-star">
              <span className="inline-flex items-center gap-2 font-display text-5xl font-bold tracking-[-0.02em] sm:text-6xl">
                Every<span className="inline-flex h-[0.94em] w-[0.94em] translate-y-[0.06em] items-center justify-center rounded-full bg-star"><Mark className="h-[0.72em] w-[0.72em] text-white" /></span>edi
              </span>
            </div>
          </Reveal>
          <p className="mt-4 text-sm text-mute">On gold, the mark sits in a Black Star disc so its own gold segment stays visible.</p>

          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Reveal className="theme-light rounded-[24px] bg-chalk p-8 text-ink">
              <h3 className="font-display text-2xl font-bold">Construction</h3>
              <div className="mt-6 flex items-center gap-8">
                <svg viewBox="0 0 48 48" className="h-44 w-44 shrink-0" aria-hidden="true">
                  <circle cx="24" cy="24" r="15" fill="none" stroke="#0e0e0c" strokeOpacity="0.25" strokeDasharray="1 1.5" strokeWidth="0.3" />
                  <path d="M0 24 H48 M24 0 V48" stroke="#0e0e0c" strokeOpacity="0.2" strokeWidth="0.25" />
                  <path d="M34.04 12.85 A15 15 0 0 0 9.5 20.1" fill="none" stroke="#CE1126" strokeWidth="7" />
                  <path d="M9.5 20.1 A15 15 0 0 0 13.4 34.6" fill="none" stroke="#FCD116" strokeWidth="7" />
                  <path d="M13.4 34.6 A15 15 0 0 0 34.04 35.15" fill="none" stroke="#006B3F" strokeWidth="7" />
                  <rect x="21.75" y="3.5" width="4.5" height="41" rx="1" fill="#0e0e0c" />
                </svg>
                <ul className="space-y-3 text-[0.95rem]">
                  <li><strong>Arc:</strong> radius 15, stroke 7, open 96° to the right — a C that never closes.</li>
                  <li><strong>Weave order:</strong> red over the top, gold at the side, green underneath. Read like the flag, top to bottom.</li>
                  <li><strong>The audited stroke:</strong> one straight Black Star line through every colour. Nothing gets past it.</li>
                </ul>
              </div>
            </Reveal>
            <Reveal className="rounded-[24px] border border-line p-8">
              <h3 className="font-display text-2xl font-bold">Clear space &amp; size</h3>
              <div className="theme-light mt-6 flex items-center justify-center rounded-2xl bg-[repeating-linear-gradient(45deg,#f3f3ee_0_6px,#fff_6px_12px)] p-8">
                <div className="outline-2 outline-dashed outline-offset-[22px] outline-red/60"><Logo className="!text-4xl" /></div>
              </div>
              <ul className="mt-6 space-y-2 text-[0.95rem]">
                <li>Keep clear space equal to the height of the “E” on every side.</li>
                <li>Minimum wordmark size: 96px wide on screen, 25mm in print.</li>
                <li>Below that, use the mark alone (minimum 20px) — favicons, avatars, receipts.</li>
              </ul>
            </Reveal>
          </div>

          <h3 className="mt-16 font-display text-2xl font-bold">Please don&apos;t</h3>
          <Reveal stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [<span key="a" className="font-display text-3xl font-bold">Every₵edi</span>, "Type the ₵ as a font character in the logo. (In running text, “Every₵edi” typed is correct.)"],
              [<span key="b" className="inline-block scale-x-150 font-display text-2xl font-bold"><Logo className="!text-2xl" /></span>, "Stretch, squash or skew the wordmark."],
              [<span key="c" className="font-display text-3xl font-bold text-leaf">Every<span className="text-alert">C</span>edi</span>, "Recolour the letters or swap the arc order."],
              [<span key="d" className="rounded-xl bg-red px-4 py-3"><Logo className="!text-2xl" /></span>, "Place it on Liberty Red, busy photos or kente patterns."],
            ].map(([el, t], i) => (
              <figure key={i} className="rounded-[22px] border border-line p-5">
                <div className="theme-light relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-chalk text-ink">
                  {el}
                  <span aria-hidden="true" className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red text-sm font-bold text-white">×</span>
                </div>
                <figcaption className="mt-4 text-[0.95rem] text-mute">{t}</figcaption>
              </figure>
            ))}
          </Reveal>
        </section>

        {/* ---------- 03 Colour ---------- */}
        <section aria-labelledby="colour" className="scroll-mt-36">
          <H id="colour" n="03" title="Colour" lead="The flag of Ghana, given jobs. Each colour means the same thing everywhere it appears, so a merchant learns to read the system at a glance." />
          <Reveal stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colours.map((c) => (
              <div key={c.name} className={`flex min-h-[220px] flex-col justify-between rounded-[22px] p-6 ${c.bg} ${c.fg} ${c.name === "Chalk" ? "border border-line" : ""}`}>
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                  <span className="tnum text-sm opacity-80">{c.share}</span>
                </div>
                <div>
                  <p className="tnum font-mono text-sm">{c.hex} · RGB {c.rgb}</p>
                  <p className="mt-2 text-[0.95rem] opacity-85">{c.role}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <div className="mt-10">
            <p className="text-sm font-semibold">Proportion on a typical page</p>
            <div className="mt-3 flex h-12 overflow-hidden rounded-xl border border-line" aria-hidden="true">
              <span className="bg-paper" style={{ flex: 60 }} />
              <span className="bg-star" style={{ flex: 16 }} />
              <span className="bg-canopy" style={{ flex: 8 }} />
              <span className="bg-gold" style={{ flex: 7 }} />
              <span className="bg-forest" style={{ flex: 6 }} />
              <span className="bg-red" style={{ flex: 3 }} />
            </div>
            <p className="mt-2 text-sm text-mute">White 60 · Black Star 16 · Canopy 8 · Gold 7 · Forest 6 · Red 3. Lots of white, so the flag colours read as signals, not decoration.</p>
          </div>
          <div className="mt-12 overflow-x-auto rounded-[22px] border border-line">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">Colour contrast pairs</caption>
              <thead className="bg-chalk text-sm"><tr><th className="px-5 py-3 font-semibold">Pair</th><th className="px-5 py-3 font-semibold">Contrast</th><th className="px-5 py-3 font-semibold">WCAG</th><th className="px-5 py-3 font-semibold">Use for</th></tr></thead>
              <tbody className="tnum">
                {contrast.map(([p, r, w, u]) => (
                  <tr key={p} className="border-t border-line">
                    <td className="px-5 py-3.5 font-medium">{p}</td>
                    <td className="px-5 py-3.5">{r}</td>
                    <td className="px-5 py-3.5"><span className={`rounded-full px-2.5 py-1 text-sm font-semibold ${w === "Fail" ? "bg-red text-white" : "bg-forest text-white"}`}>{w}</span></td>
                    <td className="px-5 py-3.5 text-mute">{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------- 04 Dark mode ---------- */}
        <section aria-labelledby="dark" className="scroll-mt-36">
          <H
            id="dark"
            n="04"
            title="Dark mode"
            lead="The site follows the visitor's phone or laptop setting, and the sun/moon button in the header overrides it (the choice is remembered). Dark mode is the same flag at night, not a different brand."
          />
          <Reveal className="mt-10 grid gap-5 md:grid-cols-2">
            {(["light", "dark"] as const).map((m) => (
              <div
                key={m}
                data-theme={m}
                className={`overflow-hidden rounded-[24px] border p-6 ${m === "light" ? "theme-light border-[#dedfd6] bg-white text-[#0e0e0c]" : "border-[#29332d] bg-[#0c110e] text-[#eef0ea]"}`}
              >
                <p className={`text-sm font-semibold ${m === "light" ? "text-[#006b3f]" : "text-[#3dbe7e]"}`}>{m === "light" ? "Light" : "Dark"}</p>
                <p className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.02em]">Account for every cedi.</p>
                <p className={`mt-2 text-[0.95rem] ${m === "light" ? "text-[#5b5c55]" : "text-[#a3ada6]"}`}>Shift 2 closed with no shortage.</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex min-h-11 items-center rounded-full bg-gold px-5 font-semibold text-star">Book a free demo</span>
                  <span className={`tnum rounded-full px-3 py-1.5 text-sm font-semibold ${m === "light" ? "bg-[#f3f3ee]" : "bg-[#151c18]"}`}>GH₵ 4,215.00</span>
                  <span className={`text-sm font-semibold ${m === "light" ? "text-[#ce1126]" : "text-[#ff5a6b]"}`}>3 low stock</span>
                </div>
              </div>
            ))}
          </Reveal>
          <div className="mt-10 overflow-x-auto rounded-[22px] border border-line">
            <table className="w-full min-w-[620px] text-left">
              <caption className="sr-only">Light and dark colour values by role</caption>
              <thead className="bg-chalk text-sm">
                <tr><th className="px-5 py-3 font-semibold">Role</th><th className="px-5 py-3 font-semibold">Light</th><th className="px-5 py-3 font-semibold">Dark</th><th className="px-5 py-3 font-semibold">Notes</th></tr>
              </thead>
              <tbody className="tnum">
                {darkTokens.map((t) => (
                  <tr key={t.role} className="border-t border-line">
                    <td className="px-5 py-3.5 font-medium">{t.role}</td>
                    <td className="px-5 py-3.5"><span className="inline-flex items-center gap-2 font-mono text-sm"><span className="h-4 w-4 rounded border border-line" style={{ background: t.light }} />{t.light}</span></td>
                    <td className="px-5 py-3.5"><span className="inline-flex items-center gap-2 font-mono text-sm"><span className="h-4 w-4 rounded border border-line" style={{ background: t.dark }} />{t.dark}</span></td>
                    <td className="px-5 py-3.5 text-mute">{t.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-[22px] bg-chalk p-6">
              <h3 className="font-display text-xl font-bold">What never changes</h3>
              <p className="mt-2 text-mute">Gold, Canopy and the Black Star stay exactly the same. Gold buttons keep Black Star text in both themes. The mark keeps its red, gold and green.</p>
            </div>
            <div className="rounded-[22px] bg-chalk p-6">
              <h3 className="font-display text-xl font-bold">Real objects stay real</h3>
              <p className="mt-2 text-mute">Receipts stay white paper, till and phone screens stay lit, and the power-cut room starts with the lights on. Only the page around them goes dark.</p>
            </div>
            <div className="rounded-[22px] bg-chalk p-6">
              <h3 className="font-display text-xl font-bold">Dark sections need an edge</h3>
              <p className="mt-2 text-mute">On a dark page, Black Star panels (footer, banners, quote card) get a faint white hairline so they don&apos;t disappear into the page.</p>
            </div>
          </div>
        </section>

        {/* ---------- 05 Type ---------- */}
        <section aria-labelledby="type" className="scroll-mt-36">
          <H id="type" n="05" title="Typography" lead="Three voices: a confident display face for what we promise, a clear sans for what we explain, and a receipt mono for what we account for." />
          <Reveal stagger className="mt-10 grid gap-5 lg:grid-cols-3">
            <div className="rounded-[22px] bg-chalk p-7">
              <p className="text-sm font-semibold text-leaf">Display · Bricolage Grotesque Bold</p>
              <p className="mt-6 font-display text-7xl font-bold leading-none tracking-[-0.04em]">Aa ₵</p>
              <p className="mt-6 text-mute">Headlines and big numbers. Tight tracking (−2 to −3.5%), line height 1.0–1.1.</p>
            </div>
            <div className="rounded-[22px] bg-chalk p-7">
              <p className="text-sm font-semibold text-leaf">Text · Geist Regular / Semibold</p>
              <p className="mt-6 text-7xl leading-none">Aa ₵</p>
              <p className="mt-6 text-mute">Body, UI and buttons. 17px body on screen, line height 1.6, never under 16px on phones.</p>
            </div>
            <div className="rounded-[22px] bg-chalk p-7">
              <p className="text-sm font-semibold text-leaf">Receipt · Geist Mono</p>
              <p className="mt-6 font-mono text-7xl leading-none">Aa ₵</p>
              <p className="mt-6 text-mute">Receipts, references and shift reports only. Not for labels or headings.</p>
            </div>
          </Reveal>
          <div className="mt-10 divide-y divide-line rounded-[22px] border border-line">
            {[
              ["Display", "font-display text-5xl sm:text-7xl font-bold tracking-[-0.035em] leading-none", "72 / 44px"],
              ["H1", "font-display text-4xl sm:text-6xl font-bold tracking-[-0.03em] leading-[1.02]", "60 / 42px"],
              ["H2", "font-display text-3xl sm:text-5xl font-bold tracking-[-0.025em] leading-[1.05]", "48 / 34px"],
              ["H3", "font-display text-2xl font-bold leading-tight", "24px"],
              ["Body", "text-[17px]", "17px / 1.6"],
              ["Caption", "text-sm text-mute", "14px"],
            ].map(([n, cls, sz]) => (
              <div key={n} className="grid items-baseline gap-2 p-5 md:grid-cols-[120px_minmax(0,1fr)_120px]">
                <span className="text-sm font-semibold text-mute">{n}</span>
                <span className={`${cls} min-w-0 truncate`}>Account for every cedi</span>
                <span className="tnum text-sm text-mute md:text-right">{sz}</span>
              </div>
            ))}
          </div>
          <Reveal className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-[22px] border border-line p-7">
              <p className="text-sm font-semibold text-leaf">Every amount uses tabular figures</p>
              <div className="tnum mt-5 space-y-1 text-right font-display text-3xl font-bold">
                <p>GH₵ 1,111.10</p><p>GH₵ 8,480.00</p><p className="border-t-2 border-ink pt-1">GH₵ 9,591.10</p>
              </div>
            </div>
            <div className="rounded-[22px] border border-line p-7">
              <p className="text-sm font-semibold text-leaf">Writing money</p>
              <ul className="mt-5 space-y-3">
                <li><strong>GH₵ 1,240.50</strong> — symbol, thin space, comma thousands, two decimals in receipts and tables.</li>
                <li><strong>GH₵ 12,500</strong> — no decimals for estimates and marketing.</li>
                <li><strong>50 pesewas</strong> — spell out pesewas below one cedi.</li>
              </ul>
            </div>
          </Reveal>
        </section>

        {/* ---------- 05 Devices ---------- */}
        <section aria-labelledby="devices" className="scroll-mt-36">
          <H id="devices" n="06" title="The Ledger Weave & the Black Star" lead="Two graphic devices, each with one job." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal className="rounded-[24px] border border-line p-8">
              <h3 className="font-display text-2xl font-bold">The Ledger Weave</h3>
              <div className="mt-6 space-y-3">
                <Weave className="h-10 rounded-lg" />
                <Weave className="h-4 rounded" />
                <Weave className="h-1.5" />
              </div>
              <p className="mt-6 text-mute">A strip of flag-coloured blocks, set out like a kente band and ruled with ledger lines. It marks a beginning or an end: the top of a footer, the top of a banner, a cover. Draw it in once, left to right, 900ms.</p>
              <ul className="mt-4 space-y-1.5 text-[0.95rem]">
                <li>✓ Full-width, as a horizontal band</li>
                <li>✓ One weave per view</li>
                <li>× Never as a background fill, border on cards, or behind text</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-[24px] bg-star p-8 text-white dark:ring-1 dark:ring-white/12">
              <h3 className="font-display text-2xl font-bold">The Black Star seal</h3>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 font-semibold text-star"><Star className="h-4 w-4" /> Audited</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 font-semibold text-ink"><Star className="h-4 w-4" /> Supervisor signed off</span>
                <Star className="h-12 w-12 text-gold" />
              </div>
              <p className="mt-6 text-white/75">The star from the flag stands for something checked and confirmed: an audited sale, a signed-off shift, a verified report. Use it only where something really has been verified — never as a decorative bullet in marketing lists of wishes.</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- 06 Illustration ---------- */}
        <section aria-labelledby="illustration" className="scroll-mt-36">
          <H id="illustration" n="07" title="Illustration & photography" lead="Hardware is drawn flat: Black Star bodies, white screens, flag colours only where something is lit, paid or warning. Photography shows real Ghanaian shops and real staff — never stock models." />
          <Reveal stagger className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[TerminalArt, UpsArt, PrinterArt, ScannerArt].map((A, i) => (
              <div key={i} className="flex aspect-square items-center justify-center rounded-[22px] bg-tile p-6"><A className="h-full w-full" /></div>
            ))}
          </Reveal>
        </section>

        {/* ---------- 07 Motion ---------- */}
        <section aria-labelledby="motion" className="scroll-mt-36">
          <H id="motion" n="08" title="Motion" lead="Motion shows money and stock moving — never decoration for its own sake. Things that happen at the counter animate the way they would in the shop: receipts feed, totals roll, tape covers what a role can't see." />
          <Reveal className="mt-10"><BrandMotionDemo /></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["Enter / exit", "cubic-bezier(0.23, 1, 0.32, 1)", "200–500ms. Exits faster than entrances."],
              ["Move / morph", "cubic-bezier(0.77, 0, 0.175, 1)", "Totals, tabs, tape, sync pulses."],
              ["Press", "scale(0.97)", "150ms on every button. No hover growth."],
            ].map(([t, c, d]) => (
              <div key={t} className="rounded-[22px] border border-line p-6">
                <h3 className="font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 font-mono text-sm text-leaf">{c}</p>
                <p className="mt-2 text-mute">{d}</p>
              </div>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 text-[0.95rem] md:grid-cols-2">
            <li className="rounded-xl bg-chalk p-4"><strong>One signature moment per page.</strong> On the home page it&apos;s the sale that travels from the till to the web shop.</li>
            <li className="rounded-xl bg-chalk p-4"><strong>Loops pause</strong> when they leave the screen or the tab is hidden.</li>
            <li className="rounded-xl bg-chalk p-4"><strong>Reduced motion</strong> keeps short fades, drops movement, and shows finished states.</li>
            <li className="rounded-xl bg-chalk p-4"><strong>Mobile data first.</strong> CSS and small scripts only; no video backgrounds.</li>
          </ul>
        </section>

        {/* ---------- 08 Voice ---------- */}
        <section aria-labelledby="voice" className="scroll-mt-36">
          <H id="voice" n="09" title="Voice & tone" lead="Practical, authoritative, direct, and protective of the merchant's business. Professional without being academic; business-friendly without computing jargon. We talk like a trusted technician at the counter." />
          <div className="mt-10 overflow-x-auto rounded-[22px] border border-line">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">Words to avoid and what to say instead</caption>
              <thead className="bg-chalk text-sm"><tr><th className="px-5 py-3 font-semibold text-alert">Don&apos;t say</th><th className="px-5 py-3 font-semibold text-leaf">Say</th></tr></thead>
              <tbody>
                {voice.map(([a, b]) => (
                  <tr key={a} className="border-t border-line"><td className="px-5 py-4 text-mute line-through decoration-red/60">{a}</td><td className="px-5 py-4 font-medium">{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <p className="text-sm font-semibold">Words we use</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {vocabulary.map((v) => <li key={v} className="rounded-full border border-ink px-4 py-2 text-[0.95rem] font-medium">{v}</li>)}
            </ul>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-[22px] bg-chalk p-6">
              <h3 className="font-display text-xl font-bold">Writing the name</h3>
              <ul className="mt-3 space-y-2 text-[0.95rem]">
                <li><strong>Every₵edi</strong> — always, with the Ghana cedi sign (U+20B5).</li>
                <li><strong>everycedi.co</strong> — in URLs, email addresses and hashtags only.</li>
                <li>Never “EveryCedi”, “Every Cedi” or “Every-Cedi” in copy.</li>
              </ul>
            </div>
            <div className="rounded-[22px] bg-chalk p-6">
              <h3 className="font-display text-xl font-bold">Buttons say what happens</h3>
              <ul className="mt-3 space-y-2 text-[0.95rem]">
                <li>“Book a free onsite demo”, not “Submit”.</li>
                <li>“Request an official written quote”, not “Get started”.</li>
                <li>Errors say what to fix: “That phone number looks too short.”</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- 09 Applications ---------- */}
        <section aria-labelledby="apply" className="scroll-mt-36">
          <H id="apply" n="10" title="Applications" />
          <Reveal stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {/* business card */}
            <figure>
              <div className="relative aspect-[1.75] overflow-hidden rounded-2xl bg-star p-6 text-white dark:ring-1 dark:ring-white/12 shadow-[0_24px_40px_-24px_rgba(14,14,12,0.6)]">
                <Logo tone="light" className="!text-2xl" />
                <div className="absolute bottom-6 left-6 text-sm">
                  <p className="font-semibold">Kwame Mensah</p>
                  <p className="text-white/60">Retail systems technician</p>
                  <p className="tnum mt-2 text-white/80">+233 054 337 7390</p>
                </div>
                <Weave static className="absolute bottom-0 left-0 right-0 h-1.5" />
              </div>
              <figcaption className="mt-3 text-sm text-mute">Business card, front. Example name.</figcaption>
            </figure>
            {/* receipt */}
            <figure>
              <div className="theme-light mx-auto aspect-[1.75] overflow-hidden rounded-2xl bg-chalk p-4 text-ink">
                <div className="receipt-edge mx-auto w-[70%] bg-paper px-4 pb-6 pt-4 font-mono text-[11px] leading-5">
                  <p className="flex justify-center"><Mark className="h-6 w-6" /></p>
                  <p className="text-center font-bold">YOUR SHOP NAME</p>
                  <p className="flex justify-between"><span>Total</span><span className="tnum">335.00</span></p>
                  <p className="text-center">★ Audited · Every₵edi</p>
                </div>
              </div>
              <figcaption className="mt-3 text-sm text-mute">Merchant receipt footer. The merchant&apos;s name leads; ours signs off.</figcaption>
            </figure>
            {/* avatar */}
            <figure>
              <div className="flex aspect-[1.75] items-center justify-center gap-5 rounded-2xl bg-canopy">
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-paper"><Mark className="h-14 w-14 text-ink" /></span>
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-paper"><Mark className="h-10 w-10 text-ink" /></span>
              </div>
              <figcaption className="mt-3 text-sm text-mute">WhatsApp, social and app icon: the mark alone on white.</figcaption>
            </figure>
          </Reveal>
        </section>
      </div>
    </>
  );
}
