import { addDays, format } from "date-fns";
import { Text } from "../ui/text";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { DAYS_TO_SHOW } from "@/lib/constants";

interface HorizontalDatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const HorizontalDatePicker = ({
  selectedDate,
  onDateChange,
}: HorizontalDatePickerProps) => {
  const today = useMemo(() => new Date(), []);

  const dates = useMemo(
    () => Array.from({ length: DAYS_TO_SHOW }, (_, i) => addDays(today, i)),
    [today]
  );
  return (
    <div className="flex gap-2 pb-2 justify-between px-2">
      {dates.map((date) => {
        const isSelected =
          format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

        return (
          <button
            key={date.toISOString()}
            onClick={() => onDateChange(date)}
            className="flex flex-col items-center justify-center gap-y-1"
          >
            <Text size="xs" color={isSelected ? "primary" : "muted"}>
              {format(date, "EEEEE")}
            </Text>
            <Text
              size="xs"
              color={isSelected ? "primary" : "muted"}
              className={cn(
                "rounded-full w-6 h-6 flex items-center justify-center",
                isSelected && "bg-primary text-primary-foreground"
              )}
            >
              {format(date, "d")}
            </Text>
          </button>
        );
      })}
    </div>
  );
};

export default HorizontalDatePicker;
