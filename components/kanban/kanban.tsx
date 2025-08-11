"use client";

import { trpc } from "@/lib/trpc/client";
import { KanbanHeader } from "./kanban-header";
import { KanbanBoard } from "./kanban-board";
import { z } from "zod";

const filterSchema = z.object({
  search: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export default function Kanban() {
  const [applications] = trpc.application.getApplications.useSuspenseQuery();

  return (
    <>
      <KanbanHeader applications={applications} />
      <KanbanBoard applications={applications} />
    </>
  );
}
