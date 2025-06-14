import { getUpcomingHourlyPredictions } from "@/utils/weatherHelpers";
import AppBarChart from "../charts/AppBarChart";
import { useAppSelector } from "@/hooks/useRedux";
import AppAreaChart from "../charts/AppAreaChart";

function FavoriteItemsArea() {
  const { currentWeather, temperatureUnit } = useAppSelector(
    (state) => state.weather
  );

  if (!currentWeather || !currentWeather.forecast) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-sm">No weather data available</span>
      </div>
    );
  }

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

export default FavoriteItemsArea;
