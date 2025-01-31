"use client";

import { useAtom } from "jotai";
import { Search, Download, Save, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { sectionsAtom, settingsAtom } from "../constants";
import { MAX_SCALE, MIN_SCALE, STEP } from "../constants";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { updateCV } from "@/lib/actions/server-actions";
import { useToast } from "@/lib/hooks/useToast";
import { useAtomValue } from "jotai";
import { useIsMutating } from "@tanstack/react-query";

interface ToolbarProps {
  onDownload?: () => void;
  className?: string;
}

export const Toolbar = ({ onDownload, className }: ToolbarProps) => {
  const [settings, setSettings] = useAtom(settingsAtom);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const isMutating = useIsMutating({ mutationKey: ["updateCV"] });

  // Handle save status updates
  useEffect(() => {
    if (isMutating) {
      setSaveStatus("saving");
    } else if (saveStatus === "saving") {
      setSaveStatus("saved");
      const timer = setTimeout(() => setSaveStatus("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isMutating, saveStatus]);

  useEffect(() => {
    const handleResize = () => {
      if (!settings || !settings.autoScale) return;

      const screenHeight = window.innerHeight;
      const toolbarHeight = 64;
      const padding = 48;
      const availableHeight = screenHeight - toolbarHeight - padding;
      const targetHeight = availableHeight * 0.9;
      const defaultScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, targetHeight / 1123));

      setSettings({ ...settings, scale: Math.round(defaultScale * 100) / 100 });
    };

    if (settings && settings.autoScale) {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [settings?.autoScale, setSettings]);

  if (!settings) return null;
  const handleScaleChange = (value: number[]) => {
    if (!settings) return;
    setSettings({ ...settings, scale: value[0], autoScale: false });
  };

  const handleAutoScaleChange = (checked: boolean) => {
    if (!settings) return;
    setSettings({ ...settings, autoScale: checked });
  };

  return (
    <div
      className={cn(
        "sticky bottom-0 flex h-16 items-center justify-between gap-4 border-t bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-scroll",
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

      <div className="flex items-center gap-2">
        {saveStatus === "saving" && (
          <div className="flex items-center gap-2 min-w-[90px]">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Saving...</span>
          </div>
        )}
        <Button variant="outline" size="sm" onClick={onDownload} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>Download CV</span>
        </Button>
      </div>
    </div>
  );
};
