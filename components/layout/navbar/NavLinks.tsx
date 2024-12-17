"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Book, ChevronDown, Computer, FileText, PoundSterling } from "lucide-react";
import { navigationMenuTriggerStyle } from "../../ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

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
      { title: "CV Crafting", href: "/cv", description: "Craft a perfect CV for your dream job", icon: FileText },
      {
        title: "Cover Letter",
        href: "/cover-letter",
        description: "Craft a perfect cover letter for your dream job",
        icon: FileText,
      },
      { title: "Tech Internship Guide", href: "/tech-guide", description: "Get your first SWE internship", icon: Book },
    ],
  },
];

export const renderNavLink = ({ link, mobile, onLinkClick }: RenderLinkProps) => {
  if (!link.children) {
    return (
      <Link
        key={link.title}
        href={link.href || "#"}
        className={cn(mobile ? "flex w-full items-center p-4 text-lg hover:bg-accent" : navigationMenuTriggerStyle())}
        onClick={onLinkClick}
      >
        {link.icon && <link.icon className="mr-2 h-4 w-4" />}
        {link.title}
      </Link>
    );
  }

  if (mobile) {
    return (
      <div key={link.title} className="w-full">
        <div className="flex w-full items-center p-4 text-lg">
          {link.title}
          <ChevronDown className="ml-2 h-4 w-4" />
        </div>
        <div className="ml-4 flex flex-col">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href || "#"}
              className="flex items-center p-4 text-lg hover:bg-accent"
              onClick={onLinkClick}
            >
              {child.icon && <child.icon className="mr-2 h-4 w-4" />}
              {child.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Popover key={link.title}>
      <PopoverTrigger className={navigationMenuTriggerStyle()}>
        {link.title}
        <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3">
        {link.children.map((child) => (
          <Link
            key={child.href}
            href={child.href || "#"}
            className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
            onClick={onLinkClick}
          >
            {child.icon && <child.icon className="h-4 w-4" />}
            <div>
              <div className="font-medium">{child.title}</div>
              <p className="text-sm text-muted-foreground">{child.description}</p>
            </div>
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const NavigationItems = ({ links, mobile = false }: { links: NavLink[]; mobile?: boolean }) => {
  const pathname = usePathname();
  const [, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <ul className={cn("list-none", mobile ? "w-full" : "hidden lg:flex items-center space-x-1")}>
      {links.map((link) => (
        <li key={link.title}>{renderNavLink({ link, mobile, onLinkClick: () => setIsMobileMenuOpen(false) })}</li>
      ))}
    </ul>
  );
};

export default NavigationItems;
