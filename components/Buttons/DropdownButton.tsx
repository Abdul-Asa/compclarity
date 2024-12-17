"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface DropdownButtonProps {
  isIndustyDropDown?: boolean;
  isForJobs?: boolean;
}

const roleTypes = [
  { name: "Intern", id: "Intern" },
  { name: "Junior", id: "Junior" },
  { name: "Mid-Level", id: "Mid_level" },
  { name: "Senior", id: "Senior" },
  { name: "Principal", id: "Principal" },
  { name: "Director", id: "Director" },
];

const roleTypesJobs = [
  { name: "Intern", id: "Intern" },
  { name: "Junior", id: "Junior" },
];

const industryTypes = [
  { name: "Technology", id: "Technology" },
  { name: "Finance", id: "Finance" },
];

export default function DropdownButton({ isIndustyDropDown, isForJobs }: DropdownButtonProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const options = isIndustyDropDown ? industryTypes : isForJobs ? roleTypesJobs : roleTypes;

  function handleFilter(roles: string[]): void {
    const params = new URLSearchParams(searchParams);
    if (roles.length > 0) {
      params.set("page", "0");
      params.delete("role");
      params.delete("sortBy");
      params.delete("sortDir");
      roles.forEach((r) => params.append("role", r));
    } else {
      params.delete("role");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleIndustryFilter(industries: string[]): void {
    const params = new URLSearchParams(searchParams);
    if (industries.length > 0) {
      params.set("page", "0");
      params.delete("industries");
      params.delete("sortBy");
      params.delete("sortDir");
      industries.forEach((r) => params.append("industries", r));
    } else {
      params.delete("industries");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Listbox
      value={isIndustyDropDown ? searchParams.getAll("industries") : searchParams.getAll("role")}
      onChange={isIndustyDropDown ? handleIndustryFilter : handleFilter}
      multiple
    >
      <div className="relative z-10 ">
        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-black border-border py-2 pl-3 pr-10 text-left shadow-md focus:outline-none border focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate text-sm">{isIndustyDropDown ? "Filter by Industry" : "Filter by Level"}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black border-border py-1 text-base shadow-lg ring-1 ring-border focus:outline-none sm:text-sm">
            {options.map((role, roleIdx) => (
              <Listbox.Option
                key={roleIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active && "bg-primary-light/50 "}`
                }
                value={role.id}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{role.name}</span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
