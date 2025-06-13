import { useAppSelector } from "@/hooks/useRedux";
import WeatherSubCard from "./WeatherSubCard";
import { Text } from "../ui/text";
import { FrownIcon } from "lucide-react";
import { Icon } from "../ui/icon";

type WeatherSubCardListProps = {
  type: "today" | "tomorrow";
};
function WeatherSubCardList({ type }: WeatherSubCardListProps) {
  const { currentWeather } = useAppSelector((state) => state.weather);
  const forecastData =
    currentWeather!.forecast.forecastday[type === "today" ? 0 : 1].hour;

  const getNextHoursWeather = () => {
    const now = new Date();
    const currentHour = type === "today" ? now.getHours() : 0;
    const numberOfCards = type === "today" ? currentHour + 6 : currentHour + 8;

    return forecastData.slice(currentHour + 1, numberOfCards).map((hour) => ({
      time: hour.time,
      icon: hour.condition.icon,
      iconText: hour.condition.text,
      temp: hour.temp_c,
      humidity: hour.humidity,
      wind: `${hour.wind_kph} km/h`,
    }));
  };
  return (
    <div className="flex w-full gap-x-2 overflow-x-scroll">
      {getNextHoursWeather().length === 0 && (
        <div className="hidden md:flex items-center justify-center w-full border rounded-3xl">
          <Icon asChild size="xl" rounded="full" className="p-2.5">
            <FrownIcon className="text-primary" />
          </Icon>
          <Text size={"xs"} color={"primary"} weight={"light"}>
            You've reached the end of the available forecast data for today.
          </Text>
        </div>
      )}
      {getNextHoursWeather().map((hour, index) => (
        <WeatherSubCard
          key={index}
          dayOrTime={hour.time}
          type="time"
          icon={hour.icon}
          iconText={hour.iconText}
          temp={hour.temp}
          humidity={hour.humidity}
          wind={hour.wind}
        />
      ))}
    </div>
  );
}

export default WeatherSubCardList;
