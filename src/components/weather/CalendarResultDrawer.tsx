import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import { CalendarDays } from "lucide-react";
import DateWiseWeatherDisplay from "./DateWiseWeatherDisplay";

function CalendarResultDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CalendarDays />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DateWiseWeatherDisplay />
      </DrawerContent>
    </Drawer>
  );
}

export default CalendarResultDrawer;
