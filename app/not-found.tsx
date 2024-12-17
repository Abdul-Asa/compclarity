import { buttonVariants } from "@/components/ui/button";
import CTABadge from "@/components/ui/cta-badge";
import Magnet from "@/components/ui/magnet";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex size-full flex-col items-center min-h-screen justify-center gap-5 p-2">
      <CTABadge main="This page's compensation is missing." intro="Hmm.." />
      <Magnet padding={40}>
        <h1 className="cursor-help text-8xl font-bold">404</h1>
      </Magnet>
      <p className="text-center">Oops! You’ve stumbled onto a 404. Let’s get you back to clarity.</p>
      <Link href="/" className={cn(buttonVariants())}>
        Return Home
      </Link>
    </div>
  );
}
