import { Map, Marker } from "@vis.gl/react-maplibre";
import { memo } from "react";
import { useTheme } from "../theme-provider";
import { useAppSelector } from "@/hooks/useRedux";
import "maplibre-gl/dist/maplibre-gl.css";

function MapArea() {
  const { theme } = useTheme();
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
    <Map
      initialViewState={{ latitude: 6.9271, longitude: 79.8612, zoom: 10 }}
      mapStyle={mapStyle}
      style={{ width: "100%", height: "50vh", borderRadius: "1.5rem" }}
    >
      <Marker longitude={79.8612} latitude={6.9271} anchor="top">
        <div className="flex p-1 items-center justify-center bg-background rounded-full border border-sidebar-ring">
          <img
            src={`https:${weatherDataList[0].day.condition.icon}`}
            alt={weatherDataList[0].day.condition.text}
            className="w-6 h-6"
          />
        </div>
      </Marker>
    </Map>
  );
}

export default memo(MapArea);
