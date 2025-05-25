import { FeaturesHero } from "@/components/features-hero";
import { FeaturesSoftware } from "@/components/features-software";
import { FeaturesBusiness } from "@/components/features-business";
import { FeaturesIconsGridSection } from "@/components/features-icons-grid";
import { CalloutBlockSectionFeaturesOne } from "@/components/callout-block-section-features-one";
import { CalloutBlockSectionFeaturesTwo } from "@/components/callout-block-section-features-two";

export default function FeaturesPage() {
  return (
    <main className="bg-secondary">
      <FeaturesHero />
      <FeaturesSoftware />
      <FeaturesIconsGridSection />
      <CalloutBlockSectionFeaturesOne />
      <FeaturesBusiness />
      <CalloutBlockSectionFeaturesTwo />
    </main>
  );
}
