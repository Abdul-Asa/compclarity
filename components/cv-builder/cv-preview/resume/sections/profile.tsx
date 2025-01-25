"use client";

import { Text, View, Link } from "@react-pdf/renderer";
import { CombinedCVData, CVSection, CVSettings, ProfileData } from "../../../types";

interface ProfileProps {
  section: CombinedCVData["sections"][number];
  settings: CVSettings;
}

export const Profile = ({ section, settings }: ProfileProps) => {
  const { firstName, lastName, email, phone, location, links } = section.data as ProfileData;

  return (
    <View style={{ gap: "0.5rem" }}>
      {/* Name */}
      <Text
        style={{
          fontSize: settings.title.font.size,
          fontFamily: settings.title.font.family,
          fontWeight: "bold",
          color: "#1a1a1a",
        }}
      >
        {firstName} {lastName}
      </Text>

      {/* Contact Info */}
      <View
        style={{
          flexDirection: "row",
          gap: "1rem",
          flexWrap: "wrap",
          color: "#4a5568",
          fontSize: settings.body.font.size - 1,
        }}
      >
        {email && (
          <Link src={`mailto:${email}`}>
            <Text>{email}</Text>
          </Link>
        )}
        {phone && (
          <Link src={`tel:${phone}`}>
            <Text>{phone}</Text>
          </Link>
        )}
        {location && <Text>{location}</Text>}
      </View>

      {/* Links */}
      {links && links.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            gap: "1rem",
            flexWrap: "wrap",
            color: "#4a5568",
            fontSize: settings.body.font.size - 1,
          }}
        >
          {links.map(
            (link, index) =>
              link.url && (
                <Link key={index} src={link.url}>
                  <Text>{settings.displayFullLinks ? link.url : link.name}</Text>
                </Link>
              )
          )}
        </View>
      )}
    </View>
  );
};
