import { useAtom } from "jotai";
import { CVSection, cvSectionsAtom } from "./store";
import { PersonalSection } from "./sections/personal";
import { Sortable, SortableDragHandle, SortableItem } from "../ui/sortable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import { SummarySection } from "./sections/summary";
import { EducationSection } from "./sections/education";
import { WorkExperienceSection } from "./sections/work-experience";

export function CVForm() {
  const [sections, setSections] = useAtom(cvSectionsAtom);

  const renderSection = (section: CVSection) => {
    switch (section.type) {
      case "profile":
        return <PersonalSection {...section} />;
      case "summary":
        return <SummarySection {...section} />;
      case "educations":
        return <EducationSection {...section} />;
      case "workExperiences":
        return <WorkExperienceSection {...section} />;
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
    </div>
  );
}
