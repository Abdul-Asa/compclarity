"use client";
import { useAtom } from "jotai";
import { cvSettingsAtom } from "../store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CVSettings } from "../types";
import { fonts } from "../cv-preview/fonts";

const Settings = () => {
  const [settings, setSettings] = useAtom(cvSettingsAtom);

  const handleTemplateChange = (value: CVSettings["template"]) => {
    setSettings({ ...settings, template: value });
  };

  const handleMarginChange = (key: "top" | "bottom" | "left" | "right", value: string) => {
    const numValue = parseInt(value) || 0;
    setSettings({
      ...settings,
      margins: { ...settings.margins, [key]: numValue },
    });
  };

  const handleFontChange = (key: "family" | "size", value: string) => {
    const newValue = key === "size" ? parseInt(value) || 12 : value;
    setSettings({
      ...settings,
      font: { ...settings.font, [key]: newValue },
    });
  };

  const handleDateFormatChange = (value: CVSettings["dateFormat"]) => {
    setSettings({ ...settings, dateFormat: value });
  };

  const handleDisplayLinksChange = (checked: boolean) => {
    setSettings({ ...settings, displayFullLinks: checked });
  };

  return (
    <div className="w-full p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Layout and Appearance</CardTitle>
          <CardDescription>Configure your CV layout and appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-2">
            <Label>Template</Label>
            <Select value={settings.template} onValueChange={handleTemplateChange}>
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

          {/* Margins */}
          <div className="space-y-2">
            <Label>Margins (mm)</Label>
            <div className="grid grid-cols-2 gap-4">
              {(["top", "bottom", "left", "right"] as const).map((side) => (
                <div key={side} className="space-y-1">
                  <Label className="text-sm capitalize">{side}</Label>
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    value={settings.margins[side]}
                    onChange={(e) => handleMarginChange(side, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Font Settings */}
          <div className="space-y-2">
            <Label>Font</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm">Family</Label>
                <Select value={settings.font.family} onValueChange={(v) => handleFontChange("family", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(fonts).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Size (pt)</Label>
                <Input
                  type="number"
                  min="8"
                  max="24"
                  value={settings.font.size}
                  onChange={(e) => handleFontChange("size", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Date Format */}
          <div className="space-y-2">
            <Label>Date Format</Label>
            <Select value={settings.dateFormat} onValueChange={handleDateFormatChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="numbers-slash">MM/YYYY</SelectItem>
                <SelectItem value="numbers-dash">MM-YYYY</SelectItem>
                <SelectItem value="words-short">Month(abbreviated) YYYY</SelectItem>
                <SelectItem value="words-long">Month(full) Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Display Full Links */}
          <div className="flex items-center justify-between">
            <Label>Display Full Links</Label>
            <Switch checked={settings.displayFullLinks} onCheckedChange={handleDisplayLinksChange} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
