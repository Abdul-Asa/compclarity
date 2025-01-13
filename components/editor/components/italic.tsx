"use client";

import { ItalicIcon } from "lucide-react";
import React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "@/components/editor/components/provider";

const ItalicToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <Button
        tooltip={<span>Italic</span>}
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8", editor?.isActive("italic") && "bg-accent", className)}
        onClick={(e) => {
          editor?.chain().focus().toggleItalic().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        ref={ref}
        {...props}
      >
        {children || <ItalicIcon className="h-4 w-4" />}
      </Button>
    );
  }
);

ItalicToolbar.displayName = "ItalicToolbar";

export { ItalicToolbar };
