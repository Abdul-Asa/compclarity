import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withText?: boolean;
  textClassName?: string;
}

export default function Logo({ className, withText = true, textClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/assets/logo.png"
        alt="Logo"
        width={55}
        height={29}
        className="mr-2 cursor-pointer hover:opacity-75 dark:invert"
      />
      {withText && (
        <h1 className={cn("hidden text-[24px] font-semibold md:inline-block", textClassName)}>CompClarity</h1>
      )}
    </div>
  );
}
