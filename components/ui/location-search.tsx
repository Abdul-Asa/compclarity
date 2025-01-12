"use client";

import { useCallback, useState } from "react";
import { AutoComplete } from "./autocomplete";
import { autocomplete } from "@/lib/actions/google";
import { useDebouncedCallback } from "use-debounce";

type LocationSearchProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
};

export function LocationSearch({ value, onValueChange, placeholder = "Search location..." }: LocationSearchProps) {
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
  }, 300);

  const handleValueChange = useCallback(
    (newValue: string) => {
      onValueChange?.(newValue);
      handleSearch(newValue);
    },
    [handleSearch, onValueChange]
  );

  return (
    <AutoComplete
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
