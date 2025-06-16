import { Map, Marker, type MapRef } from "@vis.gl/react-maplibre";
import { memo, useRef } from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { useAppSelector } from "@/hooks/useRedux";
import "maplibre-gl/dist/maplibre-gl.css";
import { Text } from "../ui/text";
import { DEFAULT_COORDINATE } from "@/lib/constants";

function MapArea() {
  const { theme } = useTheme();
  const { pinnedCities } = useAppSelector((state) => state.cityPreferences);
  const mapRef = useRef<MapRef>(null); // useRef to hold map instance

  const mapStyle =
    theme === "dark"
      ? "/styles/dark.json"
      : "https://tiles.openfreemap.org/styles/liberty";

  const handleFlyTo = (lat: number, lon: number) => {
    mapRef.current?.flyTo({
      center: [lon, lat],
      zoom: 10,
      duration: 1500,
    });
  };

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <Text size="sm" weight="normal">
        Global Map
      </Text>

      {/* 🔘 External Fly-to Buttons */}
      <div className="flex flex-wrap gap-2">
        {pinnedCities.map((city, index) => (
          <button
            key={index}
            onClick={() => handleFlyTo(city.lat, city.lon)}
            className="px-3 py-1 text-sm rounded-full bg-muted text-foreground hover:bg-muted/80 border"
          >
            {city.name}
          </button>
        ))}
      </div>

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
