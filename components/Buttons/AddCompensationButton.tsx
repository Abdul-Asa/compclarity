"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Button } from "../ui/button";

export default function AddCompensationButton() {
  return (
    <Button className="relative w-60 text-white bg-emerald-700">
      <PlusIcon className="size-5" />
      <Link href={"/add"}>Add Compensation</Link>
    </Button>
  );
}
