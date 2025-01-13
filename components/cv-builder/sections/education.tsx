"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { CVSection, EducationData, educationSchema, educationsAtom } from "../store";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Sortable, SortableDragHandle, SortableItem } from "@/components/ui/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { GripVerticalIcon, PlusIcon, TrashIcon } from "lucide-react";
import { LocationSearch } from "@/components/ui/location-search";
import { z } from "zod";
import Editor from "@/components/editor/cv-editor";

export function EducationSection({ ...section }: CVSection) {
  const [educations, setEducations] = useAtom(educationsAtom);
  const { isVisible } = section;

  const form = useForm<{ data: EducationData }>({
    resolver: zodResolver(z.object({ data: educationSchema })),
    disabled: !isVisible,
    defaultValues: {
      data: educations.data,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "data",
  });

  useEffect(() => {
    if (isVisible) {
      const { unsubscribe } = form.watch((value) => {
        if (value.data) {
          setEducations(value.data as EducationData);
        }
      });
      return () => unsubscribe();
    }
  }, [form.watch, isVisible, setEducations]);

  const handleLocationChange = (index: number, value: string) => {
    if (isVisible) {
      form.setValue(`data.${index}.location`, value);
    }
  };

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
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="size-8"
                          disabled={fields.length <= 1}
                          onClick={() => fields.length > 1 && remove(index)}
                        >
                          <TrashIcon className="size-4" />
                          <span className="sr-only">Remove education</span>
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`data.${index}.school`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>School/University</FormLabel>
                              <FormControl>
                                <Input placeholder="University name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`data.${index}.degree`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                <Input placeholder="Bachelor's, Master's, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`data.${index}.fieldOfStudy`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field of Study</FormLabel>
                            <FormControl>
                              <Input placeholder="Computer Science, Business, etc." {...field} />
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
                                onValueChange={(value) => handleLocationChange(index, value)}
                                disabled={!isVisible}
                                placeholder="Search location..."
                              />
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
                              <FormLabel>Graduation Date</FormLabel>
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
                                placeholder="Relevant coursework, achievements, activities..."
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
          Add Education
        </Button>
      </div>
    </Form>
  );
}
