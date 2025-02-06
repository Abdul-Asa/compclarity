"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Forward, FileText } from "lucide-react";
import { Job } from "@/lib/validation/types";
import { useToast } from "@/lib/hooks/useToast";
import { sendGAEvent } from "@next/third-parties/google";
import { TailorCVButton } from "./TailorCVButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
export function ApplyModal({
  job,
  isSubscribed,
  isSignedIn,
}: {
  job: Job;
  isSubscribed: boolean;
  isSignedIn: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showAIPrompt, setShowAIPrompt] = useState(true);
  const [showMainModal, setShowMainModal] = useState(false);

  //   useEffect(() => {
  //     const dontShow = localStorage.getItem("dontShowAIPrompt");
  //     setShowAIPrompt(dontShow !== "true");
  //   }, []);

  const handleClick = (e: any) => {
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
    if (showAIPrompt) {
      setOpen(true);
    } else {
      router.push(job.link);
    }
  };

  const handleDontShowAgain = () => {
    localStorage.setItem("dontShowAIPrompt", "true");
  };

  const handleProceedAnyway = () => {
    setOpen(false);
    setShowMainModal(true);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-md transition ease-in-out hover:bg-yellow-500 hover:text-white"
        onClick={handleClick}
      >
        <Forward />
      </Button>

      {/* AI Services Prompt Modal */}
      <Modal open={open && showAIPrompt} onOpenChange={setOpen}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Enhance Your Application</h2>
          <p className="text-sm text-gray-600">
            Increase your odds of getting shortlisted for interviews with custom generated CVs and cover letters!
          </p>
          <div className="flex justify-center w-full">
            <Image
              src="/assets/cover-letter.png"
              alt="AI Services"
              width={400}
              height={300}
              className="w-full h-auto object-contain rounded-lg shadow-sm"
              unoptimized
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            {/* <input
              type="checkbox"
              id="dontShowAgain"
              onChange={handleDontShowAgain}
              className="rounded border-gray-300"
            />
            <label htmlFor="dontShowAgain" className="text-sm text-gray-600">
              Don&apos;t show this popup again
            </label> */}
          </div>
          <div className="flex justify-end gap-3 mt-6 flex-col pb-5">
            <Button onClick={handleProceedAnyway}>Yes, I want to increase my odds</Button>
            <a href={job.link} target="_blank" className={buttonVariants({ variant: "outline" })}>
              Proceed to application link
            </a>{" "}
          </div>
        </div>
      </Modal>

      {/* Main Application Modal */}
      <Modal open={showMainModal} onOpenChange={setShowMainModal}>
        <div className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">
            Apply to {job.title} at {job.company.name}
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Tailor your CV</h3>
                <p className="text-sm text-gray-600">Generate a custom CV for this role</p>
              </div>
              <TailorCVButton job={job} signedIn={isSignedIn} isSubscribed={isSubscribed} />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Tailor your Cover Letter</h3>
                <p className="text-sm text-gray-600">Create a custom cover letter</p>
              </div>
              <a
                href={`/cover-letter?jobTitle=${job.title}&companyName=${job.company.name}`}
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className: "rounded-md transition ease-in-out hover:bg-primary hover:text-white",
                })}
              >
                <FileText />
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
