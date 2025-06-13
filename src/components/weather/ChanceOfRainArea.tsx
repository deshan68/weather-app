import { useAppSelector } from "@/hooks/useRedux";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Text } from "../ui/text";
import { Skeleton } from "../ui/skeleton";

interface HourlyChanceOfRain {
  hour: string;
  chancePercentage: number;
}
const chartConfig = {
  chancePercentage: {
    label: "Chance of Rain",
  },
} satisfies ChartConfig;

function ChanceOfRainArea() {
  const { currentWeather, isLoading } = useAppSelector(
    (state) => state.weather
  );

  if (isLoading) {
    return (
      <div className="flex items-end h-full justify-between gap-2 w-full">
        {["h-56", "h-10", "h-46", "h-36", "h-5", "h-26", "h-46", "h-34"].map(
          (height, idx) => (
            <Skeleton key={idx} className={`${height} w-full rounded-md`} />
          )
        )}
      </div>
    );
  }

  if (!currentWeather || !currentWeather.forecast) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-sm">No weather data available</span>
      </div>
    );
  }
  const forecast = currentWeather!.forecast!.forecastday[0].hour;

  function getUpcomingHourlyRainChances(): HourlyChanceOfRain[] {
    const currentEpoch = Math.floor(Date.now() / 1000);

    return forecast
      .filter((hour) => hour.time_epoch >= currentEpoch)
      .map((hour) => ({
        hour: `${hour.time.split(" ")[1].slice(0, 2)}AM`,
        chancePercentage: hour.chance_of_rain === 0 ? 1 : hour.chance_of_rain,
      }));
  }

  return (
    <div className="flex flex-col gap-1 h-full w-full">
      <Text size={"sm"} weight={"normal"}>
        Upcoming Rain Chances
      </Text>
      <ChartContainer
        config={chartConfig}
        className="h-56 w-full md:h-full md:w-full bg-accent rounded-2xl p-2"
      >
        <BarChart
          accessibilityLayer
          data={getUpcomingHourlyRainChances().slice(0, 8)}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="hour"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            fontSize={9}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="chancePercentage" fill="var(--chart-1)" radius={6} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default ChanceOfRainArea;
