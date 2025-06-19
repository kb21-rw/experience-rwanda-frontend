import React from "react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  Path,
} from "react-hook-form";
import { DatePicker } from "./DatePicker";

// Generic FormInput component
// T is the form data type
const FormInput = <T extends Record<string, unknown>>({
  control,
  register,
  name,
  label,
  placeholder,
  type,
  size,
  errors,
  onDisabled,
}: {
  control?: Control<T>;
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "date";
  size?: "small" | "large";
  errors?: FieldErrors<T>;
  onDisabled?: (date: Date) => boolean;
}) => {
  console.log({ name, errors });
  switch (type) {
    case "date":
      return (
        <div className="w-52.5">
          <Label
            htmlFor={name as string}
            className="block text-sm font-medium text-black mb-2"
          >
            {label}
          </Label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <DatePicker
                onDisabled={onDisabled || (() => false)} // example logic
                value={
                  typeof field.value === "string" || field.value instanceof Date
                    ? new Date(field.value)
                    : new Date()
                }
                onChange={field.onChange}
              />
            )}
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
            htmlFor={name as string}
            className="block text-sm font-medium text-black mb-2"
          >
            {label}
          </Label>
          {size === "large" ? (
            <textarea
              id={name as string}
              {...register(name)}
              placeholder={placeholder}
              rows={4}
              className="w-full px-3 py-2 border border-black rounded-md"
            />
          ) : (
            <Input
              id={name as string}
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
        <div className="w-52.5">
          <Label
            htmlFor={name as string}
            className="block text-sm font-medium text-black mb-2="
          >
            {label}
          </Label>
          <Input
            type="number"
            {...register(name)}
            className="w-full px-3 h-9 border border-black rounded-md"
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
