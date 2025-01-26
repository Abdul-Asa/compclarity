// "use client";

// import { View } from "@react-pdf/renderer";
// import { CombinedCVData, CVSettings, ProfileData } from "../../../types";
// import { styles, spacing } from "../styles";
// import { CVSection, CVText, CVRow, CVLink } from "../common";

// interface ProfileProps {
//   section: CombinedCVData["sections"][number];
//   settings: CVSettings;
// }

// export const Profile = ({ section, settings }: ProfileProps) => {
//   const { firstName, lastName, email, phone, location, links } = section.data as ProfileData;

//   return (
//     <CVSection>
//       {/* Name */}
//       <CVText settings={settings} variant="title">
//         {firstName} {lastName}
//       </CVText>

//       {/* Contact Info */}
//       <CVRow style={{ ...styles.wrap, ...styles.gap3, marginBottom: spacing[4] }}>
//         {email && (
//           <CVLink src={`mailto:${email}`}>
//             <CVText settings={settings} variant="small" style={styles.muted}>
//               {email}
//             </CVText>
//           </CVLink>
//         )}
//         {phone && (
//           <CVLink src={`tel:${phone}`}>
//             <CVText settings={settings} variant="small" style={styles.muted}>
//               {phone}
//             </CVText>
//           </CVLink>
//         )}
//         {location && (
//           <CVText settings={settings} variant="small" style={styles.muted}>
//             {location}
//           </CVText>
//         )}
//       </CVRow>

//       {/* Links */}
//       {links && links.length > 0 && (
//         <CVRow style={{ ...styles.wrap, ...styles.gap3 }}>
//           {links.map(
//             (link, index) =>
//               link.url && (
//                 <CVLink key={index} src={link.url}>
//                   <CVText settings={settings} variant="small" style={styles.link}>
//                     {settings.displayFullLinks ? link.url : link.name}
//                   </CVText>
//                 </CVLink>
//               )
//           )}
//         </CVRow>
//       )}
//     </CVSection>
//   );
// };
