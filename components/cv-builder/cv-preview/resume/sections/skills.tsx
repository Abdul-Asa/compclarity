"use client";

import { Text, View } from "@react-pdf/renderer";
import { SkillsData, CVSettings, CombinedCVData } from "../../../types";

interface SkillsProps {
  section: CombinedCVData["sections"][number];
  settings: CVSettings;
}

export const Skills = ({ section, settings }: SkillsProps) => {
  const data = section.data as SkillsData;

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

      <View style={{ gap: "0.5rem" }}>
        {data.map((category, index) => (
          <View key={index}>
            <Text style={{ fontSize: settings.body.font.size, fontWeight: "bold", color: "#1a1a1a" }}>
              {category.category}
            </Text>
            <Text style={{ fontSize: settings.body.font.size - 1, color: "#4a5568" }}>
              {category.skills.join(" • ")}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
