import { Loader2 } from "lucide-react";

export default function SimpleLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="size-4 animate-spin" />
    </div>
  );
}
