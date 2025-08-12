import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Grip, MapPin, Bell } from "lucide-react";
import type { ApplicationObject } from "@/lib/validation/types";
import { Button } from "@/components/ui/button";
import { UpdateApplicationModal } from "./update-application-modal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn, newDateFormatter } from "@/lib/utils";
import { DeleteApplicationModal } from "./delete-application-modal";
import { todoLevelVerbs } from "@/lib/config/constants";

interface KanbanCardProps {
  application: ApplicationObject;
  isOverlay?: boolean;
}

export function KanbanCard({ application, isOverlay }: KanbanCardProps) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: application.id,
    data: {
      type: "application",
      application,
    },
    attributes: {
      roleDescription: `application: ${application.title}`,
    },
  });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };
  const levelInfo = todoLevelVerbs[application.todo_level as keyof typeof todoLevelVerbs];

  // const handleNotify = () => {
  //   const time = application[levelInfo.dateKey as keyof ApplicationObject];
  //   const timeDiff = new Date(time as string).getTime() - new Date().getTime();
  //   const timeDiffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  //   const timeDiffInHours = Math.ceil(timeDiff / (1000 * 60 * 60));
  //   let timeDiffLabel = "";
  //   if (timeDiffInDays > 0) {
  //     timeDiffLabel = `${timeDiffInDays} days`;
  //   } else {
  //     timeDiffLabel = `${timeDiffInHours} hours`;
  //   }

  //   if (Notification && Notification.permission === "granted") {
  //     new Notification("Compclarity Tracker", {
  //       body: `Your have an ${levelInfo.dateLabel} for ${application.title} at ${application.company} in ${timeDiffLabel} (${time})`,
  //     });
  //   } else if (Notification && Notification.permission !== "denied") {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         new Notification("Compclarity Tracker", {
  //           body: `Your have an ${levelInfo.dateLabel} for ${application.title} at ${application.company} in ${timeDiffLabel} (${time})`,
  //         });
  //       }
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (application.notifications) {
  //     if (Notification && Notification.permission !== "granted") {
  //       Notification.requestPermission();
  //     }
  //     handleNotify();
  //   }
  // }, [application.notifications]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("w-full shadow-xs border bg-card rounded-md", isOverlay ? "ring-2 ring-primary " : "")}
    >
      {/* Card Header with Handle */}
      <div className="flex items-center justify-between h-12 px-2 py-1 border-b bg-muted rounded-t-md">
        <div className="flex items-center gap-2">
          <Button
            variant={"ghost"}
            {...attributes}
            {...listeners}
            className={cn(
              "-ml-1 p-2  rounded hover:bg-primary/10 h-fit w-fit",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
          >
            <Grip size={16} />
          </Button>
          {/* {application.notifications && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-muted-foreground">
                    <Bell size={16} />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">Notifications enabled</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )} */}
        </div>
        <div className="flex items-center gap-2">
          <DeleteApplicationModal application={application} />
          <UpdateApplicationModal application={application} />
        </div>
      </div>
      <CardContent className="p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-xl truncate max-w-[250px]">{application.title}</span>
          {application.completed && (
            <Badge variant="default" className="h-5 rounded-sm px-1.5 text-[11px]">
              Offered
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-2 text-sm  text-muted-foreground">
          <span className="line-clamp-1 flex items-center gap-1">
            <Building size={16} /> <span className="font-semibold">{application.company}</span>
          </span>
          <span className="line-clamp-1 flex items-center gap-1">
            <MapPin size={16} /> <span className="font-semibold">{application.location}</span>
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground pb-1">
          <span>{levelInfo.dateLabel} date:</span>
          <span className="tabular-nums ">
            {newDateFormatter(application[levelInfo.dateKey as keyof ApplicationObject] as string | Date)}
          </span>
        </div>
      </CardContent>
    </div>
  );
}
