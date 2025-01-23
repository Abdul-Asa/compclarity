"use client";

import { CVData, CVSettings, CVSection } from "../types";

interface HTMLPreviewProps {
  data: CVData;
  settings: CVSettings;
  sections: CVSection[];
}

export function HTMLPreview({ data, settings, sections }: HTMLPreviewProps) {
  const renderSection = (section: CVSection, data: CVData, settings: CVSettings) => {
    return (
      <div key={section.id}>
        <h1>{section.title}</h1>
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-auto">
      <div
        id="paper"
        className="relative bg-white border p-2 border-gray-200 shadow-2xl shadow-slate-700/10 ring-1 ring-gray-900/5 mx-auto my-8"
      ></div>
    </div>
  );
}
