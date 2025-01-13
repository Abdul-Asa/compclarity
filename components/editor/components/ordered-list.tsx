"use client";

import { ListOrdered } from "lucide-react";
import React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToolbar } from "@/components/editor/components/provider";

const OrderedListToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();
    return (
      <Button
        tooltip={<span>Ordered list</span>}
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8", editor?.isActive("orderedList") && "bg-accent", className)}
        onClick={(e) => {
          editor?.chain().focus().toggleOrderedList().run();
          onClick?.(e);
        }}
        disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
        ref={ref}
        {...props}
      >
        {children || <ListOrdered className="h-4 w-4" />}
      </Button>
    );
  }
);

OrderedListToolbar.displayName = "OrderedListToolbar";

export { OrderedListToolbar };
