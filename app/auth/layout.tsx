import Logo from "@/components/layout/Logo";
import { ModeToggle } from "@/components/providers";
import Link from "next/link";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center font-space bg-neutral">
      <div className="flex items-center w-full justify-between px-2 py-4 md:px-8  top-0">
        <Link href="/">
          <Logo />
        </Link>
        <ModeToggle />
      </div>

      {children}
    </main>
  );
}
