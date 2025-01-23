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
      <div className="group/section">
        <div className="flex justify-between items-end border-b border-black/70 mb-1">
          <div className="flex gap-1.5 items-center">
            <span className="font-bold text-sm uppercase">{section.title}</span>
          </div>
        </div>
        <div className="ml-[calc(-2rem-0.125rem)] -mr-9">
          <ul className="flex flex-col p-0 gap-2 list-none">
            {data.educations.data.map((edu, index) => (
              <li key={index} className="flex gap-2 group/entity">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col w-full">
                    <span className="text-sm font-semibold">{edu.school}</span>
                    <span className="text-sm italic">{edu.degree}</span>
                  </div>
                  <div className="flex flex-col w-full text-right">
                    <div className="text-sm font-bold">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                    {edu.location && <div className="text-sm italic">{edu.location}</div>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),

    workExperiences: (section) => (
      <div className="group/section">
        <div className="flex justify-between items-end border-b border-black/70 mb-1">
          <div className="flex gap-1.5 items-center">
            <span className="font-bold text-sm uppercase">{section.title}</span>
          </div>
        </div>
        <div className="ml-[calc(-2rem-0.125rem)] -mr-9">
          <ul className="flex flex-col p-0 gap-2 list-none">
            {data.workExperiences.data.map((exp, index) => (
              <li key={index} className="flex gap-2 group/entity">
                <div className="flex flex-col w-full group/parent">
                  <div className="flex justify-between">
                    <div className="flex w-full items-center gap-4">
                      <div className="flex flex-col w-max group">
                        <span className="text-[0.86rem]/[1.15rem] font-semibold">{exp.position}</span>
                        <span className="text-sm italic">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col w-full text-right">
                      <div className="text-sm font-bold">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                      {exp.location && <div className="text-sm italic">{exp.location}</div>}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="space-y-0.5 p-1 -m-1">
                      <ul className="space-y-0">
                        {exp.description.split("\n").map((bullet, i) => (
                          <li key={i} className="flex items-start justify-center gap-2 leading-none">
                            <div className="flex items-center justify-center gap-3">
                              <span className="flex items-center justify-center h-[1.15rem] w-3 scale-110">•</span>
                            </div>
                            <div className="inline-flex items-end w-full gap-2">
                              <span className="text-[0.86rem]/[1.15rem]">{bullet}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),

    projects: (section) => (
      <div className="group/section">
        <div className="flex justify-between items-end border-b border-black/70 mb-1">
          <div className="flex gap-1.5 items-center">
            <span className="font-bold text-sm uppercase">{section.title}</span>
          </div>
        </div>
        <div className="ml-[calc(-2rem-0.125rem)] -mr-9">
          <ul className="flex flex-col p-0 gap-2 list-none">
            {data.projects.data.map((project, index) => (
              <li key={index} className="flex gap-2 group/entity">
                <div className="flex flex-col w-full group/parent">
                  <div className="flex justify-between">
                    <div className="flex w-full items-center gap-2">
                      <div className="flex items-center">
                        <span className="text-[0.86rem]/[1.15rem] font-semibold pr-[6px]">{project.name}</span>
                        <div className="shrink-0 w-[1px] h-4 bg-black"></div>
                        <span className="text-sm italic pl-[6px]">{project.technologies.join(", ")}</span>
                      </div>
                    </div>
                    <div className="text-sm font-bold">
                      {formatDate(project.startDate)} - {project.current ? "Present" : formatDate(project.endDate)}
                    </div>
                  </div>
                  {project.description && (
                    <div className="space-y-0.5 p-1 -m-1">
                      <ul className="space-y-0">
                        {project.description.split("\n").map((bullet, i) => (
                          <li key={i} className="flex items-start justify-center gap-2 leading-none">
                            <div className="flex items-center justify-center gap-3">
                              <span className="flex items-center justify-center h-[1.15rem] w-3 scale-110">•</span>
                            </div>
                            <div className="inline-flex items-end w-full gap-2">
                              <span className="text-[0.86rem]/[1.15rem]">{bullet}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),

    skills: (section) => (
      <div className="group/section">
        <div className="flex justify-between items-end border-b border-black/70 mb-1">
          <div className="flex gap-1.5 items-center">
            <span className="font-bold text-sm uppercase">{section.title}</span>
          </div>
        </div>
        <div className="ml-[calc(-2rem-0.125rem)] -mr-9">
          <ul className="flex flex-col p-0 list-none gap-0">
            {data.skills.data.map((category, index) => (
              <li key={index} className="flex gap-2 group/entity">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div>
                      <span className="text-[0.86rem]/[1.15rem] font-semibold">{category.category}</span>
                      <span className="mr-1 text-[0.86rem]/[1.15rem]">: </span>
                      <span className="text-[0.86rem]/[1.15rem]">{category.skills.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),

    profile: (section) => (
      <div className="flex flex-col space-y-1 mb-2">
        <h1 className="w-fit text-3xl font-bold capitalize tracking-tight">
          {data.profile.firstName} {data.profile.lastName}
        </h1>
        <ul className="flex">
          <li>
            <a href={`mailto:${data.profile.email}`} className="text-sm">
              {data.profile.email}
            </a>
            <span className="text-xs px-0.5">❖</span>
          </li>
          {data.profile.phone && (
            <li>
              <a href={`tel:${data.profile.phone}`} className="text-sm">
                {data.profile.phone}
              </a>
              <span className="text-xs px-0.5">❖</span>
            </li>
          )}
          {data.profile.links.map((link, index) => (
            <li key={index}>
              <span className="text-sm">{link.name.toLowerCase()}.com/</span>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm">
                {getLink(link.url)}
              </a>
              {index < data.profile.links.length - 1 && <span className="text-xs px-0.5">❖</span>}
            </li>
          ))}
        </ul>
      </div>
    ),

    summary: (section) => (
      <div className="group/section">
        <div className="flex justify-between items-end border-b border-black/70 mb-1">
          <div className="flex gap-1.5 items-center">
            <span className="font-bold text-sm uppercase">{section.title}</span>
          </div>
        </div>
        <p className="text-[0.86rem]/[1.15rem] whitespace-pre-line">{data.summary.content}</p>
      </div>
    ),

    custom: () => <></>,
  };

  return (
    <div className="w-full h-full overflow-auto bg-gray-100">
      <div
        id="paper"
        className="relative bg-white border p-2 border-gray-200 shadow-2xl shadow-slate-700/10 ring-1 ring-gray-900/5 mx-auto my-8"
      >
        <div className="paper-container font-minimal flex flex-col gap-2 leading-none max-w-[700px] mx-auto">
          {settings.sections.map((section) => (
            <div key={section.id}>{sectionRenderers[section.type](section)}</div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media screen {
          #paper {
            width: 210mm;
            min-height: 297mm;
            padding: ${settings.margins.top}mm ${settings.margins.right}mm ${settings.margins.bottom}mm
              ${settings.margins.left}mm;
          }
        }

        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          body {
            margin: 0;
          }

          #paper {
            width: 210mm;
            min-height: 297mm;
            padding: ${settings.margins.top}mm ${settings.margins.right}mm ${settings.margins.bottom}mm
              ${settings.margins.left}mm;
            margin: 0;
            box-shadow: none;
            border: none;
            background: white;
          }

          .print-hide {
            display: none;
          }
        }

        .paper-container {
          font-family: ${settings.font.family}, system-ui, sans-serif;
          font-size: ${settings.font.size}px;
          line-height: 1.5;
          color: #111827;
        }
      `}</style>
    </div>
  );
}
