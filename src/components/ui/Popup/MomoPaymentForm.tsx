import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "../Input";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Inputs {
  phoneNumber: string;
}

const MomoPaymentForm = ({
  register,
  errors,
}: {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}) => {
  return (
    <div className="mt-5 flex flex-col ml-2 space-y-2">
      <Label className="text-sm font-medium">Phone Number</Label>
      <Input
        {...register("phoneNumber", { required: "Phone number is required" })}
        type="tel"
        placeholder="+250 788 888 888"
        className="border p-2 rounded w-full"
      />
      {errors.phoneNumber && (
        <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
      )}
    </div>
  );
};

export default MomoPaymentForm;
