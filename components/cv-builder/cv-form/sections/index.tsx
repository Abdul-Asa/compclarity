"use client";
import { getCV, updateCV } from "@/lib/actions/server-actions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CVData, CVSection } from "../../types";
import { PersonalSection } from "./personal";
import { CustomSection } from "./custom";
import { EducationSection } from "./education";
import { ProjectsSection } from "./projects";
import { SkillsSection } from "./skills";
import { SummarySection } from "./summary";
import { WorkExperienceSection } from "./work-experience";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sortable, SortableItem, SortableDragHandle } from "@/components/ui/sortable";
import { cn } from "@/lib/utils";
import { GripVertical, XIcon, CheckIcon, PencilIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useToast } from "@/lib/hooks/useToast";
export default function Sections() {
  const params = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);

  // Query for fetching CV data
  const { data: cv } = useQuery({
    queryKey: ["cv", params.id],
    queryFn: () => getCV(params.id as string),
  });

  // Mutation for updating CV
  const { mutate: updateCVMutation } = useMutation({
    mutationKey: ["updateCV"],
    mutationFn: (newData: CVData) => updateCV({ cvId: params.id as string, combinedCVData: newData }),
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["cv", params.id] });

      // Snapshot the previous value
      const previousCV = queryClient.getQueryData(["cv", params.id]);

      return { previousCV };
    },
    onError: (err, newData, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      toast({
        title: "Failed to update CV",
        description: "Please try again later",
        variant: "destructive",
      });
      queryClient.setQueryData(["cv", params.id], context?.previousCV);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: ["cv", params.id] });
    },
  });

  const debouncedUpdateCVMutation = useDebouncedCallback(updateCVMutation, 3000);

  const setSections = (newSections: CVSection[]) => {
    if (!cv) return;
    const newData = {
      ...cv.cv_data,
      sections: newSections,
    };
    queryClient.setQueryData(["cv", params.id], (old: any) => ({
      ...old,
      cv_data: newData,
    }));

    debouncedUpdateCVMutation(newData);
  };

  const handleSectionExpand = (sectionId: string, isExpanded: boolean) => {
    if (!cv) return;

    const newSections = cv.cv_data.sections.map((section) =>
      section.id === sectionId ? { ...section, isExpanded } : section
    );

    setSections(newSections);
  };

  const handleSectionVisibility = (sectionId: string, isVisible: boolean) => {
    if (!cv) return;

    const newSections = cv.cv_data.sections.map((section) =>
      section.id === sectionId ? { ...section, isVisible } : section
    );

    setSections(newSections);
  };

  const handleTitleEdit = (sectionId: string, newTitle: string) => {
    if (!cv || !newTitle.trim()) return;

    const newSections = cv.cv_data.sections.map((section) =>
      section.id === sectionId ? { ...section, title: newTitle } : section
    );

    setEditingTitleId(null);
    setSections(newSections);
  };

  const handleAddCustomSection = () => {
    if (!cv) return;
    const newSection: CVSection = {
      id: crypto.randomUUID(),
      type: "custom",
      title: "Custom Section",
      schema: "summary",
      description: "This is a custom section",
      isVisible: true,
      isExpanded: true,
      isDraggable: true,
      isAlwaysVisible: false,
      isEditable: true,
      data: {
        content: "test",
      },
    };

    const newSections = [...cv.cv_data.sections, newSection];
    setSections(newSections);
  };

  const handleChange = (data: CVSection) => {
    if (!cv) return;
    const newSections = cv.cv_data.sections.map((section) =>
      section.id === data.id ? { ...section, data: data.data } : section
    );
    setSections(newSections);
  };

  const renderSection = (section: CVSection) => {
    const type = section.type;

    switch (type) {
      case "profile":
        return <PersonalSection handleChange={handleChange} {...section} />;
      case "summary":
        return <SummarySection {...section} handleChange={handleChange} />;
      case "educations":
        return <EducationSection {...section} handleChange={handleChange} />;
      case "workExperiences":
        return <WorkExperienceSection {...section} handleChange={handleChange} />;
      case "projects":
        return <ProjectsSection {...section} handleChange={handleChange} />;
      case "skills":
        return <SkillsSection {...section} handleChange={handleChange} />;
      case "custom":
        return <CustomSection {...section} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  const sections = cv?.cv_data.sections || [];

  // return (
  //   <div>
  //     {isPending && <p>Updating CV...</p>}
  //     <pre>{JSON.stringify(cv, null, 2)}</pre>
  //   </div>
  // );

  return (
    <div className="w-full max-w-screen-md p-4 mx-auto space-y-4">
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
              <div className="absolute left-0 p-2 top-4">
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
                        <div className="flex items-center w-full gap-2">
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
                        <CardTitle className={cn("flex items-center gap-2")}>
                          {section.title}
                          {section.isEditable && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="p-0 size-6"
                              onClick={() => setEditingTitleId(section.id)}
                              disabled={!section.isVisible}
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
