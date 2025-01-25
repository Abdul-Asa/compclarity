import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CVPreview from "@/components/cv-builder/cv-preview";
import { getUser } from "@/lib/actions/server-actions";
import { redirect } from "next/navigation";
import { getCV } from "@/lib/actions/server-actions";
import dynamic from "next/dynamic";

const CVForm = dynamic(() => import("@/components/cv-builder/cv-form"), {
  ssr: false,
});

export default async function CVBuilder({ params }: { params: { id: number } }) {
  const user = await getUser();
  if (!user) {
    redirect("/auth/signin");
  }

  const cv = await getCV(params.id);
  if (!cv) {
    redirect("/cv-generate");
  }

  return (
    <div className="h-[calc(100vh-4rem)] p-2 sm:p-4 w-full max-w-screen-2xl mx-auto">
      {/* Mobile View: Tabs */}
      <div className="block h-full lg:hidden">
        <Tabs defaultValue="form" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="form" className="h-[calc(100%-2.5rem)] overflow-y-auto">
            <CVForm cv={cv} />
          </TabsContent>
          <TabsContent value="preview" className="h-[calc(100%-2.5rem)] overflow-y-auto">
            <CVPreview />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop View: Resizable panels */}
      <div className="hidden h-full lg:block">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={45} minSize={30} collapsible collapsedSize={0}>
            <div className="h-full overflow-y-auto">
              <CVForm cv={cv} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={55} minSize={40} collapsible collapsedSize={0}>
            <div className="h-full overflow-y-auto">
              <CVPreview />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
