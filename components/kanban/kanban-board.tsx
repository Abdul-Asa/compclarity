"use client";

import type { ApplicationObject } from "@/lib/validation/types";
import { KanbanColumn } from "./kanban-column";
import { defaultColumns } from "@/lib/config/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useToast } from "@/lib/hooks/useToast";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { updateApplicationsAction } from "@/lib/actions/server-actions";
import React from "react";
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
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { triggerConfetti } from "@/components/ui/confetti";
import { KanbanCard } from "./kanban-card";
import { coordinateGetter, hasSortableData, sortApplications, getKanbanSnapshot } from "./lib";
import { arrayMove } from "@dnd-kit/sortable";

interface KanbanBoardProps {
  applications: ApplicationObject[];
}

export function KanbanBoard({ applications }: KanbanBoardProps) {
  const [columns, setColumns] = useState(applications);
  const [prevColumn, setPrevColumn] = useState<string | null>(null);
  const [activeApplication, setActiveApplication] = useState<ApplicationObject | null>(null);
  const id = React.useId();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { executeAsync: updateApplications } = useAction(updateApplicationsAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: ({ error }) => {
      toast({
        title: "Error",
        description: error.serverError || "Failed to update applications",
        variant: "destructive",
      });
    },
  });

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
    if (data?.type === "application") {
      setActiveApplication(data.application);
      setPrevColumn(data.application.todo_level);
      return;
    }
  }

  // Update the db state with kanban snapshot when dragging ends
  function onDragEnd(event: DragEndEvent) {
    if (!hasSortableData(event.active)) return;
    const snapShot: ApplicationObject[] = getKanbanSnapshot(sortApplications(columns));
    updateApplications({ applications: snapShot });
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

    const isActiveApp = activeData?.type === "application";
    const isOverApp = overData?.type === "application";

    if (!isActiveApp) return;

    // Dropping an App card over another card
    if (isActiveApp && isOverApp) {
      setColumns((app) => {
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

    const isOverAColumn = overData?.type === "column";

    // Dropping an App card over a column
    if (isActiveApp && isOverAColumn) {
      setColumns((app) => {
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
    setColumns(applications);
  }, [applications]);

  return (
    <DndContext id={id} sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
      <ScrollArea className="w-full overflow-x-auto pb-3">
        <div
          className={cn(
            "flex h-[calc(100vh-173px)] w-full gap-4 px-2",
            activeApplication ? "snap-x snap-mandatory" : "snap-none"
          )}
        >
          {defaultColumns.map((col, index) => {
            const cards = sortApplications(columns);
            const columnCards = cards[index] || [];
            return <KanbanColumn key={col.id} id={col.id} title={col.title} items={columnCards} />;
          })}
        </div>
        {/* This is the overlay that will be shown when dragging an application card */}
        {typeof window !== "undefined" &&
          "document" in window &&
          createPortal(
            <DragOverlay>{activeApplication && <KanbanCard application={activeApplication} isOverlay />}</DragOverlay>,
            document.body
          )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </DndContext>
  );
}
