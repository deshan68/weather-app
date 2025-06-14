import { useAppSelector } from "@/hooks/useRedux";
import { getUpcomingHourlyPredictions } from "@/utils/weatherHelpers";
import AppBarChart from "../charts/AppBarChart";

function ChanceOfRainArea() {
  const { currentWeather } = useAppSelector((state) => state.weather);

  if (!currentWeather || !currentWeather.forecast) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-sm">No weather data available</span>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
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

export default ChanceOfRainArea;
