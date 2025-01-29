"use client";

import { Document, Page, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { ResumePDFProfile } from "./sections/profile";
import { ResumePDFSummary } from "./sections/summary";
import { ResumePDFEducation } from "./sections/education";
import { ResumePDFWorkExperience } from "./sections/work-experience";
import { ResumePDFProjects } from "./sections/projects";
import { ResumePDFSkills } from "./sections/skills";
import { CVSection, CVSettings } from "../../types";
import { User } from "@/lib/validation/types";
import { mapFontWeight } from "./utils";

const Resume = ({
  combinedData,
  settings,
  user,
  isPDF,
}: {
  combinedData: CVSection[];
  settings: CVSettings;
  user: User;
  isPDF: boolean;
}) => {
  const visibleSections = combinedData.filter((section) => section.isVisible);

  return (
    <Document title={`${settings.name}`} author={`${user?.first_name} ${user?.last_name}`} producer={"CompClarity"}>
      <Page
        size={settings.documentSize}
        wrap
        style={{
          ...styles.column,
          fontFamily: settings.body.font.family,
          fontSize: settings.body.font.size,
          fontWeight: settings.body.font.weight,
          color: settings.body.color,
          lineHeight: settings.spacing.lineHeight,
          margin: `${settings.margins.top}px ${settings.margins.right}px ${settings.margins.bottom}px ${settings.margins.left}px`,
        }}
      >
        <View style={{ ...styles.column, height: "100%" }}>
          {visibleSections.map((section) => {
            if (!section.isVisible) return null;

            switch (section.schema) {
              case "profile":
                return <ResumePDFProfile key={section.id} info={section} settings={settings} isPDF={isPDF} />;
              case "summary":
                return <ResumePDFSummary key={section.id} info={section} settings={settings} />;
              case "educations":
                return <ResumePDFEducation key={section.id} info={section} settings={settings} />;
              case "workExperiences":
                return <ResumePDFWorkExperience key={section.id} info={section} settings={settings} />;
              case "projects":
                return <ResumePDFProjects key={section.id} info={section} settings={settings} isPDF={isPDF} />;
              case "skills":
                return <ResumePDFSkills key={section.id} info={section} settings={settings} />;
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
