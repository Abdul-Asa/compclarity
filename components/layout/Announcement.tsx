"use client";

import { useToast } from "@/lib/hooks/useToast";
import { useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export function Announcement() {
  const { toast, dismiss } = useToast();

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const hasDisplayed = sessionStorage.getItem("announcementDisplayed");

    if (!hasDisplayed) {
      const timeoutId = setTimeout(() => {
        toast({
          title: (<p className="text-lg font-semibold mb-2">📢 Share your salary!</p>) as React.ReactNode,
          description: (
            <div className="text-sm flex flex-col gap-2">
              <p>Received an offer this year? Share your salary to help improve transparency for all!</p>
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => {
                  sessionStorage.setItem("announcementDisplayed", "true");
                  dismiss();
                }}
              >
                <Link href="/add">Share your salary</Link>
              </Button>
            </div>
          ),
          onOpenChange: (open) => {
            if (!open) {
              sessionStorage.setItem("announcementDisplayed", "true");
            }
          },
        });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        sessionStorage.setItem("announcementDisplayed", "true");
      };
    }
  }, []);

  return null;
}
