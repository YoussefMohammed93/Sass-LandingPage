import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSectionOne } from "@/components/features-section-one";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="bg-secondary">
        <HeroSection />
        <FeaturesSectionOne />
      </main>
    </>
  );
}
