"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ChevronUpDownIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

export default function SortButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sortDir = searchParams.get("sortDir");

  function handleSort(): void {
    const params = new URLSearchParams(searchParams);
    if (!params.has("sortBy")) {
      params.set("page", "1");
      params.set("sortBy", "totalComp");
      params.set("sortDir", "desc");
    } else {
      if (params.get("sortDir") === "desc") {
        params.set("page", "1");
        params.set("sortDir", "asc");
        params.set("sortBy", "totalComp");
      } else {
        params.set("page", "1");
        params.delete("sortBy");
        params.delete("sortDir");
      }
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return sortDir == null ? (
    <ChevronUpDownIcon onClick={(e) => handleSort()} className="cursor-pointer w-4 h-4 inline-flex" />
  ) : sortDir == "desc" ? (
    <ChevronDownIcon onClick={(e) => handleSort()} className=" cursor-pointer w-4 h-4 inline-flex" />
  ) : (
    <ChevronUpIcon onClick={(e) => handleSort()} className="cursor-pointer w-4 h-4 inline-flex" />
  );
}
