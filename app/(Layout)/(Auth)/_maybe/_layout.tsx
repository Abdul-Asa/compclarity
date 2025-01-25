import Logo from "@/components/layout/Logo";
import { ModeToggle } from "@/components/providers/ThemeProvider";
import Link from "next/link";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-col items-center w-full min-h-screen font-space text-foreground bg-neutral dark:bg-background">
      <div className="top-0 flex items-center justify-between w-full px-2 py-4 md:px-8">
        <Link href="/">
          <Logo />
        </Link>
        <ModeToggle className="bg-background" />
      </div>

      <div className="flex items-center justify-center flex-1 w-full">{children}</div>
    </main>
  );
}
