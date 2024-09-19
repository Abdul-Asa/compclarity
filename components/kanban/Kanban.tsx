"use client";
import { Column } from "./Column";
import { defaultColumns } from "@/config";
import { cn, getKanbanSnapshot, sortApplications } from "@/lib/utils";
import {
  type DragOverEvent,
  type DragStartEvent,
  useSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
  DndContext,
  KeyboardSensor,
  DragOverlay,
  DragEndEvent,
} from "@dnd-kit/core";
import { coordinateGetter, hasSortableData } from "./lib";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { updateApplications } from "../../app/(AppTracker)/tracker/actions";
import { ApplicationCard } from "./ApplicationCard";
import { ApplicationObject } from "@/lib/types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { triggerConfetti } from "../ui/confetti";

interface TrackerProps {
  initialData: ApplicationObject[];
}

export default function Kanban({ initialData }: TrackerProps) {
  const [applicationState, setApplicationState] = useState<ApplicationObject[]>(initialData);
  const [activeApplication, setActiveApplication] = useState<ApplicationObject | null>(null);
  const [prevColumn, setPrevColumn] = useState<string | null>(null);
  // const scrollContainerRef = useRef<HTMLDivElement>(null); // Add this line

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    })
  );

  //Set the active application when dragging starts
  function onDragStart(event: DragStartEvent) {
    if (!hasSortableData(event.active)) return;

    const data = event.active.data.current;
    if (data?.type === "Application") {
      setActiveApplication(data.application);
      setPrevColumn(data.application.todo_level);
      return;
    }
  }

  // Update the db state with kanban snapshot when dragging ends
  async function onDragEnd(event: DragEndEvent) {
    if (!hasSortableData(event.active)) return;
    const snapShot: ApplicationObject[] = getKanbanSnapshot(sortApplications(applicationState));
    updateApplications(snapShot);
    if (activeApplication && prevColumn && activeApplication.todo_level === "3" && prevColumn !== "3") {
      triggerConfetti({ duration: 1400 });
    }
    setActiveApplication(null);
  }

  // Update the state of the application when dragging over
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasSortableData(active) || !hasSortableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveApp = activeData?.type === "Application";
    const isOverApp = overData?.type === "Application";

    if (!isActiveApp) return;

    // Dropping an App card over another card
    if (isActiveApp && isOverApp) {
      setApplicationState((app) => {
        const activeIndex = app.findIndex((t) => t.id === activeId);
        const overIndex = app.findIndex((t) => t.id === overId);
        const activeApp = app[activeIndex];
        const overApp = app[overIndex];
        if (activeApp && overApp && activeApp.todo_level !== overApp.todo_level) {
          overId === "3" ? (activeApp.completed = true) : (activeApp.completed = false);
          // Update the todo_level and date updated of the application
          activeApp.todo_level = overApp.todo_level;
          // Check the active card date_screened, if it's null set it to today
          if (overId === "1" && !activeApp.date_screened) {
            activeApp.date_screened = new Date().toISOString().split("T")[0];
          } else if (overId === "2" && !activeApp.date_interviewed) {
            activeApp.date_interviewed = new Date().toISOString().split("T")[0];
          } else if (overId === "3" && !activeApp.date_offered) {
            activeApp.date_offered = new Date().toISOString().split("T")[0];
          } else if (overId === "4" && !activeApp.date_rejected) {
            activeApp.date_rejected = new Date().toISOString().split("T")[0];
          }
          // Similar checks for other levels can be added here
          return arrayMove(app, activeIndex, overIndex - 1);
        }

        return arrayMove(app, activeIndex, overIndex);
      });
    }

    const isOverAColumn = overData?.type === "Column";

    // Dropping an App card over a column
    if (isActiveApp && isOverAColumn) {
      setApplicationState((app) => {
        const activeIndex = app.findIndex((t) => t.id === activeId);
        const activeApp = app[activeIndex];
        if (activeApp) {
          overId === "3" ? (activeApp.completed = true) : (activeApp.completed = false);
          // Update the todo_level and date updated of the application
          activeApp.todo_level = overId as string;
          // Check the active card date_screened, if it's null set it to today
          if (overId === "1" && !activeApp.date_screened) {
            activeApp.date_screened = new Date().toISOString().split("T")[0];
          } else if (overId === "2" && !activeApp.date_interviewed) {
            activeApp.date_interviewed = new Date().toISOString().split("T")[0];
          } else if (overId === "3" && !activeApp.date_offered) {
            activeApp.date_offered = new Date().toISOString().split("T")[0];
          } else if (overId === "4" && !activeApp.date_rejected) {
            activeApp.date_rejected = new Date().toISOString().split("T")[0];
          }
          return arrayMove(app, activeIndex, activeIndex);
        }
        return app;
      });
    }
  }

  useEffect(() => {
    setApplicationState(initialData);
  }, [initialData]);

  return (
    <ScrollArea className="pb-3">
      <DndContext
        id="unique-id-to-get-rid-of-bug"
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div
          className={cn(
            "flex h-[calc(100vh-173px)] w-full gap-4 px-2",
            activeApplication ? "snap-x snap-mandatory" : "snap-none"
          )}
        >
          {defaultColumns.map((column, index) => {
            const cards = sortApplications(applicationState);
            const columnCards = cards[index] || [];
            return <Column key={index} column={column} applicationCards={columnCards} />;
          })}
          {/* This is the overlay that will be shown when dragging an application card */}
          {typeof window !== "undefined" &&
            "document" in window &&
            createPortal(
              <DragOverlay>
                {activeApplication && <ApplicationCard application={activeApplication} isOverlay />}
              </DragOverlay>,
              document.body
            )}
        </div>
      </DndContext>
      <ScrollBar orientation="horizontal" className="mt-2" />
    </ScrollArea>
  );
}
