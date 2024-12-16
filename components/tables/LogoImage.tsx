"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function LogoImage({
  companyDomain,
  size,
  className,
}: {
  companyDomain: string;
  size: string;
  className?: string;
}) {
  const [src, setSrc] = useState(`https://logo.clearbit.com/${companyDomain}?size=${200}`);

  const dimensions = size === "large" ? { width: 100, height: 100 } : { width: 45, height: 45 };

  return (
    <Image
      unoptimized
      alt="Missing Logo"
      src={src}
      onError={() => setSrc("/assets/logo_placeholder.jpeg")}
      onLoad={(event) => {
        const img = event.target as HTMLImageElement;
        if (img.naturalWidth === 0) {
          // Broken image
          setSrc("/assets/logo_placeholder.jpeg");
        }
      }}
      className={cn("rounded", className)}
      width={dimensions.width}
      height={dimensions.height}
      loading="lazy"
    />
  );
}
