"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { CVDbType, Job } from "@/lib/validation/types";
import { useToast } from "@/lib/hooks/useToast";
import { useAction } from "next-safe-action/hooks";
import { useQuery } from "@tanstack/react-query";
import { getCVs, tailorCV } from "@/lib/actions/server-actions";
import Link from "next/link";
import SimpleLoader from "../layout/SimpleLoader";

export function TailorCVButton({
  job,
  signedIn,
  isSubscribed,
}: {
  job: Job;
  signedIn: boolean;
  isSubscribed: boolean;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const { data: cvs, isLoading } = useQuery({
    queryKey: ["cvs"],
    queryFn: () => getCVs(),
  });
  const { executeAsync: handleTailorCV, isPending, hasErrored } = useAction(tailorCV);
  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!signedIn) {
      toast({
        title: "Not logged in!",
        description: "Please login to tailor your CV.",
        variant: "destructive",
      });
      return;
    } else if (!isSubscribed) {
      toast({
        title: "Not subscribed!",
        description: "Please subscribe to tailor your CV.",
        variant: "destructive",
      });
      return;
    } else {
      setOpen(true);
    }
  };

  const handleFetch = async (cv: CVDbType) => {
    if (!isSubscribed) {
      toast({
        title: "Not subscribed!",
        description: "Please subscribe to tailor your CV.",
        variant: "destructive",
      });
      return;
    }
    setOpen(false);
    setSecondModalOpen(true);
    const response = await handleTailorCV({
      cv_id: cv.id,
      job_name: job.title,
      company_name: job.company.name,
    });
    console.log(response);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-md transition ease-in-out hover:bg-yellow-500 hover:text-white"
        onClick={handleClick}
      >
        <Wand2 />
      </Button>

      <Modal open={open} onOpenChange={setOpen}>
        {isLoading ? (
          <SimpleLoader />
        ) : cvs && cvs.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Select CV to Tailor</h2>
            <div className="grid grid-cols-1 gap-4">
              {cvs.map((cv) => (
                <Button
                  key={cv.id}
                  variant="outline"
                  className="w-full text-left justify-start"
                  onClick={() => handleFetch(cv)}
                >
                  {/* @ts-ignore */}
                  {cv.cv_data.settings.name}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="mb-4">You need to create a CV first</p>
            <Button asChild>
              <Link href="/cv-generate">Create CV</Link>
            </Button>
          </div>
        )}
      </Modal>
      <Modal open={secondModalOpen} onOpenChange={setSecondModalOpen}>
        <div className="space-y-4">
          {isPending ? <SimpleLoader /> : hasErrored ? <p>Something went wrong!</p> : <p>CV tailored successfully</p>}
        </div>
      </Modal>
    </>
  );
}
