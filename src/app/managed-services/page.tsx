import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { Heading, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Star } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "Monthly care, backups & Google Ads",
  description: "Secure hosting that stays online, nightly backups, Google Search and local ads managed for your shop, and a clear month-end report on revenue, margins and stock.",
  alternates: { canonical: "/managed-services" },
};

const scope = [
  ["A secure online server that never goes offline", "Fast hosting with SSL security for your web shop and stock system."],
  ["Nightly backups", "Your sales and stock records are copied every night, so a broken laptop or stolen till never means lost books."],
  ["Google Ads, managed", "Search and local ads set up and tuned: the right keywords, the right areas, people who are ready to buy."],
  ["Standby helpdesk", "Call or WhatsApp when something isn't right. Minor catalogue updates included."],
];

const report = [
  ["Gross revenue", "All tills and the web shop, by week"],
  ["Profit margins", "By product line and by staff member"],
  ["Fast movers", "What to reorder before it runs out"],
  ["Slow and dead stock", "Cash sitting on your shelves, item by item"],
  ["Return on ad spend", "What each cedi spent on Google brought back"],
];

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Pillar 3 · Monthly"
        colour="green"
        title="Your outside tech, database and marketing team."
        lead="An ongoing partnership. We keep the systems running, the data safe and the buyers coming — and tell you exactly how the month went."
      >
        <ButtonLink href="/contact">Talk to us about monthly care</ButtonLink>
      </PageHero>

      <Section labelledBy="scope-title">
        <Heading id="scope-title" title="What we look after, every month" />
        <Reveal stagger className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {scope.map(([t, d]) => (
            <div key={t} className="border-t-2 border-star pt-5">
              <h3 className="font-display text-2xl font-bold leading-tight">{t}</h3>
              <p className="mt-3 text-mute">{d}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="star" labelledBy="report-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <Heading
            dark
            id="report-title"
            kicker="The end-of-month executive report"
            title="Thirty days, one page, plain cedis."
            lead="Every month the owner receives a consolidated audit of the business. No logins, no spreadsheets to decode."
          />
          <Reveal className="rounded-[24px] bg-white p-6 text-star sm:p-8">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <p className="font-display text-xl font-bold">Monthly audit</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-sm font-semibold"><Star className="h-3 w-3" /> Audited</span>
            </div>
            <ul className="divide-y divide-line">
              {report.map(([k, v]) => (
                <li key={k} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="font-semibold">{k}</span>
                  <span className="text-mute sm:text-right">{v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <div className="h-20 bg-white md:h-28" />
      <CtaBanner title="Stop guessing how the month went." />
    </>
  );
}
