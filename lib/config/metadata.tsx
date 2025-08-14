import { Metadata } from "next";
import { getMainUrl } from "./env";

export const metadata: Metadata = {
  metadataBase: new URL(getMainUrl()),
  title: {
    default: "CompClarity",
    template: "%s | CompClarity",
  },
  description:
    "Your guide to fair pay from day one. Compare salaries across Europe and make informed career choices with comprehensive, community-driven data!",
  twitter: {
    card: "summary_large_image",
    title: "CompClarity",
    description:
      "Your guide to fair pay from day one. Compare salaries across Europe and make informed career choices with comprehensive, community-driven data!",
    images: ["/assets/og.png"],
  },
  openGraph: {
    title: "CompClarity",
    description:
      "Your guide to fair pay from day one. Compare salaries across Europe and make informed career choices with comprehensive, community-driven data!",
    images: ["/assets/og.png"],
  },
  keywords: [
    "CompClarity",
    "Compensation",
    "Salaries",
    "Europe",
    "Data",
    "Transparency",
    "Job Market",
    "Career Choices",
    "Internships",
    "Jobs",
    "Job Search",
    "Job Listings",
    "Job Postings",
    "Job Descriptions",
    "Job Applications",
    "Interviews",
    "Job Offers",
  ],
};
