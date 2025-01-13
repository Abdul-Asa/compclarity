import { atom } from "jotai";
import * as z from "zod"

// Add new type for section types
export type SectionType = "profile" | "summary" | "workExperiences" | "educations" | "projects" | "skills" | "custom";
export type SectionSchema = Omit<SectionType, "custom">;

export const sectionTypes = ["profile", "summary", "workExperiences", "educations", "projects", "skills"] as const;
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
}

const initialSections: CVSection[] = [
  { id: "profile", type: "profile", schema: "profile", title: "Profile", description: "Profile description", isVisible: true, isExpanded: true, isDraggable: false, isAlwaysVisible: true },
  { id: "summary", type: "summary", schema: "summary", title: "Professional Summary", description: "A brief overview of your professional background", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: false },
  { id: "education", type: "educations", schema: "educations", title: "Education", description: "Your academic background and qualifications", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: true },
  { id: "workExperience", type: "workExperiences", schema: "workExperiences", title: "Work Experience", description: "Your professional work history", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: true },
  { id: "projects", type: "projects", schema: "projects", title: "Projects", description: "Highlight your key projects and achievements", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: false },
  { id: "skills", type: "skills", schema: "skills", title: "Skills", description: "List your technical and professional skills", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: false },
];
   

export const cvSectionsAtom = atom<CVSection[]>(initialSections);


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

export const customSchema = z.object({
  data: z.union([summarySchema, educationSchema, workExperienceSchema, skillsSchema, projectSchema])
});

// Define the complete CV data structure
export const cvDataSchema = z.object({
  profile: profileSchema,
  summary: summarySchema,
  educations: z.object({ data: educationSchema }),
  workExperiences: z.object({ data: workExperienceSchema }),
  skills: z.object({ data: skillsSchema }),
  projects: z.object({ data: projectSchema }),
  customs: customSchema,
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
// Create initial data
const initialCVData: CVData = {
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    links: [{ name: "GitHub", url: "" }, { name: "LinkedIn", url: "" }, { name: "Portfolio", url: "" }],
  },
  summary: {
    content: "",
  },
  educations: {
    data: [
      {
        school: "",
        degree: "",
        fieldOfStudy: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "<ul class=\"list-disc\"><li><p></p></li></ul>",
      }
    ],
  },
  workExperiences: { data: [{ company: "", position: "", startDate: "", endDate: "", current: false, description: "<ul class=\"list-disc\"><li><p></p></li></ul>" }] },
  skills: { data: [{ category: "", skills: [] }] },
  projects: {
    data: [{
      name: "",
      role: "",
      organization: "",
      url: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "<ul class=\"list-disc\"><li><p></p></li></ul>",
      technologies: [],
    }]
  },
  customs: { data: [] }
};

// Create the main CV data atom
export const cvDataAtom = atom<CVData>(initialCVData);

// Create individual section atoms that sync with the main atom
export const profileAtom = atom(
  (get) => get(cvDataAtom).profile,
  (get, set, update: ProfileData) => {
    set(cvDataAtom, { ...get(cvDataAtom), profile: update });
  }
);

export const educationsAtom = atom(
  (get) => get(cvDataAtom).educations,
  (get, set, update: EducationData) => {
    set(cvDataAtom, { ...get(cvDataAtom), educations: { data: update } });
  }
);

export const workExperiencesAtom = atom(
  (get) => get(cvDataAtom).workExperiences,
  (get, set, update: WorkExperienceData) => {
    set(cvDataAtom, { ...get(cvDataAtom), workExperiences: { data: update } });
  }
);

export const skillsAtom = atom(
  (get) => get(cvDataAtom).skills,
  (get, set, update: SkillsData) => {
    set(cvDataAtom, { ...get(cvDataAtom), skills: { data: update } });
  }
);

export const summaryAtom = atom(
  (get) => get(cvDataAtom).summary,
  (get, set, update: SummaryData) => {
    set(cvDataAtom, { ...get(cvDataAtom), summary: update });
  }
);

export const projectsAtom = atom(
  (get) => get(cvDataAtom).projects,
  (get, set, update: ProjectData) => {
    set(cvDataAtom, { ...get(cvDataAtom), projects: { data: update } });
  }
);

export const customsAtom = atom(
  (get) => get(cvDataAtom).customs,
  (get, set, update: CustomData) => {
    set(cvDataAtom, { ...get(cvDataAtom), customs: update });
  }
);

