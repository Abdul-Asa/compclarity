// "use client";

import { View, Text, Link } from "@react-pdf/renderer";
import { CVSection, CVSettings, ProjectData } from "@/components/cv-builder/types";
import { styles } from "../styles";
import { renderHTML, formatDate, ResumePDFLink, mapFontWeight } from "../utils";

export const ResumePDFProjects = ({
  info,
  settings,
  isPDF,
}: {
  info: CVSection;
  settings: CVSettings;
  isPDF: boolean;
}) => {
  const { title, data } = info;
  const { heading, dateFormat } = settings;
  const projectsData = data as ProjectData;

  if (!projectsData?.length) return null;

  return (
    <View
      style={{
        ...styles.column,
        marginTop: settings.spacing.sectionGap,
      }}
    >
      {/* Section Title */}
      <Text
        style={{
          fontSize: heading.font.size,
          fontWeight: mapFontWeight(heading.font.weight),
          textTransform: "uppercase",
        }}
      >
        {title}
      </Text>

      {/* Divider Line */}
      <View
        style={{
          borderBottom: "1px solid black",
          marginBottom: 8,
        }}
      />

      {/* Project Entries */}
      <View style={styles.column}>
        {projectsData.map((project, index) => (
          <View
            key={index}
            style={{
              ...styles.column,
              marginBottom: index < projectsData.length - 1 ? 8 : 0,
            }}
          >
            {/* Project Name with Technologies */}
            <View style={{ ...styles.row, justifyContent: "space-between" }}>
              <View style={{ ...styles.column, padding: 4 }}>
                <Text>
                  <Text style={{ fontWeight: mapFontWeight("bold") }}>{project.name}</Text>
                  {project.technologies?.length > 0 && (
                    <Text style={{ fontStyle: "italic" }}>
                      {" | "}
                      {project.technologies.join(", ")}
                    </Text>
                  )}
                </Text>
                {project.role && <Text>{project.role}</Text>}
              </View>
              <View style={{ ...styles.column, padding: 4 }}>
                <Text>
                  {project.startDate ? formatDate(project.startDate, dateFormat) : ""}
                  {" - "}
                  {project.current ? "Present" : project.endDate ? formatDate(project.endDate, dateFormat) : ""}
                </Text>
                {project.url && (
                  <ResumePDFLink src={project.url} isPDF={isPDF}>
                    <Text style={{ fontStyle: "italic" }}>{project.url}</Text>
                  </ResumePDFLink>
                )}
              </View>
            </View>

            {/* Description */}
            {project.description && (
              <View style={{ marginTop: 2, marginLeft: 8 }}>{renderHTML(project.description)}</View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};
