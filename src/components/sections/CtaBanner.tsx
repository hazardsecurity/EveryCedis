import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Weave } from "@/components/brand/Weave";
import { whatsappLink } from "@/lib/site";

export function CtaBanner({
  title = "Ready to modernise your shop? Talk to our technicians today.",
  lead = "We come to your shop, count what's on your shelves and show you the till working with your own products. No charge for the visit.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-paper px-4 pb-20 sm:px-6 md:pb-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] bg-star text-white dark:ring-1 dark:ring-white/12">
        <Weave className="h-2.5" />
        <div className="grid gap-10 px-6 py-14 sm:px-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-end md:py-20 lg:px-16">
          <div>
            <h2 id="cta-title" className="font-display text-[2.1rem] font-bold leading-[1.05] tracking-[-0.025em] text-balance sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-white/70">{lead}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch lg:flex-row lg:justify-end">
            <ButtonLink href="/contact">Book a free onsite demo</ButtonLink>
            <ButtonLink href={whatsappLink()} variant="outline-light">WhatsApp a technician</ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
