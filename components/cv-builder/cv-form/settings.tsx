"use client";
import { useAtom } from "jotai";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { dateFormats, fontFamilies, fontWeights, settingsAtom } from "../constants";
import { getCV } from "@/lib/actions/server-actions";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { updateCV, updateCVName } from "@/lib/actions/server-actions";
import { useToast } from "@/lib/hooks/useToast";
import { CVData } from "../types";

const Settings = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: cv, isLoading } = useQuery({
    queryKey: ["cv", params.id],
    queryFn: () => getCV(params.id as string),
  });

  const [settings, setSettings] = useAtom(settingsAtom);

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
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
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
                    max={100}
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
    </div>
  );
};

export default Settings;
