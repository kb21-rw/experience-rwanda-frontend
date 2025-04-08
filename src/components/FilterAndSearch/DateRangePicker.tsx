import { format } from "date-fns";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { CalendarIcon } from "lucide-react";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SearchFormData } from "./searchSchema";
import { FormValues } from "@/types/searchAndFilter";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type InputProps = {
  watch: UseFormWatch<SearchFormData>;
  setValue: UseFormSetValue<SearchFormData>;
  errors: FieldErrors<FormValues>;
};

export function DateRangePicker({ searchForm }: any) {
  return (
    <FormField
      control={searchForm.control}
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
                {/* {errors?.date?.from && (
              <p className="text-red-300 absolute bottom-0 pb-1">
                {errors.date.from.message}
              </p>
            )} */}
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-2 bg-white text-black"
              align="start"
            >
              <Calendar
                initialFocus
                mode="range"
                selected={field.value}
                onSelect={field.onChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          {/* <FormDescription>
            Select the start and end dates for your reservation.
          </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DateRangePicker;
