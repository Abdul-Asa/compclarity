import { Text, View, Link } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { styles } from "../styles";
import { CVSettings } from "../../../types";

export const CVText = ({
  style = {},
  settings,
  variant = "body",
  children,
}: {
  style?: Style;
  settings: CVSettings;
  variant?: "title" | "heading" | "subtitle" | "body" | "small";
  children: React.ReactNode;
}) => {
  const baseStyle = {
    ...styles.text,
    fontFamily: settings.body.font.family,
    color: settings.body.color,
  };

  let variantStyle = {};
  switch (variant) {
    case "title":
      variantStyle = {
        ...styles.title,
        fontSize: settings.title.font.size,
        fontFamily: settings.title.font.family,
        fontWeight: settings.title.font.weight,
        color: settings.title.color,
        textAlign: settings.title.align,
      };
      break;
    case "heading":
      variantStyle = {
        ...styles.heading,
        fontSize: settings.heading.font.size,
        fontFamily: settings.heading.font.family,
        fontWeight: settings.heading.font.weight,
        color: settings.heading.color,
        textAlign: settings.heading.align,
      };
      break;
    case "subtitle":
      variantStyle = {
        ...styles.subtitle,
        fontWeight: "semibold",
      };
      break;
    case "small":
      variantStyle = {
        ...styles.textSm,
      };
      break;
  }

  return <Text style={{ ...baseStyle, ...variantStyle, ...style }}>{children}</Text>;
};

export const CVSection = ({ style = {}, children }: { style?: Style; children: React.ReactNode }) => (
  <View style={{ ...styles.col, ...style }}>{children}</View>
);

export const CVRow = ({ style = {}, children }: { style?: Style; children: React.ReactNode }) => (
  <View style={{ ...styles.row, ...style }}>{children}</View>
);

export const CVLink = ({ src, style = {}, children }: { src: string; style?: Style; children: React.ReactNode }) => (
  <Link src={src} style={{ ...styles.row, ...styles.gap1, ...styles.alignCenter, ...style }}>
    {children}
  </Link>
);

export const CVBulletList = ({ items, settings }: { items: string[]; settings: CVSettings }) => {
  return (
    <>
      {items.map((item, idx) => (
        <CVRow key={idx} style={styles.gap2}>
          <CVText settings={settings}>{settings.bulletPoints}</CVText>
          <CVText settings={settings} style={{ flex: 1 }}>
            {item}
          </CVText>
        </CVRow>
      ))}
    </>
  );
};
