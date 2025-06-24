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
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const CalendarResultDrawer = () => {
  const { theme } = useTheme();
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CalendarDays />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          "max-w-sm",
          theme === "weather" && "blur-card border-none"
        )}
      >
        <DrawerHeader>
          <DrawerTitle className={cn(theme === "weather" && "text-white")}>
            Conditions
          </DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <DateWiseWeatherDisplay />
      </DrawerContent>
    </Drawer>
  );
};

export default CalendarResultDrawer;
