"use client";

import { Button } from "@/components/ui/button";
import CTABadge from "@/components/ui/cta-badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

// Define types for our components data
type ComponentExample = {
  title: string;
  description: string;
  variants: {
    title: string;
    description?: string;
    component: JSX.Element;
    code?: string;
  }[];
};

type StyleGuideData = {
  [key: string]: ComponentExample;
};

export default function Test() {
  const [loading, setLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Define all component examples in a single object
  const components: StyleGuideData = {
    buttons: {
      title: "Buttons",
      description: "Available button variations and sizes",
      variants: [
        {
          title: "Default Button with Loading State",
          component: (
            <div className="flex gap-4 items-center">
              <Button onClick={() => setLoading(!loading)}>{loading ? "Loading" : "Not loading"}</Button>
              <code className="text-sm bg-gray-100 p-2 rounded">size="default"</code>
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
      ],
    },
    ctaBadge: {
      title: "CTA Badge",
      description: "Call-to-action component with link",
      variants: [
        {
          title: "Default CTA Badge",
          component: (
              <CTABadge intro="Get started" main="for free" link="/register" />
           
          ),
        },
      ],
    },
    popovers: {
      title: "Popovers",
      description: "Interactive popover components for dropdown menus and more",
      variants: [
        {
          title: "Basic Popover",
          component: (
            <div className="flex gap-4 items-center">
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button>
                    Options{" "}
                    <ChevronDown
                      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="flex flex-col gap-2">
                    <Button className="w-full justify-start">Option 1</Button>
                    <Button className="w-full justify-start">Option 2</Button>
                    <Button className="w-full justify-start">Option 3</Button>
                  </div>
                </PopoverContent>
              </Popover>
              <code className="text-sm bg-gray-100 p-2 rounded">Controlled with useState</code>
            </div>
          ),
        },
        {
          title: "Uncontrolled Popover",
          component: (
            <div className="flex gap-4 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button>
                    Menu <ChevronDown className="relative top-[1px] ml-1 h-3 w-3" aria-hidden="true" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-2">
                    <p>Popover content here</p>
                  </div>
                </PopoverContent>
              </Popover>
              <code className="text-sm bg-gray-100 p-2 rounded">Uncontrolled state</code>
            </div>
          ),
        },
      ],
    },
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">Design System</h1>
          <p className="mt-2 text-gray-600">Component library and style guide</p>
        </div>

        {/* Map over components */}
        {Object.entries(components).map(([key, component]) => (
          <section key={key} className="space-y-6">
            <div className="border-b border-gray-200 pb-2">
              <h2 className="text-2xl font-semibold text-gray-800">{component.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{component.description}</p>
            </div>

            <div className="grid gap-8">
              {component.variants.map((variant, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">{variant.title}</h3>
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
