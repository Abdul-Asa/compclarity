// "use client";

// import { Text, View } from "@react-pdf/renderer";
// import { SummaryData, CVSettings, CombinedCVData } from "../../../types";
// import { parseAndRenderHTML } from "../utils";
// import { styles } from "../styles";

// interface SummaryProps {
//   section: CombinedCVData["sections"][number];
//   settings: CVSettings;
// }

// export const Summary = ({ section, settings }: SummaryProps) => {
//   const { content } = section.data as SummaryData;

//   return (
//     <View style={styles.col}>
//       <Text
//         style={{
//           ...styles.heading,
//           fontSize: settings.heading.font.size,
//           fontFamily: settings.heading.font.family,
//           fontWeight: settings.heading.font.weight,
//           color: settings.heading.color,
//           textAlign: settings.heading.align,
//         }}
//       >
//         {section.title}
//       </Text>
//       <View style={styles.gap2}>{parseAndRenderHTML(content, settings.body.font.size, settings)}</View>
//     </View>
//   );
// };
