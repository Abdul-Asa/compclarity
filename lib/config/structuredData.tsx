import type { WebPage, WithContext } from "schema-dts";

export const rootStructuredData: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "CompClarity",
  url: "https://compclarity.com",
  thumbnailUrl: "https://compclarity.com/favicon.ico",
  inLanguage: "en-GB",
  description:
    "Your guide to fair pay from day one. Compare salaries across Europe and make informed career choices with comprehensive, community-driven data!",
  isPartOf: {
    "@type": "WebSite",
    name: "CompClarity",
    url: "https://compclarity.com",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "WebPage",
          "@id": "https://compclarity.com/",
          url: "https://compclarity.com",
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "WebPage",
          "@id": "https://compclarity.com/tech",
          url: "https://compclarity.com/tech",
          name: "Tech Salaries",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "WebPage",
          "@id": "https://compclarity.com/finance",
          url: "https://compclarity.com/finance",
          name: "Finance Salaries",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "WebPage",
          "@id": "https://compclarity.com/jobs",
          url: "https://compclarity.com/jobs",
          name: "Jobs",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "WebPage",
          "@id": "https://compclarity.com/about",
          url: "https://compclarity.com/about",
          name: "About",
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "WebPage",
          "@id": "https://compclarity.com/privacy",
          url: "https://compclarity.com/privacy",
          name: "Privacy",
        },
      },
    ],
  },
  mainEntity: {
    "@type": "Organization",
    name: "CompClarity",
    url: "https://compclarity.com",
    logo: "https://compclarity.com/favicon.ico",
    email: "contact@compclarity.com",
    sameAs: [
      "https://discord.gg/AuAvjpTTnm",
      "https://www.linkedin.com/company/compclarity",
      "https://www.instagram.com/comp.clarity",
      "https://twitter.com/CompClarity",
      "https://www.tiktok.com/@cscareers",
    ],
  },
};
