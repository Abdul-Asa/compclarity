"use client";

import { useAtom } from "jotai";
import { cvDataAtom } from "@/components/cv-builder/store";
import { useState, useEffect } from "react";

export function CVPreview() {
  const [cvData] = useAtom(cvDataAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const handleDownload = () => {
  //   if (!cvRender.url) return;
  //   window.open(cvRender.url, "_blank");
  // };

  return (
    isClient && (
      <div className="relative h-full w-full flex flex-col gap-4 overflow-scroll">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Preview</h2>
          {/* <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={cvRender.isLoading || cvRender.isError || !cvRender.url}
        >
          <DownloadIcon className="mr-2 size-4" />
          Download PDF
        </Button> */}
        </div>

        <div className="relative flex-1 w-full bg-white dark:bg-gray-900 rounded-lg">
          {/* {cvRender.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <RefreshCw className="size-8 animate-spin text-primary" />
          </div>
        )}

        {cvRender.isError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="text-center space-y-2">
              <p className="text-destructive font-medium">Failed to generate PDF</p>
              <p className="text-sm text-muted-foreground">Please try again later</p>
            </div>
          </div>
        )}

        {cvRender.url && (
          <iframe
            src={cvRender.url}
            className={cn("w-full h-full border-0", (cvRender.isLoading || cvRender.isError) && "opacity-50")}
            title="CV Preview"
          />
        )}

        {!cvRender.url && !cvRender.isLoading && !cvRender.isError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Start editing to generate preview</p>
          </div>
        )} */}
          <pre className="text-sm">{JSON.stringify(cvData, null, 2)}</pre>
        </div>
      </div>
    )
  );
}
