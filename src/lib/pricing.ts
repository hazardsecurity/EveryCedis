/*
  INDICATIVE PRICING — PLACEHOLDER FIGURES.
  These ranges are illustrative so the estimator works. Every₵edi must replace
  them with its real price list before launch. All amounts in Ghana cedis (GH₵).
*/

export const businessTypes = [
  { id: "boutique", label: "Boutique", note: "Clothing, shoes, accessories", factor: 1 },
  { id: "supermarket", label: "Supermarket", note: "High-volume grocery checkout", factor: 1.25 },
  { id: "pharmacy", label: "Pharmacy", note: "Batch and expiry tracking", factor: 1.15 },
  { id: "general", label: "General retail", note: "Mini-marts, hardware, electronics", factor: 1.05 },
] as const;

export const counterOptions = [
  { id: 1, label: "1 counter" },
  { id: 2, label: "2 counters" },
  { id: 3, label: "3 or more" },
] as const;

export const careTiers = [
  { id: "none", label: "No monthly plan", note: "Hosting and backups only if you add a web shop", monthly: [0, 0] },
  { id: "care", label: "Monthly care", note: "Hosting, nightly backups, helpdesk, catalogue updates", monthly: [450, 700] },
  { id: "growth", label: "Care + Google Ads", note: "Everything in care, plus ads managed and a month-end report", monthly: [1200, 1900] },
] as const;

/** One-off kit per checkout counter: terminal, UPS, printer, scanner, drawer, install. */
export const kitPerCounter: [number, number] = [9500, 13500];
/** One-off software setup, catalogue loading and staff training. */
export const setupFee: [number, number] = [2500, 4000];
/** One-off live-synced web shop build. */
export const webShop: [number, number] = [6000, 12000];
/** Hosting for a web shop when no monthly plan is chosen. */
export const webHostingOnly: [number, number] = [250, 350];

export type Choice = {
  type: (typeof businessTypes)[number]["id"];
  counters: (typeof counterOptions)[number]["id"];
  web: boolean;
  care: (typeof careTiers)[number]["id"];
};

const round = (n: number) => Math.round(n / 50) * 50;

export function estimate(c: Choice) {
  const factor = businessTypes.find((b) => b.id === c.type)!.factor;
  const counters = c.counters; // "3 or more" is estimated at 3
  const lo = kitPerCounter[0] * counters + setupFee[0] * factor + (c.web ? webShop[0] : 0);
  const hi = kitPerCounter[1] * counters + setupFee[1] * factor + (c.web ? webShop[1] : 0);
  const tier = careTiers.find((t) => t.id === c.care)!;
  let mLo: number = tier.monthly[0];
  let mHi: number = tier.monthly[1];
  if (c.care === "none" && c.web) {
    mLo = webHostingOnly[0];
    mHi = webHostingOnly[1];
  }
  return { oneOff: [round(lo), round(hi)] as const, monthly: [round(mLo), round(mHi)] as const };
}
