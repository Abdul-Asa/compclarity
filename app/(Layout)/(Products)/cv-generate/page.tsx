"use client";

import { CVForm } from "@/components/cv-builder/cv-form";

export default function CVBuilder() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-8 p-4 md:p-8 w-full">
      <CVForm />
      <div className="w-full bg-gray-700 rounded-sm animate-pulse" />
    </div>
  );
}
