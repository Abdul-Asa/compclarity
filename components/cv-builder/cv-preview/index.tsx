"use client";

import { getCV } from "@/lib/actions/server-actions";
import { useQuery, useIsMutating } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";

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
  const params = useParams();
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>();
  const [lastSavedText, setLastSavedText] = useState<string>("Not saved yet");

  const { data: cvData } = useQuery({
    queryKey: ["cv", params.id],
    queryFn: () => getCV(params.id as string),
  });

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
