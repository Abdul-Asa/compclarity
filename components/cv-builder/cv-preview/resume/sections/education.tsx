// "use client";

// import { Text, View } from "@react-pdf/renderer";
// import { EducationData, CVSettings, CombinedCVData } from "../../../types";
// import { parseAndRenderHTML, formatDate } from "../utils";
// import { styles } from "../styles";

// interface EducationProps {
//   section: CombinedCVData["sections"][number];
//   settings: CVSettings;
// }

// export const Education = ({ section, settings }: EducationProps) => {
//   const data = section.data as EducationData;

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
//         {data.map((education, index) => (
//           <View key={index} style={styles.gap2}>
//             {/* School and Degree */}
//             <View style={{ ...styles.row, ...styles.spaceBetween, ...styles.alignCenter }}>
//               <Text
//                 style={{
//                   ...styles.subtitle,
//                   fontFamily: settings.body.font.family,
//                   fontWeight: "semibold",
//                   color: settings.body.color,
//                 }}
//               >
//                 {education.school}
//               </Text>
//               <Text
//                 style={{
//                   ...styles.textSm,
//                   ...styles.muted,
//                   fontFamily: settings.body.font.family,
//                 }}
//               >
//                 {education.startDate && formatDate(education.startDate, settings.dateFormat)} -{" "}
//                 {education.endDate && formatDate(education.endDate, settings.dateFormat)}
//               </Text>
//             </View>

//             {/* Degree and Field */}
//             <Text
//               style={{
//                 ...styles.text,
//                 fontFamily: settings.body.font.family,
//                 fontWeight: "medium",
//                 color: settings.body.color,
//               }}
//             >
//               {education.degree}
//               {education.fieldOfStudy && ` in ${education.fieldOfStudy}`}
//             </Text>

//             {/* Location */}
//             {education.location && (
//               <Text
//                 style={{
//                   ...styles.textSm,
//                   ...styles.muted,
//                   fontFamily: settings.body.font.family,
//                 }}
//               >
//                 {education.location}
//               </Text>
//             )}

//             {/* Description */}
//             <View style={styles.gap2}>
//               {education.description && parseAndRenderHTML(education.description, settings.body.font.size, settings)}
//             </View>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };
