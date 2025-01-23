"use client";

import { CVData, CVSettings, SectionType, CVSection } from "../types";
import { format } from "date-fns";

interface HTMLPreviewProps {
  data: CVData;
  settings: CVSettings & {
    sections: CVSection[];
  };
}

export function HTMLPreview({ data, settings }: HTMLPreviewProps) {
  const formatDate = (date: string | undefined) => {
    if (!date) return "";
    const dateObj = new Date(date);
    return format(
      dateObj,
      settings.dateFormat === "numbers-slash"
        ? "MM/yyyy"
        : settings.dateFormat === "numbers-dash"
          ? "MM-yyyy"
          : settings.dateFormat === "words-short"
            ? "MMM yyyy"
            : "MMMM yyyy"
    );
  };

  const getLink = (url: string) => {
    if (settings.displayFullLinks) {
      return url.replace(/^https?:\/\//, "");
    }
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  // Section render methods
  const sectionRenderers: Record<SectionType, (section: CVSection) => JSX.Element> = {
    educations: (section) => (
      <section id="education" aria-label="Education">
        <h2 className="text-2xl font-semibold -mb-1">{section.title}</h2>
        <hr className="border-black border-t-[3px]" />
        {data.educations.data.map((edu, index) => (
          <div key={index} id={`edu-${index}`}>
            <div className="flex flex-row justify-between items-end">
              <div>
                <h3>
                  <strong>{edu.school},</strong> {edu.fieldOfStudy}
                </h3>
                <p className="italic">{edu.degree}</p>
              </div>
              <div className="text-right">
                <div>{edu.location}</div>
                <div className="italic">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
            </div>
            {edu.description && <p className="mt-2 whitespace-pre-line">{edu.description}</p>}
          </div>
        ))}
      </section>
    ),

    workExperiences: (section) => (
      <section id="experience" aria-label="Work Experience">
        <h2 className="text-2xl font-semibold -mb-1">{section.title}</h2>
        <hr className="border-black border-t-[3px]" />
        {data.workExperiences.data.map((exp, index) => (
          <div key={index} id={`exp-${index}`}>
            <div className="flex flex-row justify-between items-end">
              <div>
                <h3>
                  <strong>{exp.company}</strong> {exp.location && `- ${exp.location}`}
                </h3>
                <p className="italic">{exp.position}</p>
              </div>
              <div>
                <p className="italic">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </p>
              </div>
            </div>
            {exp.description && <p className="mt-2 whitespace-pre-line">{exp.description}</p>}
          </div>
        ))}
      </section>
    ),

    projects: (section) => (
      <section id="projects" aria-label="Projects">
        <h2 className="text-2xl font-semibold -mb-1">{section.title}</h2>
        <hr className="border-black border-t-[3px]" />
        {data.projects.data.map((project, index) => (
          <div key={index} id={`project-${index}`}>
            <div className="flex flex-row justify-between items-end">
              <div>
                <h3>
                  <strong>{project.name}</strong>
                  {project.organization && ` - ${project.organization}`}
                </h3>
                <p className="italic">{project.role}</p>
              </div>
              <div>
                <p className="italic">
                  {formatDate(project.startDate)} - {project.current ? "Present" : formatDate(project.endDate)}
                </p>
              </div>
            </div>
            {project.description && <p className="mt-2 whitespace-pre-line">{project.description}</p>}
            {project.technologies.length > 0 && (
              <p className="mt-1">
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>
            )}
            {project.url && (
              <p className="mt-1">
                <strong>URL:</strong>{" "}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {getLink(project.url)}
                </a>
              </p>
            )}
          </div>
        ))}
      </section>
    ),

    skills: (section) => (
      <section id="skills" aria-label="Skills">
        <h2 className="text-2xl font-semibold -mb-1">{section.title}</h2>
        <hr className="border-black border-t-[3px]" />
        <ul className="px-4 pt-2">
          {data.skills.data.map((category, index) => (
            <li key={index}>
              <strong>{category.category}:</strong> {category.skills.join(", ")}
            </li>
          ))}
        </ul>
      </section>
    ),

    profile: (section) => (
      <header className="grid grid-cols-3">
        <div className="col-span-1 col-start-2 flex flex-col text-center">
          <h1 className="text-xl font-bold">
            {data.profile.firstName} {data.profile.lastName}
          </h1>
          <a href={`mailto:${data.profile.email}`} className="font-bold">
            {data.profile.email}
          </a>
          {data.profile.phone && <a href={`tel:${data.profile.phone}`}>{data.profile.phone}</a>}
          {data.profile.location && <p>{data.profile.location}</p>}
        </div>
        <div className="my-auto text-right flex flex-col">
          {data.profile.links.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
              {getLink(link.url)}
            </a>
          ))}
        </div>
      </header>
    ),

    summary: (section) => (
      <section id="summary" aria-label="Professional Summary">
        <h2 className="text-2xl font-semibold -mb-1">{section.title}</h2>
        <hr className="border-black border-t-[3px]" />
        <p className="mt-2 whitespace-pre-line">{data.summary.content}</p>
      </section>
    ),

    custom: (section) => <></>, // Placeholder for custom sections
  };

  return (
    <div
      className="w-full h-full overflow-auto bg-[#f0f0f0] p-8"
      style={{
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      <div className="print-mimic leading-snug font-serif">
        <main>{settings.sections.map((section) => sectionRenderers[section.type](section))}</main>
      </div>

      <style jsx global>{`
        @media screen {
          .print-mimic {
            width: 210mm;
            margin: 20mm auto;
            padding: ${settings.margins.top}mm ${settings.margins.right}mm ${settings.margins.bottom}mm
              ${settings.margins.left}mm;
            border: 1px solid #000;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            font-family: ${settings.font.family};
            font-size: ${settings.font.size}px;
          }
        }

        @media print {
          .print-mimic {
            width: auto;
            margin: 0;
            padding: ${settings.margins.top}mm ${settings.margins.right}mm ${settings.margins.bottom}mm
              ${settings.margins.left}mm;
            border: none;
            box-shadow: none;
            font-family: ${settings.font.family};
            font-size: ${settings.font.size}px;
          }

          .print-hide {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
