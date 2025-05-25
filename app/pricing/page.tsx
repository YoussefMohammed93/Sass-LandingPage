import { PricingHero } from "@/components/pricing-hero";
import { PricingPlans } from "@/components/pricing-plans";
import { PricingIncludedSection } from "@/components/pricing-included-section";
import { CalloutBlockSectionPricingOne } from "@/components/callout-block-section-pricing-one";

export default function PricingPage() {
  return (
    <main className="bg-secondary">
      <PricingHero />
      <PricingPlans />
      <PricingIncludedSection />
      <CalloutBlockSectionPricingOne />
    </main>
  );
}
