import InputLabel from "./InputLabel";
import { Input } from "../ui/Input";
import { MapPin } from "lucide-react";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SearchFormData } from "./searchSchema";
import { FormValues } from "@/types/searchAndFilter";

type InputProps = {
  watch: UseFormWatch<SearchFormData>;
  setValue: UseFormSetValue<SearchFormData>;
  errors: FieldErrors<FormValues>;
};

const SearchLocation = ({ watch, setValue, errors }: InputProps) => {
  return (
    <div className="flex flex-col w-full gap-1.5 relative md:py-[30px]">
      <InputLabel label="Location" />
      <div className="w-full flex items-center bg-white text-black border border-gray-300 rounded-md h-14 px-2">
        <MapPin className="h-5 w-5 text-gray-500 mr-2" />
        <div className="flex-1 w-full">
          <Input
            value={watch("location") || ""}
            onChange={(e) => setValue("location", e.target.value)}
            type="text"
            id="location"
            placeholder="Search locations"
            className="bg-transparent outline-none text-black border-none w-full h-full self-center"
          />
        </div>
      </div>
      {errors.location && (
        <p className="text-red-300 absolute bottom-0 pb-1">
          {errors.location.message}
        </p>
      )}
    </div>
  );
};

export default SearchLocation;
