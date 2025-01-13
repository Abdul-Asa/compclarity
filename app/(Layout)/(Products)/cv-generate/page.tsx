"use client";

import { useAtomValue } from "jotai";
import { cvDataAtom, cvSectionsAtom } from "@/components/cv-builder/store";
import { CVForm } from "@/components/cv-builder/cv-form";
export default function CVBuilder() {
  const cvData = useAtomValue(cvDataAtom);
  const sections = useAtomValue(cvSectionsAtom);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-8 p-4 md:p-8 w-full max-w-screen-2xl mx-auto">
      <div className="w-full lg:h-[calc(100vh-4rem)] overflow-auto">
        <CVForm />
      </div>
      <div className="w-full lg:h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-auto">
        <pre className="text-sm">{JSON.stringify(cvData, null, 2)}</pre>
        <pre className="text-sm">{JSON.stringify(sections, null, 2)}</pre>
      </div>
    </div>
  );
}
