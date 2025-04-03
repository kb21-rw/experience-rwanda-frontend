import { format } from "date-fns";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import InputLabel from "./InputLabel";
import { useController, UseControllerProps } from "react-hook-form";
import { FormValues } from "@/types/searchAndFilter";
import { DateRange } from "react-day-picker";

export function DateRangePicker(props: UseControllerProps<FormValues>) {
  const { field } = useController(props);
  const [date, setDate] = useState<DateRange>();

  return (
    <div className="flex flex-col space-y-1 w-full">
      <InputLabel label="Date" />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between text-left bg-white text-black h-14 border-none  px-2 hover:disabled"
          >
            {date?.from && date.to
              ? `${format(date.from, "dd/MM/yyyy")} - ${format(
                  date.to,
                  "dd/MM/yyyy"
                )}`
              : "Select date range"}
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-2 bg-white text-black"
          align="start"
        >
          <Calendar
            {...field}
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangePicker;
