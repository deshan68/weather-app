import { useAppSelector } from "@/hooks/useRedux";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Text } from "../ui/text";

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
  const { currentWeather } = useAppSelector((state) => state.weather);

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
        hour: hour.time.split(" ")[1].slice(0, 2) + "AM",
        chancePercentage: hour.chance_of_rain === 0 ? 1 : hour.chance_of_rain,
      }));
  }

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <Text size={"sm"} weight={"normal"}>
        Upcoming Rain Chances
      </Text>
      <ChartContainer
        config={chartConfig}
        className="h-56 w-72 md:h-full md:w-full bg-accent rounded-2xl p-2"
      >
        <BarChart
          accessibilityLayer
          data={getUpcomingHourlyRainChances().slice(0, 6)}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="hour"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
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
