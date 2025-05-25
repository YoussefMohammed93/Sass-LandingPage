import { PricingHero } from "@/components/pricing-hero";
import { PricingPlans } from "@/components/pricing-plans";
import { PricingIncludedSection } from "@/components/pricing-included-section";

export default function PricingPage() {
  return (
    <main className="bg-secondary">
      <PricingHero />
      <PricingPlans />
      <PricingIncludedSection />
    </main>
  );
}
