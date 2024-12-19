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
        toast("📢 2024 Salary Report", {
          closeButton: true,
          classNames: {
            closeButton: "bg-white",
          },
          id: "welcome-toast",
          duration: 10000,
          description: (
            <a
              href="https://www.linkedin.com/posts/compclarity_2024-tech-salaries-activity-7275474808769822721-oJrJ"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              Check it out here
            </a>
          ),          onAutoClose: () => {
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
