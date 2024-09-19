"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function Announcement() {
  useEffect(() => {
    // Check if the announcement has already been displayed
    const hasDisplayed = sessionStorage.getItem("announcementDisplayed");

    if (!hasDisplayed) {
      // Set a timeout to display the toast
      const timeoutId = setTimeout(() => {
        toast("🌑 Dark Mode is here!", {
          closeButton: true,
          classNames: {
            closeButton: "bg-white",
          },
          id: "welcome-toast",
          duration: 5000,
          description: "Toggle to your preferred theme using the button in the navbar.",
          onDismiss: () => {
            // Set session storage to indicate the announcement has been displayed
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
