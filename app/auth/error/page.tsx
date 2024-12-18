"use client";

import { buttonVariants } from "@/components/ui/button";
import CTABadge from "@/components/ui/cta-badge";
import Magnet from "@/components/ui/magnet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthError() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message") ?? "Authentication failed";

  return (
    <div className="flex size-full flex-col items-center justify-center gap-5 p-2">
      <CTABadge main="Authentication Error" intro="Oops!" />

      <Magnet padding={40}>
        <h1 className="cursor-help text-6xl font-bold ">Error</h1>
      </Magnet>

      <p className="max-w-md text-center" role="alert">
        {errorMessage}
      </p>

      <div className="flex gap-4">
        <Link
          href="/auth/sign-in"
          className={cn(buttonVariants({ variant: "default" }))}
          aria-label="Try signing in again"
        >
          Try Again
        </Link>

        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))} aria-label="Return to home page">
          Return Home
        </Link>
      </div>
    </div>
  );
}
