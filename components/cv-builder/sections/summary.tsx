"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SummaryData, summarySchema, summaryAtom } from "../store";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { CVSection } from "../store";
import Editor from "@/components/editor/cv-editor";

export const SummarySection = ({ ...section }: CVSection) => {
  const [summary, setSummary] = useAtom(summaryAtom);
  const { isVisible } = section;
  const form = useForm<SummaryData>({
    resolver: zodResolver(summarySchema),
    defaultValues: summary,
    disabled: !isVisible,
  });

  useEffect(() => {
    if (isVisible) {
      const { unsubscribe } = form.watch((value) => {
        setSummary(value as SummaryData);
      });
      return () => unsubscribe();
    }
  }, [form.watch, isVisible]);

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Editor
                content={field.value}
                onChange={field.onChange}
                disabled={!isVisible}
                placeholder="Summary of your professional background, key achievements, and career goals..."
                className="min-h-[15rem]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};
