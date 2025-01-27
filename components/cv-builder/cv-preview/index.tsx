"use client";

import { useIsMutating } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { sectionsAtom } from "../constants";
// import { useAtom } from "jotai";
// import dynamic from "next/dynamic";
// import { Toolbar } from "./toolbar";
// import { cvSettingsAtom } from "../store";
// import Resume from "./resume";

// const CVIFrame = dynamic(() => import("./iframe").then((mod) => mod.CVIFrame), {
//   ssr: false,
// });

// interface CVPreviewProps {
//   onDownload?: () => void;
//   className?: string;
// }

const CVPreview = () => {
  const [cvData] = useAtom(sectionsAtom);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>();
  const [lastSavedText, setLastSavedText] = useState<string>("Not saved yet");

  const isMutating = useIsMutating({ mutationKey: ["updateCV"] });

  const calculateLastSavedText = () => {
    if (isMutating) return "Saving...";
    if (!lastSavedTime) return "Not saved yet";
    return `Last saved ${formatDistanceToNow(lastSavedTime, { addSuffix: true })}`;
  };

  useEffect(() => {
    // Update text immediately
    setLastSavedText(calculateLastSavedText());

    // Update text every 60 seconds
    const interval = setInterval(() => {
      setLastSavedText(calculateLastSavedText());
    }, 60000);

    return () => clearInterval(interval);
  }, [isMutating, lastSavedTime]);

  // Update lastSavedTime when mutation completes
  useEffect(() => {
    if (isMutating) {
      setLastSavedTime(new Date());
    }
  }, [isMutating]);

  return (
    <div className="relative flex flex-col h-full border-b border-r">
      <p className="text-sm text-muted-foreground">{lastSavedText}</p>
      <pre>{JSON.stringify(cvData, null, 2)}</pre>
      {/* <Toolbar onDownload={onDownload} className={className} />
      <div className="flex-1 p-6 overflow-auto">
        <CVIFrame scale={settings.scale} documentSize={settings.documentSize}>
          <Resume />
        </CVIFrame>
      </div> */}
    </div>
  );
};

export default CVPreview;
