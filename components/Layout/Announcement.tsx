"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function Announcement() {
  useEffect(() => {
    // Don't display on mobile
    if (window.innerWidth < 768) return;

    // Check if the announcement has already been displayed
    const hasDisplayed = sessionStorage.getItem("announcementDisplayed");

    if (!hasDisplayed) {
      // Set a timeout to display the toast
      const timeoutId = setTimeout(() => {
        toast("📢 Share your salary!", {
          closeButton: true,
          classNames: {
            closeButton: "bg-white",
          },
          id: "welcome-toast",
          duration: 5000,
          description: "Received an offer this year? Share your salary to help improve transparency for all!",
          onAutoClose: () => {
            sessionStorage.setItem("announcementDisplayed", "true");
          },
          onDismiss: () => {
            sessionStorage.setItem("announcementDisplayed", "true");
          },
        });
      }, 100);

      // Cleanup timeout on unmount
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return null;
}
