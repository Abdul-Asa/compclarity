import { atom } from "jotai";
import { CVData, CVRender, CVSection, EducationData, ProfileData, ProjectData, SkillsData, SummaryData, WorkExperienceData } from "./types";

//Initial Data
const initialSections: CVSection[] = [
  { id: "profile", type: "profile", schema: "profile", title: "Profile", description: "Profile description", isVisible: true, isExpanded: true, isDraggable: false, isAlwaysVisible: true, isEditable: false },
  { id: "summary", type: "summary", schema: "summary", title: "Professional Summary", description: "A brief overview of your professional background", isVisible: false, isExpanded: false, isDraggable: true, isAlwaysVisible: false, isEditable: true },
  { id: "education", type: "educations", schema: "educations", title: "Education", description: "Your academic background and qualifications", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: true, isEditable: true },
  { id: "workExperience", type: "workExperiences", schema: "workExperiences", title: "Work Experience", description: "Your professional work history", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: true, isEditable: true },
  { id: "projects", type: "projects", schema: "projects", title: "Projects", description: "Highlight your key projects and achievements", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: false, isEditable: true },
  { id: "skills", type: "skills", schema: "skills", title: "Skills", description: "List your technical and professional skills", isVisible: true, isExpanded: true, isDraggable: true, isAlwaysVisible: false, isEditable: true },
];
export const seededCVData: CVData = {
  profile: {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+44 7123 456789",
    location: "San Francisco, CA",
    links: [
      { name: "GitHub", url: "https://github.com/johnsmith" },
      { name: "LinkedIn", url: "https://linkedin.com/in/johnsmith" },
      { name: "Portfolio", url: "https://johnsmith.dev" }
    ],
  },
  summary: {
    content: "Senior Software Engineer with 8+ years of experience in full-stack development, specializing in React and Node.js. Proven track record of delivering scalable web applications and leading development teams in fast-paced environments.",
  },
  educations: {
    data: [
      {
        school: "University of California, Berkeley",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        location: "Berkeley, CA",
        startDate: "2012-09",
        endDate: "2016-05",
        description: "Graduated with Honors (3.8 GPA)\nTeaching Assistant for Data Structures course\nPresident of Computer Science Club",
      }
    ],
  },
  workExperiences: {
    data: [
      {
        company: "Tech Solutions Inc.",
        position: "Senior Software Engineer",
        startDate: "2020-03",
        endDate: "",
        current: true,
        description: "Led development of microservices architecture serving 1M+ users\nMentored junior developers and conducted code reviews\nReduced application load time by 40% through optimization"
      },
      {
        company: "Innovation Labs",
        position: "Software Engineer",
        startDate: "2016-06",
        endDate: "2020-02",
        current: false,
        description: "Developed and maintained React-based dashboard\nImplemented CI/CD pipeline reducing deployment time by 60%\nCollaborated with UX team to improve user experience"
      }
    ]
  },
  skills: {
    data: [
      {
        category: "Programming Languages",
        skills: ["JavaScript", "TypeScript", "Python", "Java"]
      },
      {
        category: "Frontend",
        skills: ["React", "Next.js", "Vue.js", "HTML5", "CSS3", "TailwindCSS"]
      },
      {
        category: "Backend",
        skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]
      }
    ]
  },
  projects: {
    data: [
      {
        name: "E-commerce Platform",
        role: "Lead Developer",
        organization: "Tech Solutions Inc.",
        url: "https://project-demo.com",
        startDate: "2021-04",
        endDate: "2022-11",
        current: false,
        description: "Built scalable e-commerce platform handling 100K+ daily transactions\nImplemented secure payment processing system\nIntegrated inventory management system",
        technologies: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"]
      },
      {
        name: "Analytics Dashboard",
        role: "Frontend Developer",
        organization: "Innovation Labs",
        url: "https://analytics-demo.com",
        startDate: "2019-07",
        endDate: "2020-02",
        current: false,
        description: "Developed real-time analytics dashboard\nIntegrated multiple data sources and APIs\nImplemented responsive design for mobile users",
        technologies: ["React", "D3.js", "GraphQL", "Material-UI"]
      }
    ]
  },
  customs: { data: [] }
};
export const initialCVData: CVData = {
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    links: [],
  },
  summary: {
    content: ""
  },
  educations: {
    data: []
  },
  workExperiences: {
    data: []
  },
  skills: {
    data: []
  },
  projects: {
    data: []
  },
  customs: {
    data: []
  }
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

export const cvRenderAtom = atom<CVRender>({
  url: "",
  isLoading: false,
  isError: false,
});


