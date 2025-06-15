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

export function FavoriteDropdown() {
  const dispatch = useAppDispatch();
  const { fetchWeatherByCoordinates } = useWeatherData();
  const { currentWeather } = useAppSelector((state) => state.weather);
  const { favoriteCities } = useAppSelector((state) => state.cityPreferences);

  if (!currentWeather) return null;

  const handleAddFavorite = () => {
    dispatch(
      addFavoriteCity({
        name: `${currentWeather.location.name}, ${currentWeather.location.country}`,
        lat: currentWeather.location.lat,
        lon: currentWeather.location.lon,
      })
    );
  };

  const handleRemoveFavorite = (name: string) => {
    dispatch(removeFavoriteCity(name));
  };

  const handleSelectFavorite = (lat: number, lon: number) => {
    fetchWeatherByCoordinates(lat, lon);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Heart />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 min-h-24 justify-between gap-1 py-2 flex flex-col"
      >
        {favoriteCities.length === 0 ? (
          <Text
            size={"xs"}
            color={"muted"}
            className="truncate text-center my-auto"
          >
            No favorite cities.
          </Text>
        ) : (
          favoriteCities.map((city, index) => (
            <div key={index} className="flex items-center justify-between">
              <button
                className="h-full p-2  rounded-md w-full text-sm text-left hover:text-primary hover:cursor-pointer"
                onClick={() => handleSelectFavorite(city.lat, city.lon)}
              >
                {city.name}
              </button>
              <button
                className="h-full p-2  rounded-md text-sm text-left hover:text-primary hover:cursor-pointer hover:bg-accent"
                onClick={() => handleRemoveFavorite(city.name)}
              >
                <Trash className="size-3.5" />
              </button>
            </div>
          ))
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
