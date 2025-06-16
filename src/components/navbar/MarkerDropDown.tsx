import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPinned, Pin, Trash } from "lucide-react";
import { Text } from "../ui/text";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  addPinnedCity,
  removePinnedCity,
} from "@/store/slices/cityPreferencesSlice";

export function MarkerDropDown() {
  const dispatch = useAppDispatch();
  const { currentWeather } = useAppSelector((state) => state.weather);
  const { pinnedCityNames, citiesByName } = useAppSelector(
    (state) => state.cityPreferences
  );

  if (!currentWeather) return null;

  const handlePinCity = () => {
    dispatch(
      addPinnedCity({
        name: `${currentWeather.location.name}, ${currentWeather.location.country}`,
        lat: currentWeather.location.lat,
        lon: currentWeather.location.lon,
      })
    );
  };

  const handleUnpinCity = (name: string) => {
    dispatch(removePinnedCity(name));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <MapPinned />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 min-h-24 justify-between gap-1 py-2 flex flex-col"
      >
        {pinnedCityNames.length === 0 ? (
          <Text
            size="xs"
            color="muted"
            className="truncate text-center my-auto"
          >
            No pinned cities.
          </Text>
        ) : (
          <>
            {pinnedCityNames.map((name) => {
              const city = citiesByName[name];
              if (!city) return null;

              return (
                <div
                  key={name}
                  className="flex items-center justify-between px-2 pl-3"
                >
                  <Text size="sm" weight="light">
                    {city.name}
                  </Text>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUnpinCity(name)}
                  >
                    <Trash className="size-3.5" />
                  </Button>
                </div>
              );
            })}
          </>
        )}

        <Button
          variant="default"
          className="mt-2 mx-1 text-[12px]"
          size="sm"
          onClick={handlePinCity}
        >
          <Pin className="size-3.5" />
          {currentWeather.location.name}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
