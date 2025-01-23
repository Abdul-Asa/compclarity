import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { CVForm } from "@/components/cv-builder/cv-form";
export default function CVBuilder() {
  return (
    <div className="h-[calc(100vh-4rem)] p-4 w-full max-w-screen-2xl mx-auto">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
        <ResizablePanel defaultSize={45} minSize={30} collapsible collapsedSize={0}>
          <CVForm />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={55} minSize={50} collapsible collapsedSize={0}>
          <div className="flex h-full flex-col">
            <div className="flex justify-between items-center p-2">
              <h2 className="text-lg font-semibold">CV Preview</h2>
            </div>
            {/* <div className="flex-grow p-4 overflow-auto">
              <Skeleton className="w-full h-64 mb-4" />
              <Skeleton className="w-full h-32 mb-4" />
              <Skeleton className="w-full h-16" />
            </div> */}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
