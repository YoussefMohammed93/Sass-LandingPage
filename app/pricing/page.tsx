import { PricingHero } from "@/components/pricing-hero";
import { PricingPlans } from "@/components/pricing-plans";

export default function PricingPage() {
  return (
    <main className="bg-secondary">
      <PricingHero />
      <PricingPlans />
    </main>
  );
}
