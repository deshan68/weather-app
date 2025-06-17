import { Map, Marker, type MapRef } from "@vis.gl/react-maplibre";
import { memo, useRef } from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { useAppSelector } from "@/hooks/useRedux";
import "maplibre-gl/dist/maplibre-gl.css";
import { Text } from "../ui/text";
import { DEFAULT_COORDINATE } from "@/lib/constants";
import PinnedCityDropdown from "./PinnedCityDropdown";
import { usePinnedCityIcons } from "@/hooks/usePinnedCityIcons";

const MapArea = () => {
  const { theme } = useTheme();
  const mapRef = useRef<MapRef>(null);
  const cityIcons = usePinnedCityIcons();

  const { citiesByName, pinnedCityNames } = useAppSelector(
    (state) => state.cityPreferences
  );

  const mapStyle =
    theme === "dark"
      ? "/styles/dark.json"
      : "https://tiles.openfreemap.org/styles/liberty";

  return (
    <div className="flex flex-col gap-1 h-full w-full mt-2 md:mt-0">
      <div className="flex items-center gap-2">
        <Text size="sm" weight="normal">
          Global Map
        </Text>
      </div>

      <Map
        ref={mapRef}
        initialViewState={{
          latitude: DEFAULT_COORDINATE[0],
          longitude: DEFAULT_COORDINATE[1],
          zoom: 10,
        }}
        mapStyle={mapStyle}
        style={{ width: "100%", height: "50vh", borderRadius: "1.5rem" }}
        attributionControl={false}
      >
        {pinnedCityNames.map((name) => {
          const city = citiesByName[name];
          const icon = cityIcons[name];

          if (!city || !icon) return null;

          return (
            <Marker
              key={name}
              latitude={city.lat}
              longitude={city.lon}
              anchor="top"
            >
              <div className="flex p-1 items-center justify-center bg-background rounded-full border border-sidebar-ring cursor-pointer">
                <img src={icon} alt={city.name} className="w-5 h-5" />
              </div>
            </Marker>
          );
        })}

        <div className="absolute top-2 left-2 z-10">
          <PinnedCityDropdown mapRef={mapRef} />
        </div>
      </Map>
    </div>
  );
};

export default memo(MapArea);
