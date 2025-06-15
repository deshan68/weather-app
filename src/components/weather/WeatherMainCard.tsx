import {
  getDayName,
  getTemperature,
  getTemperatureUnit,
  getUVIndexLevel,
  getWeatherIconUrl,
  getWindSpeed,
} from "@/utils/weatherHelpers";
import { Text } from "../ui/text";
import { Separator } from "../ui/separator";
import {
  Cloud,
  Droplets,
  Eye,
  Gauge,
  Sun,
  ThermometerSun,
  Wind,
} from "lucide-react";
import { Icon } from "../ui/icon";
import { Skeleton } from "../ui/skeleton";

export interface WeatherCondition {
  text: string;
  icon: string;
}

export interface WeatherDataProps {
  localtime: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  wind_kph: number;
  wind_mph: number;
  uv: number;
  cloud: number;
  pressure_mb?: number;
  pressure_in?: number;
  vis_km: number;
  vis_miles: number;
  condition: WeatherCondition;
}

export interface WeatherMainCardProps {
  weatherData: WeatherDataProps;
  temperatureUnit: "celsius" | "fahrenheit";
  isLoading: boolean;
}

function WeatherMainCard({
  weatherData,
  temperatureUnit,
  isLoading,
}: WeatherMainCardProps) {
  const temp = getTemperature(
    weatherData.temp_c,
    weatherData.temp_f,
    temperatureUnit
  );
  const feelsLike = getTemperature(
    weatherData.feelslike_c,
    weatherData.feelslike_f,
    temperatureUnit
  );
  const unit = getTemperatureUnit(temperatureUnit);
  const uvLevel = getUVIndexLevel(weatherData.uv);

  if (isLoading) {
    return <Skeleton className="h-52 aspect-square rounded-3xl" />;
  }

  return (
    <div className="flex flex-col h-52 p-4 bg-accent aspect-square rounded-3xl">
      {/* day name and time */}
      <div className="flex justify-between w-full">
        <Text size={"sm"} weight={"normal"}>
          {getDayName(weatherData.localtime.split(" ")[0])}
        </Text>
        {weatherData.pressure_in && weatherData.pressure_mb && (
          <Text size={"sm"} weight={"normal"}>
            {new Date(weatherData.localtime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        )}
      </div>

      <Separator className="mt-1 mb-3" />

      <div className="flex justify-between h-full">
        <div className="flex flex-col items-start justify-between">
          <Text size={"5xl"} weight={"light"}>
            {Math.round(temp)}
            {unit}
          </Text>

          <div className="flex items-center gap-1">
            <Icon size={"sm"} color={"muted"}>
              <ThermometerSun />
            </Icon>
            <Text size={"xs"} weight={"light"} color={"muted"}>
              Feels like: {Math.round(feelsLike)}
              {unit}
            </Text>
          </div>

          <div className="flex items-center gap-1">
            <Icon size={"sm"} color={"muted"}>
              <Droplets />
            </Icon>
            <Text size={"xs"} weight={"light"} color={"muted"}>
              Humidity: {weatherData.humidity}%
            </Text>
          </div>

          <div className="flex items-center gap-1">
            <Icon size={"sm"} color={"muted"}>
              <Wind />
            </Icon>
            <Text size={"xs"} weight={"light"} color={"muted"}>
              Wind:{" "}
              {getWindSpeed(
                weatherData.wind_kph,
                weatherData.wind_mph,
                temperatureUnit
              )}
            </Text>
          </div>

          <div className="flex items-center gap-1">
            <Icon size={"sm"} className={uvLevel.color}>
              <Sun />
            </Icon>
            <Text
              size={"xs"}
              weight={"light"}
              className="text-muted-foreground"
            >
              UV Index: {weatherData.uv}
            </Text>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <img
            src={getWeatherIconUrl(weatherData.condition.icon)}
            alt={weatherData.condition.text}
            className="w-16 h-16 mb-auto"
          />

          <div className="flex items-center gap-1">
            <Icon size={"sm"} color={"muted"}>
              <Cloud />
            </Icon>
            <Text
              size={"xs"}
              weight={"light"}
              className="text-muted-foreground"
            >
              {weatherData.cloud}%
            </Text>
          </div>

          {weatherData.pressure_in && weatherData.pressure_mb && (
            <div className="flex items-center gap-1">
              <Icon size={"sm"} color={"muted"}>
                <Gauge />
              </Icon>
              <Text
                size={"xs"}
                weight={"light"}
                className="text-muted-foreground"
              >
                {temperatureUnit === "celsius"
                  ? `${weatherData.pressure_mb} mb`
                  : `${weatherData.pressure_in} in`}
              </Text>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Icon size={"sm"} color={"muted"}>
              <Eye />
            </Icon>
            <Text
              size={"xs"}
              weight={"light"}
              className="text-muted-foreground"
            >
              {temperatureUnit === "celsius"
                ? `${weatherData.vis_km} km`
                : `${weatherData.vis_miles} mi`}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherMainCard;
