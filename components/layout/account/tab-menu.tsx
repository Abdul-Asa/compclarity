"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface TabMenuProps {
  items: { path: string; label: string }[];
}

export function TabMenu({ items }: TabMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="relative flex w-full justify-center sm:justify-start p-2">
      <ul className="flex space-x-6 text-sm relative">
        {items.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            prefetch
            className={cn(
              "relative text-md rounded-md px-2 py-1 text-muted-foreground transition-colors hover:text-foreground",
              pathname === item.path && "font-medium text-foreground"
            )}
          >
            {pathname === item.path && (
              <motion.span
                layoutId="active-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {item.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
