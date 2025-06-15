import { useAppSelector } from "@/hooks/useRedux";
import { getUpcomingHourlyPredictions } from "@/utils/weatherHelpers";
import AppAreaChart from "../charts/AppAreaChart";

function WindSpeedProgressionArea() {
  const { currentWeather, temperatureUnit } = useAppSelector(
    (state) => state.weather
  );

  return (
    <div className="h-full w-full">
      <AppAreaChart
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

export default WindSpeedProgressionArea;
