"use client";

import { useAtomValue } from "jotai";
import { Document, Page, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { personalAtom, educationAtom, experienceAtom, skillsAtom, projectsAtom } from "@/lib/store/jotai";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
});

export function PDFPreview() {
  const personal = useAtomValue(personalAtom);
  const education = useAtomValue(educationAtom);
  const experience = useAtomValue(experienceAtom);
  const skills = useAtomValue(skillsAtom);
  const projects = useAtomValue(projectsAtom);

  return (
    <div className="w-full flex items-center justify-center bg-muted">
      <PDFViewer className="w-[595px] h-[842px] border-none" showToolbar={false}>
        <Document>
          <Page size="A4" style={styles.page}>
            {/* PDF content will be implemented in the next iteration */}
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
