"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { ApplicationCard } from "./ApplicationCard";
import { ApplicationObject } from "@/lib/types";

interface ColumnProps {
  column: { title: string; id: string };
  applicationCards: ApplicationObject[];
}

export function Column({ column, applicationCards }: ColumnProps) {
  const cardIds = applicationCards.map((card) => card.id);

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      className="flex min-h-[calc(100%-50px)] w-[282px] flex-shrink-0 snap-start flex-col overflow-scroll sm:w-[382px]"
    >
      <CardHeader className="flex flex-row items-center justify-center border-b-2 p-1 text-left font-semibold sm:p-3">
        <h1 className="font-bold sm:text-2xl">
          {column.title}{" "}
          <span className="font-medium">[{applicationCards.length}]</span>
        </h1>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex min-h-full flex-col gap-2 p-4">
          <SortableContext items={cardIds}>
            {applicationCards.map((card) => (
              <ApplicationCard key={card.id} application={card} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
