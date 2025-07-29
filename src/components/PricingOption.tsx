/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import type { PricingOption } from "@/types/trip";
import { FieldErrors } from "react-hook-form";
import { Trip } from "@/types/trip";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Plus, X } from "lucide-react";

interface PricingOptionProps {
  pricingOptions: PricingOption[];
  register: any;
  remove: (index: number) => void;
  append: (field: PricingOption) => void;
  errors: FieldErrors<Trip>;
}

const PricingOption: React.FC<PricingOptionProps> = ({
  pricingOptions,
  register,
  remove,
  append,
  errors,
}) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-black">Pricing Options</h3>
        <Button
          type="button"
          onClick={() =>
            append({
              id: "",
              name: "",
              amount: "0",
              description: "",
            })
          }
          className="flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Pricing Option
        </Button>
      </div>
      <div className="space-y-4 max-h-screen overflow-y-auto">
        {pricingOptions.map((field, index) => (
          <Card key={index} className="border border-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-medium">Package Details</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-600 hover:bg-red-600/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="border border-gray-300 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="mb-2">
                    <Label className="block text-sm text-black mb-1">
                      Name
                    </Label>
                    <Input
                      type="text"
                      {...register(`pricingOptions.${index}.name`)}
                      className="w-full p-2 border border-black rounded-md"
                      placeholder="Option name"
                    />
                    {errors?.pricingOptions?.[index]?.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.pricingOptions?.[
                          index
                        ]?.name?.message?.toString()}
                      </p>
                    )}
                  </div>

                  <div className="mb-2">
                    <Label className="block text-sm text-black mb-1">
                      Amount
                    </Label>
                    <Input
                      type="number"
                      {...register(`pricingOptions.${index}.amount`)}
                      className="w-full p-2 border border-black rounded-md"
                      placeholder="Amount in RWF"
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <Label className="block text-sm text-black mb-1">
                    Description
                  </Label>
                  <textarea
                    {...register(`pricingOptions.${index}.description`)}
                    className="w-full p-2 border border-black rounded-md"
                    placeholder="Short description"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingOption;
