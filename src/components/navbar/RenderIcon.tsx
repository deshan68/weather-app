import { MapPin } from "lucide-react";
import { useAppSelector } from "@/hooks/useRedux";
import { Skeleton } from "../ui/skeleton";
import { Icon } from "../ui/icon";

export const RenderIcon = () => {
  const { isLoading } = useAppSelector((state) => state.weather);

  return isLoading ? (
    <Skeleton className="h-9 w-9 rounded-full" />
  ) : (
    <Icon
      asChild
      size="xl"
      color="primary"
      background="secondary"
      rounded="full"
      className="p-2.5"
    >
      <MapPin />
    </Icon>
  );
};
