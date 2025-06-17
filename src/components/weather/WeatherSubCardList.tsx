import { useAppSelector } from "@/hooks/useRedux";
import WeatherSubCard from "./WeatherSubCard";
import { Text } from "../ui/text";
import { FrownIcon } from "lucide-react";
import { Icon } from "../ui/icon";
import { useMemo } from "react";

interface WeatherSubCardListProps {
  type: "today" | "tomorrow" | "sevenDays";
}
const WeatherSubCardList = ({ type }: WeatherSubCardListProps) => {
  const { currentWeather } = useAppSelector((state) => state.weather);
  const forecastDayDate = currentWeather!.forecast.forecastday;

  const forecastData = forecastDayDate[type === "today" ? 0 : 1].hour;

  const getNextHoursWeather = useMemo(() => {
    if (type === "sevenDays")
      return forecastDayDate.slice(1, 8).map((day) => ({
        time: day.date,
        icon: day.day.condition.icon,
        iconText: day.day.condition.text,
        tempc: day.day.avgtemp_c,
        tempf: day.day.avgtemp_f,
        humidity: day.day.avghumidity,
        wind: `${day.day.maxwind_kph} km/h`,
      }));

    const now = new Date();
    const currentHour = type === "today" ? now.getHours() : 0;
    const numberOfCards = type === "today" ? currentHour + 6 : currentHour + 8;

    return forecastData.slice(currentHour + 1, numberOfCards).map((hour) => ({
      time: hour.time,
      icon: hour.condition.icon,
      iconText: hour.condition.text,
      tempc: hour.temp_c,
      tempf: hour.temp_f,
      humidity: hour.humidity,
      wind: `${hour.wind_kph} km/h`,
    }));
  }, [forecastData, forecastDayDate, type]);

  return (
    <div className="flex w-full gap-x-2 overflow-x-scroll">
      {getNextHoursWeather.length === 0 && (
        <div className="hidden md:flex items-center justify-center w-full border rounded-3xl">
          <Icon asChild size="xl" rounded="full" className="p-2.5">
            <FrownIcon className="text-primary" />
          </Icon>
          <Text size={"xs"} color={"primary"} weight={"light"}>
            You've reached the end of the available forecast data for today.
          </Text>
        </div>
      )}
      {getNextHoursWeather.length > 0 &&
        getNextHoursWeather.map((hour, index) => (
          <WeatherSubCard
            key={index}
            dayOrTime={hour.time}
            type={type === "sevenDays" ? "day" : "time"}
            icon={hour.icon}
            iconText={hour.iconText}
            tempc={hour.tempc}
            tempf={hour.tempf}
            humidity={hour.humidity}
            wind={hour.wind}
          />
        ))}
    </div>
  );
};

export default WeatherSubCardList;
