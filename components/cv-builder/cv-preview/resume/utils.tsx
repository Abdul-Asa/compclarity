import { Font, Link, Text, View } from "@react-pdf/renderer";
import { parse } from "node-html-parser";
import { styles } from "./styles";
import { useEffect } from "react";

export type FontWeight = "normal" | "medium" | "semibold" | "bold" | number;

export const renderHTML = (html: string) => {
  // Early return for empty content
  if (!html) return null;

  const root = parse(html);

  const renderNode = (node: any, index?: number) => {
    // Handle text nodes
    if (node.nodeType === 3) {
      return <Text>{node.text}</Text>;
    }

    // Handle element nodes
    if (node.nodeType === 1) {
      const children = node.childNodes.map((child: any, index: number) => renderNode(child, index));

      switch (node.tagName?.toLowerCase()) {
        case "p":
          return <Text key={crypto.randomUUID()}>{children}</Text>;
        case "strong":
        case "b":
          return (
            <Text style={{ fontWeight: "bold" }} key={crypto.randomUUID()}>
              {children}
            </Text>
          );
        case "em":
        case "i":
          return (
            <Text style={{ fontStyle: "italic" }} key={crypto.randomUUID()}>
              {children}
            </Text>
          );
        case "ul":
          return (
            <View style={{ ...styles.column }} key={crypto.randomUUID()}>
              {children}
            </View>
          );
        case "ol":
          return (
            <View style={{ ...styles.column }} key={crypto.randomUUID()}>
              {children}
            </View>
          );
        case "li":
          const parent = node.parentNode;
          const isOrderedList = parent?.tagName?.toLowerCase() === "ol";
          const bulletPoint = isOrderedList ? `${parent.childNodes.indexOf(node) + 1}.` : "•";

          return (
            <View style={styles.row}>
              <Text style={{ marginRight: 5 }}>{bulletPoint}</Text>
              <View key={crypto.randomUUID()}>{children}</View>
            </View>
          );
        case "br":
          return <Br />;
        case "code":
          return (
            <Text
              key={crypto.randomUUID()}
              style={{
                fontFamily: "Courier",
                backgroundColor: "#f5f5f5",
                padding: "0 2px",
              }}
            >
              {children}
            </Text>
          );
        default:
          return <Text key={crypto.randomUUID()}>{children}</Text>;
      }
    }

    return null;
  };

  return <Text>{renderNode(root)}</Text>;
};

const Br = () => "\n";

type DateFormat = "numbers-slash" | "numbers-dash" | "words-short" | "words-long";

export const formatDate = (dateString: string, format: DateFormat = "words-short"): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const month = date.getMonth();
  const year = date.getFullYear();

  const months = {
    short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    long: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  switch (format) {
    case "numbers-slash":
      return `${String(month + 1).padStart(2, "0")}/${year}`;
    case "numbers-dash":
      return `${String(month + 1).padStart(2, "0")}-${year}`;
    case "words-short":
      return `${months.short[month]} ${year}`;
    case "words-long":
      return `${months.long[month]} ${year}`;
    default:
      return `${months.short[month]} ${year}`;
  }
};

