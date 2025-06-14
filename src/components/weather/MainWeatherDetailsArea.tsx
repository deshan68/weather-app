import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContent from "./TabContent";

export function MainWeatherDetailsArea() {
  return (
    <Tabs defaultValue="today" className="flex max-w-sm flex-col min-w-full">
      <TabsList>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
        <TabsTrigger value="sevenDays">Next 7 days</TabsTrigger>
      </TabsList>
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
}
