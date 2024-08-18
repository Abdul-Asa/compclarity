"use client";
import { Computer, PoundSterling } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { User } from "@supabase/supabase-js";
import { sendGAEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import SalaryDropdownMenu from "../SalaryDropdownMenu";

const Navbar = ({ user }: { user?: User | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const pathname = usePathname();
  // Close the menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsPopoverOpen(false);
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
    <nav className="relative z-50 w-full border-white">
      <div className="flex w-full items-center justify-between border-b bg-white px-2 py-5 md:px-8">
        <Link
          href="/"
          replace
          className="flex items-center"
          onClick={() => trackNav("logo")}
        >
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={55}
            height={29}
            className="mr-2 cursor-pointer hover:opacity-75"
          />
          <h1 className="hidden text-[24px] font-semibold md:inline-block">
            CompClarity
          </h1>
        </Link>
        <ul className="group hidden flex-1 list-none items-center justify-center space-x-1 lg:flex">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger className={navigationMenuTriggerStyle()}>
              Salaries
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-4">
              <Link
                href="/tech"
                className="flex w-full flex-col gap-3 rounded-md border border-transparent bg-gradient-to-bl from-muted/20 to-muted p-3 hover:border-gray-300 hover:via-emerald-50 hover:to-emerald-200"
                onClick={() => trackNav("tech_salaries")}
              >
                <div className="flex text-lg font-medium">
                  <Computer className="mr-2 size-6" />
                  Tech
                </div>
                <p className="font-open text-sm leading-tight text-muted-foreground">
                  Latest tech salaries
                </p>
              </Link>
              <Link
                href="/finance"
                className="flex w-full flex-col gap-3 rounded-md border border-transparent bg-gradient-to-bl from-muted/20 to-muted p-3 hover:border-gray-300 hover:via-emerald-50 hover:to-emerald-200"
                onClick={() => trackNav("finance_salaries")}
              >
                <div className="flex text-lg font-medium">
                  <PoundSterling className="mr-2 size-6" />
                  Finance
                </div>
                <p className="font-open text-sm leading-tight text-muted-foreground">
                  Latest finance salaries
                </p>
              </Link>
            </PopoverContent>
          </Popover>
          <Link
            href="/jobs"
            className={navigationMenuTriggerStyle()}
            onClick={() => trackNav("jobs")}
          >
            Jobs
          </Link>
          <Link
            href="/tracker"
            className={navigationMenuTriggerStyle()}
            onClick={() => trackNav("app_tracker")}
          >
            Tracker
          </Link>
          {/* <Popover>
            <PopoverTrigger className={navigationMenuTriggerStyle()}>
              Resources
            </PopoverTrigger>
            <PopoverContent className="flex w-fit flex-col gap-1">
              <Link
                href="https://www.techacademia.co.uk"
                onClick={() => trackNav("tech_academia")}
                target="_blank"
              >
                <div className="flex justify-center border-b p-2 text-lg hover:text-emerald-700">
                  <School className="mr-3 size-6" />
                  Tech Academia
                </div>
              </Link>
              <Link
                href="https://discord.gg/AuAvjpTTnm"
                onClick={() => trackNav("discord")}
                target="_blank"
              >
                <div className="flex justify-center border-b p-2 text-lg hover:text-emerald-700">
                  <FaDiscord className="mr-3 size-6" />
                  Discord
                </div>
              </Link>
              <Link
                href="https://compclarity.substack.com/"
                onClick={() => trackNav("blog")}
                target="_blank"
              >
                <div className="flex justify-center border-b p-2 text-lg hover:text-emerald-700">
                  <Newspaper className="mr-3 size-6" />
                  Blog
                </div>
              </Link>
            </PopoverContent>
          </Popover> */}
          <Link
            href="/about"
            className={navigationMenuTriggerStyle()}
            onClick={() => trackNav("about")}
          >
            About
          </Link>
        </ul>

        <div className="hidden w-[15%] justify-end lg:flex">
          <Button
            asChild
            variant={"outline"}
            size={"lg"}
            className="border-2 border-black hover:bg-emerald-100"
          >
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

        <div className="flex items-center lg:hidden">
          <Button
            variant={"ghost"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Mobile Menu"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute left-0 top-full flex w-full flex-col items-center gap-4 border-y border-b-2 bg-white py-4 shadow-border lg:hidden">
          <SalaryDropdownMenu />
          <Link href="/jobs" onClick={() => trackNav("jobs")}>
            <span className="font-bold hover:underline">Jobs</span>
          </Link>
          <Link href="/tracker" onClick={() => trackNav("app_tracker")}>
            <span className="font-bold hover:underline">Tracker</span>
          </Link>
          {/* <ResourcesDropdownMenu /> */}
          <Link href="/about" onClick={() => trackNav("about")}>
            <span className="font-bold hover:underline">About</span>
          </Link>
          {user ? (
            <Link href="/account" onClick={() => trackNav("account")}>
              <span className="font-bold hover:underline">Account</span>
            </Link>
          ) : (
            <Link href="/login" onClick={() => trackNav("login")}>
              <span className="font-bold hover:underline">Login</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
