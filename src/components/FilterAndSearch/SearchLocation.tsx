import { Input } from "../ui/Input";
import { MapPin } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/types/searchAndFilter";

type InputProps = {
  searchForm: UseFormReturn<FormValues>;
};

const SearchLocation = ({ searchForm }: InputProps) => {
  return (
    <FormField
      control={searchForm.control}
      name="location"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full gap-1.5- relative md:py-[30px]">
          <FormLabel
            style={{
              color: "white",
              opacity: 0.8,
            }}
            className="font-bold text-white text-base text-opacity-80"
          >
            Location
          </FormLabel>
          <FormControl className="w-full bg-white text-black border border-gray-300 rounded-md h-14 px-2">
            <div className="flex gap-2 items-center w-full">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <Input
                  {...field}
                  type="text"
                  placeholder="Search locations"
                  className="bg-transparent outline-none text-black border-none w-full h-full self-center-"
                />
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SearchLocation;
