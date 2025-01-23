"use client";

import { CVData } from "../types";
import { Document, Page, Text, View, StyleSheet, PDFViewer as ReactPDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

interface PDFViewerProps {
  data: CVData;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    marginBottom: 10,
  },
  // Add more styles...
});

export function PDFViewer({ data }: PDFViewerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full h-full">
      <ReactPDFViewer width="100%" height="100%">
        <Document>
          <Page size="A4" style={styles.page}>
            {/* Header/Profile */}
            <View style={styles.header}>
              <Text style={styles.name}>
                {data.profile.firstName} {data.profile.lastName}
              </Text>
              {/* Add more sections... */}
            </View>
          </Page>
        </Document>
      </ReactPDFViewer>
    </div>
  );
}

// Static method for downloading
PDFViewer.download = async () => {
  // Implementation for PDF download
};
