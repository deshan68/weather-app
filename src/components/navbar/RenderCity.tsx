import { useAppSelector } from "@/hooks/useRedux";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";

export const RenderCity = () => {
  const { currentWeather, isLoading } = useAppSelector(
    (state) => state.weather
  );

  return (
    <div className="flex flex-col justify-center w-56">
      {isLoading ? (
        <Skeleton className="h-7 w-full" />
      ) : (
        <div className="flex flex-col items-start">
          <Text size="sm" color="default" weight="normal">
            {`${currentWeather?.location.name}, ${currentWeather?.location.country}`}
          </Text>
          <Text size="xs" color="muted" weight="light" className="leading-2">
            {currentWeather?.location.region}
          </Text>
        </div>
      )}
    </div>
  );
};
