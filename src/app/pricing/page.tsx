import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Section } from "@/components/ui/Section";
import { Estimator } from "@/components/interactive/Estimator";

export const metadata: Metadata = {
  title: "Pricing & cost estimator",
  description: "Estimate the cost of a POS kit, web shop and monthly care for your shop in Ghana cedis (GH₵), then request an official written quote.",
  alternates: { canonical: "/pricing" },
};

export default function Page() {
  return (
    <>
      <PageHero
        kicker="Pricing"
        colour="green"
        title="What would it cost for your shop?"
        lead="Answer four questions and see an estimated range in Ghana cedis. Your official written quote follows a free visit."
      />
      <Section labelledBy="est-title">
        <h2 id="est-title" className="sr-only">Cost estimator</h2>
        <Estimator />
      </Section>
      <CtaBanner title="Prefer to talk it through?" lead="A technician can visit, count your stock lines and give you a fixed written quote. The visit is free." />
    </>
  );
}
