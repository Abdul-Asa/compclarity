"use client";

import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { Toolbar } from "./toolbar";
import { cvSettingsAtom } from "../store";
import Resume from "./resume";

const CVIFrame = dynamic(() => import("./iframe").then((mod) => mod.CVIFrame), {
  ssr: false,
});

interface CVPreviewProps {
  onDownload?: () => void;
  className?: string;
}

const CVPreview = ({ onDownload, className }: CVPreviewProps) => {
  const [settings] = useAtom(cvSettingsAtom);

  return (
    <div className="relative flex flex-col h-full border-b border-r">
      <Toolbar onDownload={onDownload} className={className} />
      <div className="flex-1 p-6 overflow-auto">
        <CVIFrame scale={settings.scale} documentSize={settings.documentSize}>
          <Resume />
        </CVIFrame>
      </div>
    </div>
  );
};

export default CVPreview;
