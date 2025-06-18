import { useAppSelector } from "@/hooks/useRedux";
import AppAreaChart from "../charts/AppAreaChart";
import AppBarChart from "../charts/AppBarChart";
import { Predictions } from "@/utils/weatherHelpers";

const TemperatureAndUVArea = () => {
  const { currentWeather, temperatureUnit } = useAppSelector(
    (state) => state.weather
  );

  const predictions = new Predictions(currentWeather);
  const upcomingHours = predictions.getWeather().forHours().nextHours(8);

  const chartData =
    upcomingHours?.map((hour) => ({
      time: new Date(hour.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp_c: hour.temp_c,
      temp_f: hour.temp_f,
      wind_kph: hour.wind_kph,
      wind_mph: hour.wind_mph,
    })) ?? [];

  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <AppAreaChart
        data={chartData}
        keyOfXAxis="time"
        keyOfYAxis={temperatureUnit === "celsius" ? "temp_c" : "temp_f"}
        label="Temperature"
        title={`Temperature Progression ${
          temperatureUnit === "celsius" ? "°C" : "°F"
        }`}
      />
      <AppBarChart
        data={chartData}
        keyOfXAxis="time"
        keyOfYAxis={temperatureUnit === "celsius" ? "wind_kph" : "wind_mph"}
        label="Wind Speed"
        title={`Wind Speed Progression ${
          temperatureUnit === "celsius" ? "kph" : "mph"
        }`}
      />
    </div>
  );
};

export default TemperatureAndUVArea;
