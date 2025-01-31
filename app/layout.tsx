import Script from "next/script";
import { Open_Sans, Space_Grotesk, Courier_Prime } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { rootStructuredData } from "@/lib/config/structuredData";
import { metadata as metadataConfig } from "@/lib/config/metadata";
import Providers from "@/components/providers";
import "@/styles/globals.css";

const sg = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const os = Open_Sans({ subsets: ["latin"], variable: "--font-open" });
const cp = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier",
  weight: "400",
});

export const metadata = metadataConfig;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sg.variable} ${os.variable} ${cp.variable}`}>
        <Providers>{children}</Providers>
      </body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      <Script
        id="WebSite Structured Data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(rootStructuredData),
        }}
      />
    </html>
  );
}
