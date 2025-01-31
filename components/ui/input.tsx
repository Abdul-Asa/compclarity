import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  toggleAllowed?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, toggleAllowed, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    if (icon) {
      return (
        <div className="flex items-center border border-input rounded-md gap-2 bg-background px-3">
          {icon}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full bg-transparent py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    if (type === "password" && toggleAllowed) {
      return (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
