import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const RenderCity = () => {
  const { currentWeather, isLoading } = useAppSelector(
    (state) => state.weather
  );

  const [time, setTime] = useState<string>("");

  useEffect(() => {
    if (!currentWeather) return;

    const updateTime = () => {
      const now = new Date();
      now.setSeconds(now.getSeconds() + 1);
      setTime(now.toLocaleString());
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [currentWeather]);

  return (
    <div className="flex flex-col justify-center min-w-60">
      {isLoading && <Skeleton className="h-8 w-full" />}
      {!isLoading && !currentWeather && (
        <Text size={"xs"} className="italic w-56" color={"muted"}>
          No data available
        </Text>
      )}
      {!isLoading && currentWeather && (
        <div className="flex flex-col items-start">
          <Tooltip>
            <TooltipTrigger asChild>
              <Text
                size="sm"
                color="default"
                weight="normal"
                className="truncate max-w-[240px] cursor-default"
              >
                {`${currentWeather?.location.name}, ${currentWeather?.location.region}, ${currentWeather?.location.country}`}
              </Text>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>
                {`${currentWeather?.location.name}, ${currentWeather?.location.region}, ${currentWeather?.location.country}`}
              </p>
            </TooltipContent>
          </Tooltip>
          <Text size="xs" color="muted" weight="light" className="leading-3">
            {time}
          </Text>
        </div>
      )}
    </div>
  );
};
