"use client";

import Link from "next/link";
import { Book, ChevronDown, Computer, FileText, PoundSterling } from "lucide-react";
import { navigationMenuTriggerStyle } from "../../ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

export type NavLink = {
  title: string;
  href?: string;
  description?: string;
  icon?: LucideIcon;
  children?: NavLink[];
};

type RenderLinkProps = {
  link: NavLink;
  mobile?: boolean;
  onLinkClick?: () => void;
};

export const navLinks: NavLink[] = [
  {
    title: "Salaries",
    children: [
      { title: "Tech", href: "/tech", description: "Latest tech salaries", icon: Computer },
      { title: "Finance", href: "/finance", description: "Latest finance salaries", icon: PoundSterling },
    ],
  },
  { title: "Jobs", href: "/jobs" },
  { title: "Tracker", href: "/tracker" },
  {
    title: "Services",
    children: [
      { title: "CV Crafting", href: "/cv", description: "Craft the perfect CV", icon: FileText },
      // { title: "CV Generation", href: "/cv-generate", description: "Generate a CV", icon: FileText },
      {
        title: "Cover Letter",
        href: "/cover-letter",
        description: "Craft the perfect cover letter",
        icon: FileText,
      },
      { title: "Tech Internship Guide", href: "/tech-guide", description: "Get your first SWE internship", icon: Book },
    ],
  },
];

export const renderNavLink = ({ link, mobile, onLinkClick }: RenderLinkProps) => {
  if (!link.children && mobile) {
    return (
      <Link
        key={link.title}
        href={link.href || "#"}
        className="w-full py-5 pl-10 text-lg font-medium border-b md:pl-0"
        onClick={onLinkClick}
      >
        {link.icon && <link.icon className="w-4 h-4 mr-2" />}
        {link.title}
      </Link>
    );
  }

  if (!link.children) {
    return (
      <Link key={link.title} href={link.href || "#"} className={navigationMenuTriggerStyle()} onClick={onLinkClick}>
        {link.icon && <link.icon className="w-4 h-4 mr-2" />}
        {link.title}
      </Link>
    );
  }

  if (mobile) {
    return (
      <Accordion type="multiple" className="w-full">
        <AccordionItem value={`item-${link.title}`}>
          <AccordionTrigger className="w-full py-5 text-lg font-medium text-center md:justify-center">
            {link.title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col pb-0">
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href || "#"}
                className={cn("text-lg font-medium py-5 w-full text-center", "border-t")}
                onClick={onLinkClick}
              >
                {child.title}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Popover key={link.title}>
      <PopoverTrigger className={navigationMenuTriggerStyle()}>
        {link.title}
        <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3 w-[300px]">
        {link.children.map((child) => (
          <Link
            key={child.href}
            href={child.href || "#"}
            className="flex items-center w-full gap-3 p-3 transition-all duration-200 border rounded-sm border-border hover:border-primary hover:bg-primary-light/30"
            onClick={onLinkClick}
          >
            {child.icon && <child.icon className="mr-1 size-8" />}
            <div className="flex flex-col">
              <div className="font-medium">{child.title}</div>
              <p className="text-sm leading-tight font-open text-muted-foreground">{child.description}</p>
            </div>
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const NavigationItems = ({ mobile = false }: { mobile?: boolean }) => {
  return (
    <ul
      className={cn(
        "list-none",
        mobile ? "flex flex-col items-center md:text-center w-full" : "hidden lg:flex items-center space-x-1"
      )}
    >
      {navLinks.map((link) => (
        <React.Fragment key={link.title}>{renderNavLink({ link, mobile })}</React.Fragment>
      ))}
    </ul>
  );
};

export default NavigationItems;
