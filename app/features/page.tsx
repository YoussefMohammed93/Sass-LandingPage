import { FeaturesHero } from "@/components/features-hero";
import { FeaturesSoftware } from "@/components/features-software";
import { FeaturesIconsGridSection } from "@/components/features-icons-grid";

export default function FeaturesPage() {
  return (
    <main className="bg-secondary">
      <FeaturesHero />
      <FeaturesSoftware />
      <FeaturesIconsGridSection />
    </main>
  );
}
