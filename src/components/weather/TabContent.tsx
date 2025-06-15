import { useAppSelector } from "@/hooks/useRedux";
import WeatherMainCard from "./WeatherMainCard";
import { Skeleton } from "@/components/ui/skeleton";
import WeatherSubCardList from "./WeatherSubCardList";
import { Text } from "@/components/ui/text";

type TodayProps = {
  subCardListType: "today" | "tomorrow" | "sevenDays";
};

function Today({ subCardListType }: TodayProps) {
  const { currentWeather, isLoading, error } = useAppSelector(
    (state) => state.weather
  );

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <Skeleton className="h-52 aspect-square rounded-3xl" />
        <div className="flex gap-x-2 w-full">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-52 min-w-14 w-full rounded-3xl" />
          ))}
        </div>
      </div>
    );
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
      {subCardListType === "today" && <WeatherMainCard />}
      <WeatherSubCardList type={subCardListType} />
    </div>
  );
}

export default Today;
