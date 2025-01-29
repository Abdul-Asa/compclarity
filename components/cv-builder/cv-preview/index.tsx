"use client";

import { sectionsAtom, settingsAtom } from "../constants";
import { Toolbar } from "./toolbar";
import { CVIFrame } from "./iframe";
import { useAtom } from "jotai";
import { pdf } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import Resume from "./resume";
import { useToast } from "@/lib/hooks/useToast";
import { useUser } from "@/lib/hooks/useUser";
import { useLoadFonts } from "./resume/utils";

const CVPreview = () => {
  const [settings] = useAtom(settingsAtom);
  const [combinedData] = useAtom(sectionsAtom);
  const { user } = useUser();
  const { toast } = useToast();

  useLoadFonts();
  if (!combinedData || !settings || !user) return null;
  const handleDownload = async () => {
    try {
      // Generate PDF blob
      const blob = await pdf(
        <Resume combinedData={combinedData} settings={settings} user={user} isPDF={true} />
      ).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${settings?.name || "resume"}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error generating PDF",
        variant: "destructive",
      });
      console.log("Error generating PDF:", error);
    }
  };

  if (!settings) return null;

  return (
    <div className="relative flex flex-col h-full border-b border-r">
      <Toolbar onDownload={handleDownload} />
      <div className="flex-1 p-6 overflow-auto">
        <CVIFrame scale={settings.scale} documentSize={settings.documentSize}>
          <Resume combinedData={combinedData} settings={settings} user={user} isPDF={false} />
        </CVIFrame>
      </div>
    </div>
  );
};

export default CVPreview;
