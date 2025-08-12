"use client";

import { useQuery } from "@tanstack/react-query";
import { getApplications } from "@/lib/actions/server-actions";
import { KanbanHeader } from "./kanban-header";
import { KanbanBoard } from "./kanban-board";

export default function Kanban() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!applications) {
    return <div>No applications found</div>;
  }

  return (
    <>
      <KanbanHeader applications={applications} />
      <KanbanBoard applications={applications} />
    </>
  );
}
