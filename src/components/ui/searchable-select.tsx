import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export type SearchableSelectOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  searchValue?: string;
};

interface SearchableSelectProps {
  value: string;
  options: SearchableSelectOption[];
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage?: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export const SearchableSelect = ({
  value,
  options,
  placeholder,
  searchPlaceholder,
  emptyMessage = 'No results found.',
  onValueChange,
  disabled,
}: SearchableSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label={placeholder}
          disabled={disabled}
          className={cn(
            'form-input flex w-full items-center justify-between gap-2',
            !selectedOption && 'text-muted-foreground',
            disabled && 'cursor-not-allowed opacity-70',
          )}
        >
          <span className="inline-flex items-center gap-2 truncate">
            {selectedOption ? (
              <>
                {selectedOption.icon ? (
                  <span className="text-lg leading-none">{selectedOption.icon}</span>
                ) : null}
                <span className="truncate">{selectedOption.label}</span>
              </>
            ) : (
              <span className="truncate">{placeholder}</span>
            )}
          </span>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.searchValue ?? option.label}
                  onSelect={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="inline-flex items-center gap-2">
                    {option.icon ? (
                      <span className="text-lg leading-none">{option.icon}</span>
                    ) : null}
                    <span>{option.label}</span>
                  </span>
                  <Check
                    className={cn(
                      'h-4 w-4 text-accent',
                      option.value === value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
