"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Odometer } from "@/components/ui/Odometer";

type Dir = "shop" | "web" | null;

/*
  Two-way stock sync, driven by the visitor:
  sell at the counter → dot travels to the website; order online → dot travels to the till.
  The shared stock count rolls when the dot arrives (timer, 650ms).
*/
export function SyncDemo() {
  const [stock, setStock] = useState(6);
  const [dir, setDir] = useState<Dir>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const busy = useRef(false);

  const run = (from: Exclude<Dir, null>) => {
    if (busy.current || stock === 0) return;
    busy.current = true;
    setDir(from);
    setAlert(null);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      setStock((s) => s - 1);
      setAlert(
        from === "shop"
          ? "Sold at Till 1 · website now shows the new count"
          : "New web order · WhatsApp alert sent to the shop and the buyer",
      );
      setDir(null);
      busy.current = false;
    }, reduced ? 0 : 650);
  };

  return (
    <div className="rounded-[28px] bg-canopy p-5 text-white sm:p-10">
      <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_minmax(40px,0.5fr)_minmax(0,1fr)_minmax(40px,0.5fr)_minmax(0,1fr)]">
        <Node title="Shop counter" sub="Till 1 · Osu" />
        <Lane active={dir} toward="right" />
        <div className="rounded-2xl bg-gold p-5 text-center text-star">
          <p className="text-sm font-semibold">One stock list</p>
          <p className="mt-2 font-display text-6xl font-bold leading-none">
            <Odometer value={String(stock)} label={`${stock} left`} />
          </p>
          <p className="mt-2 text-sm">Ankara wrap dress, size 12</p>
        </div>
        <Lane active={dir} toward="left" />
        <Node title="Web shop" sub={stock === 0 ? "Shows: sold out" : `Shows: ${stock} in stock`} />
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button onClick={() => run("shop")} disabled={stock === 0}>Sell one at the counter</Button>
        <Button variant="outline-light" onClick={() => run("web")} disabled={stock === 0}>Order one online</Button>
        {stock === 0 ? (
          <Button variant="ghost-light" onClick={() => { setStock(6); setAlert("Restocked · both sides show 6"); }}>Restock</Button>
        ) : null}
      </div>
      <p className="mt-4 min-h-6 text-sm text-white/75" aria-live="polite">
        {stock === 0 ? "Sold out everywhere. Nobody can pay for a dress you no longer have." : alert}
      </p>
    </div>
  );
}

function Node({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-white/20 p-5 text-center">
      <p className="font-display text-xl font-bold">{title}</p>
      <p className="tnum mt-1 text-sm text-white/70">{sub}</p>
    </div>
  );
}

/* Left lane carries shop → list; right lane carries list → web (and the reverse for web orders). */
function Lane({ active, toward }: { active: Dir; toward: "left" | "right" }) {
  const go = (active === "shop") || (active === "web");
  const forward = active === "shop"; // shop → web travels left-to-right
  return (
    <div className="relative mx-auto h-10 w-1 md:h-1 md:w-full" aria-hidden="true">
      <div className="sync-track absolute inset-0 text-white/30 [background-size:4px_10px] [background-repeat:repeat-y] md:[background-size:10px_4px] md:[background-repeat:repeat-x]" />
      <span
        className="sync-dot absolute h-3.5 w-3.5 rounded-full bg-gold"
        data-go={go ? (forward ? "fwd" : "back") : undefined}
        data-lane={toward}
      />
    </div>
  );
}
