"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, PencilIcon } from "lucide-react";
import { useState } from "react";

export function PersonalSection() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card collapsible>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
        <CardDescription>Personal description</CardDescription>
      </CardHeader>

      <CardContent>
        <p>Card content here...</p>
      </CardContent>
    </Card>
  );
}
