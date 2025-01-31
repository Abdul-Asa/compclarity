"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function YoeDropdownButton() {
  const [minYOE, setMinYOE] = useState("");
  const [maxYOE, setMaxYOE] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter() {
    const params = new URLSearchParams(searchParams);
    if (minYOE) {
      params.set("minYOE", minYOE);
    } else {
      params.delete("minYOE");
    }
    if (maxYOE) {
      params.set("maxYOE", maxYOE);
    } else {
      params.delete("maxYOE");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Listbox as="div" className="relative z-10 mt-1">
      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-black border border-border py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span className="block truncate text-sm">Filter By YOE</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </Listbox.Button>
      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
        <Listbox.Options className="absolute mt-1 w-full rounded-md bg-white dark:bg-black border border-border py-4 text-base shadow-lg ring-1 ring-border focus:outline-none sm:text-sm">
          <div className="px-4">
            <div className="flex flex-col space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
                <input
                  type="number"
                  value={minYOE}
                  onChange={(e) => setMinYOE(e.target.value)}
                  className="mt-1 block w-full rounded-sm p-2 border-border shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
                <input
                  type="number"
                  value={maxYOE}
                  onChange={(e) => setMaxYOE(e.target.value)}
                  className="mt-1 block w-full rounded-sm p-2 border-border shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Years"
                />
              </div>
              <button
                onClick={handleFilter}
                className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-light"
              >
                Apply
              </button>
            </div>
          </div>
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
