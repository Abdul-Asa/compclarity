import Script from "next/script";
import { Open_Sans, Space_Grotesk, Courier_Prime } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { rootStructuredData } from "@/config/structuredData";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { createClient } from "@/lib/supabase/server";
import { metadata as metadataConfig } from "@/config/metadata";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import "@/styles/globals.css";
import { CSPostHogProvider } from "@/components/providers/posthog";
import { ThemeProvider } from "@/components/Layout/ThemeProvider";
import { Announcement } from "@/components/Layout/Announcement";

const sg = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const os = Open_Sans({ subsets: ["latin"], variable: "--font-open" });
const cp = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier",
  weight: "400",
});

export const metadata = metadataConfig;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <CSPostHogProvider>
        <body className={`${sg.variable} ${os.variable} ${cp.variable}`}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="flex min-h-screen w-full bg-[rgb(239,241,245)] dark:bg-[rgb(14,16,17)]  flex-col items-center justify-between font-space">
              <Navbar user={data.user} />
              {children}
              <Footer />
            </div>
            <Announcement />
            <Toaster />
            <SonnerToaster />
          </ThemeProvider>
        </body>
      </CSPostHogProvider>

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
