"use client";

import { Menu } from "@headlessui/react";
import { FaSchool, FaTableCells, FaPenClip } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";

import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

export default function ResourcesDropdownMenu() {
  return (
    <Menu as="div" className="relative z-50">
      <Menu.Button className="font-bold hover:underline">Resources</Menu.Button>
      <Menu.Items className="absolute mt-1 -left-16 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="px-1 py-1 whitespace-nowrap">
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`${
                  active ? "bg-gray-100" : "text-gray-900 hover:bg-gray-100"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                href="https://discord.gg/AuAvjpTTnm"
                target="_blank"
                onClick={() =>
                  sendGAEvent({
                    event: "click",
                    name: "nav_click",
                    value: "discord",
                  })
                }
              >
                <FaDiscord className="mr-2 h-5 w-5" aria-hidden="true" />
                Discord
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`${
                  active ? "bg-gray-100" : "text-gray-900 hover:bg-gray-100"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                href="https://compclarity.substack.com/"
                target="_blank"
                onClick={() =>
                  sendGAEvent({
                    event: "click",
                    name: "nav_click",
                    value: "blog",
                  })
                }
              >
                <FaPenClip className="mr-2 h-5 w-5" aria-hidden="true" />
                Blog
              </Link>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}
