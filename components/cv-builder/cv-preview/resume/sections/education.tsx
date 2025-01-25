"use client";

import { Text, View } from "@react-pdf/renderer";
import { EducationData, CVSettings, CombinedCVData } from "../../../types";
import { parseAndRenderHTML, formatDate } from "../utils";

interface EducationProps {
  section: CombinedCVData["sections"][number];
  settings: CVSettings;
}

export const Education = ({ section, settings }: EducationProps) => {
  const data = section.data as EducationData;

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

      {data.map((education, index) => (
        <View key={index} style={{ gap: "0.25rem" }}>
          {/* School and Degree */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: settings.body.font.size, fontWeight: "bold", color: "#1a1a1a" }}>
              {education.school}
            </Text>
            <Text style={{ fontSize: settings.body.font.size - 1, color: "#4a5568" }}>
              {education.startDate && formatDate(education.startDate, settings.dateFormat)} -{" "}
              {education.endDate && formatDate(education.endDate, settings.dateFormat)}
            </Text>
          </View>

          {/* Degree and Field */}
          <Text style={{ fontSize: settings.body.font.size - 1, color: "#1a1a1a" }}>
            {education.degree}
            {education.fieldOfStudy && ` in ${education.fieldOfStudy}`}
          </Text>

          {/* Location */}
          {education.location && (
            <Text style={{ fontSize: settings.body.font.size - 1, color: "#4a5568" }}>{education.location}</Text>
          )}

          {/* Description */}
          <View style={{ gap: "0.25rem", marginTop: "0.25rem" }}>
            {education.description && parseAndRenderHTML(education.description, settings.body.font.size)}
          </View>
        </View>
      ))}
    </View>
  );
};
