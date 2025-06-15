import { useAppSelector } from "@/hooks/useRedux";
import { getUpcomingHourlyPredictions } from "@/utils/weatherHelpers";
import AppBarChart from "../charts/AppBarChart";
import { Text } from "../ui/text";

function ChanceOfRainArea() {
  const { currentWeather } = useAppSelector((state) => state.weather);

  if (!currentWeather || !currentWeather.forecast) {
    return (
      <div className="flex items-center justify-center h-full min-h-52 w-full border rounded-3xl">
        <Text size="sm" className="italic" color={"muted"}>
          No weather data available
        </Text>
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
