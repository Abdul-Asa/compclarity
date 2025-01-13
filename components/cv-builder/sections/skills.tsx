"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { CVSection, SkillsData, skillsSchema, skillsAtom } from "../store";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Sortable, SortableDragHandle, SortableItem } from "@/components/ui/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { GripVerticalIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SkillsSection({ ...section }: CVSection) {
  const [skills, setSkills] = useAtom(skillsAtom);
  const { isVisible } = section;

  const form = useForm<{ data: SkillsData }>({
    resolver: zodResolver(skillsSchema),
    disabled: !isVisible,
    values: skills,
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "data",
  });

  useEffect(() => {
    if (isVisible) {
      const { unsubscribe } = form.watch((value) => {
        if (value.data) {
          setSkills(value.data as SkillsData);
        }
      });
      return () => unsubscribe();
    }
  }, [form.watch, isVisible, setSkills]);

  const handleAppend = () => {
    append({
      category: "",
      skills: [],
    });
  };

  const handleAddSkill = (index: number) => {
    const skillInput = document.getElementById(`skill-input-${index}`) as HTMLInputElement;
    if (skillInput && skillInput.value.trim()) {
      const currentSkills = form.watch(`data.${index}.skills`);
      if (!currentSkills.includes(skillInput.value.trim())) {
        form.setValue(`data.${index}.skills`, [...currentSkills, skillInput.value.trim()]);
      }
      skillInput.value = "";
    }
  };

  const handleRemoveSkill = (categoryIndex: number, skillIndex: number) => {
    const currentSkills = form.watch(`data.${categoryIndex}.skills`);
    form.setValue(
      `data.${categoryIndex}.skills`,
      currentSkills.filter((_, i) => i !== skillIndex)
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
                        <span className="sr-only">Remove skill category</span>
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name={`data.${index}.category`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Programming Languages, Frameworks, Tools" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`data.${index}.skills`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {field.value.map((skill, skillIndex) => (
                                <Badge
                                  key={skillIndex}
                                  variant="secondary"
                                  className={cn("px-2 py-1 text-sm font-normal", "flex items-center gap-1")}
                                >
                                  {skill}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="size-4 p-0 ml-1 hover:bg-transparent"
                                    onClick={() => handleRemoveSkill(index, skillIndex)}
                                  >
                                    <XIcon className="size-3" />
                                    <span className="sr-only">Remove {skill}</span>
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                id={`skill-input-${index}`}
                                placeholder="Add a skill..."
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddSkill(index);
                                  }
                                }}
                              />
                              <Button type="button" variant="outline" onClick={() => handleAddSkill(index)}>
                                Add
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </SortableItem>
            ))}
          </div>
        </Sortable>

        <Button type="button" variant="outline" className="w-full" onClick={handleAppend}>
          <PlusIcon className="mr-2 size-4" />
          Add Skill Category
        </Button>
      </div>
    </Form>
  );
}
