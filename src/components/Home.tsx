import { useEffect } from "react";
import { MainWeatherDetailsArea } from "./weather/MainWeatherDetailsArea";
import { useWeatherData } from "@/hooks/useWeatherData";
import MapArea from "./map/MapArea";
import { DEFAULT_COORDINATE } from "@/lib/constants";
import WindSpeedProgressionArea from "./weather/WindSpeedProgressionArea";
import TemperatureAndUVArea from "./favorite/FavoriteItemsArea";

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
          <WindSpeedProgressionArea />
        </div>
      </div>

      <div className="flex w-full gap-2 flex-col-reverse md:flex-row mt-2">
        <div className="w-full md:w-2/3">
          <MapArea />
        </div>
        <div className="flex w-full md:w-1/3">
          <TemperatureAndUVArea />
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
