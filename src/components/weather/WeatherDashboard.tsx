import { useEffect } from "react";
import { MainWeatherDetailsArea } from "./MainWeatherDetailsArea";
import { useWeatherData } from "@/hooks/useWeatherData";
import ChanceOfRainArea from "./ChanceOfRainArea";

function WeatherDashboard() {
  const { fetchWeatherByLocation } = useWeatherData();
  useEffect(() => {
    fetchWeatherByLocation("jaffna");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col gap-2 md:flex-row">
      <div className="w-full md:w-2/3">
        <MainWeatherDetailsArea />
      </div>

      <div className="flex w-full md:w-1/3">
        <ChanceOfRainArea />
      </div>
    </div>
  );
}

export default WeatherDashboard;
