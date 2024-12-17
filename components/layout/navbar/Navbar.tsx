import Link from "next/link";
import Logo from "../Logo";
import NavigationItems, { NavLink } from "./NavLinks";
import { Computer, PoundSterling, FileText, Book } from "lucide-react";
import { Button } from "../../ui/button";
import { MobileMenu } from "./MobileMenu";
import { ModeToggle } from "@/components/providers";
import { navLinks } from "@/lib/config/navigation";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-sm">
      <div className="flex items-center justify-between px-2 py-4 md:px-8">
        <Link href="/" replace>
          <Logo />
        </Link>
        <ul>
          {navLinks.map((link) => (
            <li key={link.title}>{link.title}</li>
          ))}
        </ul>
        <div className="hidden w-[15%] justify-end gap-2 lg:flex">
          <ModeToggle />
          <Button asChild size="lg" variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </div>

        <MobileMenu />
      </div>
    </nav>
  );
}

export default Navbar;
