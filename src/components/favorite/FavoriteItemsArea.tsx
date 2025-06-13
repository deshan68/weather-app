import { Text } from "../ui/text";
import FavoriteItemCard from "./FavoriteItemCard";

function FavoriteItemsArea() {
  return (
    <div className="flex flex-col gap-1 h-full w-full">
      <Text size={"sm"} weight={"normal"}>
        Your Favorite Cities
      </Text>

      <div className="flex flex-col gap-2 w-full overflow-y-auto h-[50vh]">
        {[1, 1, 1, 1, 1].map((_, index) => (
          <FavoriteItemCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default FavoriteItemsArea;
