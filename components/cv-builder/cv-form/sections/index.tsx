"use client";
import { useAtom } from "jotai";
import { cvDataAtom, cvRenderAtom, cvSectionsAtom, seededCVData, initialCVData } from "@/components/cv-builder/store";
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
import { CVData, CVSection } from "@/components/cv-builder/types";
import { Basics, Education, FormValues, Project, Skill, Work } from "@/lib/documents/types";
import { Modal } from "@/components/ui/modal";
import getTemplateData from "@/lib/documents/templates";
import latex from "@/lib/documents/latex";

async function generateResume(formData: FormValues): Promise<string> {
  const { texDoc, opts } = getTemplateData(formData);
  return latex(texDoc, opts);
}

// const formData = {
//   selectedTemplate: 1,
//   headings: { work: "", education: "rhrhr", skills: "", projects: "projects", awards: "fff" },
//   basics: { name: "ffff", phone: "07479083186", website: "ffffffff", location: { address: "ffff" }, email: "proe" },
//   education: [
//     {
//       institution: "rhrhr",
//       location: "rbrbr",
//       area: "rhrhrj",
//       studyType: "rhrh",
//       startDate: "rhrh",
//       endDate: "rhrh",
//       gpa: "rhrh",
//     },
//     {},
//   ],
//   work: [{ company: "", location: "", position: "", website: "", startDate: "", endDate: "", highlights: [""] }],
//   skills: [{ name: "", level: "", keywords: [""] }],
//   projects: [{ name: "pipw", description: "hhhhn", url: "llink", keywords: ["h", "g"] }, { keywords: [""] }],
//   awards: [{ title: "ffff", date: "ffff", awarder: "fff", summary: "fffff" }],
//   sections: ["templates", "profile", "education", "work", "skills", "projects", "awards"],
// };
const formatCVDataToFormValues = (cvData: CVData, sections: CVSection[]): FormValues => {
  // Format basics/profile data
  const basics: Basics = {
    name: `${cvData.profile.firstName} ${cvData.profile.lastName}`,
    email: cvData.profile.email,
    phone: cvData.profile.phone,
    location: cvData.profile.location
      ? {
          city: cvData.profile.location,
        }
      : undefined,
    profiles: cvData.profile.links.map((link) => ({
      url: link.url,
    })),
  };

  // Format work experience
  const work: Work[] = cvData.workExperiences.data.map((exp) => ({
    company: exp.company,
    position: exp.position,
    startDate: exp.startDate,
    endDate: exp.endDate || "Present",
    location: exp.location,
    highlights: exp.description ? exp.description.split("\n").filter(Boolean) : [],
  }));

  // Format education
  const education: Education[] = cvData.educations.data.map((edu) => ({
    institution: edu.school,
    area: edu.fieldOfStudy,
    studyType: edu.degree,
    startDate: edu.startDate,
    endDate: edu.endDate,
    location: edu.location,
  }));

  // Format skills
  const skills: Skill[] = cvData.skills.data.map((skillGroup) => ({
    name: skillGroup.category,
    keywords: skillGroup.skills,
  }));

  // Format projects
  const projects: Project[] = cvData.projects.data.map((proj) => ({
    name: proj.name,
    description: proj.description,
    startDate: proj.startDate,
    endDate: proj.endDate,
    url: proj.url,
    keywords: proj.technologies,
    highlights: proj.description ? proj.description.split("\n").filter(Boolean) : [],
  }));

  return {
    basics,
    work,
    education,
    skills,
    projects,
    sections: sections
      .map((section) => {
        // Map your section types to FormValues section types
        const sectionTypeMap: Record<string, string> = {
          profile: "profile",
          educations: "education",
          workExperiences: "work",
          skills: "skills",
          projects: "projects",
        };
        return sectionTypeMap[section.type] as any;
      })
      .filter(Boolean),
    selectedTemplate: 1,
    headings: {
      education: "Education",
      work: "Work Experience",
      skills: "Skills",
      projects: "Projects",
    },
  };
};

export default function Sections() {
  const [sections, setSections] = useAtom(cvSectionsAtom);
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [cvData, setCvData] = useAtom(cvDataAtom);
  const [cvRender, setCvRender] = useAtom(cvRenderAtom);

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

  const handleGenerateRender = async () => {
    const formData = formatCVDataToFormValues(cvData, sections);
    setCvRender({ ...cvRender, isLoading: true });
    try {
      const newResumeUrl = await generateResume(formData);
      setCvRender({ ...cvRender, url: newResumeUrl, isLoading: false });
    } catch (error) {
      console.error(error);
      setCvRender({ ...cvRender, isError: true, isLoading: false });
    }
  };

  const handleResetData = () => {
    setCvRender({ url: "", isLoading: false, isError: false });
    setSections(sections.map((section) => ({ ...section, isExpanded: false })));
    setEditingTitleId(null);
    setCvData(initialCVData);
  };

  const handleSeedData = () => {
    setCvRender({ url: "", isLoading: false, isError: false });
    setSections(sections.map((section) => ({ ...section, isExpanded: true })));
    setEditingTitleId(null);
    setCvData(seededCVData);
  };

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex gap-2">
        <Button type="button" variant="outline" className="flex-1" onClick={handleGenerateRender}>
          Generate
        </Button>
        <Button type="button" variant="outline" className="flex-1" onClick={handleResetData}>
          Reset Form
        </Button>
        <Button type="button" variant="outline" className="flex-1" onClick={handleSeedData}>
          Load Sample
        </Button>
        <Modal trigger={<Button>Show JSON</Button>}>
          <div className="w-full h-[425px] bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-scroll">
            <pre className="text-sm">{JSON.stringify(cvData, null, 2)}</pre>
          </div>
        </Modal>
      </div>
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
