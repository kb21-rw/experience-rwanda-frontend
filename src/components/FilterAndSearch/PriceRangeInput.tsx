import { useState } from "react";
import { Input } from "../ui/Input";
import InputLabel from "./InputLabel";
import { useController, UseControllerProps } from "react-hook-form";
import { FormValues } from "@/types/searchAndFilter";

const PriceRangeInput = (props: UseControllerProps<FormValues>) => {
  const { field } = useController(props);
  const [price, setPrice] = useState({ min: "1000", max: "1000000" });

  return (
    <div className="flex flex-col space-y-1 w-full">
      <InputLabel label="Price" />
      <div className="w-full flex items-center bg-white text-black border border-gray-300 rounded-md h-14 px-2">
        <Input
          type="number"
          placeholder="Min"
          value={price.min}
          onChange={(e) => setPrice({ ...price, min: e.target.value })}
          className="w-full bg-transparent outline-none text-black border-none"
        />
        <span className="mx-2">-</span>
        <Input
          {...field}
          type="number"
          placeholder="Max"
          value={price.max}
          onChange={(e) => setPrice({ ...price, max: e.target.value })}
          className="w-full bg-transparent outline-none text-black border-none "
        />
        <span className="ml-2">RWF</span>
      </div>
    </div>
  );
};
export default PriceRangeInput;
