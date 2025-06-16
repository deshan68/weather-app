import { Map, Marker, type MapRef } from "@vis.gl/react-maplibre";
import { memo, useEffect, useRef } from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { useAppSelector } from "@/hooks/useRedux";
import "maplibre-gl/dist/maplibre-gl.css";
import { Text } from "../ui/text";
import { DEFAULT_COORDINATE } from "@/lib/constants";

function MapArea() {
  const { theme } = useTheme();
  const mapRef = useRef<MapRef>(null);

  const { pinnedCities } = useAppSelector((state) => state.cityPreferences);
  const { currentWeather } = useAppSelector((state) => state.weather);

  const mapStyle =
    theme === "dark"
      ? "/styles/dark.json"
      : "https://tiles.openfreemap.org/styles/liberty";

  useEffect(() => {
    if (currentWeather) {
      flyTo(currentWeather.location.lat, currentWeather.location.lon);
    }
  }, [currentWeather]);

  const flyTo = (lat: number, lon: number) => {
    mapRef.current?.flyTo({
      center: [lon, lat],
      zoom: 10,
      duration: 1500,
    });
  };

  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <Text size="sm" weight="normal">
        Global Map
      </Text>

      {/* 🗺️ Map View */}
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: DEFAULT_COORDINATE[0],
          longitude: DEFAULT_COORDINATE[1],
          zoom: 10,
        }}
        mapStyle={mapStyle}
        style={{ width: "100%", height: "50vh", borderRadius: "1.5rem" }}
      >
        {pinnedCities.map((city, index) => (
          <Marker
            key={index}
            longitude={city.lon}
            latitude={city.lat}
            anchor="top"
          >
            <div className="flex p-1 items-center justify-center bg-background rounded-full border border-sidebar-ring cursor-pointer">
              <img
                src={`https:${city.icon}`}
                alt={city.name}
                className="w-5 h-5"
              />
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}

export default memo(MapArea);
