"use client";

import { useEffect, useRef, useState } from "react";
import { Odometer } from "@/components/ui/Odometer";
import { Star } from "@/components/brand/Logo";
import { KenteSwatch } from "@/components/sections/Illustrations";

/*
  Signature moment: a sale at the counter becomes a stock change on the website.
  Scan → line item → receipt prints → paid by MoMo → pulse along the line → phone stock rolls down.
  Timers drive every step (never animation events), the loop pauses offscreen / hidden tab,
  and reduced motion shows the finished sale, still.
*/

const items = [
  { name: "Shea body butter 250g", qty: 1, price: 65 },
  { name: "Sobolo 500ml", qty: 2, price: 15 },
  { name: "Kente stole, handwoven", qty: 1, price: 240 },
];

// step → ms after cycle start
const schedule = [0, 700, 1600, 2500, 3400, 4000, 4700, 7800, 8300];
const ROW = 22;

function money(n: number) {
  return n.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function HeroCounter() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [running, setRunning] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let onScreen = false;
    const update = () => setRunning(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      update();
    }, { threshold: 0.25 });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!running || reduced) return;
    const timers = schedule.slice(1).map((t, i) =>
      window.setTimeout(() => {
        const next = i + 1;
        if (next === schedule.length - 1) {
          setStep(0);
          setCycle((c) => c + 1);
        } else setStep(next);
      }, t),
    );
    return () => timers.forEach(clearTimeout);
  }, [running, reduced, cycle]);

  // reduced motion: freeze on the finished sale
  const s = reduced ? 6 : step;
  const shown = Math.min(s, 3);
  const paid = s >= 4;
  const pulsing = s === 5;
  const synced = s >= 6;
  const tearing = s === 7;

  const c = reduced ? 0 : cycle % 4;
  const before = 4 - c;
  const after = before - 1;
  const stock = synced ? after : before;
  const restocked = !reduced && cycle > 0 && c === 0 && s < 6;

  const total = items.slice(0, shown).reduce((t, it) => t + it.qty * it.price, 0);
  const receiptRows = shown + (paid ? 3 : 0) + 3;

  return (
    <div
      ref={root}
      className="theme-light relative overflow-hidden rounded-[28px] bg-canopy p-4 text-white shadow-[0_40px_80px_-40px_rgba(0,51,30,0.8)] sm:p-8 lg:p-10"
      role="img"
      aria-label="Animated example: a cashier scans three items, the customer pays with MTN Mobile Money, a receipt prints, and the Kente stole's stock on the online shop drops from 4 to 3."
    >
      {/* counter-top grain */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_7px),repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_9px)]" />

      <div aria-hidden="true" className="relative grid items-start gap-6 md:grid-cols-[minmax(0,1.45fr)_minmax(56px,0.35fr)_minmax(0,0.8fr)] md:gap-0">
        {/* ---------- The till ---------- */}
        <div className="relative">
          <div className="flex items-start gap-3">
            {/* cashier screen */}
            <div className="min-w-0 flex-1 rounded-2xl border-[6px] border-ink bg-star shadow-[0_20px_40px_-20px_#000]">
              <div className="rounded-[10px] bg-paper text-ink">
                <div className="flex items-center justify-between border-b border-line px-3 py-2 text-[11px]">
                  <span className="font-semibold">Till 1 · Ama</span>
                  <span className="rounded-full bg-chalk px-2 py-0.5 text-mute">Cashier view</span>
                </div>
                <ul className="min-h-[124px] px-3 py-2 text-[12.5px]">
                  {items.map((it, i) => (
                    <li
                      key={it.name}
                      className="hero-line flex items-center justify-between gap-2 py-1"
                      data-on={i < shown ? "" : undefined}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${i === 2 ? "bg-gold" : "bg-forest"}`} />
                        <span className="truncate">{it.name}</span>
                        <span className="text-mute">×{it.qty}</span>
                      </span>
                      <span className="tnum font-medium">{money(it.qty * it.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-line px-3 py-2.5">
                  <span className="text-[11px] text-mute">Cost prices hidden for this role</span>
                  <span className="font-display text-lg font-bold">
                    GH₵ <Odometer value={money(total)} />
                  </span>
                </div>
                <div className="px-3 pb-3">
                  <div
                    className="hero-pay flex items-center justify-center gap-2 rounded-lg py-2 text-[12px] font-semibold"
                    data-paid={paid ? "" : undefined}
                  >
                    <span className="hero-pay-a">Charge · Cash · MoMo · Card</span>
                    <span className="hero-pay-b inline-flex items-center gap-1.5">
                      <Star className="h-3 w-3" /> Paid · MTN MoMo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* customer-facing display */}
            <div className="hidden w-[30%] shrink-0 sm:block">
              <div className="rounded-xl border-[5px] border-ink bg-star">
                <div className="rounded-md bg-gold px-2.5 py-3 text-star">
                  <p className="text-[10px] font-semibold">Your total</p>
                  <p className="mt-1 font-display text-[1.35rem] font-bold leading-none">
                    <Odometer value={money(total)} />
                  </p>
                  <p className="mt-2 text-[10px] leading-snug">{paid ? "Medaase! Thank you." : "Pay by MoMo or card"}</p>
                </div>
              </div>
              <div className="mx-auto h-8 w-2 bg-star" />
              <div className="mx-auto h-1.5 w-14 rounded-full bg-star" />
            </div>
          </div>

          {/* printer + receipt + scanner */}
          <div className="mt-4 hidden items-start gap-4 sm:flex">
            <div className="relative w-[150px] shrink-0">
              <div className="relative z-10 h-9 rounded-t-xl rounded-b-sm bg-[#d9dcd4] shadow-inner">
                <div className="absolute inset-x-4 bottom-1 h-1 rounded-full bg-star/70" />
                <div className="absolute right-3 top-2 h-1.5 w-1.5 rounded-full bg-forest" />
              </div>
              <div className="relative mx-auto h-[214px] w-[124px] overflow-hidden">
                <div
                  className="hero-receipt receipt-edge mx-auto w-[116px] bg-paper px-2.5 pb-4 pt-2 font-mono text-[9px] leading-[22px] text-ink"
                  data-tear={tearing ? "" : undefined}
                  style={{ clipPath: `inset(0 0 calc(100% - ${receiptRows * ROW + 10}px) 0)` }}
                >
                  <p className="text-center font-bold">YOUR SHOP · OSU</p>
                  <p className="text-center">Till 1 · Ama</p>
                  <p className="border-b border-dashed border-ink/50" />
                  {items.slice(0, Math.max(shown, 0)).map((it) => (
                    <p key={it.name} className="flex justify-between gap-1">
                      <span className="truncate">{it.name.split(" ")[0]} ×{it.qty}</span>
                      <span className="tnum">{money(it.qty * it.price)}</span>
                    </p>
                  ))}
                  {paid ? (
                    <>
                      <p className="flex justify-between border-t border-dashed border-ink/50 font-bold">
                        <span>TOTAL</span>
                        <span className="tnum">{money(total)}</span>
                      </p>
                      <p>MoMo ref 4471…</p>
                      <p className="text-center">★ Audited sale</p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <ul className="hidden min-w-0 flex-1 space-y-2.5 pt-1 text-[12px] text-white/75 sm:block">
              <li className="flex items-center gap-2.5">
                <span className="hero-laser relative inline-block h-6 w-10 shrink-0 rounded-md bg-star" data-beep={s >= 1 && s <= 3 ? String(s) : undefined}>
                  <span className="absolute inset-x-1 top-1/2 h-0.5 -translate-y-1/2 rounded bg-red" />
                </span>
                2D scanner
              </li>
              <li className="flex items-center gap-2.5">
                <span className="relative inline-block h-6 w-10 shrink-0 overflow-hidden rounded-md bg-star">
                  <span className={`absolute inset-x-1 bottom-1 h-1.5 rounded-sm bg-forest transition-transform duration-300 ${paid ? "translate-y-0" : "translate-y-3"}`} />
                </span>
                {paid ? "Drawer opened · logged" : "Cash drawer · locked"}
              </li>
              <li className="flex items-center gap-2.5">
                <span className="inline-flex h-6 w-10 shrink-0 items-center gap-0.5 rounded-md bg-star px-1">
                  {[0, 1, 2, 3].map((b) => <span key={b} className="h-3 flex-1 rounded-[2px] bg-gold" />)}
                </span>
                Pure sine UPS · on mains
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- The link between shop and website ---------- */}
        <div className="relative flex items-center justify-center md:h-[300px]">
          <div className="sync-track h-10 w-1 text-white/35 [background-size:4px_10px] [background-repeat:repeat-y] md:h-1 md:w-full md:[background-size:10px_4px] md:[background-repeat:repeat-x]" />
          <div
            className="hero-lane absolute bottom-3.5 left-1/2 top-0 w-0 md:bottom-auto md:left-0 md:right-3.5 md:top-1/2 md:h-0 md:w-auto"
            data-go={pulsing || synced ? "" : undefined}
            data-done={synced ? "" : undefined}
          >
            <span className="hero-dot absolute left-0 top-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_0_6px_rgba(252,209,22,0.25)] md:-translate-x-0 md:-translate-y-1/2" />
          </div>
        </div>

        {/* ---------- The phone ---------- */}
        <div className="relative mx-auto w-full max-w-[250px]">
          <div className="rounded-[34px] border-[7px] border-ink bg-star shadow-[0_30px_60px_-30px_#000]">
            <div className="overflow-hidden rounded-[27px] bg-paper text-ink">
              <div className="flex items-center justify-between px-4 pb-2 pt-3 text-[10px] font-semibold">
                <span className="tnum">9:41</span>
                <span className="mx-auto h-4 w-14 rounded-full bg-star" />
                <span>5G</span>
              </div>
              <div className="px-3 pb-4">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-display font-bold">yourshop.com.gh</span>
                  <span className="rounded-full bg-chalk px-2 py-0.5">Cart 0</span>
                </div>
                <div className="mt-3 overflow-hidden rounded-xl">
                  <KenteSwatch className="aspect-[4/3] w-full" />
                </div>
                <p className="mt-3 text-[13px] font-semibold">Kente stole, handwoven</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="tnum font-display text-base font-bold">GH₵ 240.00</span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold transition-colors duration-300 ${
                      stock === 0 ? "bg-red text-white" : synced ? "bg-gold text-star" : "bg-chalk text-ink"
                    }`}
                  >
                    {stock === 0 ? (
                      "Sold out"
                    ) : (
                      <>
                        <Odometer value={String(stock)} /> in stock
                      </>
                    )}
                  </span>
                </div>
                <div className={`mt-3 rounded-full py-2 text-center text-[12px] font-semibold ${stock === 0 ? "bg-chalk text-mute" : "bg-star text-white"}`}>
                  {stock === 0 ? "Notify me when back" : "Add to cart"}
                </div>
              </div>
            </div>
          </div>
          <div className="hero-toast absolute -top-3 left-1/2 w-max -translate-x-1/2 rounded-full bg-paper px-3 py-1.5 text-[11px] font-semibold text-ink shadow-lg" data-show={synced && !tearing ? "" : undefined}>
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-forest" /> Sold in shop · website updated
          </div>
          <div className="hero-toast absolute -top-3 left-1/2 w-max -translate-x-1/2 rounded-full bg-gold px-3 py-1.5 text-[11px] font-semibold text-star shadow-lg" data-show={restocked ? "" : undefined}>
            Delivery received · back to 4
          </div>
        </div>
      </div>
    </div>
  );
}
