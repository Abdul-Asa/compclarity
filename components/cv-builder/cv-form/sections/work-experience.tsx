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
import { Switch } from "@/components/ui/switch";
import Editor from "@/components/editor/cv-editor";
import { z } from "zod";
import { CVSection, WorkExperienceData, workExperienceSchema } from "../../types";

export function WorkExperienceSection({
  handleChange,
  ...section
}: CVSection & { handleChange: (data: CVSection) => void }) {
  const { isVisible, data } = section;

  const form = useForm<{ data: WorkExperienceData }>({
    resolver: zodResolver(z.object({ data: workExperienceSchema })),
    values: { data: data as WorkExperienceData },
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
        // Only update if there are actual changes to avoid unnecessary re-renders
        if (JSON.stringify(formData.data) !== JSON.stringify(data)) {
          handleChange({
            ...section,
            data: formData.data as WorkExperienceData,
          });
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [form.watch, isVisible]);

  const handleLocationChange = (index: number, value: string) => {
    if (isVisible) {
      form.setValue(`data.${index}.location`, value);
    }
  };

  const handleAppend = () => {
    append({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
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
                        <span className="sr-only">Remove experience</span>
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name={`data.${index}.company`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`data.${index}.position`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                              <Input placeholder="Job title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                                onValueChange={(value) => handleLocationChange(index, value)}
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
                                <Input
                                  type="month"
                                  {...field}
                                  disabled={form.watch(`data.${index}.current`) || !isVisible}
                                />
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
                            <FormLabel>Current Position</FormLabel>
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
                                placeholder="Describe your responsibilities and achievements..."
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
          Add Experience
        </Button>
      </div>
    </Form>
  );
}
