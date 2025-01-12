import { CommandGroup, CommandItem, CommandList, CommandInput, CommandEmpty } from "./command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Option = Record<"value" | "label", string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  value?: Option;
  onValueChange?: (value: Option) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

export const AutoComplete = <T,>({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  disabled,
  isLoading = false,
  className,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);
  const [inputValue, setInputValue] = useState<string>(value?.label || "");

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find((option) => option.label === input.value);
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    console.log("selected", selected);
    if (selected) {
      setInputValue(selected?.label);
    }
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label);

      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onBlur={handleBlur}
          onValueChange={(value) => {
            setInputValue(value);
            setOpen(true);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full bg-transparent py-1 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
        />
      </div>
      {isOpen && (
        <CommandList className="absolute top-full w-full z-50 mt-1 rounded-lg bg-white border shadow-md">
          <CommandEmpty className="py-3 px-2 text-sm text-center">{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => {
              const isSelected = selected?.value === option.value;
              return (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onSelect={() => handleSelectOption(option)}
                  className={cn("flex w-full items-center gap-2")}
                >
                  {option.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      )}
    </CommandPrimitive>
  );
};
