import { atom } from "jotai";

export interface CVSection {
  id: string;
  type: "profile" | "workExperiences" | "educations" | "projects" | "skills" | "custom";
  title: string;
  description: string;
}

export const cvSectionsAtom = atom<CVSection[]>([
  { id: "profile", type: "profile", title: "Profile", description: "Profile description" },
  // {
  //   id: "workExperiences",
  //   type: "workExperiences",
  //   title: "Work Experience",
  //   description: "Work Experience description",
  // },
  // { id: "educations", type: "educations", title: "Education", description: "Education description" },
  // { id: "projects", type: "projects", title: "Projects", description: "Projects description" },
  // { id: "skills", type: "skills", title: "Skills", description: "Skills description" },
  // { id: "custom", type: "custom", title: "Additional Information", description: "Additional Information description" },
]);
