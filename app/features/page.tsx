import { FeaturesHero } from "@/components/features-hero";
import { FeaturesSoftware } from "@/components/features-software";

export default function FeaturesPage() {
  return (
    <main className="bg-secondary">
      <FeaturesHero />
      <FeaturesSoftware />
    </main>
  );
}
