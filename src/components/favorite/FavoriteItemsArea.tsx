import { getUpcomingHourlyPredictions } from "@/utils/weatherHelpers";
import AppBarChart from "../charts/AppBarChart";
import { useAppSelector } from "@/hooks/useRedux";
import AppAreaChart from "../charts/AppAreaChart";
import { Text } from "../ui/text";

function FavoriteItemsArea() {
  const { currentWeather, temperatureUnit } = useAppSelector(
    (state) => state.weather
  );

  if (!currentWeather)
    return (
      <div className="flex gap-x-2 w-full justify-center items-center h-[50vh] border border-separate rounded-3xl p-4">
        <Text size="sm" className="italic" color={"muted"}>
          No weather data available
        </Text>
      </div>
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
