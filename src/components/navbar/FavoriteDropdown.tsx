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
import { useState } from "react";

export function FavoriteDropdown() {
  const dispatch = useAppDispatch();
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
        className="w-56 min-h-24 justify-between gap-1 py-2 flex flex-col"
      >
        {favoriteCityNames.length === 0 ? (
          <Text
            size="xs"
            color="muted"
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
                <button
                  className="h-full p-2 rounded-md w-full text-sm text-left hover:text-primary hover:cursor-pointer"
                  onClick={() =>
                    handleCitySelect(city.name, city.lat, city.lon)
                  }
                >
                  {city.name}
                </button>
                <button
                  className="h-full p-2 rounded-md text-sm text-left hover:text-primary hover:cursor-pointer hover:bg-accent"
                  onClick={() => handleRemoveFavorite(city.name)}
                >
                  <Trash className="size-3.5" />
                </button>
              </div>
            );
          })
        )}
        <Button
          variant="default"
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
}
