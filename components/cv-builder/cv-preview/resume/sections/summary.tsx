"use client";

import { Text, View } from "@react-pdf/renderer";
import { SummaryData, CVSettings, CombinedCVData } from "../../../types";
import { parseAndRenderHTML } from "../utils";

interface SummaryProps {
  section: CombinedCVData["sections"][number];
  settings: CVSettings;
}

export const Summary = ({ section, settings }: SummaryProps) => {
  const { content } = section.data as SummaryData;

  return (
    <View style={{ gap: "0.5rem" }}>
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
      <View style={{ gap: "0.25rem" }}>{parseAndRenderHTML(content, settings.body.font.size)}</View>
    </View>
  );
};
