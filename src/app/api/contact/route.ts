import { site } from "@/lib/site";

type Lead = {
  name: string;
  business: string;
  location: string;
  phone: string;
  storeType: string;
  message?: string;
  company?: string; // honeypot
};

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Partial<Lead>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "We couldn't read that form. Please try again." }, { status: 400 });
  }

  // bots fill hidden fields; pretend it worked
  if (clean(body.company)) return Response.json({ ok: true, ref: "EC-0000" });

  const lead: Lead = {
    name: clean(body.name, 80),
    business: clean(body.business, 120),
    location: clean(body.location, 80),
    phone: clean(body.phone, 30),
    storeType: clean(body.storeType, 60),
    message: clean(body.message, 1500),
  };

  const missing = (["name", "business", "location", "phone", "storeType"] as const).filter((k) => !lead[k]);
  if (missing.length) {
    return Response.json({ error: "Please fill in every required field.", fields: missing }, { status: 422 });
  }
  if (lead.phone.replace(/\D/g, "").length < 9) {
    return Response.json({ error: "That phone number looks too short.", fields: ["phone"] }, { status: 422 });
  }

  const ref = `EC-${Date.now().toString(36).slice(-5).toUpperCase()}`;
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!key || !from) {
    // Not configured yet: be honest instead of pretending the email was sent.
    return Response.json(
      { error: "Our inbox isn't connected yet. Please send your request on WhatsApp instead.", unconfigured: true },
      { status: 503 },
    );
  }

  const text = [
    `New demo request ${ref}`,
    ``,
    `Name: ${lead.name}`,
    `Business: ${lead.business}`,
    `Location: ${lead.location}`,
    `Phone / WhatsApp: ${lead.phone}`,
    `Store type: ${lead.storeType}`,
    lead.message ? `\nNotes:\n${lead.message}` : "",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO_EMAIL || site.email],
      subject: `Demo request — ${lead.business} (${lead.location})`,
      text,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "We couldn't send that just now. Please try again or use WhatsApp." }, { status: 502 });
  }
  return Response.json({ ok: true, ref });
}
