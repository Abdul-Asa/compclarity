"use client";

import { Text, View, Link } from "@react-pdf/renderer";
import { ProjectData, CVSettings, CombinedCVData } from "../../../types";
import { parseAndRenderHTML, formatDate } from "../utils";

interface ProjectsProps {
  section: CombinedCVData["sections"][number];
  settings: CVSettings;
}

export const Projects = ({ section, settings }: ProjectsProps) => {
  const data = section.data as ProjectData;

  return (
    <View style={{ gap: "0.75rem" }}>
      <Text
        style={{
          fontSize: settings.heading.font.size,
          fontFamily: settings.heading.font.family,
          fontWeight: "bold",
          color: "#1a1a1a",
          marginBottom: "0.25rem",
        }}
      >
        {section.title}
      </Text>

      {data.map((project, index) => (
        <View key={index} style={{ gap: "0.25rem" }}>
          {/* Project Name and Date */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: settings.body.font.size, fontWeight: "bold", color: "#1a1a1a" }}>
              {project.name}
              {project.url && (
                <Link src={project.url}>
                  <Text style={{ fontSize: settings.body.font.size - 1, color: "#4a5568" }}>
                    {" "}
                    ({settings.displayFullLinks ? project.url : "Link"})
                  </Text>
                </Link>
              )}
            </Text>
            <Text style={{ fontSize: settings.body.font.size - 1, color: "#4a5568" }}>
              {project.startDate && formatDate(project.startDate, settings.dateFormat)} -{" "}
              {project.current ? "Present" : project.endDate && formatDate(project.endDate, settings.dateFormat)}
            </Text>
          </View>

          {/* Role and Organization */}
          {(project.role || project.organization) && (
            <Text style={{ fontSize: settings.body.font.size - 1, color: "#1a1a1a" }}>
              {project.role}
              {project.role && project.organization && " | "}
              {project.organization}
            </Text>
          )}

          {/* Description */}
          <View style={{ gap: "0.25rem", marginTop: "0.25rem" }}>
            {project.description && parseAndRenderHTML(project.description, settings.body.font.size)}
          </View>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <Text style={{ fontSize: settings.body.font.size - 1, color: "#4a5568", marginTop: "0.25rem" }}>
              Technologies: {project.technologies.join(", ")}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};
