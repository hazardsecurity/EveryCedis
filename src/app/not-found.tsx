import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1240px] flex-col items-start px-4 py-28 sm:px-6 lg:px-8">
      <p className="tnum font-mono text-sm text-mute">Item not found · 404</p>
      <h1 className="mt-4 font-display text-5xl font-bold tracking-[-0.03em] sm:text-6xl">This page isn&apos;t on the shelf.</h1>
      <p className="mt-4 max-w-xl text-lg text-mute">It may have moved, or the link has a typo. Everything else is accounted for.</p>
      <ButtonLink href="/" className="mt-8">Back to the home page</ButtonLink>
    </section>
  );
}
