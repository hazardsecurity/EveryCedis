# Every₵edi — everycedi.co

Marketing and lead-generation site for Every₵edi: POS hardware, live-synced web shops and monthly care for Ghanaian retail.

Next.js 16 (App Router, Cache Components) · Tailwind CSS v4 · no UI libraries. Every page prerenders as static HTML.

```bash
npm install
npm run dev
```

## Pages
`/` home · `/pos-hardware` · `/ecommerce-sync` · `/managed-services` · `/how-it-works` · `/hardware` · `/pricing` (cost estimator) · `/case-studies` · `/about` · `/contact` · `/brand` (brand guidelines)

## Before launch
- **Prices:** `src/lib/pricing.ts` holds placeholder GH₵ ranges. Replace them with the real price list.
- **Lead email:** set these environment variables (in a local `.env.local`, or in your host's settings — env files are never committed):
  - `RESEND_API_KEY` — Resend API key
  - `CONTACT_FROM_EMAIL` — a verified sender, e.g. `Every₵edi website <website@everycedi.co>`
  - `CONTACT_TO_EMAIL` — optional, defaults to `solutions@everycedi.co`

  Without them the form says the inbox isn't connected and offers WhatsApp.
- **Ìfẹ́mi case study:** add approved figures, owner quote and real photos (`/case-studies`, home showcase).
- **Hardware models:** confirm exact brands/specs on `/hardware`.

## Brand
Tokens live in `src/app/globals.css` (`@theme`). The full guideline — mark, colour roles and contrast, type, the Ledger Weave, the Black Star seal, motion and voice — is the `/brand` page.
