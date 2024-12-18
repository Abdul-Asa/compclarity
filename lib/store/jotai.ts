import { atom } from 'jotai';
import { z } from 'zod';

// Schema definitions
export const personalSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  summary: z.string().optional(),
});

export const summarySchema = z.object({
  summary: z.string().min(10, "Summary must be at least 10 characters"),
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string().min(2, "School name must be at least 2 characters"),
  degree: z.string().min(2, "Degree must be at least 2 characters"),
  field: z.string().min(2, "Field of study must be at least 2 characters"),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string(),
  highlights: z.array(z.string()),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Skill name must be at least 2 characters"),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string(),
  technologies: z.array(z.string()),
  link: z.string().url().optional(),
});

export const cvSectionsSchema = z.array(
  z.object({
    id: z.string(),
    type: z.enum(['personal', 'summary', 'education', 'experience', 'skills', 'projects']),
    title: z.string(),
  })
);

// Types
export type Personal = z.infer<typeof personalSchema>;
export type Summary = z.infer<typeof summarySchema>;
export type Education = z.infer<typeof educationSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type CVSection = z.infer<typeof cvSectionsSchema>[0];

// Atoms
export const personalAtom = atom<Personal>({
  fullName: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
});

export const educationAtom = atom<Education[]>([]);
export const experienceAtom = atom<Experience[]>([]);
export const skillsAtom = atom<Skill[]>([]);
export const projectsAtom = atom<Project[]>([]);

export const cvSectionsAtom = atom<CVSection[]>([
  { id: '1', type: 'personal', title: 'Personal Information' },
  { id: '2', type: 'summary', title: 'Summary' },
  { id: '3', type: 'education', title: 'Education' },
  { id: '4', type: 'experience', title: 'Work Experience' },
  { id: '5', type: 'skills', title: 'Skills' },
  { id: '6', type: 'projects', title: 'Projects' },
]);