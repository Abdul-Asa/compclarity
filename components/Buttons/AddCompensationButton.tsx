"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function AddCompensationButton() {
  return (
    <div className="relative">
      <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3 rtl:right-0">
        <PlusIcon className="h-5 w-5 text-white" />
      </div>
      <Link
        href={"/add"}
        className="block w-60 rounded-lg bg-emerald-500 p-2 ps-10 text-center text-sm text-white shadow-md"
      >
        Add Compensation
      </Link>
    </div>
  );
}
