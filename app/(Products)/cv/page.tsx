import { HeroSection, FAQ, MarqueeSection, Pricing, HowItWorks } from "./cv-items";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

// Edit the metadata for the page
export const metadata: Metadata = {
  title: "CompClarity - CV",
  description:
    "Streamline your hiring process and discover exceptional early career candidates with ease. We showcase your job listings to the right talent, so you can focus on the more exciting stuff.",
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
