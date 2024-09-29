import { HeroSection, FAQ, MarqueeSection, Pricing, HowItWorks } from "./cv-items";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

// Edit the metadata for the page
export const metadata: Metadata = {
  title: "CompClarity - CV Writing Service",
  description:
    "Our CV writing service is designed to help you stand out in the job market. Our team of experts will work with you to create a CV that highlights your skills and experience, and makes you stand out from the competition",
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
