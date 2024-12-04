"use client";

import { JobsApiResponse } from "@/lib/types";
import PaginationControl from "./PaginationControl";
import JobRow from "./JobRow";

export default function JobTable({ jobsResponse, signedIn }: { jobsResponse: JobsApiResponse; signedIn: boolean }) {
  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-2/3 2xl:w-5/6 px-4">
      <table className="text-sm text-gray-500 dark:text-gray-100 text-center w-full">
        <thead className="text-gray-700 bg-gray-50 border-b-2 dark:bg-black dark:text-gray-100 border-border">
          <tr>
            <th scope="col"></th>
            <th scope="col" className="w-1/8"></th>
            <th scope="col" className="px-1 py-4 w-1/3">
              <div className="flex flex-col items-center justify-center">
                <div className="uppercase sm:font-bold">Company</div>
                <div className="text-xs font-thin">Location | Added</div>
              </div>
            </th>
            <th scope="col" className="px-1 py-4 w-1/4">
              <div className="flex flex-col items-center justify-start">
                <div className="uppercase font-bold">Title</div>
                <div className="text-xs font-thin">Level</div>
              </div>
            </th>
            <th scope="col" className="px-1 py-4 w-1/6">
              <div className="flex items-center justify-center sm:gap-2">
                <div className="flex flex-col items-center justify-center">
                  <div className="uppercase font-bold">Apply</div>
                </div>
              </div>
            </th>
            <th scope="col" className="px-1 py-4 w-1/6">
              <div className="flex items-center justify-center sm:gap-2">
                <div className="flex flex-col items-center justify-center">
                  <div className="uppercase font-bold">Track</div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {jobsResponse.jobs.map((job, jobIdx) => (
            <JobRow job={job} idx={jobIdx} key={jobIdx} signedIn={signedIn} />
          ))}
        </tbody>
      </table>
      <PaginationControl results={jobsResponse.totalResults} />
    </div>
  );
}
