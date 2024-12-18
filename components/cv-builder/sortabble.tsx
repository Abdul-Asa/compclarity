import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { CVSection } from "@/lib/store/jotai";

interface SortableSectionProps {
  section: CVSection;
  children: React.ReactNode;
}

export function SortableSection({ section, children }: SortableSectionProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative mb-4">
      <div {...attributes} {...listeners} className="absolute left-0 top-4 cursor-grab p-2">
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>
      <div className="pl-10">{children}</div>
    </div>
  );
}
