/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Trip } from "@/types/trip";

// type or  react hook form register
const FormInput = ({
  register,
  name,
  label,
  placeholder,
  type,
  size,
  errors,
}: {
  register: UseFormRegister<any>;
  name: keyof Trip;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "date";
  size?: "small" | "large";
  errors?: FieldErrors<any>;
}) => {
  switch (type) {
    case "date":
      return (
        <div>
          <Label
            htmlFor={name}
            className="block text-sm font-medium text-black mb-2"
          >
            {label}
          </Label>
          <Input
            id={name}
            type="date"
            {...register(name)}
            className="w-32 p-2 border border-black rounded-md"
          />
          {errors?.[name] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[name]?.message?.toString()}
            </p>
          )}
        </div>
      );
    case "text":
      return (
        <div>
          <Label
            htmlFor={name}
            className="block text-sm font-medium text-black mb-2"
          >
            {label}
          </Label>
          {size === "large" ? (
            <textarea
              id={name}
              {...register(name)}
              placeholder={placeholder}
              rows={4}
              className="w-full px-3 py-2 border border-black rounded-md"
            />
          ) : (
            <Input
              id={name}
              type="text"
              {...register(name)}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-black rounded-md"
            />
          )}
          {errors?.[name] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[name]?.message?.toString()}
            </p>
          )}
        </div>
      );
    case "number":
      return (
        <div>
          <Label
            htmlFor={name}
            className="block text-sm font-medium text-black mb-2"
          >
            {label}
          </Label>
          <Input
            type="number"
            {...register(name)}
            className="w-full px-3 py-2 border border-black rounded-md"
            placeholder={placeholder}
          />
          {errors?.[name] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[name]?.message?.toString()}
            </p>
          )}
        </div>
      );
  }
};

export default FormInput;
