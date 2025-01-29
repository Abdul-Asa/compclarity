import { atom } from "jotai";
import { CVSection, CVSettings } from "./types";

export const INITIAL_CV_DATA = {
  sections: [
    {
      id: "profile",
      type: "profile",
      schema: "profile",
      title: "Profile",
      description: "Profile description",
      isVisible: true,
      isExpanded: true,
      isDraggable: false,
      isAlwaysVisible: true,
      isEditable: false,
      data: {
        firstName: "Jake",
        lastName: "Ryan",
        email: "jake@su.edu",
        phone: "123-456-7890",
        location: "Georgetown, TX",
        links: [
          {
            name: "LinkedIn",
            url: "linkedin.com/in/jake"
          },
          {
            name: "GitHub",
            url: "github.com/jake"
          }
        ]
      }
    },
    {
      id: "education",
      type: "educations",
      schema: "educations",
      title: "Education",
      description: "Your academic background",
      isVisible: true,
      isExpanded: true,
      isDraggable: true,
      isAlwaysVisible: true,
      isEditable: true,
      data: [
        {
          school: "Southwestern University",
          degree: "Bachelor of Arts",
          fieldOfStudy: "Computer Science",
          location: "Georgetown, TX",
          startDate: "2018-08",
          endDate: "2021-05",
          description: "Minor in Business"
        },
        {
          school: "Blinn College",
          degree: "Associate's",
          fieldOfStudy: "Liberal Arts",
          location: "Bryan, TX",
          startDate: "2014-08",
          endDate: "2018-05",
          description: ""
        }
      ]
    },
    {
      id: "workExperience",
      type: "workExperiences",
      schema: "workExperiences",
      title: "Experience",
      description: "Your work history",
      isVisible: true,
      isExpanded: true,
      isDraggable: true,
      isAlwaysVisible: true,
      isEditable: true,
      data: [
        {
          company: "Texas A&M University",
          position: "Undergraduate Research Assistant",
          location: "College Station, TX",
          startDate: "2020-06",
          endDate: "",
          current: true,
          description: "• Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems\n• Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data\n• Explored ways to visualize GitHub collaboration in a classroom setting"
        },
        {
          company: "Southwestern University",
          position: "Information Technology Support Specialist",
          location: "Georgetown, TX",
          startDate: "2018-09",
          endDate: "",
          current: true,
          description: "• Communicate with managers to set up campus computers used on campus\n• Assess and troubleshoot computer problems brought by students, faculty and staff\n• Maintain upkeep of computers, classroom equipment, and 200 printers across campus"
        },
        {
          company: "Southwestern University",
          position: "Artificial Intelligence Research Assistant",
          location: "Georgetown, TX",
          startDate: "2019-05",
          endDate: "2019-07",
          current: false,
          description: "• Explored methods to generate video game dungeons based off of The Legend of Zelda\n• Developed a game in Java to test the generated dungeons\n• Contributed 50K+ lines of code to an established codebase via Git\n• Conducted a human subject study to determine which video game dungeon generation technique is enjoyable\n• Wrote an 8-page paper and gave multiple presentations on-campus\n• Presented virtually to the World Conference on Computational Intelligence"
        }
      ]
    },
    {
      id: "projects",
      type: "projects",
      schema: "projects",
      title: "Projects",
      description: "Your notable projects",
      isVisible: true,
      isExpanded: true,
      isDraggable: true,
      isAlwaysVisible: false,
      isEditable: true,
      data: [
        {
          name: "Gitlytics",
          role: "Lead Developer",
          organization: "",
          url: "",
          startDate: "2020-06",
          endDate: "",
          current: true,
          description: "• Developed a full-stack web application using with Flask serving a REST API with React as the frontend\n• Implemented GitHub OAuth to get data from user's repositories\n• Visualized GitHub data to show collaboration\n• Used Celery and Redis for asynchronous tasks",
          technologies: ["Python", "Flask", "React", "PostgreSQL", "Docker"]
        },
        {
          name: "Simple Paintball",
          role: "Developer",
          organization: "",
          url: "",
          startDate: "2018-05",
          endDate: "2020-05",
          current: false,
          description: "• Developed a Minecraft server plugin to entertain kids during free time for a previous job\n• Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review\n• Implemented continuous delivery using TravisCI to build the plugin upon new a release\n• Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin",
          technologies: ["Spigot API", "Java", "Maven", "TravisCI", "Git"]
        }
      ]
    },
    {
      id: "skills",
      type: "skills",
      schema: "skills",
      title: "Technical Skills",
      description: "Your technical skills",
      isVisible: true,
      isExpanded: true,
      isDraggable: true,
      isAlwaysVisible: false,
      isEditable: true,
      data: [
        {
          category: "Languages",
          skills: ["Java", "Python", "C/C++", "SQL (Postgres)", "JavaScript", "HTML/CSS", "R"]
        },
        {
          category: "Frameworks",
          skills: ["React", "Node.js", "Flask", "JUnit", "WordPress", "Material-UI", "FastAPI"]
        },
        {
          category: "Developer Tools",
          skills: ["Git", "Docker", "TravisCI", "Google Cloud Platform", "VS Code", "Visual Studio", "PyCharm", "IntelliJ", "Eclipse"]
        },
        {
          category: "Libraries",
          skills: ["pandas", "NumPy", "Matplotlib"]
        }
      ]
    }
  ],
  settings: {
    documentSize: "A4",
    scale: 0.6,
    autoScale: true,
    template: "classic",
    margins: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    },
    spacing: {
      sectionGap: 16,
      lineHeight: 1.15
    },
    title: {
      font: {
        family: "Roboto",
        size: 28,
        weight: "bold"
      },
      color: "#111827",
      align: "center"
    },
    heading: {
      font: {
        family: "Roboto",
        size: 16,
        weight: "semibold"
      },
      color: "#111827"
    },
    body: {
      font: {
        family: "Roboto",
        size: 11,
        weight: "normal"
      },
      color: "#374151"
    },
    dateFormat: "words-short",
    displayFullLinks: false
  }
};

