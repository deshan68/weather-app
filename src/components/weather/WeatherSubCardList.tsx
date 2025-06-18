import { useMemo } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import WeatherSubCard, { type WeatherSubCardProps } from "./WeatherSubCard";
import { Text } from "../ui/text";
import { FrownIcon } from "lucide-react";
import { Icon } from "../ui/icon";
import { getSpeed, Predictions } from "@/utils/weatherHelpers";

interface WeatherSubCardListProps {
  type: "today" | "tomorrow" | "sevenDays";
}

const formatHour = (timeStr: string) => {
  const hour = parseInt(timeStr.split(" ")[1].slice(0, 2), 10);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}${period}`;
};

const WeatherSubCardList = ({ type }: WeatherSubCardListProps) => {
  const { currentWeather, temperatureUnit } = useAppSelector(
    (state) => state.weather
  );

  const predictions = useMemo(
    () => new Predictions(currentWeather),
    [currentWeather]
  );

  const data: WeatherSubCardProps[] = useMemo(() => {
    if (type === "sevenDays") {
      const forecastNextDay =
        predictions.getWeather().forDays().nextDays(7) || [];

      return forecastNextDay.map((day) => ({
        time: day.date,
        icon: day.day.condition.icon,
        iconText: day.day.condition.text,
        tempc: day.day.avgtemp_c,
        tempf: day.day.avgtemp_f,
        humidity: day.day.avghumidity,
        dayOrTime: day.date,
        type: "day",
        wind: getSpeed(
          day.day.maxwind_kph,
          day.day.maxwind_mph,
          temperatureUnit
        ),
      }));
    }

    if (type === "tomorrow") {
      const tomorrowForecast =
        predictions.getWeather().forHours().tomorrow(7) || [];

      return tomorrowForecast.map((hour) => ({
        time: formatHour(hour.time),
        icon: hour.condition.icon,
        iconText: hour.condition.text,
        tempc: hour.temp_c,
        tempf: hour.temp_f,
        humidity: hour.humidity,
        dayOrTime: hour.time,
        wind: getSpeed(hour.wind_kph, hour.wind_mph, temperatureUnit),
      }));
    }

    const forecastNextHour =
      predictions.getWeather().forHours().nextHours(7) || [];
    return forecastNextHour.map((hour) => ({
      time: formatHour(hour.time),
      icon: hour.condition.icon,
      iconText: hour.condition.text,
      tempc: hour.temp_c,
      tempf: hour.temp_f,
      humidity: hour.humidity,
      dayOrTime: hour.time,
      wind: getSpeed(hour.wind_kph, hour.wind_mph, temperatureUnit),
    }));
  }, [type, temperatureUnit, predictions]);

  return (
    <div className="flex w-full gap-x-2 overflow-x-scroll">
      {data.length === 0 ? (
        <div className="hidden md:flex items-center justify-center w-full border rounded-3xl">
          <Icon asChild size="xl" rounded="full" className="p-2.5">
            <FrownIcon className="text-primary" />
          </Icon>
          <Text size="xs" color="primary" weight="light">
            You've reached the end of the available forecast data for today.
          </Text>
        </div>
      ) : (
        data.map((props, index) => <WeatherSubCard key={index} {...props} />)
      )}
    </div>
  );
};

export default WeatherSubCardList;
