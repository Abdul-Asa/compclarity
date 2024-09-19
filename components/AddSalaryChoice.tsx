"use client";

import Link from "next/link";
import VerifiedSvg from "./VerifiedSvg";
import { useState } from "react";
import { Form } from "@/app/(Navigation)/add/Form";

interface AddSalaryChoiceProps {}

export const AddSalaryChoice = ({}: AddSalaryChoiceProps) => {
  const [isAddManual, setAddManual] = useState<boolean>(false);

  function toggleSalaryChoice() {
    console.log(isAddManual);
    setAddManual(!isAddManual);
  }

  return isAddManual === false ? (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-fit flex-col items-center rounded-lg bg-white dark:bg-black dark:border-gray-700 dark:border p-12">
        <span className="text-center text-3xl font-bold">Share Your Salary</span>
        <span className="mb-6 mt-2 text-center text-gray-500 dark:text-gray-300">
          Join hundreds of others in advancing pay transparency
        </span>
        <div className="flex w-full flex-col justify-center space-x-0 space-y-4 md:flex-row md:space-x-16 md:space-y-0">
          <div className="flex flex-1 flex-col rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:border p-6 text-left">
            <span className="text-lg font-semibold">Add Manually</span>
            <ul className="ml-3 mt-2 flex grow list-outside list-disc flex-col space-y-2">
              <li>Anonymous and secure</li>
              <li>60 seconds to complete</li>
            </ul>

            <div className="flex justify-center">
              <button
                onClick={() => setAddManual(true)}
                className="mt-4 rounded bg-emerald-700 px-6 py-2 font-bold text-white hover:bg-gray-800 dark:bg-emerald-700 dark:hover:bg-gray-500"
              >
                Start
              </button>
            </div>
          </div>
          <div className="flex flex-1 flex-col rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:border p-6 text-left">
            <span className="text-lg font-semibold">Upload PDF</span>
            <ul className="ml-3 mt-2 flex grow list-outside list-disc flex-col space-y-2">
              <li>Anonymous and secure</li>
              <li>
                Verified{" "}
                <span>
                  <VerifiedSvg />
                </span>
              </li>
              <li>Access to private community</li>
              <li>Deleted within 48 hours</li>
              <li>Can be of any: Offer letter, Offer email etc.</li>
            </ul>

            <div className="flex justify-center">
              <Link
                href="https://forms.gle/iXuMMjafGbxJThmG8"
                rel="noopener noreferrer"
                target="_blank"
                className="mt-4 rounded bg-emerald-700 px-6 py-2 font-bold text-white hover:bg-gray-800 dark:bg-emerald-700 dark:hover:bg-gray-500"
              >
                Upload
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Form toggleSalaryChoice={toggleSalaryChoice} />
  );
};
