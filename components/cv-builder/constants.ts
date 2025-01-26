export const INITIAL_CV_DATA = {
    "sections": [
      {
        "id": "profile",
        "type": "profile",
        "schema": "profile",
        "title": "Profile",
        "description": "Profile description",
        "isVisible": true,
        "isExpanded": true,
        "isDraggable": false,
        "isAlwaysVisible": true,
        "isEditable": false,
        "data": {
          "firstName": "John",
          "lastName": "Smith",
          "email": "john.smith@email.com",
          "phone": "+447123456789",
          "location": "San Francisco, CA",
          "links": [
            {
              "name": "GitHub",
              "url": "https://github.com/johnsmith"
            },
            {
              "name": "LinkedIn",
              "url": "https://linkedin.com/in/johnsmith"
            },
            {
              "name": "Portfolio",
              "url": "https://johnsmith.dev"
            }
          ]
        }
      },
      {
        "id": "summary",
        "type": "summary",
        "schema": "summary",
        "title": "Professional Summary",
        "description": "A brief overview of your professional background",
        "isVisible": false,
        "isExpanded": false,
        "isDraggable": true,
        "isAlwaysVisible": false,
        "isEditable": true,
        "data": {
          "content": "Senior Software Engineer with 8+ years of experience in full-stack development, specializing in React and Node.js. Proven track record of delivering scalable web applications and leading development teams in fast-paced environments."
        }
      },
      {
        "id": "education",
        "type": "educations",
        "schema": "educations",
        "title": "Education",
        "description": "Your academic background and qualifications",
        "isVisible": true,
        "isExpanded": true,
        "isDraggable": true,
        "isAlwaysVisible": true,
        "isEditable": true,
        "data": [
          {
            "school": "University of California, Berkeley",
            "degree": "Bachelor of Science",
            "fieldOfStudy": "Computer Science",
            "location": "Berkeley, CA",
            "startDate": "2012-09",
            "endDate": "2016-05",
            "description": "Graduated with Honors (3.8 GPA)\nTeaching Assistant for Data Structures course\nPresident of Computer Science Club"
          }
        ]
      },
      {
        "id": "workExperience",
        "type": "workExperiences",
        "schema": "workExperiences",
        "title": "Work Experience",
        "description": "Your professional work history",
        "isVisible": true,
        "isExpanded": true,
        "isDraggable": true,
        "isAlwaysVisible": true,
        "isEditable": true,
        "data": [
          {
            "company": "Tech Solutions Inc.",
            "position": "Senior Software Engineer",
            "startDate": "2020-03",
            "endDate": "",
            "current": true,
            "description": "Led development of microservices architecture serving 1M+ users\nMentored junior developers and conducted code reviews\nReduced application load time by 40% through optimization"
          },
          {
            "company": "Innovation Labs",
            "position": "Software Engineer",
            "startDate": "2016-06",
            "endDate": "2020-02",
            "current": false,
            "description": "Developed and maintained React-based dashboard\nImplemented CI/CD pipeline reducing deployment time by 60%\nCollaborated with UX team to improve user experience"
          }
        ]
      },
      {
        "id": "projects",
        "type": "projects",
        "schema": "projects",
        "title": "Projects",
        "description": "Highlight your key projects and achievements",
        "isVisible": true,
        "isExpanded": true,
        "isDraggable": true,
        "isAlwaysVisible": false,
        "isEditable": true,
        "data": [
          {
            "name": "E-commerce Platform",
            "role": "Lead Developer",
            "organization": "Tech Solutions Inc.",
            "url": "https://project-demo.com",
            "startDate": "2021-04",
            "endDate": "2022-11",
            "current": false,
            "description": "Built scalable e-commerce platform handling 100K+ daily transactions\nImplemented secure payment processing system\nIntegrated inventory management system",
            "technologies": [
              "React",
              "Node.js",
              "PostgreSQL",
              "Redis",
              "AWS"
            ]
          },
          {
            "name": "Analytics Dashboard",
            "role": "Frontend Developer",
            "organization": "Innovation Labs",
            "url": "https://analytics-demo.com",
            "startDate": "2019-07",
            "endDate": "2020-02",
            "current": false,
            "description": "Developed real-time analytics dashboard\nIntegrated multiple data sources and APIs\nImplemented responsive design for mobile users",
            "technologies": [
              "React",
              "D3.js",
              "GraphQL",
              "Material-UI"
            ]
          }
        ]
      },
      {
        "id": "skills",
        "type": "skills",
        "schema": "skills",
        "title": "Skills",
        "description": "List your technical and professional skills",
        "isVisible": true,
        "isExpanded": true,
        "isDraggable": true,
        "isAlwaysVisible": false,
        "isEditable": true,
        "data": [
          {
            "category": "Programming Languages",
            "skills": [
              "JavaScript",
              "TypeScript",
              "Python",
              "Java"
            ]
          },
          {
            "category": "Frontend",
            "skills": [
              "React",
              "Next.js",
              "Vue.js",
              "HTML5",
              "CSS3",
              "TailwindCSS"
            ]
          },
          {
            "category": "Backend",
            "skills": [
              "Node.js",
              "Express",
              "PostgreSQL",
              "MongoDB",
              "REST APIs"
            ]
          }
        ]
      }
    ],
    "settings": {
      "documentSize": "A4",
      "scale": 0.6,
      "autoScale": true,
      "template": "classic",
      "margins": {
        "top": 20,
        "bottom": 20,
        "left": 20,
        "right": 20
      },
      "spacing": {
        "sectionGap": 24,
        "lineHeight": 1.5
      },
      "title": {
        "font": {
          "family": "Inter",
          "size": 28,
          "weight": "bold"
        },
        "color": "#111827",
        "align": "left"
      },
      "heading": {
        "font": {
          "family": "Inter",
          "size": 18,
          "weight": "semibold"
        },
        "color": "#111827"
      },
      "body": {
        "font": {
          "family": "Inter",
          "size": 12,
          "weight": "normal"
        },
        "color": "#374151"
      },
      "accent": {
        "primary": "#2563eb",
        "secondary": "#6b7280"
      },
      "dateFormat": "words-short",
      "displayFullLinks": false,
      "bulletPoints": "•"
    }
  }

export const fontFamilies = ["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Source Sans Pro", "Nunito"];

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

export const bulletPoints = [
  { value: "•", label: "Bullet (•)" },
  { value: "◦", label: "Circle (◦)" },
  { value: "▪", label: "Square (▪)" },
  { value: "▫", label: "Square Outline (▫)" },
  { value: "‣", label: "Triangle (‣)" },
  { value: "-", label: "Dash (-)" },
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
