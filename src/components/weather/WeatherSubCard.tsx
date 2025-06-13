import {
  formatTime,
  getDayName,
  getWeatherIconUrl,
} from "@/utils/weatherHelpers";
import { Text } from "../ui/text";
import { Separator } from "../ui/separator";
import { Droplets } from "lucide-react";
import { Icon } from "../ui/icon";

type WeatherSubCardProps = {
  dayOrTime: string;
  type?: "day" | "time";
  icon: string;
  iconText: string;
  temp: number;
  humidity: number;
  wind: string;
};

function WeatherSubCard({
  dayOrTime,
  type = "time",
  icon,
  iconText,
  temp,
  humidity,
  wind,
}: WeatherSubCardProps) {
  return (
    <div className="flex flex-col h-52 min-w-20 max-w-28 w-full rounded-3xl bg-accent py-4 px-1">
      <div className="flex items-center justify-center w-full">
        <Text size={"sm"} weight={"normal"}>
          {type === "day"
            ? getDayName(dayOrTime)
            : formatTime(dayOrTime, false)}
        </Text>
      </div>

      <Separator className="mt-1 mb-3" />
      <div className="flex flex-col items-center justify-between h-full">
        <img
          src={getWeatherIconUrl(icon)}
          alt={iconText}
          className="w-12 mb-auto"
        />

        {/* temp */}
        <Text size={"3xl"} weight={"normal"} className="mb-auto">
          {Math.round(temp)}°
        </Text>

        {/* humidity */}
        <div className="flex items-center gap-1">
          <Icon size={"sm"} color={"muted"}>
            <Droplets />
          </Icon>
          <Text size={"xs"} weight={"normal"} className="text-center">
            {humidity}%
          </Text>
        </div>

        {/* wind */}
        <Text size={"xs"} weight={"normal"} className="text-center">
          {wind}
        </Text>
      </div>
    </div>
  );
}

export default WeatherSubCard;
