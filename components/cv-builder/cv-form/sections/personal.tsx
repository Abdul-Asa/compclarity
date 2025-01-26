"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import { LocationSearch } from "@/components/ui/location-search";
import { InfoIcon } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { Sortable, SortableDragHandle, SortableItem } from "@/components/ui/sortable";
import { Button } from "@/components/ui/button";
import { GripVerticalIcon, TrashIcon } from "lucide-react";
import { CVSection, ProfileData, profileSchema } from "../../types";

export function PersonalSection({ handleChange, ...section }: CVSection & { handleChange: (data: CVSection) => void }) {
  const { isVisible, data } = section;

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    values: data as ProfileData,
    disabled: !isVisible,
  });

  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  useEffect(() => {
    if (isVisible) {
      const subscription = form.watch((formData) => {
        handleChange({
          ...section,
          data: formData as ProfileData,
        });
      });
      return () => subscription.unsubscribe();
    }
  }, [form.watch, isVisible]);

  const determinePlaceholder = (index: number) => {
    const platformName = form.watch(`links.${index}.name`);

    switch (platformName?.toLowerCase()) {
      case "github":
        return "https://github.com/me";
      case "linkedin":
        return "https://linkedin.com/in/me";
      case "portfolio":
        return "https://me.com";
      default:
        return "https://example.com";
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput placeholder="+44 7123 456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center gap-2">
                  Location
                  <InfoIcon
                    className="w-4 h-4"
                    data-tooltip-id="location"
                    data-tooltip-content="This will be used to display your location on your resume"
                  />
                  <Tooltip id="location" />
                </FormLabel>
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
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Links</FormLabel>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", url: "" })}>
              Add Link
            </Button>
          </div>

          <Sortable
            value={fields}
            onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}
            overlay={
              <div className="grid grid-cols-[1fr,1fr,auto,auto] items-center gap-2">
                <div className="w-full h-8 rounded-sm bg-muted/10" />
                <div className="w-full h-8 rounded-sm bg-muted/10" />
                <div className="rounded-sm size-8 shrink-0 bg-muted/10" />
                <div className="rounded-sm size-8 shrink-0 bg-muted/10" />
              </div>
            }
          >
            <div className="flex flex-col w-full gap-2">
              {fields.map((field, index) => (
                <SortableItem key={field.id} value={field.id} asChild>
                  <div className="grid grid-cols-[1fr,1fr,auto,auto] items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`links.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="h-8" placeholder="i.e Twitter" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`links.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="h-8" placeholder={determinePlaceholder(index)} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <SortableDragHandle variant="outline" size="icon" className="size-8 shrink-0">
                      <GripVerticalIcon className="size-4" aria-hidden="true" />
                    </SortableDragHandle>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="size-8 shrink-0"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon className="size-4" aria-hidden="true" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </SortableItem>
              ))}
            </div>
          </Sortable>
        </div>
      </div>
    </Form>
  );
}
