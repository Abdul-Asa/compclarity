"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAtom } from "jotai";
import { CVSection, SectionSchema, cvSectionsAtom } from "../store";
import { SummarySection } from "./summary";
import { EducationSection } from "./education";
import { WorkExperienceSection } from "./work-experience";
import { SkillsSection } from "./skills";
import { InfoIcon } from "lucide-react";
import { Tooltip } from "react-tooltip";

export const sectionTypes = [
  { label: "Text", value: "summary" },
  { label: "Experience", value: "workExperiences" },
  { label: "Education", value: "educations" },
  { label: "Skills", value: "skills" },
] as const;

export function CustomSection({ ...section }: CVSection) {
  const [cvSections, setCvSections] = useAtom(cvSectionsAtom);
  const renderSectionContent = (schema: SectionSchema) => {
    switch (schema) {
      case "educations":
        return <EducationSection {...section} />;
      case "workExperiences":
        return <WorkExperienceSection {...section} />;
      case "skills":
        return <SkillsSection {...section} />;
      default:
        return <SummarySection {...section} />;
    }
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        Section Type{" "}
        <InfoIcon
          className="size-4 text-destructive"
          data-tooltip-id={`custom-section-info-${section.id}`}
          data-tooltip-content="Be careful when changing the section type. All data will be cleared."
        />
        <Tooltip id={`custom-section-info-${section.id}`} />
      </Label>
      <Select
        value={section.schema as string}
        onValueChange={(value) => {
          setCvSections(
            cvSections.map((section) =>
              section.id === section.id ? { ...section, schema: value as SectionSchema } : section
            )
          );
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select section type" />
        </SelectTrigger>
        <SelectContent>
          {sectionTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {section.schema && renderSectionContent(section.schema)}
    </div>
  );
}
