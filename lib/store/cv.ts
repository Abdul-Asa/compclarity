import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { z } from "zod";

// Schema definitions
export const personalSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  summary: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  highlights: z.array(z.string()).default([]),
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

// Types
export type Personal = z.infer<typeof personalSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;

export type CVSection = {
  id: string;
  type: "personal" | "experience" | "education" | "skills" | "projects";
  title: string;
};

// Initial state
const initialSections: CVSection[] = [
  { id: "personal", type: "personal", title: "Personal Information" },
  { id: "experience", type: "experience", title: "Work Experience" },
  { id: "education", type: "education", title: "Education" },
];

// Atoms
export const cvSectionsAtom = atomWithStorage<CVSection[]>("cv-sections", initialSections);
export const personalAtom = atomWithStorage<Personal>("cv-personal", {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
});
export const experienceAtom = atomWithStorage<Experience[]>("cv-experience", []);
export const educationAtom = atomWithStorage<Education[]>("cv-education", []); 