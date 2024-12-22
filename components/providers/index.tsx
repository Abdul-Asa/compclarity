import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/lib/store/tanstack";
import { CSPostHogProvider } from "@/lib/events/posthog";
import { Announcement } from "../layout/Announcement";
import { Toaster as SonnerToaster } from "sonner";
import { Toaster } from "@/components/ui/toaster";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CSPostHogProvider>
      <ThemeProvider attribute="class" enableSystem>
        <QueryProvider>
          {children}
          <Announcement />
          <SonnerToaster />
          <Toaster />
        </QueryProvider>
      </ThemeProvider>
    </CSPostHogProvider>
  );
};

export default Providers;
