import { useAppSelector } from "@/hooks/useRedux";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Text } from "../ui/text";
import { Skeleton } from "../ui/skeleton";

interface AppAreaChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  keyOfXAxis: string;
  keyOfYAxis: string;
  label: string;
  title: string;
}

function AppAreaChart({
  data,
  keyOfXAxis,
  keyOfYAxis,
  label,
  title,
}: AppAreaChartProps) {
  const { isLoading } = useAppSelector((state) => state.weather);

  const chartConfig = {
    chancePercentage: {
      label,
    },
  } satisfies ChartConfig;

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

  return (
    <div className="flex flex-col gap-1 h-full w-full">
      <Text size={"sm"} weight={"normal"}>
        {title}
      </Text>
      <ChartContainer
        config={chartConfig}
        className="h-56 w-full md:h-full md:w-full bg-accent rounded-2xl p-2"
      >
        <AreaChart accessibilityLayer data={data.slice(0, 12)}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={keyOfXAxis}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={9}
          />
          <YAxis hide={true} domain={["dataMin - 0.3", "dataMax + 0.3"]} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey={keyOfYAxis}
            type="natural"
            fill="var(--chart-1)"
            fillOpacity={0.4}
            stroke="var(--chart-1)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

export default AppAreaChart;
