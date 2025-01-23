"use client";

import { useAtom } from "jotai";
import { cvDataAtom, cvSettingsAtom, cvSectionsAtom } from "../store";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";
import SimpleLoader from "@/components/layout/SimpleLoader";

const HTMLPreview = dynamic(() => import("./html-preview").then((mod) => ({ default: mod.HTMLPreview })), {
  ssr: false,
  loading: () => <SimpleLoader />,
});

export function CVPreview() {
  const [data] = useAtom(cvDataAtom);
  const [settings] = useAtom(cvSettingsAtom);
  const [sections] = useAtom(cvSectionsAtom);

  const handleDownload = () => {
    // Trigger print dialog which can save as PDF
    // implement better version later
    window.print();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end p-4 print-hide">
        <Button onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <HTMLPreview {...{ data, settings, sections }} />
      </div>
    </div>
  );
}
