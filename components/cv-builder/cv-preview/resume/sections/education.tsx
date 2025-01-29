// "use client";

import { View, Text } from "@react-pdf/renderer";
import { CVSection, CVSettings, EducationData } from "@/components/cv-builder/types";
import { styles } from "../styles";
import { renderHTML, formatDate, mapFontWeight } from "../utils";

export const ResumePDFEducation = ({ info, settings }: { info: CVSection; settings: CVSettings }) => {
  const { title, data } = info;
  const { heading, dateFormat } = settings;
  const educationData = data as EducationData;

  if (!educationData?.length) return null;

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
          color: heading.color,
          fontFamily: heading.font.family,
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

      {/* Education Entries */}
      <View style={styles.column}>
        {educationData.map((education, index) => (
          <View
            key={index}
            style={{
              ...styles.column,
              marginBottom: index < educationData.length - 1 ? 8 : 0,
            }}
          >
            {/* School and Location */}
            <View style={{ ...styles.row, justifyContent: "space-between" }}>
              <Text style={{ fontWeight: mapFontWeight("bold") }}>{education.school}</Text>
              <Text>
                {education.startDate ? formatDate(education.startDate, dateFormat) : ""}
                {education.startDate && education.endDate ? " - " : ""}
                {education.endDate ? formatDate(education.endDate, dateFormat) : ""}
              </Text>
            </View>

            {/* Degree and Field */}
            <View style={{ ...styles.row, justifyContent: "space-between" }}>
              <Text>
                {education.degree}
                {education.degree && education.fieldOfStudy ? " in " : ""}
                {education.fieldOfStudy}
              </Text>
              <Text>{education.location}</Text>
            </View>

            {/* Description */}
            {education.description && (
              <View style={{ marginTop: 2, marginLeft: 8, marginRight: 8 }}>{renderHTML(education.description)}</View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};
