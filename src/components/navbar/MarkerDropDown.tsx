import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPinned, Pin, Trash } from "lucide-react";
import { Text } from "../ui/text";
import { useAppSelector } from "@/hooks/useRedux";

export function MarkerDropDown() {
  const { currentWeather } = useAppSelector((state) => state.weather);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MapPinned />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] gap-2 py-2 flex flex-col"
      >
        {["Colombo", "Jaffna", "Matara", "Galle"].map((c, index) => (
          <div key={index} className="flex items-center justify-between px-3">
            <Text size={"sm"} weight={"light"} color={"primary"}>
              {c}
            </Text>
            <Button variant="ghost" size="icon">
              <Trash />
            </Button>
          </div>
        ))}

        <Button variant="default" className="mt-2 mx-1" size="sm">
          <Pin className="size-3.5" />
          {currentWeather?.location.name}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
