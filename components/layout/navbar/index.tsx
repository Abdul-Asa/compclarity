import Link from "next/link";
import Logo from "../Logo";
import { Button } from "../../ui/button";
import { MobileMenu } from "./mobile-menu";
import { ModeToggle } from "@/components/providers/ThemeProvider";
import NavigationItems from "./nav-links";
import { getUser } from "@/lib/actions/server-actions";
import { AccountMenu } from "./account-menu";

export async function Navbar() {
  const user = await getUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-sm bg-background/90">
      <div className="flex items-center justify-between px-2 py-4 md:px-8">
        <Link href="/" replace>
          <Logo />
        </Link>
        <NavigationItems />
        <div className="justify-end hidden gap-2 lg:flex">
          <ModeToggle />
          <Button asChild size="lg" variant="outline">
            {user ? <AccountMenu user={user} /> : <Link href="/login">Login</Link>}
          </Button>
        </div>

        <MobileMenu user={user} />
      </div>
    </nav>
  );
}

export default Navbar;
