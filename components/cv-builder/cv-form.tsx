import { useAtom } from "jotai";
import { CVSection, cvSectionsAtom } from "./store";
import { PersonalSection } from "./sections/personal";
import { Sortable, SortableDragHandle, SortableItem } from "../ui/sortable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import { G } from "@react-pdf/renderer";

export function CVForm() {
  const [sections, setSections] = useAtom(cvSectionsAtom);

  const handleSortChange = (newSections: CVSection[]) => {
    setSections(newSections);
  };

  const renderSection = (section: CVSection) => {
    switch (section.type) {
      case "profile":
        return <PersonalSection />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4 space-y-4">
      <Sortable value={sections}>
        {sections.map((section) => (
          <SortableItem key={section.id} value={section.id}>
            <div className="relative mb-4">
              <div className="absolute left-0 top-4 cursor-grab p-2">
                <SortableDragHandle variant="ghost" size="icon" className="size-8 shrink-0">
                  <GripVertical className="size-4" aria-hidden="true" />
                </SortableDragHandle>
              </div>
              <div className="pl-10">{renderSection(section)}</div>
            </div>
          </SortableItem>
        ))}
      </Sortable>
    </div>
  );
}
