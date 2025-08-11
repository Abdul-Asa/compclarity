import { ApplicationObject } from "@/lib/validation/types";
import {
  Active,
  closestCorners,
  DataRef,
  DroppableContainer,
  getFirstCollision,
  KeyboardCode,
  KeyboardCoordinateGetter,
  Over,
} from "@dnd-kit/core";

const directions: string[] = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];

//This is for keyboard navigation for the kanban board
//from https://georgegriff.github.io/react-dnd-kit-tailwind-shadcn-ui/
export const coordinateGetter: KeyboardCoordinateGetter = (
  event,
  { context: { active, droppableRects, droppableContainers, collisionRect } }
) => {
  if (directions.includes(event.code)) {
    event.preventDefault();

    if (!active || !collisionRect) {
      return;
    }

    const filteredContainers: DroppableContainer[] = [];

    droppableContainers.getEnabled().forEach((entry) => {
      if (!entry || entry?.disabled) {
        return;
      }

      const rect = droppableRects.get(entry.id);

      if (!rect) {
        return;
      }

      const data = entry.data.current;

      if (data) {
        const { type, children } = data;

        if (type === "column" && children?.length > 0) {
          if (active.data.current?.type !== "column") {
            return;
          }
        }
      }

      switch (event.code) {
        case KeyboardCode.Down:
          if (active.data.current?.type === "column") {
            return;
          }
          if (collisionRect.top < rect.top) {
            // find all droppable areas below
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Up:
          if (active.data.current?.type === "column") {
            return;
          }
          if (collisionRect.top > rect.top) {
            // find all droppable areas above
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Left:
          if (collisionRect.left >= rect.left + rect.width) {
            // find all droppable areas to left
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Right:
          // find all droppable areas to right
          if (collisionRect.left + collisionRect.width <= rect.left) {
            filteredContainers.push(entry);
          }
          break;
      }
    });
    const collisions = closestCorners({
      active,
      collisionRect: collisionRect,
      droppableRects,
      droppableContainers: filteredContainers,
      pointerCoordinates: null,
    });
    const closestId = getFirstCollision(collisions, "id");

    if (closestId != null) {
      const newDroppable = droppableContainers.get(closestId);
      const newNode = newDroppable?.node.current;
      const newRect = newDroppable?.rect.current;

      if (newNode && newRect) {
        return {
          x: newRect.left,
          y: newRect.top,
        };
      }
    }
  }

  return undefined;
};

// This is mainly for type support for dnd-kit
type SortableData =
  | {
      type: "column";
      column: { title: string; id: string };
    }
  | {
      type: "application";
      application: ApplicationObject;
    };

export function hasSortableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<SortableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "column" || data?.type === "application") {
    return true;
  }

  // If the data type is not "column" or "Application", it does not have sortable data
  return false;
}

export const sortApplications = (applications: ApplicationObject[]): Record<string, ApplicationObject[]> => {
  const sortedByTodoLevel = applications.reduce((acc: Record<string, ApplicationObject[]>, application) => {
    if (!acc[application.todo_level]) {
      acc[application.todo_level] = [];
    }
    acc[application.todo_level].push(application);
    return acc;
  }, {});

  return sortedByTodoLevel;
};

// Returns a snapshot of the kanban board (The order of each application in the kanban board)
export const getKanbanSnapshot = (sortedApplications: Record<string, ApplicationObject[]>): ApplicationObject[] => {
  const snapshot: ApplicationObject[] = [];

  for (const todo_level in sortedApplications) {
    sortedApplications[todo_level].forEach((application, index) => {
      snapshot.push({
        ...application,
        kanban_order: index,
      });
    });
  }

  return snapshot;
};
