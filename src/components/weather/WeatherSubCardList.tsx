import { useAppSelector } from "@/hooks/useRedux";
import WeatherSubCard from "./WeatherSubCard";

function WeatherSubCardList() {
  const { currentWeather } = useAppSelector((state) => state.weather);

  const getNextHoursWeather = () => {
    const now = new Date();
    const currentHour = now.getHours();

    return currentWeather!.forecast.forecastday[0].hour
      .slice(currentHour + 1, currentHour + 7)
      .map((hour) => ({
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
