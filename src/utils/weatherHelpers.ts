import type { HourlyPrediction } from "@/types";
import type {
  ForecastDay,
  TemperatureUnit,
  WeatherData,
} from "@/types/weather";

export const getTemperature = (
  tempC: number,
  tempF: number,
  unit: TemperatureUnit
): number => {
  return unit === "celsius" ? tempC : tempF;
};

export const getTemperatureUnit = (unit: TemperatureUnit): string => {
  return unit === "celsius" ? "°C" : "°F";
};

export const getSpeed = (
  windKph: number,
  windMph: number,
  unit: TemperatureUnit
): string => {
  const speed = unit === "celsius" ? windKph : windMph;
  const unitLabel = unit === "celsius" ? "kmh" : "mph";
  return `${Math.round(speed)} ${unitLabel}`;
};

export const getVisibility = (
  visKm: number,
  visMiles: number,
  unit: TemperatureUnit
): string => {
  const distance = unit === "celsius" ? visKm : visMiles;
  const unitLabel = unit === "celsius" ? "km" : "miles";
  return `${distance} ${unitLabel}`;
};

export const getPressure = (
  pressureMb: number,
  pressureIn: number,
  unit: TemperatureUnit
): string => {
  const pressure = unit === "celsius" ? pressureMb : pressureIn;
  const unitLabel = unit === "celsius" ? "mb" : "in";
  return `${pressure} ${unitLabel}`;
};

export const getWeatherIconUrl = (iconPath: string): string => {
  return `https:${iconPath}`;
};

export const formatTime = (
  timeString: string,
  showMinutes: boolean = true
): string => {
  const date = new Date(timeString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: showMinutes ? "2-digit" : undefined,
    hour12: true,
  });
};

export const getUVIndexLevel = (
  uv: number
): { level: string; color: string } => {
  if (uv <= 2) return { level: "Low", color: "text-green-500" };
  if (uv <= 5) return { level: "Moderate", color: "text-yellow-500" };
  if (uv <= 7) return { level: "High", color: "text-orange-500" };
  if (uv <= 10) return { level: "Very High", color: "text-red-500" };
  return { level: "Extreme", color: "text-purple-500" };
};

export const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export function getUpcomingHourlyPredictions<
  K extends keyof ForecastDay["hour"][0]
>(currentWeather: WeatherData | null, variable: K): Array<HourlyPrediction<K>> {
  const currentEpoch = Math.floor(Date.now() / 1000);
  if (!currentWeather || !currentWeather.forecast) return [];
  const todayForecast = currentWeather.forecast.forecastday[0].hour;

  const todayHours = todayForecast
    .filter((hour) => hour.time_epoch >= currentEpoch)
    .map((hour) => ({
      time: `${hour.time.split(" ")[1].slice(0, 2)}AM`,
      [variable]: hour[variable],
    })) as HourlyPrediction<K>[];

  if (todayHours.length >= 8) return todayHours;

  const tomorrowForecast = currentWeather.forecast.forecastday[1].hour;
  const remainingHours = 8 - todayHours.length;

  const tomorrowHours = tomorrowForecast
    .slice(0, remainingHours)
    .map((hour) => ({
      time: `${hour.time.split(" ")[1].slice(0, 2)}AM`,
      [variable]: hour[variable],
    })) as HourlyPrediction<K>[];

  return [...todayHours, ...tomorrowHours];
}
