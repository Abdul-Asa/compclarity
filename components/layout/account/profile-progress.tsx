"use client";

import * as React from "react";
import { CheckCircle, Crown, GraduationCap, Info, Briefcase, Award, ThumbsUp, User2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/actions/tanstack-actions";
import { User } from "@/lib/validation/types";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  isCompleted?: boolean;
  isOptional?: boolean;
}

export function ProfileProgress({ initialData }: { initialData: User }) {
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserProfile,
    initialData: initialData,
  });

  const sections: Section[] = [
    {
      id: "profile",
      title: "Profile",
      icon: <User2 className="size-5" />,
      isCompleted: !!(
        userData?.first_name &&
        userData?.last_name &&
        userData?.phonenumber &&
        userData?.birthdate &&
        userData?.location
      ),
    },
  ];

  const progress = 100;

  return (
    <div className="sticky top-24 rounded-sm w-full h-fit space-y-8 border border-border bg-background p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Profile progress:</h2>
            <span className="text-xl font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        {progress >= 65 && (
          <div className="flex items-center gap-2 rounded-md p-3 bg-primary-light/10">
            <span className="font-semibold">ALMOST DONE </span>
            <ThumbsUp className="size-4 text-primary" />
          </div>
        )}
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">Sections</h3>
          <div className="space-y-4">
            {sections
              .filter((section) => !section.isOptional)
              .map((section) => (
                <div key={section.id} className="flex items-center justify-between gap-2 text-base">
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <span className={cn(section.isCompleted && "line-through text-muted-foreground")}>
                      {section.title}
                    </span>
                  </div>
                  {section.isCompleted && <CheckCircle className="h-5 w-5 text-teal-600" />}
                </div>
              ))}
            {sections
              .filter((section) => section.isOptional)
              .map((section) => (
                <div key={section.id} className="flex items-center justify-between gap-2 text-base">
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <span className={cn(section.isCompleted && "line-through text-muted-foreground")}>
                      {section.title}
                    </span>
                  </div>
                  {section.isCompleted && <CheckCircle className="h-5 w-5 text-teal-600" />}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="rounded-md border p-4">
          <p className="text-sm">You can upload your CV to autofill your profile.</p>
        </div>
        <Button className="w-full">Upload CV</Button>
      </div>
    </div>
  );
}
