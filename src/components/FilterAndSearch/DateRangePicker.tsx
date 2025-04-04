import { format } from "date-fns";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { CalendarIcon } from "lucide-react";
import InputLabel from "./InputLabel";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SearchFormData } from "./searchSchema";
import { FormValues } from "@/types/searchAndFilter";

type InputProps = {
  watch: UseFormWatch<SearchFormData>;
  setValue: UseFormSetValue<SearchFormData>;
  errors: FieldErrors<FormValues>;
};

export function DateRangePicker({ watch, setValue, errors }: InputProps) {
  const date = watch("date");
  return (
    <div className="flex flex-col space-y-1 w-full relative">
      <InputLabel label="Date" />
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between text-left bg-white font-medium text-base h-14 border-none  px-2 hover:disabled"
            >
              {date?.from && date.to
                ? `${format(date.from, "dd/MM/yyyy")} - ${format(
                    date.to,
                    "dd/MM/yyyy"
                  )}`
                : "Select date range"}
              <CalendarIcon className="h-4 w-4" />
            </Button>
            {errors?.date?.from && (
              <p className="text-red-300 absolute bottom-0 pb-1">
                {errors.date.from.message}
              </p>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-2 bg-white text-black"
          align="start"
        >
          <Calendar
            mode="range"
            selected={date}
            onSelect={(e) => {
              setValue("date.from", e?.from || new Date());
              setValue("date.to", e?.to);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangePicker;
