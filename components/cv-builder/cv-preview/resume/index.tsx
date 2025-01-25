"use client";

import { useAtom } from "jotai";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { combinedCVDataAtom } from "../../store";

const Resume = () => {
  const [combinedData] = useAtom(combinedCVDataAtom);
  const { sections, settings } = combinedData;

  const visibleSections = sections.filter((section) => section.isVisible);

  return (
    <Document>
      <Page
        size={settings.documentSize}
        style={{
          fontFamily: settings.body.font.family,
          fontSize: settings.body.font.size,
        }}
      >
        <View>
          {visibleSections.map((section) => (
            <View key={section.id}>
              <Text>{section.title}</Text>
              <pre>{JSON.stringify(section, null, 2)}</pre>
            </View>
            // <View key={section.id} style={{ ...styles.section }}>
            //   {(() => {
            //     switch (section.schema) {
            //       case "profile":
            //         return <Profile section={section} settings={settings} />;
            //       case "summary":
            //         return <Summary section={section} settings={settings} />;
            //       case "workExperiences":
            //         return <WorkExperience section={section} settings={settings} />;
            //       case "educations":
            //         return <Education section={section} settings={settings} />;
            //       case "projects":
            //         return <Projects section={section} settings={settings} />;
            //       case "skills":
            //         return <Skills section={section} settings={settings} />;
            //       default:
            //         return null;
            //     }
            //   })()}
            // </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Resume;
