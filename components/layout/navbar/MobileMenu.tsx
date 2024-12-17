"use client";

import { ModeToggle } from "@/components/providers";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import NavigationItems from "./NavLinks";

export function MobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="group flex items-center lg:hidden select-none" aria-label="Menu">
      <ModeToggle />
      <button
        className="flex relative aspect-square h-[44px] list-none"
        onClick={handleToggleMenu}
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
        {/* <NavigationItems mobile /> */}
        <div className="flex w-full justify-center border-t">
          <Link
            href="/login"
            className="text-lg font-medium py-5 w-full text-center hover:bg-accent"
            onClick={handleToggleMenu}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
