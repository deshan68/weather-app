import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPinned, Pin, Trash } from "lucide-react";
import { Text } from "../ui/text";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  addPinnedCity,
  removePinnedCity,
} from "@/store/slices/cityPreferencesSlice";
import { toast, Toaster } from "sonner";

export function MarkerDropDown() {
  const dispatch = useAppDispatch();
  const { currentWeather } = useAppSelector((state) => state.weather);
  const { pinnedCities } = useAppSelector((state) => state.cityPreferences);

  if (!currentWeather) return null;

  const handlePinCity = () => {
    dispatch(
      addPinnedCity({
        icon: currentWeather.current.condition.icon,
        name: currentWeather.location.name,
        lat: currentWeather.location.lat,
        lon: currentWeather.location.lon,
      })
    );
    toast("City pinned", {
      description: `${currentWeather.location.name} has been added to your pinned cities.`,
      duration: 4000,
      position: "bottom-center",
    });
  };
  const handleUnpinCity = (name: string) => {
    dispatch(removePinnedCity(name));
    toast("City unpinned", {
      description: `${name} has been removed from your pinned cities.`,
      duration: 4000,
      position: "bottom-center",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MapPinned />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[200px] min-h-24 justify-between gap-1 py-2 flex flex-col"
        >
          {pinnedCities.length === 0 ? (
            <Text size={"xs"} color={"muted"} className="text-center my-auto">
              No pinned cities.
            </Text>
          ) : (
            <>
              {pinnedCities.map((c, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-2 pl-3"
                >
                  <Text size={"sm"} weight={"light"} color={"primary"}>
                    {c.name}
                  </Text>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUnpinCity(c.name)}
                  >
                    <Trash className="size-3.5" />
                  </Button>
                </div>
              ))}
            </>
          )}

          <Button
            variant="default"
            className="mt-2 mx-1 text-[12px]"
            size="sm"
            onClick={handlePinCity}
          >
            <Pin className="size-3.5" />
            {currentWeather.location.name}
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster />
    </>
  );
}
