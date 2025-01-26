"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Sortable, SortableDragHandle, SortableItem } from "@/components/ui/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { GripVerticalIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CVSection, SkillsData, skillsSchema } from "../../types";
import { z } from "zod";

export function SkillsSection({ handleChange, ...section }: CVSection & { handleChange: (data: CVSection) => void }) {
  const { isVisible, data } = section;

  const form = useForm<{ data: SkillsData }>({
    resolver: zodResolver(z.object({ data: skillsSchema })),
    values: { data: data as SkillsData },
    disabled: !isVisible,
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "data",
  });

  // Watch form changes and trigger update
  useEffect(() => {
    if (isVisible) {
      const subscription = form.watch((formData) => {
        handleChange({
          ...section,
          data: formData.data as SkillsData,
        });
      });
      return () => subscription.unsubscribe();
    }
  }, [form.watch, isVisible, handleChange, section]);

  const handleAppend = () => {
    append({
      category: "",
      skills: [],
    });
  };

  const handleAddSkill = (index: number) => {
    const skillInput = document.getElementById(`skill-input-${index}`) as HTMLInputElement;
    if (skillInput && skillInput.value.trim()) {
      const currentSkills = form.getValues(`data.${index}.skills`);
      form.setValue(`data.${index}.skills`, [...currentSkills, skillInput.value.trim()]);
      skillInput.value = "";
    }
  };

  const handleRemoveSkill = (categoryIndex: number, skillIndex: number) => {
    const currentSkills = form.getValues(`data.${categoryIndex}.skills`);
    form.setValue(
      `data.${categoryIndex}.skills`,
      currentSkills.filter((_, index) => index !== skillIndex)
    );
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <Sortable value={fields} onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}>
          <div className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <SortableItem key={field.id} value={field.id} disabled={!isVisible}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between w-full gap-2 mb-4">
                      <SortableDragHandle variant="outline" size="icon" className="size-8 shrink-0">
                        <GripVerticalIcon className="size-4" />
                      </SortableDragHandle>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="size-8"
                        disabled={fields.length <= 1}
                        onClick={() => fields.length > 1 && remove(index)}
                      >
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Remove category</span>
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`data.${index}.category`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Programming Languages" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <FormLabel>Skills</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {form.watch(`data.${index}.skills`).map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="secondary"
                              className={cn("pr-1.5 text-sm font-normal", !isVisible && "opacity-50")}
                            >
                              {skill}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-4 ml-1 p-0.5 hover:bg-transparent"
                                onClick={() => handleRemoveSkill(index, skillIndex)}
                                disabled={!isVisible}
                              >
                                <XIcon className="size-3" />
                                <span className="sr-only">Remove skill</span>
                              </Button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id={`skill-input-${index}`}
                            placeholder="Add a skill"
                            className="flex-1"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddSkill(index);
                              }
                            }}
                            disabled={!isVisible}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleAddSkill(index)}
                            disabled={!isVisible}
                          >
                            <PlusIcon className="size-4" />
                            <span className="sr-only">Add skill</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SortableItem>
            ))}
          </div>
        </Sortable>

        <Button type="button" variant="outline" className="w-full" onClick={handleAppend} disabled={!isVisible}>
          <PlusIcon className="mr-2 size-4" />
          Add Category
        </Button>
      </div>
    </Form>
  );
}
