import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleLoader from "@/components/layout/SimpleLoader";
const Sections = dynamic(() => import("./sections"), { loading: () => <SimpleLoader />, ssr: false });
const Settings = dynamic(() => import("./settings"), { loading: () => <SimpleLoader />, ssr: false });
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
