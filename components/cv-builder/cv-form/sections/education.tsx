"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Sortable, SortableDragHandle, SortableItem } from "@/components/ui/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { GripVerticalIcon, PlusIcon, TrashIcon } from "lucide-react";
import { LocationSearch } from "@/components/ui/location-search";
import { z } from "zod";
import Editor from "@/components/editor/cv-editor";
import { CVSection, educationSchema, EducationData } from "../../types";

export function EducationSection({
  handleChange,
  ...section
}: CVSection & { handleChange: (data: CVSection) => void }) {
  const { isVisible, data } = section;
  const form = useForm<{ data: EducationData }>({
    resolver: zodResolver(z.object({ data: educationSchema })),
    defaultValues: { data: data as EducationData },
    disabled: !isVisible,
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "data",
  });

  useEffect(() => {
    if (isVisible) {
      const subscription = form.watch((formData) => {
        handleChange({
          ...section,
          data: formData.data as EducationData,
        });
      });
      return () => subscription.unsubscribe();
    }
  }, [form.watch, isVisible, handleChange, section]);

  const handleAppend = () => {
    append({
      school: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleMove = (activeIndex: number, overIndex: number) => {
    move(activeIndex, overIndex);
    // Trigger form update manually after reordering
    const formData = form.getValues();
    handleChange({
      ...section,
      data: formData.data as EducationData,
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <Sortable
          value={fields}
          onMove={({ activeIndex, overIndex }) => handleMove(activeIndex, overIndex)}
          overlay={
            <Card>
              <CardContent className="pt-6">
                <div className="w-full h-[400px] rounded-sm bg-muted/10" />
              </CardContent>
            </Card>
          }
        >
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
                            remove(index);
                            handleChange({
                              ...section,
                              data: form.getValues().data as EducationData,
                            });
                          }
                        }}
                      >
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Remove education</span>
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name={`data.${index}.school`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>School</FormLabel>
                            <FormControl>
                              <Input placeholder="School or university name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`data.${index}.degree`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Bachelor's" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`data.${index}.fieldOfStudy`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Field of Study</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Computer Science" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`data.${index}.location`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <LocationSearch
                                {...field}
                                disabled={!isVisible}
                                placeholder="Search location..."
                                onValueChange={(value) => {
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
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
                                <Input type="month" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

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
                                placeholder="Describe your academic achievements, relevant coursework, etc..."
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
          Add Education
        </Button>
      </div>
    </Form>
  );
}
