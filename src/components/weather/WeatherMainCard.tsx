import { useAppSelector } from "@/hooks/useRedux";
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

function WeatherMainCard() {
  const { currentWeather, temperatureUnit } = useAppSelector(
    (state) => state.weather
  );

  const { current, location } = currentWeather!;
  const temp = getTemperature(current.temp_c, current.temp_f, temperatureUnit);
  const feelsLike = getTemperature(
    current.feelslike_c,
    current.feelslike_f,
    temperatureUnit
  );
  const unit = getTemperatureUnit(temperatureUnit);
  const uvLevel = getUVIndexLevel(current.uv);

  return (
    <div className="flex flex-col h-52 p-4 bg-accent aspect-square rounded-3xl">
      {/* day name and time */}
      <div className="flex justify-between w-full">
        <Text size={"sm"} weight={"normal"}>
          {getDayName(location.localtime.split(" ")[0])}
        </Text>
        <Text size={"sm"} weight={"normal"}>
          {new Date(location.localtime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </div>

      <Separator className="mt-1 mb-3" />

      <div className="flex justify-between h-full">
        <div className="flex flex-col items-start justify-between">
          <Text size={"5xl"} weight={"light"}>
            {Math.round(temp)}
            {unit}
          </Text>

          {/* Feels like */}
          <div className="flex items-center gap-1">
            <Icon size={"sm"} color={"muted"}>
              <ThermometerSun />
            </Icon>
            <Text size={"xs"} weight={"light"} color={"muted"}>
              Feels like: {Math.round(feelsLike)}
              {unit}
            </Text>
          </div>

          {/* humidity */}
          <div className="flex items-center gap-1">
            <Icon size={"sm"} color={"muted"}>
              <Droplets />
            </Icon>
            <Text size={"xs"} weight={"light"} color={"muted"}>
              Humidity: {current.humidity}%
            </Text>
          </div>

          {/* wind speed */}
          <div className="flex items-center gap-1">
            <Icon size={"sm"} color={"muted"}>
              <Wind />
            </Icon>
            <Text size={"xs"} weight={"light"} color={"muted"}>
              Wind:{" "}
              {getWindSpeed(
                current.wind_kph,
                current.wind_mph,
                temperatureUnit
              )}
            </Text>
          </div>

          {/* UV Index */}
          <div className="flex items-center justify-center gap-1">
            <div className="flex items-center gap-1">
              <Icon size={"sm"} className={uvLevel.color}>
                <Sun />
              </Icon>
              <Text
                size={"xs"}
                weight={"light"}
                className="text-muted-foreground"
              >
                UV Index: {current.uv}
              </Text>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <img
            src={getWeatherIconUrl(current.condition.icon)}
            alt={current.condition.text}
            className="w-16 h-16"
          />

          {/* suggest more data to render here line by line */}
          <div className="flex items-center gap-1">
            <Icon size={"sm"} color={"muted"}>
              <Cloud />
            </Icon>
            <Text
              size={"xs"}
              weight={"light"}
              className="text-muted-foreground"
            >
              {current.cloud}%
            </Text>
          </div>

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
                ? `${current.pressure_mb} mb`
                : `${current.pressure_in} in`}
            </Text>
          </div>

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
                ? `${current.vis_km} km`
                : `${current.vis_miles} mi`}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherMainCard;
