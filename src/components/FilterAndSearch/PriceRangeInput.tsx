import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { Input } from "../ui/Input";
import InputLabel from "./InputLabel";
import { SearchFormData } from "./searchSchema";
import { FormValues } from "@/types/searchAndFilter";

type InputProps = {
  setValue: UseFormSetValue<SearchFormData>;
  errors: FieldErrors<FormValues>;
};

const PriceRangeInput = ({ setValue, errors }: InputProps) => {
  return (
    <div className="flex flex-col space-y-1 w-full relative md:py-[30px]">
      <InputLabel label="Price" />
      <div className="w-full flex items-center bg-white text-black border border-gray-300 rounded-md h-14 px-2">
        <div className="flex-1 flex items-center justify-end">
          <Input
            // type="number"
            placeholder="Min"
            onChange={(e) => setValue("price.min", Number(e.target.value))}
            className="w-full bg-transparent outline-none text-black border-none"
          />
          <span className="font-medium">RWF</span>
        </div>
        <span className="mx-2">-</span>
        <div className="flex-1 flex items-center justify-end">
          <Input
            // type="number"
            placeholder="Max"
            onChange={(e) => setValue("price.max", Number(e.target.value))}
            className="w-full bg-transparent outline-none text-black border-none "
          />
          <span className="font-medium">RWF</span>
        </div>
      </div>
      {errors.price?.min && (
        <p className="text-red-300 absolute bottom-0 pb-1">
          {errors.price.min.message}
        </p>
      )}
    </div>
  );
};
export default PriceRangeInput;
