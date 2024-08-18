import type { WebPage, WithContext } from "schema-dts"

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
  // breadcrumb: {
  //   "@type": "BreadcrumbList",
  //   itemListElement: [
  //     {
  //       "@type": "ListItem",
  //       position: 1,
  //       item: {
  //         "@type": "WebPage",
  //         "@id": "https://compclarity.com/",
  //         "url": "https://compclarity.com",
  //         "name": "Home",
  //       }
  //     },
  //     {
  //       "@type": "ListItem",
  //       position: 2,
  //       item: {
  //         "@type": "WebPage",
  //         "@id": "https://compclarity.com/offers",
  //         "url": "https://compclarity.com/offers",
  //         "name": "Offers",
  //       }
  //     },
  //     {
  //       "@type": "ListItem",
  //       position: 3,
  //       name: "Add",
  //       url: "https://compclarity.com/add",
  //       item: "https://compclarity.com/add",
  //     },
  //     {
  //       "@type": "ListItem",
  //       position: 4,
  //       name: "Privacy",
  //       url: "https://compclarity.com/privacy",
  //       item: "https://compclarity.com/privacy",
  //     },
  //   ],
  // },
  // mainEntity: {
  //   "@type": "Organization",
  //   email: "contact@compclarity.com",
  //   sameAs: [
  //     "https://discord.gg/AuAvjpTTnm",
  //     "https://www.linkedin.com/company/compclarity",
  //     "https://www.instagram.com/comp.clarity",
  //     "https://twitter.com/CompClarity",
  //     "https://www.tiktok.com/@cscareers",
  //   ],
  // },
}
