"use client";

import { Job } from "@/lib/validation/types";
import LogoImage from "./LogoImage";
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";
import { Flag, Share, Forward, Briefcase } from "lucide-react";
import { toast } from "./hooks/useToast";
import React from "react";
import { FaUserTie, FaIndustry, FaLocationDot } from "react-icons/fa6";
import { sendGAEvent } from "@next/third-parties/google";

interface JobRowContentProps {
  expanded?: boolean;
  job: Job;
  addedDateStr: string;
  idx?: number;
  signedIn: boolean;
}

export const JobRowContent = ({ expanded = true, job, addedDateStr, idx, signedIn }: JobRowContentProps) => {
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

  return expanded ? (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg px-4 font-open text-gray-500 dark:text-gray-200 sm:justify-between sm:px-0 lg:flex-row">
      <div className="flex flex-col items-start gap-4 self-center sm:flex-row">
        <div className="flex shrink-0 flex-row items-center justify-center gap-4 border-b p-3 sm:flex-col sm:gap-2 sm:border-b-0 sm:border-r dark:border-gray-700">
          <LogoImage companyDomain={job.company.domain} size={"large"} />
          <div className="flex flex-col items-center justify-center gap-2 text-center text-xs">
            <span>{job.company.name}</span>
            <span>
              {job.city}, {job.countryCode}
            </span>
            <small className="text-center italic">Added {addedDateStr}</small>
          </div>
          <div className="mt-2 flex flex-col-reverse items-center sm:flex-row sm:space-x-2">
            <div className="flex flex-col text-xs">
              <Link
                className="rounded-md p-2 transition ease-in-out hover:bg-red-500 hover:text-white"
                href="https://discord.gg/AuAvjpTTnm"
                target="_blank"
              >
                <Flag />
              </Link>
              <small className="text-center">Report</small>
            </div>
            <div className="flex flex-col text-xs">
              <CopyToClipboard
                text={`https://compclarity.com/jobs/${job.jobId}`}
                onCopy={() => {
                  toast({
                    title: "Link copied to clipboard.",
                    variant: "constructive",
                  });
                }}
              >
                <button className="rounded-md p-2 text-center transition ease-in-out hover:bg-green-500 hover:text-white">
                  <Share />
                </button>
              </CopyToClipboard>
              <small className="text-center">Share</small>
            </div>
          </div>
          <div className="mt-2 flex flex-col-reverse items-center sm:flex-row sm:space-x-2">
            <div className="flex flex-col text-xs">
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
              <small className="text-center">Apply</small>
            </div>
            <div className="flex flex-col text-xs">
              <Link
                className="rounded-md p-2 transition ease-in-out hover:bg-yellow-500 hover:text-white"
                href={`/tracker?id=${job.jobId.toLowerCase()}`}
                onClick={handleClick}
              >
                <Briefcase />
              </Link>
              <small className="text-center">Track</small>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <b className="text-sm dark:text-white">{job.title}</b>

          <div className="flex flex-row items-center gap-2">
            <FaUserTie className="h-3 w-3" />
            <span>{job.level}</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <FaLocationDot className="h-3 w-3" />
            <span>
              {job.city}, {job.countryCode}
            </span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <FaIndustry className="h-3 w-3" />
            <span>{job.industry}</span>
          </div>

          <br />

          <div className="flex flex-col items-start text-left">
            <b className="text-sm dark:text-white">Job Description</b>
            {job.description.split("\\n").map((line, index) => (
              <React.Fragment key={index}>
                <p>{line}</p>
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
