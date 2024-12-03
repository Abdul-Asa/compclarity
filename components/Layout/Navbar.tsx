"use client";
import { Book, ChevronDown, Computer, FileText, PoundSterling } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { User } from "@supabase/supabase-js";
import { sendGAEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger, PopoverLink } from "../ui/popover";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ModeToggle } from "./ThemeProvider";

const Navbar = ({ user }: { user?: User | null }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  // Close the menu when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPopoverOpen(false);
    setIsPopoverOpen2(false);
  }, [pathname]);

  const trackNav = (label: string) =>
    sendGAEvent([
      {
        action: "click",
        category: "navbar",
        label: label,
      },
    ]);

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-sm bg-background/90">
      <nav className="flex items-center justify-between px-2 py-4 md:px-8 ">
        <Link href="/" replace className="flex items-center" onClick={() => trackNav("logo")}>
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={55}
            height={29}
            className="mr-2 cursor-pointer hover:opacity-75 dark:invert"
          />
          <h1 className="hidden text-[24px] font-semibold md:inline-block">CompClarity</h1>
        </Link>
        <ul className="group hidden flex-1 list-none items-center justify-center space-x-1 lg:flex">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger className={navigationMenuTriggerStyle()}>
              Salaries{" "}
              <ChevronDown
                className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-3">
              <PopoverLink
                href="/tech"
                icon={Computer}
                title="Tech"
                description="Latest tech salaries"
                onClick={() => trackNav("tech_salaries")}
              />
              <PopoverLink
                href="/finance"
                icon={PoundSterling}
                title="Finance"
                description="Latest finance salaries"
                onClick={() => trackNav("finance_salaries")}
              />
            </PopoverContent>
          </Popover>
          <Link href="/jobs" className={navigationMenuTriggerStyle()} onClick={() => trackNav("jobs")}>
            Jobs
          </Link>
          <Link href="/tracker" className={navigationMenuTriggerStyle()} onClick={() => trackNav("app_tracker")}>
            Tracker
          </Link>
          <Popover open={isPopoverOpen2} onOpenChange={setIsPopoverOpen2}>
            <PopoverTrigger className={navigationMenuTriggerStyle()}>
              Services{" "}
              <ChevronDown
                className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-3">
              <PopoverLink
                href="/cv"
                icon={FileText}
                title="CV Crafting"
                description="Craft a perfect CV for your dream job"
                onClick={() => trackNav("cv_service")}
              />
              <PopoverLink
                href="/cover-letter"
                icon={FileText}
                title="Cover Letter"
                description="Craft a perfect cover letter for your dream job"
                onClick={() => trackNav("cover_letter")}
              />
              <PopoverLink
                href="/tech-guide"
                icon={Book}
                title="Tech Internship Guide"
                description="Get your first SWE internship"
                onClick={() => trackNav("e_book")}
              />
            </PopoverContent>
          </Popover>
        </ul>

        <div className="hidden w-[15%] justify-end gap-2 lg:flex">
          <ModeToggle />
          <Button asChild size={"lg"} variant={"outline"}>
            {user ? (
              <Link href="/account" onClick={() => trackNav("account")}>
                Account
              </Link>
            ) : (
              <Link href="/login" onClick={() => trackNav("login")}>
                Login
              </Link>
            )}
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="group flex items-center  lg:hidden select-none" aria-label="Menu">
          <ModeToggle />
          <button
            className="flex relative aspect-square h-[44px] list-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div
              className={cn(
                "h-[2.5px] w-5 bg-black dark:bg-white rounded-full absolute transition-all duration-200 top-1/2 left-1/2 -translate-x-1/2",
                isMobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[4px]"
              )}
            ></div>
            <div
              className={cn(
                "h-[2.5px] w-5 bg-black dark:bg-white rounded-full absolute transition-all duration-200 top-1/2 left-1/2 -translate-x-1/2",
                isMobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[4px]"
              )}
            ></div>
          </button>
          <div
            className={cn(
              "absolute z-40 inset-x-0 flex flex-col justify-center px-4 bg-white dark:bg-black top-[77px]",
              "pointer-events-auto transition-all border-b-2",
              isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <ul className="flex flex-col items-center md:text-center w-full">
              <Accordion type="multiple" className="w-full mt-3">
                <AccordionItem value="item-0">
                  <AccordionTrigger className="text-lg font-medium py-5 w-full md:justify-center  text-center">
                    Salaries
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col md:items-center pb-0 w-full">
                    <Link
                      href="/tech"
                      className="text-lg font-medium  pl-10 md:pl-0 py-5 border-y w-full "
                      onClick={() => trackNav("tech_salaries")}
                    >
                      Tech
                    </Link>
                    <Link
                      href="/finance"
                      className="text-lg  pl-10 md:pl-0 font-medium py-5 w-full "
                      onClick={() => trackNav("finance_salaries")}
                    >
                      Finance
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Link href="/jobs" className="text-lg font-medium py-5 border-b w-full" onClick={() => trackNav("jobs")}>
                Jobs
              </Link>
              <Link
                href="/tracker"
                className="text-lg font-medium py-5 border-b w-full"
                onClick={() => trackNav("app_tracker")}
              >
                Tracker
              </Link>
              <Accordion type="multiple" className="w-full mt-3">
                <AccordionItem value="item-0">
                  <AccordionTrigger className="text-lg font-medium py-5 w-full md:justify-center  text-center">
                    Services
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col md:items-center pb-0 w-full">
                    <Link
                      href="/cv"
                      className="text-lg font-medium  pl-10 md:pl-0 py-5 border-y w-full "
                      onClick={() => trackNav("cv_service")}
                    >
                      CV Crafting
                    </Link>
                    <Link
                      href="/tech-guide"
                      className="text-lg  pl-10 md:pl-0 font-medium py-5 w-full "
                      onClick={() => trackNav("e_book")}
                    >
                      Tech Internship Guide
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ul>
            <div className="flex w-full md:text-center justify-center">
              {user ? (
                <Link href="/account" className="text-lg font-medium py-5  w-full" onClick={() => trackNav("account")}>
                  Account
                </Link>
              ) : (
                <Link href="/login" className="text-lg font-medium py-5  w-full" onClick={() => trackNav("login")}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
