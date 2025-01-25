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
          padding: `${settings.margins.top}pt ${settings.margins.right}pt ${settings.margins.bottom}pt ${settings.margins.left}pt`,
        }}
      >
        <View style={{ gap: "1rem" }}>
          {visibleSections.map((section) => {
            switch (section.schema) {
              case "profile":
                return <Profile key={section.id} section={section} settings={settings} />;
              case "summary":
                return <Summary key={section.id} section={section} settings={settings} />;
              case "workExperiences":
                return <WorkExperience key={section.id} section={section} settings={settings} />;
              case "educations":
                return <Education key={section.id} section={section} settings={settings} />;
              case "projects":
                return <Projects key={section.id} section={section} settings={settings} />;
              case "skills":
                return <Skills key={section.id} section={section} settings={settings} />;
              default:
                return null;
            }
          })}
        </View>
      </Page>
    </Document>
  );
};

export default Resume;
