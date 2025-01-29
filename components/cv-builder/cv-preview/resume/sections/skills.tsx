import { View, Text } from "@react-pdf/renderer";
import { CVSection, CVSettings, SkillsData } from "@/components/cv-builder/types";
import { styles } from "../styles";
import { mapFontWeight } from "../utils";
export const ResumePDFSkills = ({ info, settings }: { info: CVSection; settings: CVSettings }) => {
  const { title, data } = info;
  const { heading } = settings;
  const skillsData = data as SkillsData;

  if (!skillsData?.length) return null;

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

      {/* Skills Categories */}
      <View style={styles.column}>
        {skillsData.map((skillCategory, index) => (
          <View
            key={index}
            style={{
              ...styles.column,
              marginBottom: index < skillsData.length - 1 ? 8 : 0,
            }}
          >
            {/* Category Name */}
            <Text style={{ fontWeight: mapFontWeight("bold") }}>{skillCategory.category}</Text>

            {/* Skills List */}
            <Text style={{ marginLeft: 8, marginTop: 2 }}>{skillCategory.skills.join(", ")}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
