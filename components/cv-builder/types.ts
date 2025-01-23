import { z } from "zod";

// Add new type for section types
export type CVRender = {
  url: string;
  isLoading: boolean;
  isError: boolean;
};
export type SectionType = "profile" | "summary" | "workExperiences" | "educations" | "projects" | "skills" | "custom";
export type SectionSchema = Omit<SectionType, "custom">;
export interface CVSection {
  id: string;
  type: SectionType;
  schema: SectionSchema;
  title: string;
  description: string;
  isVisible?: boolean;
  isExpanded?: boolean;
  isDraggable?: boolean;
  isAlwaysVisible?: boolean;
  isEditable?: boolean;
}
export interface CVSettings {
  template: 'classic' | 'modern' | 'minimal'; 
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  font: {
    family: string;
    size: number;
  };
  dateFormat: 'numbers-slash' | 'numbers-dash' | 'words-short' | 'words-long';
  displayFullLinks: boolean;
}

//Schemas
export const profileSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  links: z.array(z.object({
    name: z.string(),
    url: z.string()
  })),
});

export const summarySchema = z.object({
  content: z.string().min(10, "Summary must be at least 10 characters"),
});

export const educationSchema = z.array(
  z.object({
    school: z.string().min(2, "School name is required"),
    degree: z.string().min(2, "Degree is required"),
    fieldOfStudy: z.string().optional(),
    location: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string(),
    description: z.string().optional(),
  })
);

export const workExperienceSchema = z.array(z.object({
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  startDate: z.string(),
  location: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
})) ;

export const skillsSchema = z.array(z.object({
  category: z.string().min(2, "Category is required"),
  skills: z.array(z.string()),
}));

export const projectSchema = z.array(z.object({
  name: z.string().min(2, "Project name is required"),
  role: z.string().optional(),
  url: z.string().url().optional().or(z.string().length(0)),
  organization: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  technologies: z.array(z.string()).default([]),
}));

export const customSchema = z.array(z.object({
  id: z.string(),
  data: z.union([summarySchema, educationSchema, workExperienceSchema, skillsSchema, projectSchema])
}));

// Define the complete CV data structure
export const cvDataSchema = z.object({
  profile: profileSchema,
  summary: summarySchema,
  educations: z.object({ data: educationSchema }),
  workExperiences: z.object({ data: workExperienceSchema }),
  skills: z.object({ data: skillsSchema }),
  projects: z.object({ data: projectSchema }),
  customs: z.object({ data: customSchema }),
});

// Create types from schemas
export type ProfileData = z.infer<typeof profileSchema>;
export type EducationData = z.infer<typeof educationSchema>;
export type WorkExperienceData = z.infer<typeof workExperienceSchema>;
export type SkillsData = z.infer<typeof skillsSchema>;
export type CVData = z.infer<typeof cvDataSchema>;
export type SummaryData = z.infer<typeof summarySchema>;
export type ProjectData = z.infer<typeof projectSchema>;
export type CustomData = z.infer<typeof customSchema>;

