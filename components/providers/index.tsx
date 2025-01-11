import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/lib/store/tanstack";
import { CSPostHogProvider } from "@/lib/events/posthog";
import { Announcement } from "../layout/Announcement";
import { Toaster as SonnerToaster } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import { JotaiProvider } from "@/lib/store/jotai";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <JotaiProvider>
        <CSPostHogProvider>
          <ThemeProvider attribute="class" enableSystem>
            {children}
            <Announcement />
            <SonnerToaster />
            <Toaster />
          </ThemeProvider>
        </CSPostHogProvider>
      </JotaiProvider>
    </QueryProvider>
  );
};

export default Providers;
