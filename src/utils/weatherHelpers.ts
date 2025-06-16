import type { HourlyPrediction } from "@/types";
import type {
  ForecastDay,
  TemperatureUnit,
  WeatherCondition,
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

export const getWeatherGradient = (
  condition: WeatherCondition,
  isDay: boolean
): string => {
  const conditionCode = condition.code;

  if (isDay) {
    // Sunny/Clear
    if (conditionCode === 1000) return "from-blue-400 via-blue-500 to-blue-600";
    // Partly cloudy
    if ([1003, 1006].includes(conditionCode))
      return "from-blue-300 via-gray-400 to-gray-500";
    // Cloudy/Overcast
    if ([1009, 1030].includes(conditionCode))
      return "from-gray-400 via-gray-500 to-gray-600";
    // Rain
    if (
      [
        1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246,
      ].includes(conditionCode)
    ) {
      return "from-gray-500 via-gray-600 to-blue-700";
    }
    // Snow
    if (
      [
        1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252,
        1255, 1258, 1261, 1264,
      ].includes(conditionCode)
    ) {
      return "from-gray-200 via-gray-300 to-gray-400";
    }
    // Thunderstorm
    if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
      return "from-gray-700 via-gray-800 to-purple-900";
    }
  } else {
    // Night variations
    if (conditionCode === 1000)
      return "from-indigo-900 via-purple-900 to-black";
    if ([1003, 1006].includes(conditionCode))
      return "from-indigo-800 via-gray-700 to-gray-800";
    if ([1009, 1030].includes(conditionCode))
      return "from-gray-700 via-gray-800 to-gray-900";
    if (
      [
        1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246,
      ].includes(conditionCode)
    ) {
      return "from-gray-800 via-gray-900 to-blue-900";
    }
    if (
      [
        1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252,
        1255, 1258, 1261, 1264,
      ].includes(conditionCode)
    ) {
      return "from-gray-600 via-gray-700 to-gray-800";
    }
    if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
      return "from-gray-900 via-black to-purple-900";
    }
  }

  // Default gradient
  return isDay
    ? "from-blue-400 via-blue-500 to-blue-600"
    : "from-indigo-900 via-purple-900 to-black";
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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
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

export const getAirQualityLevel = (
  aqi: number
): { level: string; color: string } => {
  if (aqi <= 50) return { level: "Good", color: "text-green-500" };
  if (aqi <= 100) return { level: "Moderate", color: "text-yellow-500" };
  if (aqi <= 150)
    return {
      level: "Unhealthy for Sensitive Groups",
      color: "text-orange-500",
    };
  if (aqi <= 200) return { level: "Unhealthy", color: "text-red-500" };
  if (aqi <= 300) return { level: "Very Unhealthy", color: "text-purple-500" };
  return { level: "Hazardous", color: "text-red-800" };
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
