import { useEffect } from "react";
import { MainWeatherDetailsArea } from "./weather/MainWeatherDetailsArea";
import { useWeatherData } from "@/hooks/useWeatherData";
import ChanceOfRainArea from "./weather/ChanceOfRainArea";
import MapArea from "./map/MapArea";
import FavoriteItemsArea from "./favorite/FavoriteItemsArea";
import { DEFAULT_COORDINATE } from "@/lib/constants";

function WeatherDashboard() {
  const { fetchWeatherByCoordinates } = useWeatherData();
  useEffect(() => {
    fetchWeatherByCoordinates(DEFAULT_COORDINATE[0], DEFAULT_COORDINATE[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full gap-2 flex-col">
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <div className="w-full md:w-2/3">
          <MainWeatherDetailsArea />
        </div>

        <div className="flex w-full md:w-1/3 mt-2 md:mt-0">
          <ChanceOfRainArea />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 md:flex-row mt-2">
        <div className="w-full md:w-2/3">
          <MapArea />
        </div>
        <div className="flex w-full md:w-1/3">
          <FavoriteItemsArea />
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
