import { useAppSelector } from "@/hooks/useRedux";
import WeatherMainCard from "./WeatherMainCard";
import WeatherSubCardList from "./WeatherSubCardList";
import { Text } from "@/components/ui/text";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";

type TodayProps = {
  subCardListType: "today" | "tomorrow" | "sevenDays";
};

const Today = ({ subCardListType }: TodayProps) => {
  const { currentWeather, isLoading, error, temperatureUnit } = useAppSelector(
    (state) => state.weather
  );

  if (isLoading) {
    return <Skeleton className="h-52 min-w-14 w-full rounded-3xl" />;
  }

  if (!currentWeather)
    return (
      <div className="flex w-full justify-center items-center h-52 border border-separate rounded-3xl p-4">
        <Text size="sm" className="italic" color={"muted"}>
          {error || "No data available"}
        </Text>
      </div>
    );

  return (
    <div className="flex w-full flex-col gap-2 md:flex-row">
      {subCardListType === "today" && (
        <WeatherMainCard
          weatherData={{
            ...currentWeather.current,
            localEEEE: format(currentWeather.location.localtime, "EEEE"),
            localtime: format(currentWeather.location.localtime, "hh:mm a"),
          }}
          temperatureUnit={temperatureUnit}
          isLoading={isLoading}
        />
      )}
      <WeatherSubCardList type={subCardListType} />
    </div>
  );
};

export default Today;
