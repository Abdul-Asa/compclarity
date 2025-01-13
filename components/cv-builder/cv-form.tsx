import { useAtom } from "jotai";
import { CVSection, cvSectionsAtom, SectionType, sectionTypes } from "./store";
import { PersonalSection } from "./sections/personal";
import { Sortable, SortableDragHandle, SortableItem } from "../ui/sortable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import { SummarySection } from "./sections/summary";
import { EducationSection } from "./sections/education";
import { WorkExperienceSection } from "./sections/work-experience";
import { ProjectsSection } from "./sections/projects";
import { SkillsSection } from "./sections/skills";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CustomSection } from "./sections/custom";

export function CVForm() {
  const [sections, setSections] = useAtom(cvSectionsAtom);

  const handleAddCustomSection = () => {
    const newSection: CVSection = {
      id: nanoid(),
      type: "custom",
      title: "Custom Section",
      schema: "summary",
      description: "This is a custom section",
      isVisible: true,
      isExpanded: true,
      isDraggable: true,
      isAlwaysVisible: false,
    };
    setSections([...sections, newSection]);
  };

  const renderSection = (section: CVSection) => {
    const type = section.type;

    switch (type) {
      case "profile":
        return <PersonalSection {...section} />;
      case "summary":
        return <SummarySection {...section} />;
      case "educations":
        return <EducationSection {...section} />;
      case "workExperiences":
        return <WorkExperienceSection {...section} />;
      case "projects":
        return <ProjectsSection {...section} />;
      case "skills":
        return <SkillsSection {...section} />;
      case "custom":
        return <CustomSection {...section} />;
      default:
        return null;
    }
  };

  const handleSectionExpand = (sectionId: string, isExpanded: boolean) => {
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, isExpanded } : section)));
  };

  const handleSectionVisibility = (sectionId: string, isVisible: boolean) => {
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, isVisible } : section)));
  };

  return (
    <div className="w-full p-4 space-y-4">
      <Sortable
        value={sections}
        onValueChange={(newSections) => {
          if (newSections[0].id !== "profile") {
            return;
          }

          setSections(newSections);
        }}
      >
        {sections.map((section) => (
          <SortableItem key={section.id} value={section.id} disabled={!section.isDraggable}>
            <div className="relative mb-4">
              <div className="absolute left-0 top-4 p-2">
                <SortableDragHandle
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
                  aria-label="Drag to reorder section"
                >
                  <GripVertical className="size-4" aria-hidden="true" />
                </SortableDragHandle>
              </div>
              <div className="pl-10">
                <Card
                  collapsible
                  isExpanded={section.isExpanded}
                  isVisible={section.isVisible}
                  isAlwaysVisible={section.isAlwaysVisible}
                  onExpand={(isExpanded) => handleSectionExpand(section.id, isExpanded)}
                  onVisibilityChange={(isVisible) => handleSectionVisibility(section.id, isVisible)}
                >
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">{renderSection(section)}</CardContent>
                </Card>
              </div>
            </div>
          </SortableItem>
        ))}
      </Sortable>

      <Button type="button" variant="outline" className="w-full" onClick={handleAddCustomSection}>
        <PlusIcon className="mr-2 size-4" />
        Add Custom Section
      </Button>
    </div>
  );
}
