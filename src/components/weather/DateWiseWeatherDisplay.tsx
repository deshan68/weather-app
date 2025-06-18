import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Text } from "../ui/text";
import { useAppSelector } from "@/hooks/useRedux";
import AppAreaChart from "../charts/AppAreaChart";
import AppBarChart from "../charts/AppBarChart";
import type { HourlyWeatherData } from "@/types";
import WeatherMainCard, { type WeatherDataProps } from "./WeatherMainCard";
import { Separator } from "../ui/separator";
import { Predictions } from "@/utils/weatherHelpers";
import HorizontalDatePicker from "./HorizontalDatePicker";

const DateWiseWeatherDisplay = () => {
  const { currentWeather, temperatureUnit, error } = useAppSelector(
    (state) => state.weather
  );

  const today = useMemo(() => new Date(), []);

  const predictions = useMemo(
    () => new Predictions(currentWeather),
    [currentWeather]
  );

  const [selectedDate, setSelectedDate] = useState(today);
  const [hourlyData, setHourlyData] = useState<HourlyWeatherData[]>([]);
  const [selectedDayWeather, setSelectedDayWeather] =
    useState<WeatherDataProps | null>(null);

  const extractHourlyData = useCallback(
    (date: Date): HourlyWeatherData[] => {
      const hours = predictions.getWeather().forHours().day(date) || [];
      return hours.map((hour) => ({
        time: format(new Date(hour.time), "HH:mm"),
        temp: temperatureUnit === "celsius" ? hour.temp_c : hour.temp_f,
        windSpeed:
          temperatureUnit === "celsius" ? hour.wind_kph : hour.wind_mph,
        humidity: hour.humidity,
      }));
    },
    [predictions, temperatureUnit]
  );

  const extractDayWeatherData = useCallback(
    (date: Date): WeatherDataProps | null => {
      const forecast = predictions.getWeather().forDays().day(date);
      if (!forecast) return null;

      const {
        avgtemp_c,
        avgtemp_f,
        avghumidity,
        maxwind_kph,
        maxwind_mph,
        avgvis_km,
        avgvis_miles,
        condition,
        uv,
        daily_chance_of_rain,
      } = forecast;

      return {
        localEEEE: format(date, "EEEE"),
        temp_c: avgtemp_c,
        temp_f: avgtemp_f,
        feelslike_c: avgtemp_c,
        feelslike_f: avgtemp_f,
        humidity: avghumidity,
        wind_kph: maxwind_kph,
        wind_mph: maxwind_mph,
        uv,
        cloud: daily_chance_of_rain,
        vis_km: avgvis_km,
        vis_miles: avgvis_miles,
        condition,
      };
    },
    [predictions]
  );

  const handleDateChange = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      setHourlyData(extractHourlyData(date));
      setSelectedDayWeather(extractDayWeatherData(date));
    },
    [extractHourlyData, extractDayWeatherData]
  );

  useEffect(() => {
    handleDateChange(today);
  }, [handleDateChange, today]);

  return (
    <div className="flex flex-col overflow-y-auto px-2 pb-2">
      <HorizontalDatePicker
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
      <Text size="xs" className="text-center">
        {format(selectedDate, "EEEE, d MMMM yyyy")}
      </Text>

      <Separator className="mt-4" />

      {!currentWeather && (
        <div className="flex w-full justify-center items-center h-[50vh] border rounded-3xl mt-10">
          <Text size="sm" className="italic" color="muted">
            {error || "No data available"}
          </Text>
        </div>
      )}

      {hourlyData.length > 0 && selectedDayWeather && (
        <div className="flex flex-col gap-4 py-4 mt-2">
          <WeatherMainCard
            weatherData={selectedDayWeather}
            temperatureUnit={temperatureUnit}
            isLoading={!currentWeather}
          />
          <AppAreaChart
            data={hourlyData}
            showAllData
            keyOfXAxis="time"
            keyOfYAxis="temp"
            label="Temperature"
            title={`Temperature Progression (${
              temperatureUnit === "celsius" ? "°C" : "°F"
            })`}
          />
          <AppBarChart
            data={hourlyData}
            showAllData
            keyOfXAxis="time"
            keyOfYAxis="windSpeed"
            label="Wind Speed"
            title={`Wind Speed Progression (${
              temperatureUnit === "celsius" ? "kph" : "mph"
            })`}
          />
          <AppAreaChart
            data={hourlyData}
            showAllData
            keyOfXAxis="time"
            keyOfYAxis="humidity"
            label="Humidity"
            title="Humidity Progression (%)"
          />
        </div>
      )}
    </div>
  );
};

export default DateWiseWeatherDisplay;
