"use client";

import { ModeToggle } from "@/components/providers";
import { Button } from "@/components/ui/button";
import CTABadge from "@/components/ui/cta-badge";
import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ColorBlock = ({ className, colorName }: { className: string; colorName: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <div className={`w-10 h-10 rounded-sm border ${className}`} />
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">{colorName}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Define all component examples in a single object
const components = {
  colors: {
    title: "Colors",
    description: "All colors",
    variants: [
      {
        title: "Backgrounds",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <ColorBlock className="bg-background border-border" colorName="Background" />
            <ColorBlock className="bg-foreground border-border" colorName="Foreground" />
            <ColorBlock className="bg-neutral border-border" colorName="Neutral" />
            <ColorBlock className="bg-primary border-border" colorName="Primary" />
            <ColorBlock className="bg-primary-light border-border" colorName="Primary Light" />
            <ColorBlock className="bg-primary-dark border-border" colorName="Primary Dark" />
          </div>
        ),
      },
      {
        title: "Accents",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <ColorBlock className="bg-accent border-border" colorName="Accent" />
            <ColorBlock className="bg-accent-foreground border-border" colorName="Accent Foreground" />
            <ColorBlock className="bg-destructive border-border" colorName="Destructive" />
            <ColorBlock className="bg-destructive-secondary border-border" colorName="Destructive Secondary" />
            <ColorBlock className="bg-muted border-border" colorName="Muted" />
            <ColorBlock className="bg-muted-foreground border-border" colorName="Muted Foreground" />
            <ColorBlock className="bg-secondary border-border" colorName="Secondary" />
            <ColorBlock className="bg-secondary-foreground border-border" colorName="Secondary Foreground" />
          </div>
        ),
      },
      {
        title: "Borders",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <ColorBlock className="bg-border border-neutral" colorName="Border" />
            <ColorBlock className="bg-border-light border-neutral" colorName="Border Light" />
            <ColorBlock className="bg-border-dark border-neutral" colorName="Border Dark" />
            <ColorBlock className="bg-input border-neutral" colorName="Input" />
            <ColorBlock className="bg-ring border-neutral" colorName="Ring" />
          </div>
        ),
      },
      {
        title: "Cards",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <ColorBlock className="bg-card border-border" colorName="Card" />
            <ColorBlock className="bg-card-foreground border-border" colorName="Card Foreground" />
            <ColorBlock className="bg-popover border-border" colorName="Popover" />
            <ColorBlock className="bg-popover-foreground border-border" colorName="Popover Foreground" />
          </div>
        ),
      },
    ],
  },
  buttons: {
    title: "Buttons",
    description: "Available button variations and sizes",
    variants: [
      {
        title: "Default Button with Loading State",
        component: (
          <div className="flex gap-4 items-center">
            <Button>Default</Button>
            <code className="text-sm bg-muted p-2 rounded">size="default"</code>
          </div>
        ),
      },
      {
        title: "Size Variations",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Plus />
            </Button>
          </div>
        ),
      },
      {
        title: "Variants",
        component: (
          <div className="flex gap-4 items-center flex-wrap">
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <ModeToggle />
          </div>
        ),
      },
    ],
  },
  ctaBadge: {
    title: "CTA Badge",
    description: "Call-to-action component with link",
    variants: [
      {
        title: "Default CTA Badge",
        component: <CTABadge intro="Get started" main="for free" link="/auth/sign-in" />,
      },
    ],
  },
};

export default function Test() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b pb-6">
          <h1 className="text-3xl font-bold">Design System</h1>
          <p className="mt-2">Component library and style guide</p>
        </div>

        {/* Map over components */}
        {Object.entries(components).map(([key, component]) => (
          <section key={key} className="space-y-6">
            <div className="border-bpb-2">
              <h2 className="text-2xl font-semibold">{component.title}</h2>
              <p className="text-sm 0 mt-1">{component.description}</p>
            </div>

            <div className="grid gap-8">
              {component.variants.map((variant, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-sm font-medium">{variant.title}</h3>
                  {variant.component}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
