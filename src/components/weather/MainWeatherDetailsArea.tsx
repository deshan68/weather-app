import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Today from "./tabs/Today";
import { Text } from "../ui/text";

export function MainWeatherDetailsArea() {
  return (
    <div className="flex max-w-sm flex-col gap-6 min-w-full">
      <Tabs defaultValue="today" className="full">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="full flex gap-x-2">
          <Today />
        </TabsContent>
        <TabsContent value="tomorrow">
          <Text size={"xs"}>Not implemented yet</Text>
        </TabsContent>
      </Tabs>
    </div>
  );
}
