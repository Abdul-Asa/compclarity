"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sections from "./sections";
import Settings from "./settings";

export default function CVForm() {
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
