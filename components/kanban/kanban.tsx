import { getApplications } from "@/lib/actions/server-actions";
import { KanbanHeader } from "./kanban-header";
import { KanbanBoard } from "./kanban-board";

export default async function Kanban() {
  const applications = await getApplications();

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
