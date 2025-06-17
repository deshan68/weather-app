import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContent from "./TabContent";
import CalendarResultDrawer from "./CalendarResultDrawer";

const MainWeatherDetailsArea = () => {
  return (
    <Tabs defaultValue="today" className="flex max-w-sm flex-col min-w-full">
      <div className="flex items-center gap-x-2">
        <TabsList className="flex">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          <TabsTrigger value="sevenDays">Next 7 days</TabsTrigger>
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