export const sectionsAtom = atom<CVSection[]>();
export const settingsAtom = atom<CVSettings>();
export const fontFamilies = [
  { name: "Inter", value: "Inter" },
  { name: "Roboto", value: "Roboto" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Lato", value: "Lato" },
  { name: "Montserrat", value: "Montserrat" },
  { name: "Source Sans Pro", value: "Source Sans Pro" },
  { name: "Nunito", value: "Nunito" },
];

export const alignments = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

export const fontWeights = [
  { value: "normal", label: "Regular" },
  { value: "medium", label: "Medium" },
  { value: "semibold", label: "Semibold" },
  { value: "bold", label: "Bold" },
];

export const dateFormats = [
  { value: "numbers-slash", label: "01/2024" },
  { value: "numbers-dash", label: "01-2024" },
  { value: "words-short", label: "Jan 2024" },
  { value: "words-long", label: "January 2024" },
];


export const PX_PER_PT = 4 / 3;
export const MIN_SCALE = 0.5;
export const MAX_SCALE = 1.5;
export const STEP = 0.01;

// Reference: https://www.prepressure.com/library/paper-size/letter
// Letter size is commonly used in US & Canada, while A4 is the standard for rest of world.
export const LETTER_WIDTH_PT = 612;
const LETTER_HEIGHT_PT = 792;
export const LETTER_WIDTH_PX = LETTER_WIDTH_PT * PX_PER_PT;
export const LETTER_HEIGHT_PX = LETTER_HEIGHT_PT * PX_PER_PT;

// Reference: https://www.prepressure.com/library/paper-size/din-a4
export const A4_WIDTH_PT = 595;
const A4_HEIGHT_PT = 842;
export const A4_WIDTH_PX = A4_WIDTH_PT * PX_PER_PT;
export const A4_HEIGHT_PX = A4_HEIGHT_PT * PX_PER_PT;
