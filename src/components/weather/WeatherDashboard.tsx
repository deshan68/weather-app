import { useEffect } from "react";
import { Text } from "../ui/text";
import { MainWeatherDetailsArea } from "./MainWeatherDetailsArea";
import { useWeatherData } from "@/hooks/useWeatherData";

function WeatherDashboard() {
  const { fetchWeatherByLocation } = useWeatherData();
  useEffect(() => {
    fetchWeatherByLocation("colombo");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col gap-2 md:flex-row">
      <div className="w-full md:w-2/3">
        <MainWeatherDetailsArea />
      </div>

      <div className="flex w-full md:w-1/3 bg-accent">
        <Text size={"sm"}>Chance of rain</Text>
      </div>
    </div>
  );
}

export default WeatherDashboard;
