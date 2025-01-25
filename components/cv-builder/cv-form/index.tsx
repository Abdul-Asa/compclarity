"use client";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { CVDbType } from "@/lib/validation/types";
import { cvDataAtom, cvSectionsAtom, cvSettingsAtom, deconstructCombinedCVData, resetTriggerAtom } from "../store";
import { CombinedCVData } from "../types";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

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
  const { cvData, sections, settings } = deconstructCombinedCVData(cv.cv_data as unknown as CombinedCVData);
  const newSettings = {
    ...settings,
    id: cv.id,
    userId: cv.user_id,
    createdAt: cv.created_at,
    updatedAt: cv.updated_at,
    lastModified: new Date().toISOString(),
  };
  const [, setCvDataState] = useAtom(cvDataAtom);
  const [, setSectionsState] = useAtom(cvSectionsAtom);
  const [, setSettingsState] = useAtom(cvSettingsAtom);
  const [, setResetTrigger] = useAtom(resetTriggerAtom);

  useEffect(() => {
    setCvDataState(cvData);
    setSectionsState(sections);
    setSettingsState(newSettings);
    setResetTrigger((prev) => prev + 1);
  }, [cv]);

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
