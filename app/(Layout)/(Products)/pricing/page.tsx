import { HeroSection, FAQ, MarqueeSection, Pricing, HowItWorks } from "./cv-items";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

// Edit the metadata for the page
export const metadata: Metadata = {
  title: "CompClarity - Premium",
  description:
    "Discover your personal AI career companion. Get access to the best tools and resources to help you land your dream job.",
};

export default function CVPage() {
  return (
    <div className="flex min-h-screen w-full flex-col scroll-smooth pb-20">
      <HeroSection />
      <MarqueeSection />
      <Pricing />
      <HowItWorks />
      <FAQ />
    </div>
  );
}
