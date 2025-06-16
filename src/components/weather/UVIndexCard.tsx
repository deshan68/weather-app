import { Text } from "../ui/text";
import { getUVIndexLevel } from "@/utils/weatherHelpers";

interface UVIndexCardProps {
  uv: number;
}

export const UVIndexCard = ({ uv }: UVIndexCardProps) => {
  const { level } = getUVIndexLevel(uv);
  const maxUV = 10;
  const clampedUV = Math.min(uv, maxUV);
  const percentage = (clampedUV / maxUV) * 100;

  return (
    <div className="w-full h-full bg-background p-4 rounded-3xl border space-y-4 justify-center flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Text size="sm">UV Index</Text>
        <Text size="sm">{level}</Text>
      </div>

      {/* UV Gradient Bar */}
      <div
        className="relative h-1 w-full rounded-full"
        style={{
          background: "linear-gradient(to right, green, yellow, red, purple)",
        }}
      >
        <div
          className="absolute top-1/2 size-3 rounded-full bg-white border border-muted shadow"
          style={{ left: `${percentage}%`, transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Current UV */}
      <div className="flex items-center justify-between">
        <Text size="xs" color="muted">
          Current UV
        </Text>
        <Text size="sm" weight="medium">
          {uv}
        </Text>
      </div>
    </div>
  );
};
