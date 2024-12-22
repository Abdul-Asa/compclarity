import Logo from "@/components/layout/Logo";
import { ModeToggle } from "@/components/providers/ThemeProvider";
import Link from "next/link";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center font-space text-foreground bg-neutral dark:bg-background">
      <div className="flex items-center w-full justify-between px-2 py-4 md:px-8  top-0">
        <Link href="/">
          <Logo />
        </Link>
        <ModeToggle />
      </div>

      <div className="flex-1 w-full flex items-center justify-center">{children}</div>
    </main>
  );
}
