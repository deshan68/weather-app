import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useTheme } from "@/providers/ThemeProvider";
import { setTemperatureUnit } from "@/store/slices/weatherSlice";
import { memo } from "react";

const TempUnitDropDown = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const { temperatureUnit } = useAppSelector((state) => state.weather);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          {temperatureUnit === "celsius" ? "°C" : "°F"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={theme === "weather" ? "blur-card text-white border-0" : ""}
      >
        <DropdownMenuCheckboxItem
          checked={temperatureUnit === "celsius"}
          onCheckedChange={() => dispatch(setTemperatureUnit("celsius"))}
        >
          Celsius
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={temperatureUnit === "fahrenheit"}
          onCheckedChange={() => dispatch(setTemperatureUnit("fahrenheit"))}
        >
          Fahrenheit
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(TempUnitDropDown);
