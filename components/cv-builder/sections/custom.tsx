"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAtom } from "jotai";
import { CVSection, SectionSchema, cvSectionsAtom, sectionTypes } from "../store";
import { SummarySection } from "./summary";
import { EducationSection } from "./education";
import { WorkExperienceSection } from "./work-experience";
import { ProjectsSection } from "./projects";
import { SkillsSection } from "./skills";

export function CustomSection({ ...section }: CVSection) {
  const [cvSections, setCvSections] = useAtom(cvSectionsAtom);
  const renderSectionContent = (schema: SectionSchema) => {
    switch (schema) {
      case "educations":
        return <EducationSection {...section} type="educations" />;
      case "workExperiences":
        return <WorkExperienceSection {...section} type="workExperiences" />;
      case "projects":
        return <ProjectsSection {...section} type="projects" />;
      case "skills":
        return <SkillsSection {...section} type="skills" />;
      default:
        return <SummarySection {...section} type="summary" />;
    }
  };

  return (
    <div className="space-y-6">
      <Label>Section Type</Label>
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
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {section.schema && renderSectionContent(section.schema)}
    </div>
  );
}
