"use client";

import { format } from "date-fns";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  mode?: "default" | "monthYear";
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
}

export default function DatePicker({
  mode = "default",
  value,
  onChange,
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);

  const handleSelect = React.useCallback(
    (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      onChange?.(selectedDate);
    },
    [onChange]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? <span>{format(date, mode === "monthYear" ? "MMMM yyyy" : "PPP")}</span> : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          autoFocus
          {...(mode === "monthYear"
            ? {
                view: "month",
                defaultMonth: date,
                showOutsideDays: false,
              }
            : {})}
        />
      </PopoverContent>
    </Popover>
  );
}
