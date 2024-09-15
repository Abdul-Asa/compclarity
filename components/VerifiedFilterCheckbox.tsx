"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Checkbox } from "./ui/checkbox";

export default function VerifiedFilterCheckbox() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleFilter(): void {
    const params = new URLSearchParams(searchParams);
    if (params.has("verified")) {
      params.set("page", "1");
      params.delete("verified");
    } else {
      params.set("page", "1");
      params.set("verified", "1");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center">
      <Checkbox
        onClick={handleFilter}
        checked={searchParams?.has("verified")}
        id="default-checkbox"
        className="size-4 rounded dark:border-gray-300"
      />
      <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-white">
        Verified
      </label>
    </div>
  );
}
