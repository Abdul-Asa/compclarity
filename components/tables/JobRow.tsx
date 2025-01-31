"use client";

import { Job } from "@/lib/validation/types";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, Forward, Briefcase, Star, File, Wand2 } from "lucide-react";
import { JobRowContent } from "./JobRowContent";
import Link from "next/link";
import { toast } from "@/lib/hooks/useToast";
import { sendGAEvent } from "@next/third-parties/google";
import { TailorCVButton } from "./TailorCVButton";
import { Button } from "../ui/button";

export default function JobRow({ job, idx, signedIn }: { job: Job; idx: number; signedIn: boolean }) {
  const [expanded, toggleExpanded] = useState(false);
  const sponsoredJob = job.sponsoredJob || false;
  const addedDateStr = job.addedDate.toLocaleDateString("en-UK");

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!signedIn) {
      e.preventDefault();
      toast({
        title: "Not logged in!",
        description: "Please login to add or manage your applications.",
        variant: "destructive",
      });
      return;
    }
    sendGAEvent("event", "user_data", {
      event_type: "track_job",
      value: 1,
      job_id: job.jobId,
      job_title: job.title,
      company: job.company.name,
      job_location: job.city,
      job_level: job.level,
      job_posted: job.addedDate,
    });
  };

  useEffect(() => {
    toggleExpanded(false);
  }, [job]);

  return (
    <>
      <tr
        onClick={() => toggleExpanded(!expanded)}
        key={idx}
        className={
          "cursor-pointer border-b " +
          (expanded
            ? "bg-gray-50 dark:bg-black"
            : "bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-800 dark:border-gray-800")
        }
      >
        <td className="px-2">
          {expanded ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
        </td>
        <td className="px-1 py-4">{sponsoredJob ? <p className="text-[8px] md:text-xs">Promoted</p> : null}</td>
        <td className="py-4">
          <div>
            <div className="flex flex-col items-center justify-center">
              <a
                href={`/company/${job.company.name.replace(/\s+/g, "-").toLowerCase()}/jobs`}
                onClick={(e) => e.stopPropagation()}
                className="hover:underline"
              >
                <span className="line-clamp-3 text-gray-900 dark:text-white md:line-clamp-1">{job.company.name}</span>
              </a>
              <span className="text-xs dark:text-gray-300">
                {job.city}, {job.countryCode} | {addedDateStr}
              </span>
            </div>
          </div>
        </td>
        <td className="px-1 py-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center">
              <div className="line-clamp-3 text-gray-900 dark:text-white md:line-clamp-1">{job.title}</div>
            </div>
            <span className="text-xs dark:text-gray-300">{job.level}</span>
          </div>
        </td>
        <td className="px-1 py-4">
          <div className="flex flex-col items-center justify-center">
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-center transition ease-in-out hover:bg-sky-500 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                sendGAEvent("event", "user_data", {
                  event_type: "apply",
                  value: 1,
                  job_id: job.jobId,
                  job_title: job.title,
                  company: job.company.name,
                  job_location: job.city,
                  job_level: job.level,
                  job_posted: job.addedDate,
                });
                sendGAEvent("event", "job_apply", {
                  value: 1,
                  job_id: job.jobId,
                  job_title: job.title,
                  company: job.company.name,
                  job_posted: job.addedDate,
                });
              }}
            >
              <Forward />
            </a>
          </div>
        </td>
        <td className="px-2 py-4">
          <div className="flex flex-col items-center justify-center">
            {signedIn ? (
              <TailorCVButton job={job} />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-md p-2 transition ease-in-out hover:bg-yellow-500 hover:text-white"
                onClick={handleClick}
              >
                <Wand2 className="h-5 w-5" />
              </Button>
            )}
          </div>
        </td>
        <td className="px-2 py-4">
          <div className="flex flex-col items-center justify-center">
            <Link
              className="rounded-md p-2 transition ease-in-out hover:bg-yellow-500 hover:text-white"
              href={`/tracker?id=${job.jobId.toLowerCase()}`}
              target="_blank"
              onClick={handleClick}
            >
              <Briefcase />
            </Link>
          </div>
        </td>
      </tr>

      {expanded ? (
        <tr className="bg-white dark:bg-black">
          <td colSpan={8} className="p-3">
            <JobRowContent expanded={expanded} job={job} addedDateStr={addedDateStr} idx={idx} signedIn={signedIn} />
          </td>
        </tr>
      ) : null}
    </>
  );
}
