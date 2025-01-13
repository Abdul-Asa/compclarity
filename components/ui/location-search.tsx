"use client";

import { useCallback, useState } from "react";
import { AutoComplete } from "./autocomplete";
import { autocomplete } from "@/lib/actions/google";
import { useDebouncedCallback } from "use-debounce";

type LocationSearchProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function LocationSearch({
  value,
  onValueChange,
  placeholder = "Search location...",
  disabled,
}: LocationSearchProps) {
  const [options, setOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useDebouncedCallback(async (search: string) => {
    if (!search) {
      setOptions([]);
      return;
    }

    setIsLoading(true);
    try {
      const predictions = await autocomplete(search);
      setOptions(
        predictions.map((prediction) => ({
          value: prediction.place_id,
          label: prediction.description,
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, 800);

  const handleValueChange = useCallback(
    (newValue: string) => {
      onValueChange?.(newValue);
      handleSearch(newValue);
    },
    [handleSearch, onValueChange]
  );

  return (
    <AutoComplete
      disabled={disabled}
      options={options}
      value={value}
      onValueChange={handleValueChange}
      isLoading={isLoading}
      placeholder={placeholder}
      emptyMessage="No locations found"
      showEmptyMessage={false}
    />
  );
}
