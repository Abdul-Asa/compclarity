import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { CVForm } from "@/components/cv-builder/cv-form";
import { CVPreview } from "@/components/cv-builder/cv-preview";
export default function CVBuilder() {
  return (
    <div className="h-[calc(100vh-4rem)] p-4 w-full max-w-screen-2xl mx-auto">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={45} minSize={30} collapsible collapsedSize={0}>
          <div className="h-full overflow-y-auto ">
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
    </div>
  );
}
