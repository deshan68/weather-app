import type { ForecastDay } from "./weather";

export type HourlyPrediction<K extends keyof ForecastDay["hour"][0]> = {
  time: string;
} & {
  [key in K]: ForecastDay["hour"][0][key];
};

export interface HourlyWeatherData {
  time: string;
  temp: number;
  windSpeed: number;
  humidity: number;
}
