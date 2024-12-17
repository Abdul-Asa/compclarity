import { Loader2 } from "lucide-react";

export default function TableLoading() {
  return (
    <div className="flex flex-col items-center justify-center overflow-x-auto">
      <Loader2 className="animate-spin size-10 text-primary" />
    </div>
  );
}
