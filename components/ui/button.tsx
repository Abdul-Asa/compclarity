// components/ui/button.tsx
import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 focus-visible:ring-foreground disabled:bg-primary/50 disabled:text-primary-foreground/70",
        destructive:
          "bg-destructive/50 text-foreground border border-destructive-secondary/50 hover:bg-destructive hover:border-destructive-secondary disabled:bg-destructive/30 disabled:border-destructive-secondary/30 disabled:text-foreground/50",
        outline:
          "border border-muted-foreground bg-transparent hover:border-primary-dark hover:bg-primary-light/25 dark:hover:border-primary dark:hover:bg-primary-dark/25 disabled:border-muted-foreground/40 disabled:text-muted-foreground/40",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 disabled:bg-secondary/40 disabled:text-secondary-foreground/50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground disabled:text-muted-foreground/50 disabled:hover:bg-transparent",
        link: "text-primary underline-offset-4 hover:underline disabled:text-primary/40 disabled:no-underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-11 w-11",
        full: "w-full py-2",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  tooltip?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, loading = false, children, disabled, variant, size, asChild = false, tooltip, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const ButtonComponent = (
      <Comp
        ref={ref}
        disabled={loading || disabled}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {loading && <Loader2 className="h-5 w-5 mr-2 animate-spin text-muted" />}
        <Slottable>{children}</Slottable>
      </Comp>
    );

    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{ButtonComponent}</TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return ButtonComponent;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
