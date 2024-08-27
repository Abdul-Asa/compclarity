import CTABadge from "@/components/ui/cta-badge";
import { Heading, Features, ContactForm, FAQ, Stats } from "./employer-items";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

// Edit the metadata for the page
// Redesign contact form
// Redefine routes
// Make the Inview a separate component
// Add the onclick function to CTA badge
export const metadata: Metadata = {
  title: "CompClarity - Tech Salaries in the UK and EU",
  description:
    "Your guide to fair pay from day one. Compare tech salaries across Europe and make informed career choices with comprehensive, community-driven data!",
};

export default function EmployerPage() {
  return (
    <main className="flex min-h-screen w-full flex-col scroll-smooth">
      <div className="mx-auto flex h-[calc(100vh-150px)] w-full flex-col items-center justify-center gap-5 p-6 md:px-0">
        <div className="group relative rounded-full border">
          <CTABadge
            intro="Ready to find your next great hire?"
            link="#contact"
            target="_self"
          />
        </div>
        <Heading />
        <Stats />
      </div>
      <Separator className="mt-10" />
      <Features />
      <ContactForm />
      <Separator className="my-10" />
      <FAQ />
    </main>
  );
}
