import type { Metadata } from "next";
import { ContactForm } from "@/components/interactive/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a free demo",
  description: "Book a free onsite demo of the Every₵edi POS, UPS and web shop. Call +233 054 337 7390, email solutions@everycedi.co, or chat on WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-4 pb-24 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8">
        <div>
          <Reveal immediate stagger>
            <p className="inline-flex items-center gap-2.5 text-sm font-semibold"><span className="h-3 w-3 rounded-[3px] bg-gold" />Contact &amp; demo booking</p>
            <h1 className="mt-5 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl">Book a free onsite demo.</h1>
            <p className="mt-5 max-w-xl text-lg text-mute">Tell us where your shop is. A technician will call to arrange a visit and show you the system working with your own products.</p>
          </Reveal>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-5 lg:pt-28">
          <div className="rounded-[24px] bg-star p-7 text-white dark:ring-1 dark:ring-white/12">
            <h2 className="font-display text-2xl font-bold">Talk to a technician</h2>
            <dl className="mt-6 space-y-4">
              <div><dt className="text-sm text-white/60">Phone</dt><dd><a href={site.phoneHref} className="tnum text-lg font-semibold hover:text-gold">{site.phoneDisplay}</a></dd></div>
              <div><dt className="text-sm text-white/60">Email</dt><dd><a href={`mailto:${site.email}`} className="break-all text-lg font-semibold hover:text-gold">{site.email}</a></dd></div>
              <div><dt className="text-sm text-white/60">Office</dt><dd className="text-lg font-semibold">{site.city}</dd></div>
            </dl>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="press mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-forest px-6 font-semibold hover:bg-canopy-2">
              Chat on WhatsApp
            </a>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-line">
            <iframe
              title="Map of Accra, Ghana"
              src="https://maps.google.com/maps?q=Accra%2C%20Ghana&z=12&output=embed"
              className="block aspect-[4/3] w-full grayscale-[0.3] dark:[filter:invert(0.9)_hue-rotate(180deg)_grayscale(0.3)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
