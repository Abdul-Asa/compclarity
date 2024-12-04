"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-55 rounded-md border border-border bg-white dark:bg-black p-4 text-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {children}
      {/* <PopoverPrimitive.Arrow /> */}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

interface PopoverLinkProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

const PopoverLink = ({ href, icon: Icon, title, description, onClick }: PopoverLinkProps) => {
  return (
    <Link
      href={href}
      className="transition-all duration-200 flex items-center w-full gap-3 rounded-sm border border-border p-3 hover:border-brand-light hover:bg-brand-light/30"
      onClick={onClick}
    >
      <Icon className="size-8 mr-1 text-brand-dark dark:text-brand-light" />
      <div className="flex flex-col">
        <p className="font-medium">{title}</p>
        <p className="font-open text-sm leading-tight">{description}</p>
      </div>
    </Link>
  );
};

export { Popover, PopoverTrigger, PopoverContent, PopoverLink };
