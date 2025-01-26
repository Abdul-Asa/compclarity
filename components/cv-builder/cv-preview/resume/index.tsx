// "use client";

// import { useAtom } from "jotai";
// import { Document, Page, View, Text } from "@react-pdf/renderer";
// import { combinedCVDataAtom } from "../../store";
// import { useUser } from "@/lib/hooks/useUser";
// import { styles } from "./styles";
// const Resume = () => {
//   const [combinedData] = useAtom(combinedCVDataAtom);
//   const { user } = useUser();
//   const { sections, settings } = combinedData;

//   const visibleSections = sections.filter((section) => section.isVisible);

//   return (
//     <Document title={`${settings.name}`} author={`${user?.first_name} ${user?.last_name}`} producer={"CompClarity"}>
//       <Page
//         size={settings.documentSize}
//         wrap
//         style={{
//           ...styles.col,
//           fontFamily: settings.body.font.family,
//           fontSize: settings.body.font.size,
//           fontWeight: settings.body.font.weight,
//           color: settings.body.color,
//           lineHeight: settings.spacing.lineHeight,
//           margin: `${settings.margins.top}px ${settings.margins.right}px ${settings.margins.bottom}px ${settings.margins.left}px`,
//         }}
//       >
//         <View>
//           {visibleSections.map((section) => (
//             <View key={section.id}>
//               <Text>{section.title}</Text>
//               <pre>{JSON.stringify(section, null, 2)}</pre>
//             </View>
//           ))}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default Resume;
