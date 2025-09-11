/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import type { PricingOption, Trip } from "@/types/trip";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Plus, X } from "lucide-react";
import {
  MdDriveFileRenameOutline,
  MdMoney,
  MdOutlineDescription,
} from "react-icons/md";
import { GiPriceTag } from "react-icons/gi";
import { Textarea } from "./ui/textarea";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFormRegister,
} from "react-hook-form";
import { tripSchema } from "@/utils/schemas/tripSchema";
import { z } from "zod";

type FormData = z.infer<typeof tripSchema>;
interface PricingOptionProps {
  pricingOptions: FieldArrayWithId<FormData>[];
  register: UseFormRegister<any>;
  remove: (index: number) => void;
  append: UseFieldArrayAppend<FormData>;
  errors: FieldErrors<Trip>;
}

const PricingOption = ({
  pricingOptions,
  register,
  remove,
  append,
  errors,
}: PricingOptionProps) => {
  return (
    <div className="">
      <h3 className="text-lg font-semibold text-black mb-4">Pricing Options</h3>
      <div className="flex items-center justify-between mb-4">
        <Button
          type="button"
          onClick={() =>
            append({
              id: "",
              name: "",
              amount: "",
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
        {pricingOptions?.map((field, index) => (
          <Card key={index} className="border border-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-sm font-medium text-black mb-2 flex items-center gap-2">
                  <GiPriceTag className="w-4 h-4" />
                  Price Details
                </h4>
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
                    <div className="flex items-center gap-2">
                      <MdDriveFileRenameOutline />
                      <Label className="block text-sm text-black mb-1">
                        Name
                      </Label>
                    </div>
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
                    <div className="flex items-center gap-2">
                      <MdMoney className="w-4 h-4" />
                      <Label className="block text-sm text-black mb-1">
                        Amount
                      </Label>
                    </div>
                    <Input
                      type="number"
                      {...register(`pricingOptions.${index}.amount`)}
                      className="w-full p-2 border border-black rounded-md"
                      placeholder="Amount in RWF"
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <MdOutlineDescription className="w-4 h-4" />
                    <Label className="block text-sm text-black mb-1">
                      Description
                    </Label>
                  </div>
                  <Textarea
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
