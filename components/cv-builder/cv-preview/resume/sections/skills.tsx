"use client";

import { Text, View } from "@react-pdf/renderer";
import { SkillsData, CVSettings, CombinedCVData } from "../../../types";
import { styles } from "../styles";

interface SkillsProps {
  section: CombinedCVData["sections"][number];
  settings: CVSettings;
}

export const Skills = ({ section, settings }: SkillsProps) => {
  const data = section.data as SkillsData;

  return (
    <View style={styles.col}>
      <Text
        style={{
          ...styles.heading,
          fontSize: settings.heading.font.size,
          fontFamily: settings.heading.font.family,
          fontWeight: settings.heading.font.weight,
          color: settings.heading.color,
          textAlign: settings.heading.align,
        }}
      >
        {section.title}
      </Text>

      <View style={styles.gap4}>
        {data.map((category, index) => (
          <View key={index} style={styles.gap2}>
            <Text
              style={{
                ...styles.subtitle,
                fontFamily: settings.body.font.family,
                fontWeight: "semibold",
                color: settings.body.color,
              }}
            >
              {category.category}
            </Text>
            <Text
              style={{
                ...styles.text,
                ...styles.muted,
                fontFamily: settings.body.font.family,
              }}
            >
              {category.skills.join(` ${settings.bulletPoints} `)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
