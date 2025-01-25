import { StyleSheet } from "@react-pdf/renderer";

// Convert rem to pt (1rem = 12pt)
export const spacing = {
  0: "0",
  0.5: "1.5pt",
  1: "3pt",
  1.5: "4.5pt",
  2: "6pt",
  2.5: "7.5pt",
  3: "9pt",
  3.5: "10.5pt",
  4: "12pt",
  5: "15pt",
  6: "18pt",
  8: "24pt",
  10: "30pt",
  12: "36pt",
  16: "48pt",
  20: "60pt",
  24: "72pt",
  32: "96pt",
  40: "120pt",
  48: "144pt",
  56: "168pt",
  64: "192pt",
  full: "100%",
} as const;

export const styles = StyleSheet.create({
  // Layout
  page: {
    backgroundColor: "white",
    color: "#374151",
    lineHeight: 1.6,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[8],
  },
  section: {
    marginBottom: spacing[6],
  },

  // Flex Utilities
  row: {
    display: "flex",
    flexDirection: "row",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  alignCenter: {
    alignItems: "center",
  },
  wrap: {
    flexWrap: "wrap",
  },
  gap1: { gap: spacing[1] },
  gap2: { gap: spacing[2] },
  gap3: { gap: spacing[3] },
  gap4: { gap: spacing[4] },
  gap6: { gap: spacing[6] },

  // Typography
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: spacing[2],
  },
  heading: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: spacing[3],
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 600,
  },
  text: {
    fontSize: 11,
  },
  textSm: {
    fontSize: 10,
  },
  muted: {
    color: "#6b7280",
  },

  // Lists
  list: {
    paddingLeft: spacing[4],
  },
  listItem: {
    marginBottom: spacing[1],
  },
  bullet: {
    width: spacing[2],
    marginRight: spacing[2],
  },

  // Links
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
}); 