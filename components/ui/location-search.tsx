import { useCallback, useState } from "react";
import { AutoComplete, type Option } from "./autocomplete";
import { autocomplete } from "@/lib/actions/google";
import { useDebouncedCallback } from "use-debounce";
import type { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";

type LocationSearchProps = {
  onLocationSelect?: (location: PlaceAutocompleteResult) => void;
  placeholder?: string;
  className?: string;
  value?: Option;
};

export const LocationSearch = ({
  onLocationSelect,
  placeholder = "Search for a city...",
  className,
  value,
}: LocationSearchProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Store the original predictions to map back when selecting
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);

  const handleSearch = useDebouncedCallback(async (value: string) => {
    if (!value) {
      setOptions([]);
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await autocomplete(value);
      setPredictions(results);

      // Transform predictions into options format
      const newOptions = results.map((prediction) => ({
        value: prediction.place_id,
        label: prediction.description,
      }));

      setOptions(newOptions);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleValueChange = useCallback(
    (option: Option) => {
      const selectedPrediction = predictions.find((prediction) => prediction.place_id === option.value);
      if (selectedPrediction && onLocationSelect) {
        onLocationSelect(selectedPrediction);
      }
    },
    [predictions, onLocationSelect]
  );

  return (
    <AutoComplete
      options={options}
      value={value}
      onValueChange={handleValueChange}
      isLoading={isLoading}
      placeholder={placeholder}
      emptyMessage="No locations found."
      className={className}
    />
  );
};
