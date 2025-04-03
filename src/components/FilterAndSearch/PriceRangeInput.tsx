import { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/Input";
import InputLabel from "./InputLabel";
import { PriceField } from "@/types/searchAndFilter";

const PriceRangeInput = ({
  price,
  setPrice,
}: {
  price: PriceField;
  setPrice: Dispatch<SetStateAction<PriceField>>;
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <InputLabel label="Price" />
      <div className="w-full flex items-center bg-white text-black border border-gray-300 rounded-md h-14 px-2">
        <Input
          type="number"
          placeholder="Min"
          value={price.min}
          onChange={(e) => setPrice({ ...price, min: Number(e.target.value) })}
          className="w-full bg-transparent outline-none text-black border-none"
        />
        <span className="mx-2">-</span>
        <Input
          type="number"
          placeholder="Max"
          value={price.max}
          onChange={(e) => setPrice({ ...price, max: Number(e.target.value) })}
          className="w-full bg-transparent outline-none text-black border-none "
        />
        <span className="ml-2">RWF</span>
      </div>
    </div>
  );
};
export default PriceRangeInput;
