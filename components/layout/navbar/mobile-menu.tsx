"use client";

import { ModeToggle } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import NavigationItems from "./nav-links";

export function MobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="group flex items-center gap-2 lg:hidden select-none" aria-label="Menu">
      <ModeToggle />
      <button
        className="flex relative aspect-square h-11 list-none"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle menu"
      >
        <div
          className={cn(
            "h-[2.5px] w-5 bg-black dark:bg-white rounded-full absolute transition-all duration-200 top-1/2 left-1/2 -translate-x-1/2",
            isMobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[4px]"
          )}
        />
        <div
          className={cn(
            "h-[2.5px] w-5 bg-black dark:bg-white rounded-full absolute transition-all duration-200 top-1/2 left-1/2 -translate-x-1/2",
            isMobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[4px]"
          )}
        />
      </button>
      <div
        className={cn(
          "absolute z-40 inset-x-0 flex flex-col justify-center px-4 bg-white dark:bg-black top-[77px]",
          "pointer-events-auto transition-all border-b-2",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <NavigationItems mobile />
        <div className="flex w-full justify-center border-t">
          <Link
            href="/auth/sign-in"
            className="text-lg font-medium py-5 w-full text-center hover:bg-accent"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
