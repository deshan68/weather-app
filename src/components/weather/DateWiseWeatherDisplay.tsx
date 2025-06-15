import { useCallback, useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Text } from "../ui/text";
import { useAppSelector } from "@/hooks/useRedux";
import AppAreaChart from "../charts/AppAreaChart";
import AppBarChart from "../charts/AppBarChart";
import { DAYS_TO_SHOW } from "@/lib/constants";
import type { HourlyWeatherData } from "@/types";

function DateWiseWeatherDisplay() {
  const { currentWeather, temperatureUnit } = useAppSelector(
    (state) => state.weather
  );

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [hourlyData, setHourlyData] = useState<HourlyWeatherData[]>([]);

  const forecastDays = currentWeather?.forecast?.forecastday || [];

  const dates = Array.from({ length: DAYS_TO_SHOW }, (_, i) =>
    addDays(today, i)
  );

  const extractHourlyData = useCallback(
    (date: Date) => {
      const dayData = forecastDays.find(
        (day) =>
          format(new Date(day.date), "yyyy-MM-dd") ===
          format(date, "yyyy-MM-dd")
      );

      if (!dayData) return [];

      return dayData.hour.map((hour) => ({
        time: format(new Date(hour.time), "HH:mm"),
        temp: temperatureUnit === "celsius" ? hour.temp_c : hour.temp_f,
        windSpeed:
          temperatureUnit === "celsius" ? hour.wind_kph : hour.wind_mph,
        humidity: hour.humidity,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [temperatureUnit]
  );

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setHourlyData(extractHourlyData(date));
  };

  useEffect(() => {
    setHourlyData(extractHourlyData(today));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeather, temperatureUnit]);

  return (
    <div className="flex flex-col overflow-y-auto p-2">
      <div className="flex gap-2 pt-4 pb-2 justify-between">
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
                {format(date, "EEEEE")} {/* Day: S M T */}
              </Text>
              <Text
                size="xs"
                color={isSelected ? "primary" : "muted"}
                className={cn(
                  "rounded-full w-6 h-6 flex items-center justify-center",
                  isSelected && "bg-primary text-primary-foreground"
                )}
              >
                {format(date, "d")} {/* Day number */}
              </Text>
            </button>
          );
        })}
      </div>

      <Text size="xs" className="text-center">
        {format(selectedDate, "EEEE, d MMMM yyyy")}
      </Text>

      {!currentWeather && (
        <div className="flex w-full justify-center items-center h-[50vh] border border-separate rounded-3xl mt-10">
          <Text size="sm" className="italic" color={"muted"}>
            No weather data available
          </Text>
        </div>
      )}

      {hourlyData.length > 0 && (
        <div className="flex flex-col gap-4 py-4 mt-2">
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
