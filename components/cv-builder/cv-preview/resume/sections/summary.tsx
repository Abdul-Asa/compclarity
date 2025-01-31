import { View, Text } from "@react-pdf/renderer";
import { CVSection, CVSettings, SummaryData } from "@/components/cv-builder/types";
import { styles } from "../styles";
import { mapFontWeight, renderHTML } from "../utils";

export const ResumePDFSummary = ({ info, settings }: { info: CVSection; settings: CVSettings }) => {
  const { title, data } = info;
  const { content } = data as SummaryData;
  const { heading } = settings;
  if (!content) return null;

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
          color: heading.color,
          fontFamily: heading.font.family,
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

      {/* Summary Content */}
      <View style={{ lineHeight: 1.4 }}>{renderHTML(content)}</View>
    </View>
  );
};
