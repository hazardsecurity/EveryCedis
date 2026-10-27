import Link from "next/link";
import { Logo, Star } from "@/components/brand/Logo";
import { Weave } from "@/components/brand/Weave";
import { nav, site, solutions, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-star text-white dark:border-t dark:border-white/10">
      <Weave className="h-3" />
      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))] lg:px-8">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-white/70">{site.promise}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-gold">
            <Star className="h-3.5 w-3.5" /> Built and supported in {site.city}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white/50">Solutions</h2>
          <ul className="mt-4 space-y-2.5">
            {solutions.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-white/85 hover:text-gold">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white/50">Company</h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white/85 hover:text-gold">{n.label}</Link>
              </li>
            ))}
            {process.env.NODE_ENV !== "production" && (
              <li><Link href="/brand" className="text-white/85 hover:text-gold">Brand guidelines</Link></li>
            )}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white/50">Talk to a technician</h2>
          <ul className="mt-4 space-y-2.5">
            <li><a href={site.phoneHref} className="tnum text-white/85 hover:text-gold">{site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="break-all text-white/85 hover:text-gold">{site.email}</a></li>
            <li><a href={whatsappLink()} target="_blank" rel="noopener" className="text-white/85 hover:text-gold">Chat on WhatsApp</a></li>
            <li className="text-white/60">{site.city}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-4 py-6 text-sm text-white/50 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© <Year /> Every₵edi · {site.domain}</p>
          <p>Prices on this site are estimates in Ghana cedis (GH₵).</p>
        </div>
      </div>
    </footer>
  );
}

async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
