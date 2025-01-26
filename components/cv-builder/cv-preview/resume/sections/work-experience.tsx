// "use client";

// import { Text, View } from "@react-pdf/renderer";
// import { WorkExperienceData, CVSettings, CombinedCVData } from "../../../types";
// import { parseAndRenderHTML, formatDate } from "../utils";
// import { styles } from "../styles";

// interface WorkExperienceProps {
//   section: CombinedCVData["sections"][number];
//   settings: CVSettings;
// }

// export const WorkExperience = ({ section, settings }: WorkExperienceProps) => {
//   const data = section.data as WorkExperienceData;

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

//       <View style={styles.gap4}>
//         {data.map((experience, index) => (
//           <View key={index} style={styles.gap2}>
//             {/* Company and Position */}
//             <View style={{ ...styles.row, ...styles.spaceBetween, ...styles.alignCenter }}>
//               <Text
//                 style={{
//                   ...styles.subtitle,
//                   fontFamily: settings.body.font.family,
//                   fontWeight: "semibold",
//                   color: settings.body.color,
//                 }}
//               >
//                 {experience.position} | {experience.company}
//               </Text>
//               <Text
//                 style={{
//                   ...styles.textSm,
//                   ...styles.muted,
//                   fontFamily: settings.body.font.family,
//                 }}
//               >
//                 {experience.startDate && formatDate(experience.startDate, settings.dateFormat)} -{" "}
//                 {experience.current
//                   ? "Present"
//                   : experience.endDate && formatDate(experience.endDate, settings.dateFormat)}
//               </Text>
//             </View>

//             {/* Location */}
//             {experience.location && (
//               <Text
//                 style={{
//                   ...styles.textSm,
//                   ...styles.muted,
//                   fontFamily: settings.body.font.family,
//                 }}
//               >
//                 {experience.location}
//               </Text>
//             )}

//             {/* Description */}
//             <View style={styles.gap2}>
//               {experience.description && parseAndRenderHTML(experience.description, settings.body.font.size, settings)}
//             </View>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };
