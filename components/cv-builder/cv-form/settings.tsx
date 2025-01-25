"use client";

import { useAtom } from "jotai";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cvSettingsAtom } from "../store";

const fontFamilies = ["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Source Sans Pro", "Nunito"];

const fontWeights = [
  { value: "normal", label: "Regular" },
  { value: "medium", label: "Medium" },
  { value: "semibold", label: "Semibold" },
  { value: "bold", label: "Bold" },
];

const dateFormats = [
  { value: "numbers-slash", label: "01/2024" },
  { value: "numbers-dash", label: "01-2024" },
  { value: "words-short", label: "Jan 2024" },
  { value: "words-long", label: "January 2024" },
];

const bulletPoints = [
  { value: "•", label: "Bullet (•)" },
  { value: "◦", label: "Circle (◦)" },
  { value: "▪", label: "Square (▪)" },
  { value: "▫", label: "Square Outline (▫)" },
  { value: "‣", label: "Triangle (‣)" },
  { value: "-", label: "Dash (-)" },
];

export default function Settings() {
  const [settings, setSettings] = useAtom(cvSettingsAtom);

  const handleChange = (path: string, value: any) => {
    const pathArray = path.split(".");
    setSettings(() => {
      const newSettings = { ...settings };
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
        <CardHeader className="pb-2">
          <CardTitle>Document Information</CardTitle>
          <CardDescription>Basic information about your CV</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>CV Name</Label>
            <Input value={settings.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Created</Label>
              <Input value={new Date(settings.createdAt).toLocaleDateString()} disabled />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Last Modified</Label>
              <Input value={new Date(settings.lastModified).toLocaleDateString()} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Settings */}
      <Card>
        <CardHeader className="pb-2">
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
        <CardHeader className="pb-2">
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
                    {fontFamilies.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
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
                    {fontFamilies.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
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
                    {fontFamilies.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
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
        <CardHeader className="pb-2">
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
          <div className="flex flex-col gap-2">
            <Label>Bullet Point Style</Label>
            <Select value={settings.bulletPoints} onValueChange={(value) => handleChange("bulletPoints", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bulletPoints.map(({ value, label }) => (
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
}
