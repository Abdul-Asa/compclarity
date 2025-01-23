import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
const Sections = dynamic(() => import("./sections"), {
  loading: () => (
    <div className="flex h-full flex-col">
      <div className="flex-grow p-4 overflow-auto">
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-32 mb-8" />
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-32" />
      </div>
    </div>
  ),
  ssr: false,
});
const Settings = dynamic(() => import("./settings"), {
  loading: () => (
    <div className="flex h-full flex-col">
      <div className="flex-grow p-4 overflow-auto">
        <Skeleton className="w-full h-64" />
      </div>
    </div>
  ),
  ssr: false,
});
export function CVForm() {
  return (
    <Tabs defaultValue="sections">
      <TabsList>
        <TabsTrigger value="sections">Sections</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="sections">
        <Sections />
      </TabsContent>

      <TabsContent value="settings">
        <Settings />
      </TabsContent>
    </Tabs>
  );
}
