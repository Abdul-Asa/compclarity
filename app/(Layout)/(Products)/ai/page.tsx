import { HeroSection, FAQ, MarqueeSection, Pricing, HowItWorks } from "./cv-items";
import { Metadata } from "next";
import { getUser } from "@/lib/actions/server-actions";

// Edit the metadata for the page
export const metadata: Metadata = {
  title: "CompClarity - Premium",
  description:
    "Discover your personal AI career companion. Get access to the best tools and resources to help you land your dream job.",
};

export default async function CVPage() {
  const user = await getUser();
  return (
    <div className="flex min-h-screen w-full flex-col scroll-smooth pb-20">
      <HeroSection />
      <MarqueeSection />
      <Pricing user={user} />
      <HowItWorks />
      <FAQ />
    </div>
  );
}
