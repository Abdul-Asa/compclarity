import { atom } from "jotai";
import * as z from "zod"

export interface CVSection {
  id: string;
  type: "profile" | "workExperiences" | "educations" | "projects" | "skills" | "custom";
  title: string;
  description: string;
}

const initialSections: CVSection[] = [
  { id: "profile", type: "profile", title: "Profile", description: "Profile description" },
];

export const cvSectionsAtom = atom<CVSection[]>(initialSections);

export const profileSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
});

export const educationSchema = z.object({
  school: z.string().min(2, "School name is required"),
  degree: z.string().min(2, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export const workExperienceSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

export const skillsSchema = z.object({
  category: z.string().min(2, "Category is required"),
  skills: z.array(z.string()),
});

// Define the complete CV data structure
export const cvDataSchema = z.object({
  profile: profileSchema,
  educations: z.array(educationSchema),
  workExperiences: z.array(workExperienceSchema),
  skills: z.array(skillsSchema),
});

// Create types from schemas
export type ProfileData = z.infer<typeof profileSchema>;
export type EducationData = z.infer<typeof educationSchema>;
export type WorkExperienceData = z.infer<typeof workExperienceSchema>;
export type SkillsData = z.infer<typeof skillsSchema>;
export type CVData = z.infer<typeof cvDataSchema>;

// Create initial data
const initialCVData: CVData = {
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
  },
  educations: [],
  workExperiences: [],
  skills: [],
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
  (get, set, update: EducationData[]) => {
    set(cvDataAtom, { ...get(cvDataAtom), educations: update });
  }
);

export const workExperiencesAtom = atom(
  (get) => get(cvDataAtom).workExperiences,
  (get, set, update: WorkExperienceData[]) => {
    set(cvDataAtom, { ...get(cvDataAtom), workExperiences: update });
  }
);

export const skillsAtom = atom(
  (get) => get(cvDataAtom).skills,
  (get, set, update: SkillsData[]) => {
    set(cvDataAtom, { ...get(cvDataAtom), skills: update });
  }
);

