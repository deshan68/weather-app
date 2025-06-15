import { useAppSelector } from "@/hooks/useRedux";
import { getUpcomingHourlyPredictions } from "@/utils/weatherHelpers";
import AppBarChart from "../charts/AppBarChart";

function ChanceOfRainArea() {
  const { currentWeather } = useAppSelector((state) => state.weather);

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
