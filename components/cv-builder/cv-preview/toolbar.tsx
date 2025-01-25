"use client";

import { useAtom } from "jotai";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { cvSettingsAtom } from "../store";
import { MAX_SCALE, MIN_SCALE, STEP } from "./constants";
import { useEffect } from "react";

interface ToolbarProps {
  onDownload?: () => void;
  className?: string;
}

export const Toolbar = ({ onDownload, className }: ToolbarProps) => {
  const [settings, setSettings] = useAtom(cvSettingsAtom);

  useEffect(() => {
    const handleResize = () => {
      if (!settings.autoScale) return;

      // Calculate scale based on window height
      const screenHeight = window.innerHeight;
      const toolbarHeight = 64; // Approximate height of toolbar
      const padding = 48; // Total vertical padding
      const availableHeight = screenHeight - toolbarHeight - padding;

      // Use 90% of available height as target
      const targetHeight = availableHeight * 0.9;
      const defaultScale = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, targetHeight / 1123) // 1123 is A4 height in px
      );

      setSettings({ ...settings, scale: Math.round(defaultScale * 100) / 100 });
    };

    if (settings.autoScale) {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [settings.autoScale, setSettings]);

  const handleScaleChange = (value: number[]) => {
    setSettings((prev) => ({ ...prev, scale: value[0], autoScale: false }));
  };

  const handleAutoScaleChange = (checked: boolean) => {
    setSettings((prev) => ({ ...prev, autoScale: checked }));
  };

  return (
    <div
      className={cn(
        "sticky bottom-0 flex h-16 items-center justify-between gap-4 border-t bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Search className="w-4 h-4 text-muted-foreground" />
        <div className="flex items-center w-48">
          <Slider
            value={[settings.scale]}
            onValueChange={handleScaleChange}
            min={MIN_SCALE}
            max={MAX_SCALE}
            step={STEP}
          />
        </div>
        <span className="min-w-[3rem] text-sm text-muted-foreground">{Math.round(settings.scale * 100)}%</span>
        <div className="flex items-center space-x-2">
          <Switch id="auto-scale" checked={settings.autoScale} onCheckedChange={handleAutoScaleChange} />
          <Label htmlFor="auto-scale" className="text-sm">
            Auto-scale
          </Label>
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={onDownload} className="flex items-center gap-2">
        <Download className="w-4 h-4" />
        <span>Download CV</span>
      </Button>
    </div>
  );
};
