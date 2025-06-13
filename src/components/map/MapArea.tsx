import { Map, Marker } from "@vis.gl/react-maplibre";
import { memo } from "react";
import { useTheme } from "../theme-provider";
import { useAppSelector } from "@/hooks/useRedux";
import "maplibre-gl/dist/maplibre-gl.css";
import { Text } from "../ui/text";

function MapArea() {
  const { theme } = useTheme();
  const { pinnedCities } = useAppSelector((state) => state.cityPreferences);
  const weatherDataList = useAppSelector(
    (state) => state.weather.currentWeather?.forecast?.forecastday
  );

  const mapStyle =
    theme === "dark"
      ? "/styles/dark.json"
      : "https://tiles.openfreemap.org/styles/liberty";

  if (!weatherDataList || weatherDataList.length === 0) {
    return <div className="text-center">No weather data available</div>;
  }

  return (
    <div className="flex flex-col gap-1 h-full w-full">
      <Text size={"sm"} weight={"normal"}>
        Global Map
      </Text>
      <Map
        initialViewState={{ latitude: 6.9271, longitude: 79.8612, zoom: 10 }}
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
            <div className="flex p-1 items-center justify-center bg-background rounded-full border border-sidebar-ring">
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
