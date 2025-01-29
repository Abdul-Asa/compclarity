import { View, Text, Link } from "@react-pdf/renderer";
import { CVSection, CVSettings, ProfileData } from "@/components/cv-builder/types";
import { styles } from "../styles";
import React from "react";
import { mapFontWeight, ResumePDFLink } from "../utils";
export const ResumePDFProfile = ({
  info,
  settings,
  isPDF,
}: {
  info: CVSection;
  settings: CVSettings;
  isPDF: boolean;
}) => {
  const { firstName, lastName, email, phone, links, location } = info.data as ProfileData;
  const { title, spacing, displayFullLinks } = settings;
  const { font, color, align } = title;
  const { size, weight, family } = font;
  const { lineHeight } = spacing;
  if (isPDF) {
    console.log("isPDF", "reached here profile");
  }
  return (
    <View
      style={{
        ...styles.column,
        justifyContent: styles[align].justifyContent,
        fontFamily: family,
      }}
    >
      {/* Name Header */}
      <Text
        style={{
          fontSize: size,
          fontWeight: mapFontWeight(weight),
          textTransform: "uppercase",
          marginBottom: lineHeight,
          textAlign: align,
          color: color,
        }}
      >
        {`${firstName} ${lastName}`}
      </Text>

      {/* Contact Information */}
      <View
        style={{
          ...styles.row,
          justifyContent: styles[align].justifyContent,
          textAlign: align,
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        {" "}
        {location && <Text>{location}</Text>}
        {location && (phone || email || links) && <Text>|</Text>}
        {phone && <Text>{phone}</Text>}
        {phone && email && <Text>|</Text>}
        {email && (
          <ResumePDFLink src={`mailto:${email}`} isPDF={isPDF}>
            {email}
          </ResumePDFLink>
        )}
        {email && links && links.length > 0 && <Text>|</Text>}
        {links &&
          links.map((link, index) => (
            <React.Fragment key={link.url}>
              <ResumePDFLink src={link.url} isPDF={isPDF}>
                {displayFullLinks ? link.url : link.name}
              </ResumePDFLink>
              {index < links.length - 1 && <Text>|</Text>}
            </React.Fragment>
          ))}
      </View>
    </View>
  );
};
