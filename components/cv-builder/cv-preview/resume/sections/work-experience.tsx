"use client";

import { Text, View } from "@react-pdf/renderer";
import { WorkExperienceData, CVSettings, CombinedCVData } from "../../../types";
import { parseAndRenderHTML, formatDate } from "../utils";

interface WorkExperienceProps {
  section: CombinedCVData["sections"][number];
  settings: CVSettings;
}

export const WorkExperience = ({ section, settings }: WorkExperienceProps) => {
  const data = section.data as WorkExperienceData;

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

      {data.map((experience, index) => (
        <View key={index} style={{ gap: "0.25rem" }}>
          {/* Company and Position */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: settings.body.font.size, fontWeight: "bold", color: "#1a1a1a" }}>
              {experience.position} | {experience.company}
            </Text>
            <Text style={{ fontSize: settings.body.font.size - 1, color: "#4a5568" }}>
              {experience.startDate && formatDate(experience.startDate, settings.dateFormat)} -{" "}
              {experience.current
                ? "Present"
                : experience.endDate && formatDate(experience.endDate, settings.dateFormat)}
            </Text>
          </View>

          {/* Location */}
          {experience.location && (
            <Text style={{ fontSize: settings.body.font.size - 1, color: "#4a5568" }}>{experience.location}</Text>
          )}

          {/* Description */}
          <View style={{ gap: "0.25rem", marginTop: "0.25rem" }}>
            {experience.description && parseAndRenderHTML(experience.description, settings.body.font.size)}
          </View>
        </View>
      ))}
    </View>
  );
};
