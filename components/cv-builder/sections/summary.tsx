"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SummaryData, summarySchema, summaryAtom, customsAtom } from "../store";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { CVSection } from "../store";
import Editor from "@/components/editor/cv-editor";

export const SummarySection = ({ ...section }: CVSection) => {
  const [summary, setSummary] = useAtom(summaryAtom);
  const setCustomSummary = useSetAtom(customsAtom);
  const { isVisible, type, id } = section;
  const form = useForm<SummaryData>({
    resolver: zodResolver(summarySchema),
    defaultValues: summary,
    disabled: !isVisible,
  });

  useEffect(() => {
    if (isVisible) {
      const { unsubscribe } = form.watch((value) => {
        if (type === "summary") {
          setSummary(value as SummaryData);
        } else {
          setCustomSummary({ id, data: value as SummaryData });
        }
        console.log("section", section);
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
