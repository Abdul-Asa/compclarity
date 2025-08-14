"use client";
import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";
import { Button } from "../ui/button";

interface SpinnerButtonProps extends ComponentProps<"button"> {
  state?: boolean;
  name: string;
}

export const SpinnerButton = ({ state, name, ...props }: SpinnerButtonProps) => {
  const loading = state || false;

  return (
    <Button {...props} disabled={loading} className="bg-emerald-700 text-white shadow">
      {loading ? <Loader2 className="animate-spin" /> : <span>{name}</span>}
    </Button>
  );
};
