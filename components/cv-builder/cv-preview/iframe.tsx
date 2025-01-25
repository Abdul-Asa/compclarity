"use client";

import { useMemo } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Frame from "react-frame-component";
import { cn } from "@/lib/utils";
import {
  A4_HEIGHT_PX,
  A4_WIDTH_PX,
  A4_WIDTH_PT,
  LETTER_HEIGHT_PX,
  LETTER_WIDTH_PX,
  LETTER_WIDTH_PT,
} from "./constants";

const getIframeInitialContent = (isA4: boolean) => {
  const width = isA4 ? A4_WIDTH_PT : LETTER_WIDTH_PT;

  return `<!DOCTYPE html>
<html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    </style>
  </head>
  <body style='overflow: hidden; width: ${width}pt; margin: 0; padding: 0; -webkit-text-size-adjust:none; font-family: Inter, sans-serif;'>
    <div></div>
  </body>
</html>`;
};

interface CVIFrameProps {
  documentSize: "A4" | "LETTER";
  scale: number;
  children: React.ReactNode;
  enablePDFViewer?: boolean;
}

export const CVIFrame = ({ documentSize, scale, children, enablePDFViewer = false }: CVIFrameProps) => {
  const isA4 = documentSize === "A4";
  const iframeInitialContent = useMemo(() => getIframeInitialContent(isA4), [isA4]);

  if (enablePDFViewer) {
    return <PDFViewer className="w-full h-full">{children as any}</PDFViewer>;
  }

  const width = isA4 ? A4_WIDTH_PX : LETTER_WIDTH_PX;
  const height = isA4 ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;

  return (
    <div
      style={{
        maxWidth: `${width * scale}px`,
        maxHeight: `${height * scale}px`,
      }}
      className="mx-auto"
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
        }}
        className={cn("origin-top-left bg-white shadow-lg", "transition-transform duration-200 ease-in-out")}
      >
        <Frame
          style={{ width: "100%", height: "100%" }}
          initialContent={iframeInitialContent}
          key={isA4 ? "A4" : "LETTER"}
        >
          {children}
        </Frame>
      </div>
    </div>
  );
};

