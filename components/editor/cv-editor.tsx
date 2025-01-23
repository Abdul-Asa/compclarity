"use client";

import { EditorContent, type Extension, useEditor } from "@tiptap/react";
// import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { ToolbarProvider } from "./components/provider";
import { BoldToolbar } from "./components/bold";
import { BulletListToolbar } from "./components/bullet-list";
import { CodeToolbar } from "./components/code";
import { HardBreakToolbar } from "./components/hard-break";
import { ItalicToolbar } from "./components/italic";
import { OrderedListToolbar } from "./components/ordered-list";
import { RedoToolbar } from "./components/redo";
import { StrikeThroughToolbar } from "./components/strikethrough";
import { Separator } from "../ui/separator";
import { UndoToolbar } from "./components/undo";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    code: {
      HTMLAttributes: {
        class: "bg-accent rounded-md p-1",
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: "my-2",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "bg-primary text-primary-foreground p-2 text-sm rounded-md p-1",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
      HTMLAttributes: {
        class: "tiptap-heading",
      },
    },
  }),
  // Placeholder.configure({
  //   placeholder: "Start typing...",
  // }),
];

//Disable editor when disabled is true
//Add placeholder

interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const Editor = ({ content, onChange, disabled, placeholder, className }: EditorProps) => {
  const editor = useEditor({
    extensions: extensions as Extension[],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    immediatelyRender: false,
  });

  // Add effect to update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) {
    return <Skeleton className="h-20 bg-muted animate-pulse  rounded-md" />;
  }

  return (
    <div className="border w-full relative rounded-md overflow-hidden pb-3">
      <div className="flex w-full items-center py-2 px-2 justify-between border-b  sticky top-0 left-0 bg-background z-20">
        <ToolbarProvider editor={editor}>
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
            <UndoToolbar />
            <RedoToolbar />
            <Separator orientation="vertical" className="h-7" />
            <BoldToolbar />
            <ItalicToolbar />
            <StrikeThroughToolbar />
            <BulletListToolbar />
            <OrderedListToolbar />
            <CodeToolbar />
            <HardBreakToolbar />
          </div>
        </ToolbarProvider>
      </div>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className={cn("cursor-text min-h-[10rem] bg-background font-open", className)}
      >
        <EditorContent className="outline-none text-sm" editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
