import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPinned, Trash } from "lucide-react";
import { Text } from "../ui/text";

export function MarkerDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MapPinned />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] gap-2 py-2 flex flex-col "
      >
        {["Colombo", "Jaffna", "Matara", "Galle"].map((c, index) => (
          <div key={index} className="flex items-center justify-between px-3">
            <Text size={"sm"} weight={"light"}>
              {c}
            </Text>
            <Button variant="ghost" className="text-destructive" size="icon">
              <Trash />
            </Button>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
