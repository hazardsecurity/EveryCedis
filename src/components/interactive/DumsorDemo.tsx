"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/*
  "Cut the power": the room goes dark, the till stays lit on battery and
  the pure sine wave keeps flowing. The office-UPS square wave stutters.
*/
export function DumsorDemo() {
  const [off, setOff] = useState(false);
  return (
    <div className="theme-light dumsor relative overflow-hidden rounded-[28px] bg-chalk" data-off={off ? "" : undefined}>
      <div aria-hidden="true" className="dumsor-dark pointer-events-none absolute inset-0 bg-star" />
      <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <p className={`text-sm font-semibold transition-colors duration-300 ${off ? "text-gold" : "text-leaf"}`} aria-live="polite">
            {off ? "Mains off — running on UPS battery" : "Mains on — ECG supply"}
          </p>
          <h3 className={`mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.02em] transition-colors duration-300 sm:text-4xl ${off ? "text-white" : "text-ink"}`}>
            {off ? "The lights are out. The till is still selling." : "Try a power cut."}
          </h3>
          <p className={`mt-4 max-w-md transition-colors duration-300 ${off ? "text-white/70" : "text-mute"}`}>
            Ordinary office UPS units give a rough, stepped output. Touchscreens and printers hum, heat up and reset on it. A pure sine-wave UPS gives the same smooth power as the mains, so the queue keeps moving.
          </p>
          <Button className="mt-7" variant={off ? "gold" : "ink"} aria-pressed={off} onClick={() => setOff((o) => !o)}>
            {off ? "Bring the power back" : "Cut the power"}
          </Button>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl bg-paper p-5 shadow-[0_20px_40px_-30px_rgba(14,14,12,0.5)]">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Pure sine-wave UPS · Every₵edi kit</span>
              <span className="tnum text-leaf">{off ? "On battery" : "Charging"}</span>
            </div>
            <svg viewBox="0 0 300 60" className="mt-3 h-14 w-full" aria-hidden="true">
              <path className="wave-pure" d="M0 30 Q18.75 0 37.5 30 T75 30 T112.5 30 T150 30 T187.5 30 T225 30 T262.5 30 T300 30 T337.5 30 T375 30" fill="none" stroke="#006B3F" strokeWidth="3" />
            </svg>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-chalk">
              <div className="ups-bar h-full rounded-full bg-forest" />
            </div>
            <p className="mt-2 text-sm text-mute">Till, printer, scanner and cash drawer: <strong className="text-ink">running</strong></p>
          </div>
          <div className={`rounded-2xl p-5 transition-[background-color,opacity] duration-300 ${off ? "bg-white/10 text-white/70 opacity-70" : "bg-paper/80"}`}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Ordinary office UPS</span>
              <span className="text-alert">{off ? "Till restarting…" : "Stepped output"}</span>
            </div>
            <svg viewBox="0 0 300 60" className={`mt-3 h-14 w-full ${off ? "wave-stutter" : ""}`} aria-hidden="true">
              <path d="M0 30 H18 V10 H56 V30 H75 V50 H112 V30 H131 V10 H168 V30 H187 V50 H225 V30 H243 V10 H281 V30 H300" fill="none" stroke="#CE1126" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
