import { getUpcomingHourlyPredictions } from "@/utils/weatherHelpers";
import { useAppSelector } from "@/hooks/useRedux";
import AppAreaChart from "../charts/AppAreaChart";
import AppBarChart from "../charts/AppBarChart";

function TemperatureAndUVArea() {
  const { currentWeather, temperatureUnit } = useAppSelector(
    (state) => state.weather
  );

  return (
    <div className="flex flex-col gap-2 h-full w-full">
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
        data={getUpcomingHourlyPredictions(
          currentWeather,
          temperatureUnit === "celsius" ? "wind_kph" : "wind_mph"
        )}
        keyOfXAxis="time"
        keyOfYAxis={temperatureUnit === "celsius" ? "wind_kph" : "wind_mph"}
        label="Wind Speed"
        title={`Wind Speed Progression ${
          temperatureUnit === "celsius" ? "kph" : "mph"
        }`}
      />
    </div>
  );
}

export default TemperatureAndUVArea;
