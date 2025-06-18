import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { CalendarDays } from "lucide-react";
import DateWiseWeatherDisplay from "./DateWiseWeatherDisplay";

const CalendarResultDrawer = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CalendarDays />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Conditions</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <DateWiseWeatherDisplay />
      </DrawerContent>
    </Drawer>
  );
};

export default CalendarResultDrawer;
