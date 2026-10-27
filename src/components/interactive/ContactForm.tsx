"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Star } from "@/components/brand/Logo";
import { storeTypes, whatsappLink } from "@/lib/site";

type State = "idle" | "sending" | "printing" | "done" | "error";
type Fields = { name: string; business: string; location: string; phone: string; storeType: string; message: string };

const labels: Record<keyof Omit<Fields, "message">, string> = {
  name: "Your name",
  business: "Business name",
  location: "Location",
  phone: "Phone / WhatsApp",
  storeType: "Store type",
};

/*
  Submit = the request prints as a receipt. The button label rolls
  (Book my demo → Sending → Printing), and on success the form is replaced by a
  receipt that feeds out of the top edge line by line. Held until the server answers.
*/
export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [bad, setBad] = useState<string[]>([]);
  const [ref, setRef] = useState("");
  const [data, setData] = useState<Fields | null>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  // ?type=&note= come from the pricing estimator. Prefill the (uncontrolled) fields after
  // mount so the page itself stays fully static.
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const q = new URLSearchParams(window.location.search);
    const type = q.get("type");
    const note = q.get("note");
    const select = form.elements.namedItem("storeType") as HTMLSelectElement | null;
    const text = form.elements.namedItem("message") as HTMLTextAreaElement | null;
    if (type && select && storeTypes.includes(type as (typeof storeTypes)[number])) select.value = type;
    if (note && text && !text.value) text.value = `Estimator: ${note}`;
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const fd = new FormData(e.currentTarget);
    const f = Object.fromEntries(fd) as unknown as Fields & { company?: string };
    const missing = (Object.keys(labels) as (keyof typeof labels)[]).filter((k) => !String(f[k] ?? "").trim());
    if (missing.length) {
      setBad(missing);
      setError(`Please add: ${missing.map((m) => labels[m].toLowerCase()).join(", ")}.`);
      setState("error");
      requestAnimationFrame(() => errRef.current?.focus());
      return;
    }
    setBad([]);
    setError(null);
    setData(f);
    setState("sending");
    const started = performance.now();
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBad(json.fields ?? []);
        setError(json.error ?? "Something went wrong. Please try again or use WhatsApp.");
        setState("error");
        requestAnimationFrame(() => errRef.current?.focus());
        return;
      }
      setRef(json.ref);
      // keep "Sending" on screen long enough to read, then print
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wait = reduced ? 0 : Math.max(0, 500 - (performance.now() - started));
      window.setTimeout(() => {
        setState("printing");
        window.setTimeout(() => setState("done"), reduced ? 0 : 1300);
      }, wait);
    } catch {
      setError("You seem to be offline. Check your data connection, or send it on WhatsApp.");
      setState("error");
    }
  }

  const waText = data
    ? `Hello Every₵edi, I would like to book a demo for my shop.\n\nName: ${data.name}\nBusiness: ${data.business}\nLocation: ${data.location}\nStore type: ${data.storeType}`
    : undefined;

  if (state === "printing" || state === "done") {
    return (
      <div className="relative">
        <div className="h-3 rounded-full bg-star" aria-hidden="true" />
        <div className="relative -mt-1.5 overflow-hidden px-4">
          <div className="print-out receipt-edge mx-auto max-w-md bg-white px-6 pb-10 pt-6 font-mono text-[14px] leading-7 shadow-[0_30px_50px_-30px_rgba(14,14,12,0.45)] ring-1 ring-line" data-state={state}>
            <p className="text-center font-bold">DEMO REQUEST RECEIVED</p>
            <p className="tnum text-center text-mute">Ref {ref}</p>
            <p className="my-2 border-b border-dashed border-star/40" />
            <p className="flex justify-between gap-4"><span>Name</span><span className="truncate">{data?.name}</span></p>
            <p className="flex justify-between gap-4"><span>Business</span><span className="truncate">{data?.business}</span></p>
            <p className="flex justify-between gap-4"><span>Location</span><span className="truncate">{data?.location}</span></p>
            <p className="flex justify-between gap-4"><span>Store</span><span className="truncate">{data?.storeType}</span></p>
            <p className="my-2 border-b border-dashed border-star/40" />
            <p>A technician will call or WhatsApp you on <span className="tnum">{data?.phone}</span> within one working day.</p>
            <p className="mt-4 flex items-center justify-center gap-2 rounded-md bg-gold py-1.5 font-bold text-star">
              <Star className="h-3.5 w-3.5" /> Medaase — thank you
            </p>
          </div>
        </div>
        <p className="sr-only" role="status">Demo request received. Reference {ref}.</p>
      </div>
    );
  }

  const sending = state === "sending";
  const field = (k: string) =>
    `mt-2 block w-full rounded-xl border-2 bg-white px-4 py-3 text-[16px] outline-none transition-[border-color,box-shadow] duration-150 focus:border-star focus:shadow-[0_0_0_4px_rgba(252,209,22,0.55)] ${
      bad.includes(k) ? "border-red" : "border-line"
    }`;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={error ? "form-error" : undefined}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block font-semibold">
          {labels.name}
          <input name="name" autoComplete="name" className={field("name")} aria-invalid={bad.includes("name")} />
        </label>
        <label className="block font-semibold">
          {labels.business}
          <input name="business" autoComplete="organization" className={field("business")} aria-invalid={bad.includes("business")} />
        </label>
        <label className="block font-semibold">
          {labels.location}
          <input name="location" placeholder="e.g. East Legon, Osu, Kumasi" className={field("location")} aria-invalid={bad.includes("location")} />
        </label>
        <label className="block font-semibold">
          {labels.phone}
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="024 000 0000" className={`${field("phone")} tnum`} aria-invalid={bad.includes("phone")} />
        </label>
      </div>
      <label className="block font-semibold">
        {labels.storeType}
        <select name="storeType" defaultValue="" className={`${field("storeType")} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 12%22><path d=%22M2 4.5l4 3.5 4-3.5%22 fill=%22none%22 stroke=%22%230e0e0c%22 stroke-width=%221.6%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`} aria-invalid={bad.includes("storeType")}>
          <option value="" disabled>Choose one</option>
          {storeTypes.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label className="block font-semibold">
        Anything we should know? <span className="font-normal text-mute">(optional)</span>
        <textarea name="message" rows={4} className={field("message")} />
      </label>
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {error ? (
        <p id="form-error" ref={errRef} tabIndex={-1} role="alert" className="rounded-xl bg-red/10 px-4 py-3 text-[0.95rem] text-red-deep">
          {error}{" "}
          <a href={whatsappLink(waText)} target="_blank" rel="noopener" className="font-semibold underline underline-offset-4">Send on WhatsApp</a>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="press focus-dark inline-flex min-h-13 w-full items-center justify-center rounded-full bg-gold px-7 py-4 font-semibold text-star shadow-[0_1px_0_#0e0e0c] hover:bg-[#ffdb3d] disabled:cursor-progress sm:w-auto"
      >
        <span className="roll grid overflow-hidden">
          <span data-pos={sending ? "leaving" : "current"}>Book my free demo</span>
          <span data-pos={sending ? "current" : "waiting"} className="inline-flex items-center gap-2">
            <span className="spin h-3.5 w-3.5 rounded-full border-2 border-star border-r-transparent" aria-hidden="true" /> Sending your request
          </span>
        </span>
      </button>
      <p className="text-sm text-mute">We only use your details to arrange the visit. No spam, no sharing.</p>
    </form>
  );
}
