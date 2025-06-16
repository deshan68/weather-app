import { Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/hooks/useRedux";
import { useEffect, useRef } from "react";
import { type MapRef } from "@vis.gl/react-maplibre";
import { useWeatherData } from "@/hooks/useWeatherData";
import { toast } from "sonner";

type PinnedCityDropdownProps = {
  mapRef: React.RefObject<MapRef | null>;
};

export default function PinnedCityDropdown({
  mapRef,
}: PinnedCityDropdownProps) {
  const { fetchWeatherByCoordinates } = useWeatherData();

  const { currentWeather } = useAppSelector((state) => state.weather);
  const { pinnedCityNames, citiesByName } = useAppSelector(
    (state) => state.cityPreferences
  );
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (pinnedCityNames.length > 0) {
      const firstName = pinnedCityNames[0];
      const firstCity = citiesByName[firstName];
      if (firstCity) {
        mapRef?.current?.flyTo({
          center: [firstCity.lon, firstCity.lat],
          zoom: 10,
          duration: 1500,
        });
      }
    }
  }, [pinnedCityNames, citiesByName, mapRef]);

  const handleFlyTo = (name: string, lat: number, lon: number) => {
    const isSameCity =
      currentWeather?.location.lat === lat &&
      currentWeather?.location.lon === lon;

    if (isSameCity) {
      toast("Already viewing", {
        description: `You're already seeing weather for ${name}`,
        duration: 4000,
        position: "bottom-center",
      });
      return;
    }

    fetchWeatherByCoordinates(lat, lon);

    mapRef?.current?.flyTo({
      center: [lon, lat],
      zoom: 10,
      duration: 1500,
    });

    toast.success("Switched city", {
      description: `Now showing weather for ${name}`,
      duration: 4000,
      position: "bottom-center",
    });

    dropdownRef.current?.click();
  };

  if (pinnedCityNames.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          ref={dropdownRef}
          aria-label="Pinned Cities"
          className="rounded-full"
        >
          <Navigation className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {pinnedCityNames.map((name) => {
          const city = citiesByName[name];
          if (!city) return null;

          return (
            <DropdownMenuCheckboxItem
              key={name}
              checked={
                currentWeather?.location?.lat === city.lat &&
                currentWeather?.location?.lon === city.lon
              }
              onCheckedChange={() => handleFlyTo(name, city.lat, city.lon)}
            >
              {name}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
