import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Text } from "../ui/text";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchLocation } from "@/types/weather";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useWeatherData } from "@/hooks/useWeatherData";
import { clearSearchResults } from "@/store/slices/weatherSlice";
import { Button } from "../ui/button";

interface RenderSearchProps {
  query: string;
  setQuery: (value: string) => void;
  skipSearchRef: RefObject<boolean>;
}
export const RenderSearch = ({
  query,
  setQuery,
  skipSearchRef,
}: RenderSearchProps) => {
  const { isSearching, searchResults } = useAppSelector(
    (state) => state.weather
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fetchWeatherByCoordinates } = useWeatherData();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query.length >= 3 && (isSearching || searchResults.length > 0)) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, searchResults, isSearching]);

  const handleSelect = (location: SearchLocation) => {
    setShowDropdown(false);
    skipSearchRef.current = true;
    setQuery("");
    fetchWeatherByCoordinates(location.lat, location.lon);
    dispatch(clearSearchResults());
  };
  return (
    <div className="relative w-full md:max-w-80">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search city..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-full"
      />

      {showDropdown && (
        <Card className="absolute z-50 mt-2 w-full shadow-md border rounded-md overflow-hidden py-2">
          {isSearching ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="animate-spin size-4 text-muted-foreground" />
            </div>
          ) : (
            <ScrollArea className="max-h-40 overflow-auto">
              {searchResults.map((result: SearchLocation) => (
                <Button
                  variant={"ghost"}
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className={cn(
                    "w-full flex justify-between items-center px-4 py-2 mb-1 rounded-none"
                  )}
                >
                  <Text
                    size="xs"
                    weight="light"
                    className="text-left whitespace-normal break-words leading-4"
                  >
                    {result.name}, {result.region}, {result.country}.
                  </Text>
                </Button>
              ))}
            </ScrollArea>
          )}
        </Card>
      )}
    </div>
  );
};
