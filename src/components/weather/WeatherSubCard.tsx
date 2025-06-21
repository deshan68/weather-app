import {
  formatTime,
  getDayName,
  getTemperature,
  getTemperatureUnit,
  getWeatherIconUrl,
} from "@/utils/weatherHelpers";
import { Text } from "../ui/text";
import { Separator } from "../ui/separator";
import { Droplets } from "lucide-react";
import { Icon } from "../ui/icon";
import { useAppSelector } from "@/hooks/useRedux";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export interface WeatherSubCardProps {
  dayOrTime: string;
  type?: "day" | "time";
  icon: string;
  iconText: string;
  tempf: number;
  tempc: number;
  humidity: number;
  wind: string;
}

const WeatherSubCard = ({
  dayOrTime,
  type = "time",
  icon,
  iconText,
  tempc,
  tempf,
  humidity,
  wind,
}: WeatherSubCardProps) => {
  const { temperatureUnit } = useAppSelector((state) => state.weather);
  const unit = getTemperatureUnit(temperatureUnit);
  const temp = getTemperature(tempc, tempf, temperatureUnit);

  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "flex flex-col h-52 min-w-20 max-w-28 w-full rounded-3xl bg-accent py-4 px-1",
        theme === "weather" && "blur-card"
      )}
    >
      <div className="flex items-center justify-center w-full">
        <Text size={"xs"} weight={"normal"}>
          {type === "day"
            ? getDayName(dayOrTime)
            : formatTime(dayOrTime, false)}
        </Text>
      </div>

      <Separator
        className={cn("mt-1 mb-3", theme === "weather" && "bg-white")}
      />
      <div className="flex flex-col items-center justify-between h-full">
        <img
          src={getWeatherIconUrl(icon)}
          alt={iconText}
          className="w-12 mb-auto"
        />

        {/* temp */}
        <Text size={"2xl"} weight={"normal"} className="mb-auto">
          {Math.round(temp)}
          {unit}
        </Text>

        {/* humidity */}
        <div className="flex items-center gap-1">
          <Icon
            size={"sm"}
            color={"muted"}
            className={cn(theme === "weather" && "text-white")}
          >
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
};

export default WeatherSubCard;
