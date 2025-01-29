"use client";
import { useAtom } from "jotai";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  dateFormats,
  fontFamilies,
  fontWeights,
  settingsAtom,
  INITIAL_CV_DATA,
  sectionsAtom,
  EMPTY_CV_DATA,
} from "../constants";
import { getCV } from "@/lib/actions/server-actions";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { updateCV, updateCVName } from "@/lib/actions/server-actions";
import { useToast } from "@/lib/hooks/useToast";
import { CVData, CVSection, CVSettings } from "../types";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: cv, isLoading } = useQuery({
    queryKey: ["cv", params.id],
    queryFn: () => getCV(params.id as string),
  });

  const [settings, setSettings] = useAtom(settingsAtom);
  const [, setSections] = useAtom(sectionsAtom);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // Add mutation
  const { mutate: updateCVMutation } = useMutation({
    mutationKey: ["updateCV"],
    mutationFn: (newData: CVData) => updateCV({ cvId: params.id as string, combinedCVData: newData }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["cv", params.id] });
      const previousCV = queryClient.getQueryData(["cv", params.id]);
      return { previousCV };
    },
    onError: (err, newData, context) => {
      toast({
        title: "Failed to update CV",
        description: "Please try again later",
        variant: "destructive",
      });
      queryClient.setQueryData(["cv", params.id], context?.previousCV);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cv", params.id] });
    },
  });

  const debouncedUpdateCVMutation = useDebouncedCallback(updateCVMutation, 3000);

  // Add new mutation for name updates
  const { mutate: updateCVNameMutation } = useMutation({
    mutationKey: ["updateCVName"],
    mutationFn: (name: string) => updateCVName({ cvId: params.id as string, name }),
    onError: (err) => {
      toast({
        title: "Failed to update CV name",
        description: "Please try again later",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cv", params.id] });
    },
  });

  const debouncedUpdateCVNameMutation = useDebouncedCallback(updateCVNameMutation, 1000);

  useEffect(() => {
    if (cv?.cv_data?.settings) {
      setSettings(cv.cv_data.settings);
    }
  }, [cv, setSettings]);

  useEffect(() => {
    if (cv && settings) {
      debouncedUpdateCVMutation({
        ...cv.cv_data,
        settings: settings,
      });
    }
  }, [settings]);

  if (isLoading || !cv || !settings) {
    return <div>Loading...</div>;
  }

  const handleChange = (path: string, value: any) => {
    if (path === "name") {
      if (!value.trim()) {
        toast({
          title: "Invalid name",
          description: "CV name cannot be empty",
          variant: "destructive",
        });
        return;
      }

      setSettings((prev) => {
        if (!prev) return prev;
        return { ...prev, name: value };
      });
      debouncedUpdateCVNameMutation(value);
      return;
    }

    const pathArray = path.split(".");
    setSettings((prev) => {
      if (!prev) return prev;
      const newSettings = { ...prev };
      let current: any = newSettings;
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      current[pathArray[pathArray.length - 1]] = value;
      return newSettings;
    });
  };

  const handleResetData = () => {
    if (cv) {
      setSections(INITIAL_CV_DATA.sections as CVSection[]);
      setSettings(INITIAL_CV_DATA.settings as CVSettings);
      updateCVMutation({
        ...cv.cv_data,
        sections: INITIAL_CV_DATA.sections as CVSection[],
        settings: INITIAL_CV_DATA.settings as CVSettings,
      });
    }
  };

  const handleClearData = () => {
    if (cv) {
      setSections(EMPTY_CV_DATA.sections as CVSection[]);
      updateCVMutation({
        ...cv.cv_data,
        sections: EMPTY_CV_DATA.sections as CVSection[],
      });
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Document Info */}
      <Card>
        <CardHeader className="p-6">
          <CardTitle>Document Information</CardTitle>
          <CardDescription>Basic information about your CV</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>CV Name</Label>
            <Input
              value={settings.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              placeholder="Enter CV name"
              aria-label="CV name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Created</Label>
              <Input value={new Date(cv.created_at).toLocaleDateString()} disabled />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Last Modified</Label>
              <Input value={new Date(cv.updated_at).toLocaleDateString()} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Settings */}
      <Card>
        <CardHeader className="p-6">
          <CardTitle>Layout</CardTitle>
          <CardDescription>Customize the layout of your CV</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label>Template</Label>
            <Select value={settings.template} onValueChange={(value) => handleChange("template", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Page Size</Label>
            <Select value={settings.documentSize} onValueChange={(value) => handleChange("documentSize", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A4">A4</SelectItem>
                <SelectItem value="LETTER">US Letter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Margins (mm)</Label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(settings.margins).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-2">
                  <Label className="capitalize">{key}</Label>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => handleChange(`margins.${key}`, Number(e.target.value))}
                    min={0}
                    max={50}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Spacing</Label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(settings.spacing).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-2">
                  <Label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</Label>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => handleChange(`spacing.${key}`, Number(e.target.value))}
                    min={0}
                    step={key === "lineHeight" ? 0.1 : 1}
                    max={key === "lineHeight" ? 3 : 100}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography Settings */}
      <Card>
        <CardHeader className="p-6">
          <CardTitle>Typography</CardTitle>
          <CardDescription>Customize the fonts and text styles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Title Typography */}
          <div className="flex flex-col gap-4">
            <Label>Title Style</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Font Family</Label>
                <Select
                  value={settings.title.font.family}
                  onValueChange={(value) => handleChange("title.font.family", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(fontFamilies).map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Font Size</Label>
                <Input
                  type="number"
                  value={settings.title.font.size}
                  onChange={(e) => handleChange("title.font.size", Number(e.target.value))}
                  min={12}
                  max={72}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Font Weight</Label>
                <Select
                  value={settings.title.font.weight}
                  onValueChange={(value) => handleChange("title.font.weight", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontWeights.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Color</Label>
                <Input
                  type="color"
                  value={settings.title.color}
                  onChange={(e) => handleChange("title.color", e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Align</Label>
                <Select value={settings.title.align} onValueChange={(value) => handleChange("title.align", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Heading Typography */}
          <div className="flex flex-col gap-4">
            <Label>Heading Style</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Font Family</Label>
                <Select
                  value={settings.heading.font.family}
                  onValueChange={(value) => handleChange("heading.font.family", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(fontFamilies).map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Font Size</Label>
                <Input
                  type="number"
                  value={settings.heading.font.size}
                  onChange={(e) => handleChange("heading.font.size", Number(e.target.value))}
                  min={10}
                  max={48}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Font Weight</Label>
                <Select
                  value={settings.heading.font.weight}
                  onValueChange={(value) => handleChange("heading.font.weight", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontWeights.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Color</Label>
                <Input
                  type="color"
                  value={settings.heading.color}
                  onChange={(e) => handleChange("heading.color", e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Body Typography */}
          <div className="flex flex-col gap-4">
            <Label>Body Style</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Font Family</Label>
                <Select
                  value={settings.body.font.family}
                  onValueChange={(value) => handleChange("body.font.family", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(fontFamilies).map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Font Size</Label>
                <Input
                  type="number"
                  value={settings.body.font.size}
                  onChange={(e) => handleChange("body.font.size", Number(e.target.value))}
                  min={8}
                  max={24}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Font Weight</Label>
                <Select
                  value={settings.body.font.weight}
                  onValueChange={(value) => handleChange("body.font.weight", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontWeights.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Color</Label>
                <Input
                  type="color"
                  value={settings.body.color}
                  onChange={(e) => handleChange("body.color", e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Format Settings */}
      <Card>
        <CardHeader className="p-6">
          <CardTitle>Format</CardTitle>
          <CardDescription>Customize the formatting of your CV</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Date Format</Label>
            <Select value={settings.dateFormat} onValueChange={(value) => handleChange("dateFormat", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateFormats.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label>Display Full Links</Label>
            <Switch
              checked={settings.displayFullLinks}
              onCheckedChange={(checked) => handleChange("displayFullLinks", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Developer Tools */}
      <Card>
        <CardHeader className="p-6">
          <CardTitle>Miscellaneous</CardTitle>
          <CardDescription>Advanced options for development and debugging</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Modal
            trigger={
              <Button variant="outline" className="flex-1">
                Reset to Seed Data
              </Button>
            }
            open={isResetModalOpen}
            onOpenChange={setIsResetModalOpen}
          >
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Reset to Seed Data</h2>
              <p className="text-muted-foreground">
                This will reset all sections and settings to their initial seed data. This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsResetModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleResetData();
                    setIsResetModalOpen(false);
                  }}
                >
                  Reset Data
                </Button>
              </div>
            </div>
          </Modal>

          <Modal
            trigger={
              <Button variant="outline" className="flex-1">
                Clear All Data
              </Button>
            }
            open={isClearModalOpen}
            onOpenChange={setIsClearModalOpen}
          >
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Clear All Data</h2>
              <p className="text-muted-foreground">
                This will clear all content from all sections while preserving the structure. This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsClearModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleClearData();
                    setIsClearModalOpen(false);
                  }}
                >
                  Clear Data
                </Button>
              </div>
            </div>
          </Modal>

          <Modal
            trigger={
              <Button variant="outline" className="flex-1">
                Show JSON Data
              </Button>
            }
          >
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Current CV Data</h2>
              <div className="p-4 overflow-auto rounded-lg bg-muted max-h-[60vh]">
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify({ sections: cv.cv_data.sections, settings }, null, 2)}
                </pre>
              </div>
            </div>
          </Modal>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
