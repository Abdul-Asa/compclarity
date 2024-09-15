"use client";

import { useEffect, useState, useRef } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";

export default function AnnouncementDrawer() {
  const { open, setOpen } = useAnnouncement();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dark Mode Now Available!</h1>
            <p className="text-gray-700 dark:text-gray-300">
              We've added a new dark mode feature to enhance your viewing experience.
              <br />
              Toggle it on and off using the button in the footer.
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setOpen(false)}
              className="bg-emerald-700 text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              Got it, thanks!
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export const useAnnouncement = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return { open, setOpen };
};
