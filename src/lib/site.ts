export const site = {
  name: "Every₵edi",
  plainName: "EveryCedi",
  domain: "everycedi.co",
  url: "https://everycedi.co",
  tagline: "The operating system for retail in Ghana",
  promise:
    "We protect every pesewa and account for every cedi. From the counter in your physical shop to the shopping cart on your customer's phone.",
  phoneDisplay: "+233 054 337 7390",
  phoneHref: "tel:+233543377390",
  email: "solutions@everycedi.co",
  city: "Accra, Ghana",
  whatsappNumber: "233543377390",
  whatsappMessage: "Hello Every₵edi, I would like to book a demo for my shop.",
};

export function whatsappLink(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const solutions = [
  {
    href: "/pos-hardware",
    title: "In-store POS & hardware",
    blurb: "Dual-screen tills, pure sine-wave UPS, audited registers.",
    colour: "red",
  },
  {
    href: "/ecommerce-sync",
    title: "E-commerce & live stock sync",
    blurb: "A web shop that knows what just sold at the counter.",
    colour: "gold",
  },
  {
    href: "/managed-services",
    title: "Monthly care & Google Ads",
    blurb: "Hosting, nightly backups, ads and a month-end report.",
    colour: "green",
  },
] as const;

export const nav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/hardware", label: "Hardware" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About" },
] as const;

export const storeTypes = [
  "Boutique",
  "Supermarket",
  "Pharmacy",
  "Wholesale",
  "Beauty bar",
  "General retail",
  "Hospitality / service",
] as const;
