import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Today from "./tabs/Today";

export function MainWeatherDetailsArea() {
  return (
    <Tabs defaultValue="today" className="flex max-w-sm flex-col min-w-full">
      <TabsList>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        <Today />
      </TabsContent>
      <TabsContent value="tomorrow">
        <Today />
      </TabsContent>
    </Tabs>
  );
}
