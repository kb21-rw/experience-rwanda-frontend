/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { PricingOptions } from "@/types/trip";
import { FieldErrors } from "react-hook-form";
import { Trip } from "@/types/trip";

interface PricingOptionProps {
  pricingOptions: PricingOptions[];
  register: any;
  remove: (index: number) => void;
  append: (field: PricingOptions) => void;
  errors: FieldErrors<Trip>;
  name: string;
}

const PricingOption: React.FC<PricingOptionProps> = ({
  pricingOptions,
  register,
  remove,
  append,
  errors,
  name,
}) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-black mb-4">Pricing Options</h3>

      {pricingOptions.map((field, index) => (
        <div
          {...register(name)}
          key={index}
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
            {errors?.pricingOptions?.[index]?.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.pricingOptions?.[index]?.name?.message?.toString()}
              </p>
            )}
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
        onClick={() =>
          append({
            name: "",
            amount: "0",
            description: "",
          })
        }
        className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Add Pricing Option
      </button>
    </div>
  );
};

export default PricingOption;
