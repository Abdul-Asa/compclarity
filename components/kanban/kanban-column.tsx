import { KanbanCard } from "./kanban-card";
import type { ApplicationObject } from "@/lib/validation/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

interface KanbanColumnProps {
  id: string;
  title: string;
  items: ApplicationObject[];
}

export function KanbanColumn({ id, title, items }: KanbanColumnProps) {
  const cardIds = items.map((card) => card.id);

  const { setNodeRef } = useSortable({
    id: id,
    data: {
      type: "column",
      column: { id, title },
    },
    attributes: {
      roleDescription: `column: ${title}`,
    },
  });
  return (
    <div ref={setNodeRef} className="h-full w-[282px] sm:w-[382px] bg-background rounded-md flex flex-col px-0.5">
      <div className="flex items-center justify-center p-1 sm:p-3 shrink-0">
        <h1 className="font-bold sm:text-2xl">
          {title} <span className="font-medium">[{items.length}]</span>
        </h1>
      </div>
      <Separator className="shrink-0" />
      <ScrollArea className="flex-1 min-h-0 pb-3 px-3">
        <div className="flex flex-col gap-2 p-2">
          <SortableContext items={cardIds}>
            {items.map((application) => (
              <KanbanCard key={application.id} application={application} />
            ))}
          </SortableContext>
        </div>
      </ScrollArea>
    </div>
  );
}
