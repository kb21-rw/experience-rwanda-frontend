import React from "react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
} from "react-hook-form";
import { DatePicker } from "./DatePicker";
import { z } from "zod";
import { tripSchema } from "@/utils/schemas/tripSchema";
type FormData = z.infer<typeof tripSchema>;

// type or  react hook form register
const FormInput = ({
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
  control?: Control<FormData>;
  register: UseFormRegister<FormData>;
  name: keyof FormData;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "date";
  size?: "small" | "large";
  errors?: FieldErrors<FormData>;
  onDisabled?: (date: Date) => boolean;
}) => {
  switch (type) {
    case "date":
      return (
        <div className="w-52.5">
          <Label
            htmlFor={name}
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
                value={new Date(field.value as string)}
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
        <div className="w-52.5">
          <Label
            htmlFor={name}
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
