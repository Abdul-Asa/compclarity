import { Metadata } from "next";
import { HeroSection, MarqueeSection, FeatureSection, TestimonialSection, SubscribeSection } from "./hero-items";

export const metadata: Metadata = {
  title: "CompClarity - Gateway to Compensation Transparency",
  description:
    "Your guide to fair pay from day one. Compare salaries across Europe and make informed career choices with comprehensive, community-driven data!",
};

export default function Landing() {
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <HeroSection />
      <MarqueeSection />
      <FeatureSection />
      <TestimonialSection />
      <SubscribeSection />
    </div>
  );
}
