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

export class Predictions {
  private currentWeather: WeatherData | null;

  constructor(currentWeather: WeatherData | null) {
    this.currentWeather = currentWeather;
  }

  private getWeatherForDay(date: Date): ForecastDay["day"] | null {
    if (!this.currentWeather) return null;

    const forecastDays = this.currentWeather.forecast.forecastday;
    const formattedDate = date.toISOString().split("T")[0];

    const dayData = forecastDays.find((day) => day.date === formattedDate)?.day;

    return dayData ?? null;
  }

  private getWeatherForNextDays(numberOfDays: number): ForecastDay[] | null {
    if (!this.currentWeather) return null;

    return this.currentWeather.forecast.forecastday.slice(1, numberOfDays + 1);
  }

  private getWeatherForAllHours(
    date: Date = new Date(),
    numberOfHours: number
  ): ForecastDay["hour"] | null {
    if (!this.currentWeather) return null;

    const forecastDays = this.currentWeather.forecast.forecastday;
    const formattedDate = date.toISOString().split("T")[0];

    const dayData = forecastDays.find((day) => day.date === formattedDate);

    return dayData?.hour.slice(0, numberOfHours) ?? null;
  }

  private getWeatherForNextHours(
    numberOfHours: number,
    stopAtToday: boolean
  ): ForecastDay["hour"] | null {
    if (!this.currentWeather) return null;
    const currentEpoch = Math.floor(Date.now() / 1000);
    const todayForecast = this.currentWeather.forecast.forecastday[0].hour;

    const todayHours = todayForecast
      .filter((hour) => hour.time_epoch >= currentEpoch)
      .slice(0, numberOfHours);

    if (stopAtToday) return todayHours;
    if (todayHours.length >= numberOfHours) return todayHours;

    const tomorrowForecast = this.currentWeather.forecast.forecastday[1].hour;
    const remainingHours = numberOfHours - todayHours.length;

    const tomorrowHours = tomorrowForecast.slice(0, remainingHours);

    return [...todayHours, ...tomorrowHours];
  }

  getWeather() {
    return {
      forDays: () => {
        return {
          tomorrow: (numberOfHours: number = 7) => {
            return this.getWeatherForNextDays(numberOfHours);
          },
          nextDays: (numberOfDays: number = 7) => {
            return this.getWeatherForNextDays(numberOfDays);
          },
          day: (date: Date) => {
            return this.getWeatherForDay(date);
          },
        };
      },
      forHours: () => {
        return {
          today: (numberOfHours: number = 24) => {
            return this.getWeatherForAllHours(new Date(), numberOfHours);
          },
          tomorrow: (numberOfHours: number = 24) => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return this.getWeatherForAllHours(tomorrow, numberOfHours);
          },
          day: (date: Date, numberOfHours: number = 24) => {
            return this.getWeatherForAllHours(date, numberOfHours);
          },
          nextHours: (numberOfHours: number = 8) => {
            return {
              stopAt: (from: "today" | "tomorrow") => {
                if (from === "today") {
                  return this.getWeatherForNextHours(numberOfHours, true);
                }
                return this.getWeatherForNextHours(numberOfHours, false);
              },
            };
          },
        };
      },
    };
  }
}
