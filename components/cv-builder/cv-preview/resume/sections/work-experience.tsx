// "use client";

import { View, Text } from "@react-pdf/renderer";
import { CVSection, CVSettings, WorkExperienceData } from "@/components/cv-builder/types";
import { styles } from "../styles";
import { renderHTML, formatDate, mapFontWeight } from "../utils";

export const ResumePDFWorkExperience = ({ info, settings }: { info: CVSection; settings: CVSettings }) => {
  const { title, data } = info;
  const { heading, dateFormat } = settings;
  const workExperienceData = data as WorkExperienceData;

  if (!workExperienceData?.length) return null;

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

      {/* Work Experience Entries */}
      <View style={styles.column}>
        {workExperienceData.map((experience, index) => (
          <View
            key={index}
            style={{
              ...styles.column,
              marginBottom: index < workExperienceData.length - 1 ? 8 : 0,
            }}
          >
            {/* Position and Date */}
            <View style={{ ...styles.row, justifyContent: "space-between" }}>
              <Text style={{ fontWeight: mapFontWeight("bold") }}>{experience.position}</Text>
              <Text>
                {formatDate(experience.startDate, dateFormat)}
                {" - "}
                {experience.current ? "Present" : experience.endDate ? formatDate(experience.endDate, dateFormat) : ""}
              </Text>
            </View>

            {/* Company and Location */}
            <View style={{ ...styles.row, justifyContent: "space-between" }}>
              <Text style={{ fontStyle: "italic" }}>{experience.company}</Text>
              <Text style={{ fontStyle: "italic" }}>{experience.location}</Text>
            </View>

            {/* Description */}
            {experience.description && (
              <View style={{ marginTop: 2, marginLeft: 8 }}>{renderHTML(experience.description)}</View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};
