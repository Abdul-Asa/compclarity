"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function PageResultsButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pageSizeOptions: string[] = ["10", "25", "50", "100"];
  const initialPageSize = searchParams.get("pageSize") || "10";
  const [pageSize, setPageSize] = useState<string>(initialPageSize);

  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", value);
    params.set("page", "0");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Listbox as="div" value={pageSize} onChange={handlePageSizeChange} className="relative z-10 mt-1">
      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span className="block truncate text-sm">{pageSize} results per page</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </Listbox.Button>
      <Transition 
        as={Fragment} 
        leave="transition ease-in duration-100" 
        leaveFrom="opacity-100" 
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute bottom-full mb-1 w-full rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 py-4 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {pageSizeOptions.map((option) => (
            <Listbox.Option 
              key={option} 
              value={option} 
              className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                active ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-100 dark:bg-emerald-900' : 'text-gray-900 dark:text-gray-300'
              }`}
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {option} per page
                  </span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
