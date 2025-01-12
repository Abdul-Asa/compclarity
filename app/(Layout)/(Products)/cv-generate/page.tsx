"use client";

import { CVForm } from "@/components/cv-builder/cv-form";
import { useAtomValue } from "jotai";
import { cvDataAtom } from "@/components/cv-builder/store";

export default function CVBuilder() {
  const cvData = useAtomValue(cvDataAtom);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-8 p-4 md:p-8 w-full">
      <CVForm />
      <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-auto">
        <pre className="text-sm">{JSON.stringify(cvData, null, 2)}</pre>
      </div>
    </div>
  );
}
