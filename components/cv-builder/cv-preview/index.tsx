"use client";

import { sectionsAtom, settingsAtom } from "../constants";
import { Toolbar } from "./toolbar";
import { CVIFrame } from "./iframe";
import { useAtom } from "jotai";
import { pdf } from "@react-pdf/renderer";
import Resume from "./resume";
import { useToast } from "@/lib/hooks/useToast";
import { useUser } from "@/lib/hooks/useUser";
import { useLoadFonts, SuppressResumePDFErrorMessage } from "./resume/utils";
import { Document, Page, Text } from "@react-pdf/renderer";

const TestDocument = () => {
  return (
    <Document title="Test Document" author="Test Author" producer="Test Producer">
      <Page style={{ fontFamily: "Roboto", fontSize: 12, fontWeight: "bold" }}>
        <Text>Hello World</Text>
      </Page>
    </Document>
  );
};

const CVPreview = () => {
  const [settings] = useAtom(settingsAtom);
  const [combinedData] = useAtom(sectionsAtom);
  const { user } = useUser();
  const { toast } = useToast();

  useLoadFonts();
  if (!combinedData || !settings || !user) return null;
  const handleDownload = async () => {
    try {
      const iframe = document.querySelector("iframe");
      if (!iframe?.contentWindow?.document.body) {
        throw new Error("Cannot find iframe content");
      }

      const content = iframe.contentWindow.document.body.cloneNode(true) as HTMLElement;

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        throw new Error("Pop-up blocked. Please allow pop-ups for this site.");
      }

      // Set the document title and add styles to hide the default header
      printWindow.document.title = "CV Preview";
      const style = printWindow.document.createElement("style");
      style.textContent = `
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          body {
            margin: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `;
      printWindow.document.head.appendChild(style);

      // Add the content and existing styles
      printWindow.document.body.appendChild(content);
      const styles = iframe.contentWindow.document.getElementsByTagName("style");
      Array.from(styles).forEach((style) => {
        printWindow.document.head.appendChild(style.cloneNode(true));
      });

      printWindow.print();

      printWindow.onafterprint = () => {
        printWindow.close();
      };
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
      <SuppressResumePDFErrorMessage />
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
