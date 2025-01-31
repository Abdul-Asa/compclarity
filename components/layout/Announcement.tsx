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
          title: (<p className="font-semibold">📢 Share your salary!</p>) as React.ReactNode,
          description: (
            <p className="text-xs">
              Received an offer this year? Share your salary to help improve transparency for all!
            </p>
          ),
          action: (
            <Button
              variant="outline"
              size="sm"
              className="w-fit"
              onClick={() => {
                sessionStorage.setItem("announcementDisplayed", "true");
                dismiss();
              }}
            >
              <Link href="/add">Share offer</Link>
            </Button>
          ),
          onOpenChange: (open) => {
            if (!open) {
              sessionStorage.setItem("announcementDisplayed", "true");
            }
          },
        });
      }, 100);

      const autoDismiss = setTimeout(() => {
        sessionStorage.setItem("announcementDisplayed", "true");
      }, 10000);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(autoDismiss);
      };
    }
  }, []);

  return null;
}
