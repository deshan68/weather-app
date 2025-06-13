import { Text } from "../ui/text";

function FavoriteItemCard() {
  return (
    <div className="flex w-full bg-accent rounded-3xl p-4">
      <div className="flex flex-col">
        <Text weight={"light"} size={"xs"} color={"muted"}>
          Sri Lanka
        </Text>
        <Text size={"xl"} weight={"medium"}>
          Colombo
        </Text>
        <Text size={"xs"} weight={"light"} className="mt-auto">
          Mostly Sunny
        </Text>
      </div>

      {/* image and temp */}
      <div className="flex items-center justify-center flex-col ml-auto">
        <img
          src="https://cdn.weatherapi.com/weather/64x64/day/113.png"
          alt="Weather Icon"
          className="w-14 h-14"
        />
        <Text size={"lg"} weight={"medium"} className="ml-2">
          30°
        </Text>
      </div>
    </div>
  );
}

export default FavoriteItemCard;
