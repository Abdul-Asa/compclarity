import { atom } from "jotai";
import { CVData, CVSection, EducationData, ProfileData, ProjectData, SkillsData, SummaryData, WorkExperienceData } from "./types";

//Initial Data
const initialSections: CVSection[] = [
  { id: "profile", type: "profile", schema: "profile", title: "Profile", description: "Profile description", isVisible: true, isExpanded: true, isDraggable: false, isAlwaysVisible: true, isEditable: false },
  { id: "summary", type: "summary", schema: "summary", title: "Professional Summary", description: "A brief overview of your professional background", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: false, isEditable: true },
  { id: "education", type: "educations", schema: "educations", title: "Education", description: "Your academic background and qualifications", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: true, isEditable: true },
  { id: "workExperience", type: "workExperiences", schema: "workExperiences", title: "Work Experience", description: "Your professional work history", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: true, isEditable: true },
  { id: "projects", type: "projects", schema: "projects", title: "Projects", description: "Highlight your key projects and achievements", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: false, isEditable: true },
  { id: "skills", type: "skills", schema: "skills", title: "Skills", description: "List your technical and professional skills", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: false, isEditable: true },
];
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
// const initialSettings: SettingsData = {
//   theme: "light",
//   language: "en",
//   fontSize: "medium",
//   fontFamily: "sans-serif",
// };

//Atoms
export const cvSectionsAtom = atom<CVSection[]>(initialSections);

export const cvDataAtom = atom<CVData>(initialCVData);

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
  (get, set, update: { id: string, data: any }) => {
    const currentCustoms = get(cvDataAtom).customs.data;
    const existingIndex = currentCustoms.findIndex(custom => custom.id === update.id);
    
    const newCustoms = existingIndex >= 0
      ? currentCustoms.map((custom, index) => 
          index === existingIndex ? { ...custom, data: update.data } : custom
        )
      : [...currentCustoms, { id: update.id, data: update.data }];

    set(cvDataAtom, { 
      ...get(cvDataAtom), 
      customs: { data: newCustoms }
    });
  }
);



