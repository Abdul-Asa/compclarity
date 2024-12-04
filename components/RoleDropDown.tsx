"use client";

import { Menu, Transition } from "@headlessui/react";
import { FaLaptopCode, FaChartLine } from "react-icons/fa";
import Link from "next/link";
import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

interface RoleDropdownMenuProps {
  companyPath?: string;
  forCompany: boolean;
  companyParams?: string;
}

export default function RoleDropdownMenu({ companyPath, forCompany, companyParams }: RoleDropdownMenuProps) {
  const pathname = usePathname();

  const isTech = pathname === "/tech";
  const isFinance = pathname === "/finance";

  const isTechCompany = pathname === `/${companyPath}`;
  const isFinanceCompany = pathname == `${companyPath}/finance`;
  const isForCompany = forCompany;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="relative z-20">
      <Menu.Button className="font-bold">
        <span className="flex items-center hover:underline" onClick={() => setIsOpen(!isOpen)}>
          {isTech || isTechCompany ? "Tech" : "Finance"}
          <span className="ml-1 cursor-pointer underline">
            {isOpen ? (
              <ChevronUpIcon className="inline-block h-4 w-4" />
            ) : (
              <ChevronDownIcon className="inline-block h-4 w-4" />
            )}
          </span>
        </span>
      </Menu.Button>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-1/2 mt-2 min-w-max origin-top -translate-x-1/2 transform divide-y divide-gray-100 rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-border focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-500" : "text-gray-900 dark:text-gray-200 "
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  href={isForCompany ? `/company/${companyParams}/salaries` : "/tech"}
                >
                  <FaLaptopCode className="mr-2 h-5 w-5" aria-hidden="true" />
                  {isTech || isTechCompany ? <b>Tech</b> : "Tech"}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${
                    active ? "bg-gray-100 dark:bg-gray-500" : "text-gray-900 dark:text-gray-200 "
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  href={isForCompany ? `/company/${companyParams}/salaries/finance` : "/finance"}
                >
                  <FaChartLine className="mr-2 h-5 w-5" aria-hidden="true" />
                  {isFinance || isFinanceCompany ? <b>Finance</b> : "Finance"}
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
