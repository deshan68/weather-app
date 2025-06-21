import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { memo, useEffect, useRef, useState, type RefObject } from "react";
import { Text } from "../ui/text";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchLocation } from "@/types/weather";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useWeatherData } from "@/hooks/useWeatherData";
import { clearSearchResults } from "@/store/slices/weatherSlice";
import { Button } from "../ui/button";
import { useTheme } from "@/providers/ThemeProvider";

interface RenderSearchProps {
  query: string;
  setQuery: (value: string) => void;
  skipSearchRef: RefObject<boolean>;
}

const RenderSearch = ({
  query,
  setQuery,
  skipSearchRef,
}: RenderSearchProps) => {
  const { isSearching, searchResults } = useAppSelector(
    (state) => state.weather
  );
  const { theme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { fetchWeatherByCoordinates } = useWeatherData();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query.length >= 3 && (isSearching || searchResults.length > 0)) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, searchResults, isSearching]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (location: SearchLocation) => {
    setShowDropdown(false);
    skipSearchRef.current = true;
    setQuery("");
    fetchWeatherByCoordinates(location.lat, location.lon);
    dispatch(clearSearchResults());
  };

  return (
    <div ref={containerRef} className="relative w-full md:max-w-80">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search city..."
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (query.length >= 3 && (isSearching || searchResults.length > 0)) {
            setShowDropdown(true);
          }
        }}
        value={query}
        className={cn(
          "w-full",
          theme === "weather" && "text-white placeholder:text-white"
        )}
      />

      {showDropdown && (
        <Card
          className={cn(
            "absolute z-50 mt-2 w-full py-2 border shadow-md overflow-hidden bg-transparent",
            theme === "weather" && "bg-primary-foreground"
          )}
        >
          {isSearching ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="animate-spin size-4 text-muted-foreground" />
            </div>
          ) : (
            <ScrollArea className="max-h-40 overflow-auto">
              {searchResults.length > 0 ? (
                searchResults.map((result: SearchLocation) => (
                  <Button
                    variant={"ghost"}
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className={cn(
                      "w-full flex justify-between items-center px-4 py-2 mb-1 rounded-none",
                      theme === "weather" && "hover:bg-primary/20"
                    )}
                  >
                    <Text
                      size="xs"
                      weight="light"
                      className={cn(
                        "text-left whitespace-normal break-words leading-4",
                        theme === "weather" && "text-black"
                      )}
                    >
                      {result.name}, {result.region}, {result.country}.
                    </Text>
                  </Button>
                ))
              ) : (
                <div className="flex items-center justify-center py-4">
                  <Text size="xs" color="muted">
                    No results found.
                  </Text>
                </div>
              )}
            </ScrollArea>
          )}
        </Card>
      )}
    </div>
  );
};

export default memo(RenderSearch);
