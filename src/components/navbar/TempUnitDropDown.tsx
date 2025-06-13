import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setTemperatureUnit } from "@/store/slices/weatherSlice";

export function TempUnitDropDown() {
  const dispatch = useAppDispatch();
  const { temperatureUnit } = useAppSelector((state) => state.weather);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {temperatureUnit === "celsius" ? "°C" : "°F"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          checked={temperatureUnit === "celsius"}
          onCheckedChange={() => dispatch(setTemperatureUnit("celsius"))}
        >
          °C
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={temperatureUnit === "fahrenheit"}
          onCheckedChange={() => dispatch(setTemperatureUnit("fahrenheit"))}
        >
          °F
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
