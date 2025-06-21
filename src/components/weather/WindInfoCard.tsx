import { getSpeed } from "@/utils/weatherHelpers";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";
import { useAppSelector } from "@/hooks/useRedux";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface WindInfoCardProps {
  windMph?: number;
  windKph?: number;
  windDegree?: number;
  gustMph?: number;
  gustKph?: number;
  isLoading?: boolean;
}

const RADIUS = 48;
const DOT_OFFSET = 10;
const WindInfoCard = ({
  windMph,
  windKph,
  windDegree,
  gustMph,
  gustKph,
  isLoading = false,
}: WindInfoCardProps) => {
  const { temperatureUnit } = useAppSelector((state) => state.weather);
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-3xl" />
      </div>
    );
  }

  if (!windMph || !windKph || !windDegree || !gustMph || !gustKph) {
    return (
      <div className="w-full h-full flex items-center justify-center border border-muted rounded-3xl p-4">
        <Text size="sm" weight="light" className="italic" color="muted">
          Wind information is not available
        </Text>
      </div>
    );
  }

  const angleInRadians = (windDegree - 90) * (Math.PI / 180);
  const x = RADIUS + (RADIUS - DOT_OFFSET) * Math.cos(angleInRadians);
  const y = RADIUS + (RADIUS - DOT_OFFSET) * Math.sin(angleInRadians);

  return (
    <div
      className={cn(
        "w-full h-1/2 bg-background p-4 rounded-3xl border space-y-4 justify-center flex flex-col",
        theme === "weather" && "blur-card border-0"
      )}
    >
      <div className="flex justify-between items-center w-full gap-2">
        {/* Wind Details */}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between">
            <Text size="xs">Wind</Text>
            <Text
              size="xs"
              weight="light"
              color={theme === "weather" ? "white" : "muted"}
            >
              {getSpeed(windKph, windMph, temperatureUnit)}
            </Text>
          </div>

          <div className="flex items-center justify-between">
            <Text size="xs">Gust</Text>
            <Text
              size="xs"
              weight="light"
              color={theme === "weather" ? "white" : "muted"}
            >
              {getSpeed(gustKph, gustMph, temperatureUnit)}
            </Text>
          </div>

          <div className="flex items-center justify-between">
            <Text size="xs">Direction</Text>
            <Text
              size="xs"
              weight="light"
              color={theme === "weather" ? "white" : "muted"}
            >
              {windDegree}° W
            </Text>
          </div>
        </div>

        {/* Wind Compass */}
        <div className="flex items-center justify-end min-w-24">
          <div
            className={cn(
              "relative min-w-24 min-h-24 rounded-full border-2 border-muted bg-background flex items-center justify-center",
              theme === "weather" && "bg-transparent border-white"
            )}
          >
            {/* Cardinal Directions */}
            <div className="absolute inset-0 text-[10px] font-semibold text-muted-foreground pointer-events-none">
              <Text
                size={"xs"}
                weight={"light"}
                className="absolute top-0.5 left-1/2 -translate-x-1/2"
              >
                N
              </Text>
              <Text
                size={"xs"}
                weight={"light"}
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2"
              >
                S
              </Text>
              <Text
                size={"xs"}
                weight={"light"}
                className="absolute left-0.5 top-1/2 -translate-y-1/2"
              >
                W
              </Text>
              <Text
                size={"xs"}
                weight={"light"}
                className="absolute right-0.5 top-1/2 -translate-y-1/2"
              >
                E
              </Text>
            </div>

            {/* Wind Degree Dot */}
            <div
              className="absolute size-2 rounded-full bg-chart-1 shadow animate-pulse"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Center Wind Speed Display */}
            <div className="absolute w-12 h-12 rounded-full bg-secondary shadow flex flex-col items-center justify-center z-10 text-[10px] font-medium border">
              <span className="text-sm leading-none">
                {temperatureUnit === "celsius" ? windKph : windMph}
              </span>
              <span className="text-[9px] text-muted-foreground">
                {temperatureUnit === "celsius" ? "kmh" : "mph"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindInfoCard;
