// "use client";

// import { Text, View, Link } from "@react-pdf/renderer";
// import { ProjectData, CVSettings, CombinedCVData } from "../../../types";
// import { parseAndRenderHTML, formatDate } from "../utils";
// import { styles } from "../styles";

// interface ProjectsProps {
//   section: CombinedCVData["sections"][number];
//   settings: CVSettings;
// }

// export const Projects = ({ section, settings }: ProjectsProps) => {
//   const data = section.data as ProjectData;

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
//         {data.map((project, index) => (
//           <View key={index} style={styles.gap2}>
//             {/* Project Name and Date */}
//             <View style={{ ...styles.row, ...styles.spaceBetween, ...styles.alignCenter }}>
//               <View style={{ ...styles.row, ...styles.gap2, ...styles.alignCenter }}>
//                 <Text
//                   style={{
//                     ...styles.subtitle,
//                     fontFamily: settings.body.font.family,
//                     fontWeight: "semibold",
//                     color: settings.body.color,
//                   }}
//                 >
//                   {project.name}
//                 </Text>
//                 {project.url && (
//                   <Link src={project.url}>
//                     <Text
//                       style={{
//                         ...styles.textSm,
//                         ...styles.link,
//                         fontFamily: settings.body.font.family,
//                       }}
//                     >
//                       {settings.displayFullLinks ? project.url : "Link"}
//                     </Text>
//                   </Link>
//                 )}
//               </View>
//               <Text
//                 style={{
//                   ...styles.textSm,
//                   ...styles.muted,
//                   fontFamily: settings.body.font.family,
//                 }}
//               >
//                 {project.startDate && formatDate(project.startDate, settings.dateFormat)} -{" "}
//                 {project.current ? "Present" : project.endDate && formatDate(project.endDate, settings.dateFormat)}
//               </Text>
//             </View>

//             {/* Role and Organization */}
//             {(project.role || project.organization) && (
//               <Text
//                 style={{
//                   ...styles.text,
//                   fontFamily: settings.body.font.family,
//                   fontWeight: "medium",
//                   color: settings.body.color,
//                 }}
//               >
//                 {project.role}
//                 {project.role && project.organization && " | "}
//                 {project.organization}
//               </Text>
//             )}

//             {/* Description */}
//             <View style={styles.gap2}>
//               {project.description && parseAndRenderHTML(project.description, settings.body.font.size, settings)}
//             </View>

//             {/* Technologies */}
//             {project.technologies && project.technologies.length > 0 && (
//               <Text
//                 style={{
//                   ...styles.textSm,
//                   ...styles.muted,
//                   fontFamily: settings.body.font.family,
//                 }}
//               >
//                 Technologies: {project.technologies.join(", ")}
//               </Text>
//             )}
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };
