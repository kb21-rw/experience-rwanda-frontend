import { format } from "date-fns";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { DateRange } from "react-day-picker";
import { z } from "zod";
import { searchSchema } from "../../utils/schemas/searchSchema";

type DateRangePickerProps = {
  form: UseFormReturn<z.infer<typeof searchSchema>>;
};

const DateRangePicker = ({ form }: DateRangePickerProps) => {
  return (
    <FormField
      control={form.control}
      name="dateRange"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-1 w-full relative">
          <FormLabel
            style={{
              color: "white",
              opacity: 0.8,
            }}
            className="font-bold text-white text-base text-opacity-80"
          >
            Date Range
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-between text-left bg-white font-medium text-base h-14 border-none  px-2 hover:disabled"
                >
                  {field.value?.from && field.value?.to
                    ? `${format(field.value?.from, "dd/MM/yyyy")} - ${format(
                        field.value?.to,
                        "dd/MM/yyyy"
                      )}`
                    : "Select date range"}
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-2 bg-white text-black"
              align="start"
            >
              <Calendar
                initialFocus
                mode="range"
                selected={field.value as DateRange}
                onSelect={field.onChange}
                numberOfMonths={2}
                fromDate={new Date()}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateRangePicker;
