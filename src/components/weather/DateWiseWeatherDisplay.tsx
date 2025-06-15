import { useCallback, useEffect, useState } from "react";
import { format, addDays, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { Text } from "../ui/text";
import { useAppSelector } from "@/hooks/useRedux";
import AppAreaChart from "../charts/AppAreaChart";
import AppBarChart from "../charts/AppBarChart";
import { DAYS_TO_SHOW } from "@/lib/constants";
import type { HourlyWeatherData } from "@/types";
import WeatherMainCard, { type WeatherDataProps } from "./WeatherMainCard";
import { Separator } from "../ui/separator";

function DateWiseWeatherDisplay() {
  const { currentWeather, temperatureUnit, error } = useAppSelector(
    (state) => state.weather
  );

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [hourlyData, setHourlyData] = useState<HourlyWeatherData[]>([]);
  const [selectedDayWeather, setSelectedDayWeather] =
    useState<WeatherDataProps | null>(null);

  const forecastDays = currentWeather?.forecast?.forecastday || [];

  const dates = Array.from({ length: DAYS_TO_SHOW }, (_, i) =>
    addDays(today, i)
  );

  const extractHourlyData = useCallback((date: Date) => {
    const dayData = forecastDays.find(
      (day) =>
        format(new Date(day.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    if (!dayData) return [];
    return dayData.hour.map((hour) => ({
      time: format(new Date(hour.time), "HH:mm"),
      temp: temperatureUnit === "celsius" ? hour.temp_c : hour.temp_f,
      windSpeed: temperatureUnit === "celsius" ? hour.wind_kph : hour.wind_mph,
      humidity: hour.humidity,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extractDayWeatherData = useCallback(
    (date: Date): WeatherDataProps | null => {
      if (!currentWeather) return null;

      if (isToday(date)) {
        return {
          ...currentWeather.current,
          localtime: currentWeather.location.localtime,
        };
      }

      const selectedDay = forecastDays.find(
        (day) =>
          format(new Date(day.date), "yyyy-MM-dd") ===
          format(date, "yyyy-MM-dd")
      );

      if (!selectedDay) return null;

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
      } = selectedDay.day;

      return {
        localtime: `${selectedDay.date} 12:00`, // Midday
        temp_c: avgtemp_c,
        temp_f: avgtemp_f,
        feelslike_c: avgtemp_c,
        feelslike_f: avgtemp_f,
        humidity: avghumidity,
        wind_kph: maxwind_kph,
        wind_mph: maxwind_mph,
        uv: uv,
        cloud: selectedDay.day.daily_chance_of_rain,
        vis_km: avgvis_km,
        vis_miles: avgvis_miles,
        condition: condition,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setHourlyData(extractHourlyData(date));
    setSelectedDayWeather(extractDayWeatherData(date));
  };

  useEffect(() => {
    setHourlyData(extractHourlyData(today));
    setSelectedDayWeather(extractDayWeatherData(today));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentWeather,
    temperatureUnit,
    extractHourlyData,
    extractDayWeatherData,
  ]);

  return (
    <div className="flex flex-col overflow-y-auto p-2">
      {/* Date Picker */}
      <div className="flex gap-2 pt-4 pb-2 justify-between px-2">
        {dates.map((date) => {
          const isSelected =
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              className="flex flex-col items-center justify-center gap-y-1"
            >
              <Text size="xs" color={isSelected ? "primary" : "muted"}>
                {format(date, "EEEEE")}
              </Text>
              <Text
                size="xs"
                color={isSelected ? "primary" : "muted"}
                className={cn(
                  "rounded-full w-6 h-6 flex items-center justify-center",
                  isSelected && "bg-primary text-primary-foreground"
                )}
              >
                {format(date, "d")}
              </Text>
            </button>
          );
        })}
      </div>

      <Text size="xs" className="text-center">
        {format(selectedDate, "EEEE, d MMMM yyyy")}
      </Text>

      <Separator className="mt-4" />

      {!currentWeather && (
        <div className="flex w-full justify-center items-center h-[50vh] border border-separate rounded-3xl mt-10">
          <Text size="sm" className="italic" color={"muted"}>
            {error || "No data available"}
          </Text>
        </div>
      )}

      {hourlyData.length > 0 && selectedDayWeather && (
        <div className="flex flex-col gap-4 py-4 mt-2">
          <WeatherMainCard
            weatherData={selectedDayWeather}
            temperatureUnit={temperatureUnit}
          />
          <AppAreaChart
            data={hourlyData}
            keyOfXAxis="time"
            keyOfYAxis="temp"
            label="Temperature"
            title={`Temperature Progression ${
              temperatureUnit === "celsius" ? "°C" : "°F"
            }`}
          />
          <AppBarChart
            data={hourlyData}
            keyOfXAxis="time"
            keyOfYAxis="windSpeed"
            label="Wind Speed"
            title={`Wind Speed Progression ${
              temperatureUnit === "celsius" ? "kph" : "mph"
            }`}
          />
          <AppAreaChart
            data={hourlyData}
            keyOfXAxis="time"
            keyOfYAxis="humidity"
            label="Humidity"
            title="Humidity Progression (%)"
          />
        </div>
      )}
    </div>
  );
}

export default DateWiseWeatherDisplay;
