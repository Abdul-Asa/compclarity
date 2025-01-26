"use client";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { ResizableHandle, ResizablePanel } from "../ui/resizable";
import CVPreview from "./cv-preview";
import { ResizablePanelGroup } from "../ui/resizable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import CVForm from "./cv-form";

export default function CVBuilder() {
  const isMobile = useMediaQuery("mobile");

  if (isMobile) {
    return (
      <Tabs defaultValue="form" className="h-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="h-[calc(100%-2.5rem)] overflow-y-auto">
          <CVForm />
        </TabsContent>
        <TabsContent value="preview" className="h-[calc(100%-2.5rem)] overflow-y-auto">
          <CVPreview />
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={45} minSize={30} collapsible collapsedSize={0}>
        <div className="h-full overflow-y-auto">
          <CVForm />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={55} minSize={40} collapsible collapsedSize={0}>
        <div className="h-full overflow-y-auto">
          <CVPreview />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
