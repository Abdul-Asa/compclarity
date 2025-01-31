"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { Button } from "./button";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
  defaultExpanded?: boolean;
  onExpand?: (isExpanded: boolean) => void;
  isExpanded?: boolean;
  isVisible?: boolean;
  onVisibilityChange?: (isVisible: boolean) => void;
  isAlwaysVisible?: boolean;
}

const CardContext = React.createContext<{
  collapsible: boolean;
  isExpanded: boolean;
  isVisible: boolean;
  isAlwaysVisible: boolean;
  onExpand: () => void;
  onVisibilityChange: () => void;
}>({} as any);

const useCardContext = () => {
  const context = React.useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a Card");
  }
  return context;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      collapsible = false,
      defaultExpanded = true,
      isVisible = true,
      isExpanded,
      onExpand,
      onVisibilityChange,
      isAlwaysVisible = false,
      ...props
    },
    ref
  ) => {
    const [localExpanded, setLocalExpanded] = React.useState(defaultExpanded);
    const [localVisible, setLocalVisible] = React.useState(isVisible);

    const isControlled = isExpanded !== undefined;
    const currentExpanded = isControlled ? isExpanded : localExpanded;
    const currentVisibility = isVisible !== undefined ? isVisible : localVisible;

    const handleExpand = () => {
      if (isControlled) {
        onExpand?.(!currentExpanded);
      } else {
        setLocalExpanded(!currentExpanded);
        onExpand?.(!currentExpanded);
      }
    };

    const handleVisibilityChange = () => {
      if (onVisibilityChange) {
        onVisibilityChange(!currentVisibility);
      } else {
        setLocalVisible(!currentVisibility);
      }
    };

    return (
      <CardContext.Provider
        value={{
          collapsible,
          isExpanded: currentExpanded,
          isVisible: currentVisibility,
          isAlwaysVisible,
          onExpand: handleExpand,
          onVisibilityChange: handleVisibilityChange,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "rounded-sm border bg-card text-card-foreground transition-opacity duration-200",
            !currentVisibility && "opacity-50",
            className
          )}
          {...props}
        />
      </CardContext.Provider>
    );
  }
);
Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  sideComponent?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => {
  const { collapsible, isExpanded, isVisible, onExpand, onVisibilityChange, isAlwaysVisible } = useCardContext();

  return (
    <div className={cn("flex justify-between items-center w-full", collapsible ? "p-6" : "")}>
      <div ref={ref} className={cn("flex flex-col w-full space-y-1.5", className)} {...props}>
        {props.children}
      </div>
      {collapsible && (
        <div className="flex items-center gap-2">
          {props.sideComponent}
          {!isAlwaysVisible && (
            <Button
              tooltip={isVisible ? "Hide section" : "Show section"}
              variant="ghost"
              size="icon"
              onClick={() => onVisibilityChange()}
              className="size-6"
              aria-label={isVisible ? "Hide section" : "Show section"}
            >
              {isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
            </Button>
          )}
          <Button
            tooltip={isExpanded ? "Collapse section" : "Expand section"}
            variant="ghost"
            size="icon"
            onClick={onExpand}
            className="size-6"
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
          >
            <ChevronDown className={cn("transition-transform duration-200", isExpanded && "rotate-180")} />
          </Button>
        </div>
      )}
    </div>
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { collapsible, isExpanded, isVisible } = useCardContext();

    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-200",
          collapsible && "grid",
          collapsible && !isExpanded && "grid-rows-[0fr]",
          collapsible && isExpanded && "grid-rows-[1fr]",
          !isVisible && "[&_input]:disabled [&_textarea]:disabled [&_button]:disabled"
        )}
      >
        <div className={cn("overflow-hidden")}>
          <div className={cn("p-6 pt-0 relative", className)} {...props} />
        </div>
      </div>
    );
  }
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
