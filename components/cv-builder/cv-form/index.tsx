"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { CVDbType } from "@/lib/validation/types";
import { useLoadFromDb } from "../store";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useAtomValue } from "jotai";
import { combinedCVDataAtom } from "../store";
import { updateCV } from "@/lib/actions/server-actions";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@/lib/hooks/useToast";

const Sections = dynamic(() => import("./sections"), {
  loading: () => (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-4 overflow-auto">
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-32 mb-8" />
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-full h-32" />
      </div>
    </div>
  ),
  ssr: false,
});
const Settings = dynamic(() => import("./settings"), {
  loading: () => (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-4 overflow-auto">
        <Skeleton className="w-full h-64" />
      </div>
    </div>
  ),
  ssr: false,
});

export default function CVForm({ cv }: { cv: CVDbType }) {
  const loadFromDb = useLoadFromDb(cv.id);
  const combinedData = useAtomValue(combinedCVDataAtom);
  const debouncedData = useDebounce(combinedData, 5000);
  const { execute, result } = useAction(updateCV);
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    loadFromDb();
  }, [cv.id]);

  // Auto-save effect
  useEffect(() => {
    if (!cv.id) return;

    execute({
      cvId: cv.id,
      combinedCVData: debouncedData,
    });

    if (result.data) {
      toast({
        title: "Changes saved",
        description: "Your changes have been saved.",
      });
    } else {
      toast({
        title: "Failed to save changes",
        description: "Your changes could not be saved. Please try again.",
        variant: "destructive",
      });
    }
  }, [debouncedData, cv.id]);

  return (
    <Tabs defaultValue="sections">
      <TabsList>
        <TabsTrigger value="sections">Sections</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="sections">
        <Sections />
      </TabsContent>

      <TabsContent value="settings">
        <Settings />
      </TabsContent>
    </Tabs>
  );
}
