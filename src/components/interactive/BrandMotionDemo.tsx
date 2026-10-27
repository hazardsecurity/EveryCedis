"use client";

import { useState } from "react";
import { Odometer } from "@/components/ui/Odometer";
import { Button } from "@/components/ui/Button";

const totals = ["65.00", "95.00", "335.00", "1,240.50"];

export function BrandMotionDemo() {
  const [i, setI] = useState(0);
  const [taped, setTaped] = useState(true);
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-2xl border border-line p-6">
        <p className="text-sm font-semibold text-forest">Odometer · 520ms ease-in-out</p>
        <p className="mt-4 font-display text-5xl font-bold">GH₵ <Odometer value={totals[i]} /></p>
        <p className="mt-3 text-mute">Only the digits that change roll. Used for totals, stock counts and estimates.</p>
        <Button variant="ink" className="mt-5" onClick={() => setI((n) => (n + 1) % totals.length)}>Ring up the next item</Button>
      </div>
      <div className="rounded-2xl border border-line p-6">
        <p className="text-sm font-semibold text-forest">Redaction tape · 340ms in, 160ms out</p>
        <div className="relative mt-4 inline-block font-display text-5xl font-bold">
          <span className={taped ? "invisible" : ""}>37.5%</span>
          <span className="tape" style={{ inset: "0.25rem -0.25rem" }} data-on={taped ? "" : undefined} />
        </div>
        <p className="mt-3 text-mute">What a role can&apos;t see is covered, not deleted — the layout never jumps.</p>
        <Button variant="ink" className="mt-5" aria-pressed={!taped} onClick={() => setTaped((t) => !t)}>{taped ? "Sign in as owner" : "Back to cashier"}</Button>
      </div>
    </div>
  );
}
