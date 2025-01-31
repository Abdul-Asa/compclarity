"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Editor from "@/components/editor/cv-editor";
import { CVSection, SummaryData, summarySchema } from "../../types";
import { useEffect } from "react";

export function SummarySection({ handleChange, ...section }: CVSection & { handleChange: (data: CVSection) => void }) {
  const { isVisible, data } = section;

  const form = useForm<SummaryData>({
    resolver: zodResolver(summarySchema),
    values: data as SummaryData,
    disabled: !isVisible,
  });

  // Watch form changes and trigger update
  useEffect(() => {
    if (isVisible) {
      const subscription = form.watch((formData) => {
        handleChange({
          ...section,
          data: formData as SummaryData,
        });
      });
      return () => subscription.unsubscribe();
    }
  }, [form.watch, isVisible, handleChange, section]);

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary</FormLabel>
            <FormControl>
              <Editor
                content={field.value}
                onChange={field.onChange}
                disabled={!isVisible}
                placeholder="Write a brief summary of your professional background..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
