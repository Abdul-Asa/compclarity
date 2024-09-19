"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Clock, Grip } from "lucide-react";
import { Button } from "../ui/button";
import { cn, dateFormatter } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditApplication from "./EditApplicationModal";
import { ApplicationObject } from "@/lib/types";

type AppItemProps = {
  application: ApplicationObject;
  isOverlay?: boolean;
};

export const ApplicationCard = ({ application, isOverlay }: AppItemProps) => {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: application.id,
    data: {
      type: "Application",
      application,
    },
    attributes: {
      roleDescription: `Application: ${application.title}`,
    },
  });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const todoLevelVerbs = {
    "0": { verb: "applied", dateKey: "date_applied" },
    "1": { verb: "screened", dateKey: "date_screened" },
    "2": { verb: "interviewed", dateKey: "date_interviewed" },
    "3": { verb: "offered", dateKey: "date_offered" },
    "4": { verb: "rejected", dateKey: "date_rejected" },
  };

  const levelInfo = todoLevelVerbs[application.todo_level as keyof typeof todoLevelVerbs];
  let shownDate = `${levelInfo.verb} on ${dateFormatter(
    application[levelInfo.dateKey as keyof typeof application] as string
  )}`;

  return (
    <Card
      style={style}
      className={cn(
        "w-[250px] font-open sm:w-[350px]",
        isOverlay ? "ring-2 ring-primary" : isDragging ? "opacity-30 ring-2" : ""
      )}
      ref={setNodeRef}
    >
      <CardHeader className="relative flex flex-row items-center justify-between border-b-2 border-secondary px-4 py-0">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className={cn(
            "-ml-2 h-auto p-1 text-secondary-foreground/50",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          <span className="sr-only">Application</span>
          <Grip />
        </Button>
        <EditApplication application={application} />
      </CardHeader>
      <CardContent className="flex flex-col pb-0">
        <CardTitle className="truncate py-1 text-lg font-semibold">{application.title}</CardTitle>
        <Separator />
        <div className="flex flex-col justify-center py-1">
          <span className="line-clamp-3 text-gray-900 dark:text-gray-200 md:line-clamp-1">{application.company}</span>
          <span className="text-xs">{application.location}</span>
        </div>

        <Badge className="my-4 flex gap-4 bg-muted" variant="outline">
          <Clock className="text-emerald-500" />
          <p>{shownDate}</p>
        </Badge>
      </CardContent>
    </Card>
  );
};
