"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Sortable, SortableDragHandle, SortableItem } from "@/components/ui/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { GripVerticalIcon, LinkIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Editor from "@/components/editor/cv-editor";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CVSection, ProjectData, projectSchema } from "../../types";
import { z } from "zod";

export function ProjectsSection({ handleChange, ...section }: CVSection & { handleChange: (data: CVSection) => void }) {
  const { isVisible, data } = section;

  const form = useForm<{ data: ProjectData }>({
    resolver: zodResolver(z.object({ data: projectSchema })),
    defaultValues: { data: data as ProjectData },
    disabled: !isVisible,
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "data",
  });

  const handleMove = (activeIndex: number, overIndex: number) => {
    move(activeIndex, overIndex);
    // Trigger form update manually after reordering
    const formData = form.getValues();
    handleChange({
      ...section,
      data: formData.data as ProjectData,
    });
  };

  // Watch form changes and trigger update
  useEffect(() => {
    if (isVisible) {
      const subscription = form.watch((formData) => {
        handleChange({
          ...section,
          data: formData.data as ProjectData,
        });
      });
      return () => subscription.unsubscribe();
    }
  }, [form.watch, isVisible, handleChange, section]);

  const handleAppend = () => {
    append({
      name: "",
      role: "",
      url: "",
      startDate: "",
      organization: "",
      endDate: "",
      current: false,
      description: "",
      technologies: [],
    });
  };

  const handleAddTechnology = (index: number) => {
    const techInput = document.getElementById(`tech-input-${index}`) as HTMLInputElement;
    if (techInput && techInput.value.trim()) {
      const currentTech = form.getValues(`data.${index}.technologies`);
      form.setValue(`data.${index}.technologies`, [...currentTech, techInput.value.trim()]);
      techInput.value = "";
    }
  };

  const handleRemoveTechnology = (index: number, techIndex: number) => {
    const currentTech = form.getValues(`data.${index}.technologies`);
    form.setValue(
      `data.${index}.technologies`,
      currentTech.filter((_, i) => i !== techIndex)
    );
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <Sortable value={fields} onMove={({ activeIndex, overIndex }) => handleMove(activeIndex, overIndex)}>
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
                        onClick={() => {
                          if (fields.length > 1) {
                            handleChange({
                              ...section,
                              data: form.getValues().data as ProjectData,
                            });
                            remove(index);
                          }
                        }}
                      >
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Remove project</span>
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                        <FormField
                          control={form.control}
                          name={`data.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Project name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`data.${index}.role`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Role</FormLabel>
                              <FormControl>
                                <Input placeholder="Lead Developer, Contributor, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`data.${index}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Project URL
                              <LinkIcon className="size-4" />
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="https://github.com/username/project" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                        <FormField
                          control={form.control}
                          name={`data.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="month" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`data.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input type="month" {...field} disabled={form.watch(`data.${index}.current`)} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`data.${index}.current`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-start space-x-3 space-y-0">
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel>Current Project</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`data.${index}.technologies`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technologies Used</FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {field.value.map((tech, techIndex) => (
                                <Badge
                                  key={techIndex}
                                  variant="secondary"
                                  className={cn("px-2 py-1 text-sm font-normal", "flex items-center gap-1")}
                                >
                                  {tech}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="size-4 p-0 ml-1 hover:bg-transparent"
                                    onClick={() => handleRemoveTechnology(index, techIndex)}
                                  >
                                    <XIcon className="size-3" />
                                    <span className="sr-only">Remove {tech}</span>
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                id={`tech-input-${index}`}
                                placeholder="Add technology..."
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddTechnology(index);
                                  }
                                }}
                              />
                              <Button type="button" variant="outline" onClick={() => handleAddTechnology(index)}>
                                Add
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`data.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Editor
                                content={field.value}
                                onChange={field.onChange}
                                disabled={!isVisible}
                                placeholder="Describe the project, your role, and key achievements..."
                              />
                            </FormControl>
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

        <Button type="button" variant="outline" className="w-full" onClick={handleAppend} disabled={!isVisible}>
          <PlusIcon className="mr-2 size-4" />
          Add Project
        </Button>
      </div>
    </Form>
  );
}
