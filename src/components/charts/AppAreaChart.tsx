import { useAppSelector } from "@/hooks/useRedux";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { Text } from "../ui/text";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

interface AppAreaChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  keyOfXAxis: string;
  keyOfYAxis: string;
  label: string;
  title: string;
  showAllData?: boolean;
}

const AppAreaChart = ({
  data,
  keyOfXAxis,
  keyOfYAxis,
  label,
  title,
  showAllData = false,
}: AppAreaChartProps) => {
  const { isLoading, error } = useAppSelector((state) => state.weather);
  const { theme } = useTheme();

  const chartConfig = {
    [keyOfYAxis]: {
      label,
    },
  } satisfies ChartConfig;

  if (isLoading) {
    return <Skeleton className="md:h-full h-52 w-full rounded-3xl" />;
  }

  if (data.length === 0)
    return (
      <div className="flex gap-x-2 w-full justify-center items-center h-full min-h-52 border border-separate rounded-3xl p-4">
        <Text size="sm" className="italic text-center" color={"muted"}>
          {error || "No data available"}
        </Text>
      </div>
    );

  return (
    <div
      className={cn(
        "flex flex-col gap-1 h-full w-full rounded-2xl bg-accent p-2",
        theme === "weather" && "blur-card"
      )}
    >
      <Text size={"sm"} weight={"normal"}>
        {title}
      </Text>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={data.slice(0, showAllData ? undefined : 12)}
        >
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
};

export default AppAreaChart;
