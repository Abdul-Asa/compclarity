"use client";

import { useAtom } from "jotai";
import { Document, Page, View } from "@react-pdf/renderer";
import { combinedCVDataAtom } from "../../store";
import { Education } from "./sections/education";
import { Profile } from "./sections/profile";
import { Projects } from "./sections/projects";
import { Skills } from "./sections/skills";
import { Summary } from "./sections/summary";
import { WorkExperience } from "./sections/work-experience";
import { styles } from "./styles";

const Resume = () => {
  const [combinedData] = useAtom(combinedCVDataAtom);
  const { sections, settings } = combinedData;

  const visibleSections = sections.filter((section) => section.isVisible);

  return (
    <Document>
      <Page
        size={settings.documentSize}
        style={{
          ...styles.page,
          fontFamily: settings.body.font.family,
          fontSize: settings.body.font.size,
          padding: `${settings.margins.top}pt ${settings.margins.right}pt ${settings.margins.bottom}pt ${settings.margins.left}pt`,
        }}
      >
        <View style={styles.container}>
          {visibleSections.map((section) => (
            <View key={section.id} style={{ ...styles.section }}>
              {(() => {
                switch (section.schema) {
                  case "profile":
                    return <Profile section={section} settings={settings} />;
                  case "summary":
                    return <Summary section={section} settings={settings} />;
                  case "workExperiences":
                    return <WorkExperience section={section} settings={settings} />;
                  case "educations":
                    return <Education section={section} settings={settings} />;
                  case "projects":
                    return <Projects section={section} settings={settings} />;
                  case "skills":
                    return <Skills section={section} settings={settings} />;
                  default:
                    return null;
                }
              })()}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Resume;
