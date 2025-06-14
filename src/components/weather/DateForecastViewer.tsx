import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import { CalendarDays } from "lucide-react";
import DateForecastViewer from "./HorizontalDatePicker";

function CalendarResultDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CalendarDays />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DateForecastViewer />
      </DrawerContent>
    </Drawer>
  );
}

export default CalendarResultDrawer;
