import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Today from "./tabs/Today";

export function MainWeatherDetailsArea() {
  return (
    <Tabs
      defaultValue="today"
      className="flex max-w-sm flex-col gap-6 min-w-full"
    >
      <TabsList>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
      </TabsList>
      <TabsContent value="today" className="full flex gap-x-2">
        <Today />
      </TabsContent>
      <TabsContent value="tomorrow">
        <Today />
      </TabsContent>
    </Tabs>
  );
}
