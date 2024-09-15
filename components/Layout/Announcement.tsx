"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function Announcement() {
  useEffect(() => {
    // ignore if screen height is too small
    setTimeout(() => {
      toast("🌑 Dark Mode is here!", {
        closeButton: true,
        classNames: {
          closeButton: "bg-white",
        },
        id: "welcome-toast",
        duration: Infinity,
        description: "Toggle to your preferred theme using the button in the footer.",
      });
    }, 100);
  }, []);

  return null;
}
