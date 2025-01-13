import { useAtom } from "jotai";
import { cvSectionsAtom } from "@/components/cv-builder/store";
import { PersonalSection } from "./personal";
import { Sortable, SortableDragHandle, SortableItem } from "@/components/ui/sortable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, GripVertical, XIcon } from "lucide-react";
import { SummarySection } from "./summary";
import { EducationSection } from "./education";
import { WorkExperienceSection } from "./work-experience";
import { ProjectsSection } from "./projects";
import { SkillsSection } from "./skills";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CustomSection } from "./custom";
import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CVSection } from "@/components/cv-builder/types";

export default function Sections() {
  const [sections, setSections] = useAtom(cvSectionsAtom);
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);

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
      isEditable: true,
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

  const handleTitleEdit = (sectionId: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, title: newTitle } : section)));
    setEditingTitleId(null);
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
                    <div className="flex items-center gap-2">
                      {editingTitleId === section.id ? (
                        <div className="flex items-center gap-2 w-full">
                          <Input
                            defaultValue={section.title}
                            className="h-7 py-1 text-lg font-semibold w-[400px]"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                                handleTitleEdit(section.id, e.currentTarget.value);
                              }
                            }}
                            autoFocus
                          />
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-6"
                              onClick={() => setEditingTitleId(null)}
                            >
                              <XIcon className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={!section.title.trim()}
                              className="size-6"
                              onClick={(e) => {
                                const input = e.currentTarget.parentElement?.previousElementSibling as HTMLInputElement;
                                if (input?.value.trim()) {
                                  handleTitleEdit(section.id, input.value);
                                }
                              }}
                            >
                              <CheckIcon className="size-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <CardTitle
                          className={cn("flex items-center gap-2", section.isEditable && "hover:cursor-pointer")}
                        >
                          {section.title}
                          {section.isEditable && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-6 p-0"
                              onClick={() => setEditingTitleId(section.id)}
                            >
                              <PencilIcon className="size-4" />
                              <span className="sr-only">Edit section title</span>
                            </Button>
                          )}
                        </CardTitle>
                      )}
                    </div>
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
