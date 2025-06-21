import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Trash } from "lucide-react";
import { Text } from "../ui/text";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  addFavoriteCity,
  removeFavoriteCity,
} from "@/store/slices/cityPreferencesSlice";
import { useWeatherData } from "@/hooks/useWeatherData";
import { toast } from "sonner";
import { memo, useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const FavoriteDropdown = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { fetchWeatherByCoordinates } = useWeatherData();
  const { currentWeather } = useAppSelector((state) => state.weather);
  const { favoriteCityNames, citiesByName } = useAppSelector(
    (state) => state.cityPreferences
  );

  const [showDropdown, setShowDropdown] = useState(false);

  if (!currentWeather) return null;

  const currentName = `${currentWeather.location.name}, ${currentWeather.location.country}`;

  const handleAddFavorite = () => {
    dispatch(
      addFavoriteCity({
        name: currentName,
        lat: currentWeather.location.lat,
        lon: currentWeather.location.lon,
      })
    );
  };

  const handleRemoveFavorite = (name: string) => {
    dispatch(removeFavoriteCity(name));
  };

  const handleCitySelect = (name: string, lat: number, lon: number) => {
    const isSameCity =
      currentWeather.location.lat === lat &&
      currentWeather.location.lon === lon;

    if (isSameCity) {
      toast("Already viewing", {
        description: `You're already seeing weather for ${name}`,
        duration: 4000,
        position: "bottom-center",
      });
      return;
    }

    fetchWeatherByCoordinates(lat, lon);

    toast.success("Switched city", {
      description: `Now showing weather for ${name}`,
      duration: 4000,
      position: "bottom-center",
    });

    setTimeout(() => setShowDropdown(false), 400);
  };

  return (
    <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Heart />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "w-56 min-h-24 justify-between gap-1 py-2 flex flex-col",
          theme === "weather" && "blur-card border-0"
        )}
      >
        {favoriteCityNames.length === 0 ? (
          <Text
            size="xs"
            color={theme === "weather" ? "white" : "muted"}
            className="truncate text-center my-auto"
          >
            No favorite cities.
          </Text>
        ) : (
          favoriteCityNames.map((name) => {
            const city = citiesByName[name];
            if (!city) return null;

            return (
              <div key={name} className="flex items-center justify-between">
                <Text
                  className="h-full p-2 rounded-md w-full text-sm text-left"
                  onClick={() =>
                    handleCitySelect(city.name, city.lat, city.lon)
                  }
                >
                  {city.name}
                </Text>
                <Trash
                  className={cn(
                    "h-full p-2 rounded-md text-sm text-left hover:cursor-pointer hover:bg-accent",
                    theme === "weather" && "hover:bg-primary"
                  )}
                  onClick={() => handleRemoveFavorite(city.name)}
                  size={30}
                  color={theme === "weather" ? "white" : "currentColor"}
                />
              </div>
            );
          })
        )}
        <Button
          variant={theme === "weather" ? "outline" : "default"}
          className="mt-2 mx-1 text-[12px]"
          size="sm"
          onClick={handleAddFavorite}
        >
          <Heart className="size-3.5" />
          {currentWeather.location.name}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(FavoriteDropdown);
