"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { Star } from "@/components/brand/Logo";

const roles = [
  { id: "cashier", label: "Cashier at the till" },
  { id: "owner", label: "Owner in East Legon" },
] as const;
type Role = (typeof roles)[number]["id"];

const rows = [
  { item: "Kente stole, handwoven", sell: "240.00", cost: "150.00", margin: "37.5%" },
  { item: "Shea body butter 250g", sell: "65.00", cost: "38.00", margin: "41.5%" },
  { item: "Sobolo 500ml", sell: "15.00", cost: "7.50", margin: "50.0%" },
];

/*
  Clipped-highlight tabs + "redaction tape": in cashier view a strip of black tape
  rolls across the cost and margin columns. Clicks animate; arrow keys switch instantly.
*/
export function RoleSpotlight() {
  const [role, setRole] = useState<Role>("cashier");
  const [instant, setInstant] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState<string | null>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const btn = list.querySelector<HTMLElement>(`[data-role="${role}"]`);
      if (!btn) return;
      const W = list.clientWidth;
      const H = list.clientHeight;
      const t = btn.offsetTop, l = btn.offsetLeft;
      setClip(`inset(${t}px ${W - l - btn.offsetWidth}px ${H - t - btn.offsetHeight}px ${l}px round 999px)`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [role]);

  const pick = (r: Role, viaKey: boolean) => {
    setInstant(viaKey);
    setRole(r);
  };
  const onKey = (e: KeyboardEvent) => {
    const i = roles.findIndex((r) => r.id === role);
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % roles.length;
    if (e.key === "ArrowLeft") n = (i - 1 + roles.length) % roles.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = roles.length - 1;
    if (n < 0) return;
    e.preventDefault();
    pick(roles[n].id, true);
    listRef.current?.querySelector<HTMLElement>(`[data-role="${roles[n].id}"]`)?.focus();
  };

  const owner = role === "owner";

  return (
    <div>
      <div className="max-w-full overflow-x-auto">
        <div ref={listRef} role="tablist" aria-label="Choose a role" onKeyDown={onKey} className="relative inline-flex w-max rounded-full bg-white/10 p-1.5">
          {roles.map((r) => (
            <button
              key={r.id}
              data-role={r.id}
              role="tab"
              id={`tab-${r.id}`}
              aria-selected={role === r.id}
              aria-controls="role-panel"
              tabIndex={role === r.id ? 0 : -1}
              onClick={() => pick(r.id, false)}
              className={`press relative z-0 rounded-full px-5 py-3 text-[0.95rem] font-semibold ${clip === null && role === r.id ? "bg-gold text-star" : "text-white/80"}`}
            >
              {r.label}
            </button>
          ))}
          {clip !== null ? (
            <div
              aria-hidden="true"
              className="clip-tabs pointer-events-none absolute inset-0 flex rounded-full bg-gold p-1.5"
              data-instant={instant ? "" : undefined}
              style={{ clipPath: clip }}
            >
              {roles.map((r) => (
                <span key={r.id} className="rounded-full px-5 py-3 text-[0.95rem] font-semibold text-star">{r.label}</span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div id="role-panel" role="tabpanel" aria-labelledby={`tab-${role}`} className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        {/* Price list everyone shares; tape hides what the cashier shouldn't see */}
        <div className="theme-light overflow-hidden rounded-2xl bg-paper text-ink">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <p className="font-semibold">Price list · Osu branch</p>
            <p className="text-sm text-mute">{owner ? "Full visibility" : "Selling prices only"}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] text-left text-[0.95rem]">
              <thead className="text-sm text-mute">
                <tr>
                  <th className="px-5 py-3 font-medium">Item</th>
                  <th className="px-3 py-3 text-right font-medium">Sell (GH₵)</th>
                  <th className="px-3 py-3 text-right font-medium">Cost (GH₵)</th>
                  <th className="px-5 py-3 text-right font-medium">Margin</th>
                </tr>
              </thead>
              <tbody className="tnum">
                {rows.map((r, i) => (
                  <tr key={r.item} className="border-t border-line">
                    <td className="px-5 py-3.5">{r.item}</td>
                    <td className="px-3 py-3.5 text-right font-semibold">{r.sell}</td>
                    <td className="relative px-3 py-3.5 text-right">
                      <span className={owner ? "" : "invisible"}>{r.cost}</span>
                      <span className="tape" data-on={owner ? undefined : ""} style={{ transitionDelay: `${i * 60}ms` }} />
                      {!owner ? <span className="sr-only">Hidden for cashier</span> : null}
                    </td>
                    <td className="relative px-5 py-3.5 text-right text-leaf">
                      <span className={owner ? "" : "invisible"}>{r.margin}</span>
                      <span className="tape" data-on={owner ? undefined : ""} style={{ transitionDelay: `${i * 60 + 40}ms` }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="role-swap grid">
          <div className="role-card rounded-2xl border border-white/15 p-6" data-on={!owner ? "" : undefined} aria-hidden={owner}>
            <p className="font-display text-2xl font-bold">What Ama can do</p>
            <ul className="mt-5 space-y-3 text-white/80">
              <li className="flex gap-3"><Tick /> Ring up sales and print receipts</li>
              <li className="flex gap-3"><Tick /> Take cash, MoMo, Telecel Cash, AT Money and card</li>
              <li className="flex gap-3"><Cross /> See cost prices, supplier costs or profit</li>
              <li className="flex gap-3"><Cross /> Change stock counts or delete a sale</li>
            </ul>
          </div>
          <div className="theme-light role-card rounded-2xl bg-paper p-6 text-ink" data-on={owner ? "" : undefined} aria-hidden={!owner}>
            <p className="flex items-center gap-2 text-sm font-semibold text-leaf"><Star className="h-3.5 w-3.5" /> Today, all tills</p>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              <div><dt className="text-sm text-mute">Net margin</dt><dd className="tnum font-display text-3xl font-bold">38.6%</dd></div>
              <div><dt className="text-sm text-mute">Shift 2 shortage</dt><dd className="tnum font-display text-3xl font-bold">GH₵ 0</dd></div>
              <div><dt className="text-sm text-mute">Stock value</dt><dd className="tnum font-display text-xl font-bold">GH₵ 48,210</dd></div>
              <div><dt className="text-sm text-mute">Low stock</dt><dd className="font-display text-xl font-bold text-alert">3 items</dd></div>
            </dl>
            <p className="mt-5 text-sm text-mute">Example figures. The owner sees this on their phone, wherever they are.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-gold" aria-label="Allowed">
      <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Cross() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-alert" aria-label="Not allowed">
      <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
