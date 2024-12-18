import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAtom } from "jotai";
import { cvSectionsAtom } from "@/lib/store/jotai";
import { PersonalSection } from "./personal";
import { SortableSection } from "./sortabble";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExperienceSection } from "./experience";
import { EducationSection } from "./education";

export function CVForm() {
  const [sections, setSections] = useAtom(cvSectionsAtom);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const renderSection = (section: (typeof sections)[0]) => {
    switch (section.type) {
      case "personal":
        return <PersonalSection />;
      case "experience":
        return <ExperienceSection />;
      case "education":
        return <EducationSection />;
      // Add other section components here
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">This section is under development</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl p-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections} strategy={verticalListSortingStrategy}>
          {sections.map((section) => (
            <SortableSection key={section.id} section={section}>
              {renderSection(section)}
            </SortableSection>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
