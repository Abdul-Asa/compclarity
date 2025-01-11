import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "./button";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
  defaultExpanded?: boolean;
  onExpand?: (isExpanded: boolean) => void;
  isExpanded?: boolean;
}

const CardContext = React.createContext<{
  collapsible: boolean;
  isExpanded: boolean;
  onExpand: () => void;
}>({} as any);

const useCardContext = () => {
  const context = React.useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a Card");
  }
  return context;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, collapsible = false, defaultExpanded = true, ...props }, ref) => {
    const [localExpanded, setLocalExpanded] = React.useState(defaultExpanded);

    // Determine if we're in controlled or uncontrolled mode
    const isControlled = props.isExpanded !== undefined;
    const isExpanded = isControlled && props.isExpanded ? props.isExpanded : localExpanded;

    const handleExpand = () => {
      if (isControlled) {
        // In controlled mode, call the parent's onExpand
        props.onExpand?.(!isExpanded);
      } else {
        // In uncontrolled mode, manage internal state
        setLocalExpanded(!isExpanded);
        props.onExpand?.(!isExpanded);
      }
    };

    return (
      <CardContext.Provider value={{ collapsible, isExpanded, onExpand: handleExpand }}>
        <div ref={ref} className={cn("rounded-sm border bg-card text-card-foreground", className)} {...props} />
      </CardContext.Provider>
    );
  }
);
Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  sideComponent?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => {
  const { collapsible, isExpanded, onExpand } = useCardContext();

  return (
    <div className={cn("flex justify-between items-center w-full p-6")}>
      <div ref={ref} className={cn("flex flex-col w-full space-y-1.5 ", className)} {...props}>
        {props.children}
      </div>
      {collapsible && (
        <div className="flex items-center gap-1 justify-end">
          {props.sideComponent}
          <Button variant="ghost" size="icon" onClick={collapsible ? onExpand : undefined} className="size-6">
            <ChevronDown className={cn(" transition-transform duration-200", isExpanded && "rotate-180")} />
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
    const { collapsible, isExpanded } = useCardContext();
    const contentRef = React.useRef<HTMLDivElement>(null);

    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-200",
          collapsible && "grid",
          collapsible && !isExpanded && "grid-rows-[0fr]",
          collapsible && isExpanded && "grid-rows-[1fr]",
          className
        )}
      >
        <div className={cn("overflow-hidden")}>
          <div className={cn("p-6 pt-0")} {...props} />
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
