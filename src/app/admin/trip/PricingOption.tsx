/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

interface PricingOptionProps {
  pricingOptions: any[];
  register: any;
  remove: (index: number) => void;
  append: (field: unknown) => void;
}

const PricingOption: React.FC<PricingOptionProps> = ({
  pricingOptions,
  register,
  remove,
  append,
}) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-black mb-4">Pricing Options</h3>

      {pricingOptions.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-300 p-4 rounded-md mb-4"
        >
          <div className="mb-2">
            <Label className="block text-sm text-black mb-1">Name</Label>
            <Input
              type="text"
              {...register(`pricingOptions.${index}.name`)}
              className="w-full p-2 border border-black rounded-md"
              placeholder="Option name"
            />
          </div>

          <div className="mb-2">
            <Label className="block text-sm text-black mb-1">Amount</Label>
            <Input
              type="number"
              {...register(`pricingOptions.${index}.amount`)}
              className="w-full p-2 border border-black rounded-md"
              placeholder="Amount in RWF"
            />
          </div>

          <div className="mb-2">
            <Label className="block text-sm text-black mb-1">Description</Label>
            <textarea
              {...register(`pricingOptions.${index}.description`)}
              className="w-full p-2 border border-black rounded-md"
              placeholder="Short description"
            />
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 text-sm hover:underline mt-2"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", price: "", description: "" })}
        className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Add Pricing Option
      </button>
    </div>
  );
};

export default PricingOption;
