import { Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/hooks/useRedux";
import { useEffect, useRef, useState } from "react";
import { type MapRef } from "@vis.gl/react-maplibre";

type PinnedCityDropdownProps = {
  mapRef: React.RefObject<MapRef | null>;
};

export default function PinnedCityDropdown({
  mapRef,
}: PinnedCityDropdownProps) {
  const { pinnedCityNames, citiesByName } = useAppSelector(
    (state) => state.cityPreferences
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (pinnedCityNames.length > 0 && !selectedCity) {
      const firstName = pinnedCityNames[0];
      const firstCity = citiesByName[firstName];
      if (firstCity) {
        setSelectedCity(firstCity.name);
        mapRef?.current?.flyTo({
          center: [firstCity.lon, firstCity.lat],
          zoom: 10,
          duration: 1000,
        });
      }
    }
  }, [pinnedCityNames, citiesByName, selectedCity, mapRef]);

  const handleFlyTo = (name: string, lat: number, lon: number) => {
    setSelectedCity(name);

    mapRef?.current?.flyTo({
      center: [lon, lat],
      zoom: 10,
      duration: 1500,
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
              checked={selectedCity === name}
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
