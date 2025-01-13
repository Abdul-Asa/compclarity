"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { projectsAtom, skillsAtom } from "../../store";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Sortable, SortableDragHandle, SortableItem } from "@/components/ui/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { GripVerticalIcon, LinkIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Editor from "@/components/editor/cv-editor";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CVSection, ProjectData, projectSchema } from "../../types";

export function ProjectsSection({ ...section }: CVSection) {
  const [projects, setProjects] = useAtom(projectsAtom);
  // const [skills, setSkills] = useAtom(skillsAtom);
  const { isVisible } = section;

  const form = useForm<{ data: ProjectData }>({
    resolver: zodResolver(projectSchema),
    disabled: !isVisible,
    defaultValues: projects,
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "data",
  });

  useEffect(() => {
    if (isVisible) {
      const { unsubscribe } = form.watch((value) => {
        if (value.data) {
          setProjects(value.data as ProjectData);
        }
      });
      return () => unsubscribe();
    }
  }, [form.watch, isVisible, setProjects]);

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
    const tech = form.watch(`data.${index}.technologies`);
    const techInput = document.getElementById(`tech-input-${index}`) as HTMLInputElement;
    if (techInput && techInput.value) {
      form.setValue(`data.${index}.technologies`, [...tech, techInput.value]);
      techInput.value = "";
    }
  };

  const handleRemoveTechnology = (index: number, techIndex: number) => {
    const tech = form.watch(`data.${index}.technologies`);
    form.setValue(
      `data.${index}.technologies`,
      tech.filter((_, i) => i !== techIndex)
    );
  };

  //   const handleAddToSkills = (technologies: string[]) => {
  // if (!technologies.length) return;
  // const createSkills = () => {
  //   // Find or create Technologies category
  //   let techCategory = skills.find((category) => category.category.toLowerCase() === "technologies");
  //   if (!techCategory) {
  //     // If no Technologies category exists, create one
  //     techCategory = { category: "Technologies", skills: [] };
  //     return [...skills, techCategory].map((category) =>
  //       category === techCategory
  //         ? { ...category, skills: [...new Set([...category.skills, ...technologies])] }
  //         : category
  //     );
  //   }
  //   // Update existing Technologies category
  //   return skills.map((category) =>
  //     category.category.toLowerCase() === "technologies"
  //       ? { ...category, skills: [...new Set([...category.skills, ...technologies])] }
  //       : category
  //   );
  // };
  // const newSkills = createSkills();
  // setSkills(newSkills);
  //};

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
                        <span className="sr-only">Remove project</span>
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      <div className="grid gap-4 sm:grid-cols-2">
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

                      <div className="grid gap-4 sm:grid-cols-2">
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
                            <div className="flex items-center justify-between">
                              <FormLabel>Technologies Used</FormLabel>
                              {/* <Button
                                type="button"
                                variant="outline"
                                disabled={!field.value.length}
                                size="sm"
                                onClick={() => handleAddToSkills(field.value)}
                                className="h-8"
                              >
                                Add to Skills
                              </Button> */}
                            </div>
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

        <Button type="button" variant="outline" className="w-full" onClick={handleAppend}>
          <PlusIcon className="mr-2 size-4" />
          Add Project
        </Button>
      </div>
    </Form>
  );
}
