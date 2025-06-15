import { getUpcomingHourlyPredictions } from "@/utils/weatherHelpers";
import AppBarChart from "../charts/AppBarChart";
import { useAppSelector } from "@/hooks/useRedux";
import AppAreaChart from "../charts/AppAreaChart";

function TemperatureAndUVArea() {
  const { currentWeather, temperatureUnit } = useAppSelector(
    (state) => state.weather
  );

  return (
    <div className="flex flex-col gap-1 h-full w-full">
      <AppAreaChart
        data={getUpcomingHourlyPredictions(
          currentWeather,
          temperatureUnit === "celsius" ? "temp_c" : "temp_f"
        )}
        keyOfXAxis="time"
        keyOfYAxis={temperatureUnit === "celsius" ? "temp_c" : "temp_f"}
        label="Temperature"
        title={`Temperature Progression ${
          temperatureUnit === "celsius" ? "°C" : "°F"
        }`}
      />
      <AppBarChart
        data={getUpcomingHourlyPredictions(currentWeather, "uv")}
        keyOfXAxis="time"
        keyOfYAxis="uv"
        label="UV Index"
        title="UV Index Progression"
      />
    </div>
  );
}

export default TemperatureAndUVArea;
