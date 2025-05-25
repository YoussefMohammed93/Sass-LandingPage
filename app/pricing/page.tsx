import { PricingHero } from "@/components/pricing-hero";
import { PricingPlans } from "@/components/pricing-plans";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { PricingIncludedSection } from "@/components/pricing-included-section";
import { CalloutBlockSectionPricingOne } from "@/components/callout-block-section-pricing-one";
import { CalloutBlockSectionPricingTwo } from "@/components/callout-block-section-pricing-two";

export default function PricingPage() {
  return (
    <main className="bg-secondary">
      <PricingHero />
      <PricingPlans />
      <PricingIncludedSection />
      <CalloutBlockSectionPricingOne />
      <HowItWorksSection />
      <CalloutBlockSectionPricingTwo />
    </main>
  );
}
