import * as React from "react";
import { Check, ChevronsUpDown, Loader2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocationSearch, useCountrySearch } from "@/hooks/useLocationSearch";
import type { LocationResult } from "@/api/geoapify";

interface LocationSearchProps {
  value: string;
  onValueChange: (value: string) => void;
  onLocationSelect?: (location: LocationResult) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  countryCode?: string;
  lang?: "en" | "el";
}

export function LocationSearch({
  value,
  onValueChange,
  onLocationSelect,
  placeholder = "Select location...",
  searchPlaceholder = "Search cities, neighborhoods...",
  emptyMessage = "No locations found.",
  disabled = false,
  error = false,
  className,
  countryCode,
  lang = "el",
}: LocationSearchProps) {
  const [open, setOpen] = React.useState(false);
  const { query, setQuery, results, isLoading } = useLocationSearch({
    countryCode,
    lang,
    debounceMs: 300,
    minChars: 2,
  });

  const handleSelect = (location: LocationResult) => {
    const displayValue = location.city || location.formatted.split(",")[0];
    onValueChange(displayValue);
    onLocationSelect?.(location);
    setOpen(false);
    setQuery("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setQuery("");
    }
  };

  const getLocationDisplay = (location: LocationResult) => {
    const parts: string[] = [];

    if (location.neighbourhood || location.quarter || location.suburb) {
      parts.push(location.neighbourhood || location.quarter || location.suburb || "");
    }

    if (location.city) {
      parts.push(location.city);
    }

    if (location.country && !parts.includes(location.country)) {
      parts.push(location.country);
    }

    return parts.filter(Boolean).join(", ") || location.formatted;
  };

  const getLocationSubtitle = (location: LocationResult) => {
    const type = location.resultType;
    const typeLabels: Record<string, string> = {
      city: lang === "el" ? "Πόλη" : "City",
      suburb: lang === "el" ? "Περιοχή" : "Suburb",
      neighbourhood: lang === "el" ? "Γειτονιά" : "Neighborhood",
      quarter: lang === "el" ? "Συνοικία" : "Quarter",
      village: lang === "el" ? "Χωριό" : "Village",
      town: lang === "el" ? "Κωμόπολη" : "Town",
      locality: lang === "el" ? "Τοποθεσία" : "Locality",
      municipality: lang === "el" ? "Δήμος" : "Municipality",
    };
    return typeLabels[type] || type;
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal h-10",
            !value && "text-muted-foreground",
            error && "border-destructive",
            className
          )}
        >
          {value ? (
            <span className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              {value}
            </span>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">
                  {lang === "el" ? "Αναζήτηση..." : "Searching..."}
                </span>
              </div>
            ) : results.length === 0 ? (
              <CommandEmpty>
                {query.length < 2
                  ? lang === "el"
                    ? "Πληκτρολογήστε για αναζήτηση..."
                    : "Type to search..."
                  : emptyMessage}
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {results.map((location) => (
                  <CommandItem
                    key={location.placeId}
                    value={location.placeId}
                    onSelect={() => handleSelect(location)}
                    className="flex flex-col items-start py-3"
                  >
                    <div className="flex items-center w-full">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 shrink-0",
                          value === location.city ||
                            value === location.formatted.split(",")[0]
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="truncate font-medium">
                          {getLocationDisplay(location)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {getLocationSubtitle(location)}
                        </span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface CountrySearchProps {
  value: string;
  onValueChange: (value: string, code?: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  lang?: "en" | "el";
}

export function CountrySearch({
  value,
  onValueChange,
  placeholder = "Select country...",
  searchPlaceholder = "Search countries...",
  emptyMessage = "No countries found.",
  disabled = false,
  error = false,
  className,
  lang = "en",
}: CountrySearchProps) {
  const [open, setOpen] = React.useState(false);
  const { query, setQuery, countries, getCountryCode } = useCountrySearch(lang);

  const handleSelect = (countryName: string) => {
    const code = getCountryCode(countryName);
    onValueChange(countryName, code);
    setOpen(false);
    setQuery("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setQuery("");
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal h-10",
            !value && "text-muted-foreground",
            error && "border-destructive",
            className
          )}
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {countries.length === 0 ? (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            ) : (
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.code}
                    onSelect={() => handleSelect(country.name)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === country.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {country.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
