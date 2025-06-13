import { useAppSelector } from "@/hooks/useRedux";
import WeatherMainCard from "../WeatherMainCard";
import { Skeleton } from "@/components/ui/skeleton";
import WeatherSubCardList from "../WeatherSubCardList";
import { Text } from "@/components/ui/text";

function Today() {
  const { currentWeather, isLoading } = useAppSelector(
    (state) => state.weather
  );

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <Skeleton className="h-52 aspect-square rounded-3xl" />
        <div className="flex gap-x-2 w-full">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-52 min-w-20 rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!currentWeather)
    return (
      <div className="flex gap-x-2 w-full h-52 border border-separate rounded-3xl p-4">
        <Text size="sm" weight="normal" color={"primary"}>
          No weather data available
        </Text>
      </div>
    );

  return (
    <div className="flex w-full flex-col gap-2 md:flex-row">
      <WeatherMainCard />
      <WeatherSubCardList />
    </div>
  );
}

export default Today;
