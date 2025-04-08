import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/Input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormValues } from "@/types/searchAndFilter";

type InputProps = {
  searchForm: UseFormReturn<FormValues>;
};

const PriceRangeInput = ({ searchForm }: InputProps) => {
  return (
    <div className="flex flex-col space-y-1 w-full relative md:py-[30px]">
      <FormLabel
        style={{
          color: "white",
          opacity: 0.8,
        }}
        className="font-bold text-white text-base text-opacity-80"
      >
        Price
      </FormLabel>
      <div className="w-full flex items-center bg-white text-black border border-gray-300 rounded-md h-14 px-2 justify-between">
        <FormField
          control={searchForm.control}
          name="price.min"
          // className="flex-1 flex items-center justify-end"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Min"
                  className="w-full bg-transparent outline-none text-black border-none"
                />
              </FormControl>
              <div className="absolute bottom-2">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <span className="font-medium">RWF</span>

        <span className="mx-2">-</span>
        <FormField
          control={searchForm.control}
          name="price.max"
          // className="flex-1 flex items-center justify-end"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Max"
                  className="w-full bg-transparent outline-none text-black border-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <span className="font-medium">RWF</span>
      </div>
    </div>
  );
};
export default PriceRangeInput;
