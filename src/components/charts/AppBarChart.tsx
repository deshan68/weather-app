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

interface AppBarChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  keyOfXAxis: string;
  keyOfYAxis: string;
  label: string;
  title: string;
}

function AppBarChart({
  data,
  keyOfXAxis,
  keyOfYAxis,
  label,
  title,
}: AppBarChartProps) {
  const { isLoading } = useAppSelector((state) => state.weather);

  const chartConfig = {
    chancePercentage: {
      label,
    },
  } satisfies ChartConfig;

  if (isLoading) {
    return (
      <div className="flex items-end h-full justify-between gap-2 w-full">
        <Skeleton className={`h-52 w-full rounded-3xl`} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 h-full w-full">
      <Text size={"sm"} weight={"normal"}>
        {title}
      </Text>
      <ChartContainer
        config={chartConfig}
        className="h-56 w-full md:h-full md:w-full bg-accent rounded-2xl p-2"
      >
        <BarChart accessibilityLayer data={data.slice(0, 12)}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={keyOfXAxis}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            fontSize={9}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey={keyOfYAxis}
            fill="var(--chart-1)"
            radius={6}
            fillOpacity={0.4}
            stroke="var(--chart-1)"
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default AppBarChart;
