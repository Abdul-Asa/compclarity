"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { Job } from "@/lib/validation/types";
import { useToast } from "@/lib/hooks/useToast";
import { createCV } from "@/lib/actions/server-actions";
import { useAction } from "next-safe-action/hooks";
import { INITIAL_CV_DATA } from "@/components/cv-builder/constants";
import { useQuery } from "@tanstack/react-query";
import { getCVs } from "@/lib/actions/server-actions";
import { useUser } from "@/lib/hooks/useUser";
import Link from "next/link";
import SimpleLoader from "../layout/SimpleLoader";

export function TailorCVButton({ job }: { job: Job }) {
  const { toast } = useToast();
  const { user, isSignedIn } = useUser();
  const { execute: executeCreateCV } = useAction(createCV);

  // Fetch CVs
  const { data: cvs, isLoading } = useQuery({
    queryKey: ["cvs"],
    queryFn: () => getCVs(),
  });

  const handleTailorCV = async (cvData: any) => {
    try {
      const response = await fetch(
        "https://compclarity.azurewebsites.net/api/custom_cv?code=r562vGcndnHAaO1oWYiqnJP5s95wJPaxBIC82u0P2jykAzFuuvkIQw%3D%3D",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job: job.title,
            company: job.company.name,
            sections: cvData.sections,
            settings: cvData.settings,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to tailor CV");

      const tailoredCV = await response.json();

      // Create new CV with tailored data
      await executeCreateCV({
        combinedCVData: {
          ...INITIAL_CV_DATA,
          ...tailoredCV,
          settings: {
            ...INITIAL_CV_DATA.settings,
            name: `${job.company.name}-${job.title}-CV`,
          },
        },
      });

      toast({
        title: "Success!",
        description: "Your CV has been tailored and saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to tailor CV. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Modal
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className="rounded-md p-2 transition ease-in-out hover:bg-yellow-500 hover:text-white"
        >
          <Wand2 className="h-5 w-5" />
        </Button>
      }
    >
      <div className="space-y-4 p-4">
        {isSignedIn ? (
          user?.is_subscribed ? (
            isLoading ? (
              <div className="text-center py-8">
                <SimpleLoader />
                <p className="mt-2">Loading your CVs...</p>
              </div>
            ) : cvs && cvs.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-center">Select CV to Tailor</h2>
                <div className="grid grid-cols-1 gap-4">
                  {cvs.map((cv) => (
                    <Button
                      key={cv.id}
                      variant="outline"
                      className="w-full text-left justify-start"
                      onClick={() => handleTailorCV(cv)}
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
            )
          ) : (
            <div className="text-center py-8">
              <p className="mb-4">Please subscribe to tailor your CV</p>
              <Button asChild>
                <Link href="/pricing">View Plans</Link>
              </Button>
            </div>
          )
        ) : (
          <div className="text-center py-8">
            <p className="mb-4">Please login to tailor your CV</p>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
