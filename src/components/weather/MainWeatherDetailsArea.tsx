import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContent from "./TabContent";
import CalendarResultDrawer from "./CalendarResultDrawer";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

const MainWeatherDetailsArea = () => {
  const { theme } = useTheme();
  return (
    <Tabs defaultValue="today" className="flex max-w-sm flex-col min-w-full">
      <div className="flex items-center gap-x-2">
        <TabsList className={cn("flex", theme === "weather" && "blur-card")}>
          <TabsTrigger
            value="today"
            className={cn(
              theme === "weather" && "text-white data-[state=active]:text-black"
            )}
          >
            Today
          </TabsTrigger>
          <TabsTrigger
            value="tomorrow"
            className={cn(
              theme === "weather" && "text-white data-[state=active]:text-black"
            )}
          >
            Tomorrow
          </TabsTrigger>
          <TabsTrigger
            value="sevenDays"
            className={cn(
              theme === "weather" && "text-white data-[state=active]:text-black"
            )}
          >
            Next 7 days
          </TabsTrigger>
        </TabsList>
        <CalendarResultDrawer />
      </div>

      <TabsContent value="today">
        <TabContent subCardListType="today" />
      </TabsContent>
      <TabsContent value="tomorrow">
        <TabContent subCardListType="tomorrow" />
      </TabsContent>
      <TabsContent value="sevenDays">
        <TabContent subCardListType="sevenDays" />
      </TabsContent>
    </Tabs>
  );
};

export default MainWeatherDetailsArea;
