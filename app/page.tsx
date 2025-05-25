import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSectionOne } from "@/components/features-section-one";
import { FeaturesSectionTwo } from "@/components/features-section-two";
import { CalloutBlockSection } from "@/components/callout-block-section";
import { FeaturesSectionThree } from "@/components/features-section-three";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="bg-secondary">
        <HeroSection />
        <FeaturesSectionOne />
        <FeaturesSectionTwo />
        <CalloutBlockSection />
        <FeaturesSectionThree />
      </main>
    </>
  );
}
