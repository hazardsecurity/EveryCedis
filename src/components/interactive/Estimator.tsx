"use client";

import { useState } from "react";
import { Odometer } from "@/components/ui/Odometer";
import { ButtonLink } from "@/components/ui/Button";
import { businessTypes, careTiers, counterOptions, estimate, type Choice } from "@/lib/pricing";
import { whatsappLink } from "@/lib/site";

const fmt = (n: number) => n.toLocaleString("en-GH");

export function Estimator() {
  const [c, setC] = useState<Choice>({ type: "boutique", counters: 1, web: true, care: "care" });
  const e = estimate(c);
  const set = <K extends keyof Choice>(k: K, v: Choice[K]) => setC((p) => ({ ...p, [k]: v }));

  const typeLabel = businessTypes.find((b) => b.id === c.type)!.label;
  const countLabel = counterOptions.find((o) => o.id === c.counters)!.label;
  const careLabel = careTiers.find((t) => t.id === c.care)!.label;
  const summary = `${typeLabel}, ${countLabel}, ${c.web ? "with" : "no"} web shop, ${careLabel}`;
  const quoteMsg = `Hello Every₵edi, I would like an official written quote.\n\nShop type: ${typeLabel}\nCounters: ${countLabel}\nWeb shop: ${c.web ? "Yes" : "No"}\nMonthly plan: ${careLabel}\nEstimate shown: GH₵ ${fmt(e.oneOff[0])} – ${fmt(e.oneOff[1])} one-off`;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
      <a
        href="#estimate"
        className="sticky top-[68px] z-20 -mx-4 -mt-6 flex items-center justify-between gap-3 bg-star px-4 py-3 text-white sm:-mx-6 sm:px-6 lg:hidden"
      >
        <span className="text-sm text-white/70">Estimate</span>
        <span className="tnum font-display font-bold">GH₵ {fmt(e.oneOff[0])} – {fmt(e.oneOff[1])}</span>
      </a>
      <form className="space-y-10" onSubmit={(ev) => ev.preventDefault()} aria-label="Cost estimator">
        <Step n={1} legend="What kind of business is it?">
          <div className="grid gap-3 sm:grid-cols-2">
            {businessTypes.map((b) => (
              <Option key={b.id} name="type" checked={c.type === b.id} onChange={() => set("type", b.id)} title={b.label} note={b.note} />
            ))}
          </div>
        </Step>
        <Step n={2} legend="How many checkout counters?">
          <div className="grid grid-cols-3 gap-3">
            {counterOptions.map((o) => (
              <Option key={o.id} name="counters" checked={c.counters === o.id} onChange={() => set("counters", o.id)} title={o.label} />
            ))}
          </div>
        </Step>
        <Step n={3} legend="Do you want a web shop synced to your till?">
          <div className="grid grid-cols-2 gap-3">
            <Option name="web" checked={c.web} onChange={() => set("web", true)} title="Yes" note="Live stock sync, MoMo and card checkout" />
            <Option name="web" checked={!c.web} onChange={() => set("web", false)} title="Not yet" note="In-store only for now" />
          </div>
        </Step>
        <Step n={4} legend="Google Ads and maintenance">
          <div className="grid gap-3">
            {careTiers.map((t) => (
              <Option key={t.id} name="care" checked={c.care === t.id} onChange={() => set("care", t.id)} title={t.label} note={t.note} />
            ))}
          </div>
        </Step>
      </form>

      <aside id="estimate" className="scroll-mt-24 lg:sticky lg:top-24" aria-live="polite" aria-atomic="true">
        <div className="overflow-hidden rounded-[24px] bg-star text-white dark:ring-1 dark:ring-white/12">
          <div className="h-2 bg-gold" />
          <div className="p-6 sm:p-8">
            <p className="text-sm text-white/60">Your estimate</p>
            <p className="mt-1 text-sm text-white/80">{summary}</p>
            <div className="mt-6 border-t border-white/15 pt-5">
              <p className="text-sm font-semibold text-gold">One-off setup</p>
              <p className="mt-2 font-display text-[2rem] font-bold leading-none tracking-[-0.02em] sm:text-[2.4rem]">
                <span className="sr-only">GH₵ {fmt(e.oneOff[0])} to {fmt(e.oneOff[1])}</span>
                <span aria-hidden="true">GH₵ <Odometer value={fmt(e.oneOff[0])} /> – <Odometer value={fmt(e.oneOff[1])} /></span>
              </p>
            </div>
            <div className="mt-6 border-t border-white/15 pt-5">
              <p className="text-sm font-semibold text-gold">Monthly</p>
              <p className="mt-2 font-display text-2xl font-bold leading-none">
                {e.monthly[1] === 0 ? (
                  "GH₵ 0"
                ) : (
                  <>
                    <span className="sr-only">GH₵ {fmt(e.monthly[0])} to {fmt(e.monthly[1])} a month</span>
                    <span aria-hidden="true">GH₵ <Odometer value={fmt(e.monthly[0])} /> – <Odometer value={fmt(e.monthly[1])} /></span>
                  </>
                )}
              </p>
              {c.care === "growth" ? <p className="mt-2 text-sm text-white/60">Google&apos;s ad spend is billed separately, at the budget you set.</p> : null}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={whatsappLink(quoteMsg)}>Request an official written quote</ButtonLink>
              <ButtonLink
                href={`/contact?type=${encodeURIComponent(typeLabel)}&note=${encodeURIComponent(summary)}`}
                variant="outline-light"
              >
                Book a free onsite visit instead
              </ButtonLink>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-white/50">
              Indicative ranges in Ghana cedis. Your written quote follows a free visit, once we&apos;ve seen your counter and counted your stock lines.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Step({ n, legend, children }: { n: number; legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="flex items-center gap-3 font-display text-xl font-bold">
        <span className="tnum inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm text-paper">{n}</span>
        {legend}
      </legend>
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}

function Option({ name, checked, onChange, title, note }: { name: string; checked: boolean; onChange: () => void; title: string; note?: string }) {
  return (
    <label
      className={`press relative flex min-h-14 cursor-pointer flex-col justify-center rounded-2xl border-2 px-4 py-3 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
        checked ? "border-ink bg-gold-soft" : "border-line bg-paper hover:border-ink/40"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span className="pr-6 font-semibold">{title}</span>
      <span aria-hidden="true" className={`absolute right-4 top-4 h-4 w-4 rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-150 ${checked ? "border-ink bg-ink shadow-[inset_0_0_0_3px_var(--c-gold-soft)]" : "border-line"}`} />
      {note ? <span className="mt-0.5 text-sm text-mute">{note}</span> : null}
    </label>
  );
}