export const ResumePDFLink = ({
  src,
  isPDF,
  children,
  style,
}: {
  src: string;
  isPDF: boolean;
  children: React.ReactNode;
  style?: any;
}) => {
  if (isPDF) {
    return (
      <Link src={src} style={{ textDecoration: "none", ...style }}>
        {children}
      </Link>
    );
  }
  return (
    <a href={src} style={{ textDecoration: "underline", ...style }} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export const useLoadFonts = () => {
  useEffect(() => {
    Font.register({
      family: "Roboto",
      fonts: [
        { src: "/fonts/Roboto/static/Roboto-Regular.ttf", fontWeight: 400 },
        { src: "/fonts/Roboto/static/Roboto-Bold.ttf", fontWeight: 700 },
        { src: "/fonts/Roboto/static/Roboto-Medium.ttf", fontWeight: 500 },
        { src: "/fonts/Roboto/static/Roboto-SemiBold.ttf", fontWeight: 600 },
        { src: "/fonts/Roboto/static/Roboto-Italic.ttf", fontWeight: 400, fontStyle: "italic" },
        { src: "/fonts/Roboto/static/Roboto-BoldItalic.ttf", fontWeight: 700, fontStyle: "italic" },
        { src: "/fonts/Roboto/static/Roboto-MediumItalic.ttf", fontWeight: 500, fontStyle: "italic" },
      ],
    });

    Font.register({
      family: "Inter",
      fonts: [
        { src: "/fonts/Inter/static/Inter-Regular.ttf", fontWeight: 400 },
        { src: "/fonts/Inter/static/Inter-Bold.ttf", fontWeight: 700 },
        { src: "/fonts/Inter/static/Inter-Medium.ttf", fontWeight: 500 },
        { src: "/fonts/Inter/static/Inter-SemiBold.ttf", fontWeight: 600 },
        { src: "/fonts/Inter/static/Inter-Italic.ttf", fontWeight: 400, fontStyle: "italic" },
        { src: "/fonts/Inter/static/Inter-BoldItalic.ttf", fontWeight: 700, fontStyle: "italic" },
        { src: "/fonts/Inter/static/Inter-MediumItalic.ttf", fontWeight: 500, fontStyle: "italic" },
      ],
    });

    Font.register({
      family: "Open Sans",
      fonts: [
        { src: "/fonts/Open_Sans/static/OpenSans-Regular.ttf" },
        { src: "/fonts/Open_Sans/static/OpenSans-Bold.ttf", fontWeight: "bold" },
        { src: "/fonts/Open_Sans/static/OpenSans-Medium.ttf", fontWeight: "medium" },
        { src: "/fonts/Open_Sans/static/OpenSans-SemiBold.ttf", fontWeight: "semibold" },
      ],
    });

    Font.register({
      family: "Inter",
      fonts: [
        { src: "/fonts/Inter/static/Inter-Regular.ttf" },
        { src: "/fonts/Inter/static/Inter-Bold.ttf", fontWeight: "bold" },
        { src: "/fonts/Inter/static/Inter-Medium.ttf", fontWeight: "medium" },
        { src: "/fonts/Inter/static/Inter-SemiBold.ttf", fontWeight: "semibold" },
      ],
    });

    Font.register({
      family: "Montserrat",
      fonts: [
        { src: "/fonts/Montserrat/static/Montserrat-Regular.ttf" },
        { src: "/fonts/Montserrat/static/Montserrat-Bold.ttf", fontWeight: "bold" },
        { src: "/fonts/Montserrat/static/Montserrat-Medium.ttf", fontWeight: "medium" },
        { src: "/fonts/Montserrat/static/Montserrat-SemiBold.ttf", fontWeight: "semibold" },
      ],
    });

    Font.register({
      family: "Lato",
      fonts: [
        { src: "/fonts/Lato/Lato-Regular.ttf" },
        { src: "/fonts/Lato/Lato-Bold.ttf", fontWeight: "bold" },
        { src: "/fonts/Lato/Lato-Medium.ttf", fontWeight: "medium" },
        { src: "/fonts/Lato/Lato-SemiBold.ttf", fontWeight: "semibold" },
        { src: "/fonts/Lato/Lato-Italic.ttf", fontStyle: "italic" },
        { src: "/fonts/Lato/Lato-BoldItalic.ttf", fontWeight: "bold", fontStyle: "italic" },
        { src: "/fonts/Lato/Lato-MediumItalic.ttf", fontWeight: "medium", fontStyle: "italic" },
      ],
    });
  }, []);
};

export const mapFontWeight = (weight: FontWeight): number => {
  if (typeof weight === "number") return weight;

  const weightMap: Record<string, number> = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };

  return weightMap[weight] || 400;
};

/**
 * Suppress ResumePDF development errors.
 * See ResumePDF doc string for context.
 */

export const SuppressResumePDFErrorMessage = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      const consoleError = console.error;
      const SUPPRESSED_WARNINGS = ["DOCUMENT", "PAGE", "TEXT", "VIEW"];
      console.error = function filterWarnings(msg, ...args) {
        if (!SUPPRESSED_WARNINGS.some((entry) => args[0]?.includes(entry))) {
          consoleError(msg, ...args);
        }
      };
    }
  }, []);
  return <></>;
};
