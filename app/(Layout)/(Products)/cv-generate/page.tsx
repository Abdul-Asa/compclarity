import { CVForm } from "@/components/cv-builder/cv-form";
import { CVPreview } from "@/components/cv-builder/cv-preview";

export default function CVBuilder() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-8 p-4 md:p-8 w-full max-w-screen-2xl mx-auto">
      <div className="w-full lg:h-[calc(100vh-4rem)] overflow-auto">
        <CVForm />
      </div>
      <CVPreview />
    </div>
  );
}
