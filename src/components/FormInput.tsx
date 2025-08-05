/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input } from "./ui/Input";
import { Path, ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { tripSchema } from "@/utils/schemas/tripSchema";
import { z } from "zod";
// how to exclude some element in the field  formdata
type FormData = Omit<
  z.infer<typeof tripSchema>,
  "coverImage" | "galleryImages" | "pricingOptions"
>;

const FormInput = ({
  placeholder,
  name,
  label,
  type,
  minDate,
  form,
  icon,
}: {
  form: UseFormReturn<any>;
  name: Path<FormData>;
  label: string;
  placeholder?: string;
  type: "text" | "textarea" | "number" | "datetime-local";
  icon?: React.ReactNode;
  minDate?: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-black mb-2 flex items-center gap-2">
            {icon && icon}
            {label}
          </FormLabel>
          <FormControl>
            <InputComponent
              type={type}
              minDate={minDate}
              placeholder={placeholder}
              field={field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const InputComponent = ({
  type,
  field,
  placeholder,
  minDate,
}: {
  type: "text" | "textarea" | "number" | "time" | "datetime-local";
  field: ControllerRenderProps<any, Path<any>>;
  placeholder?: string;
  minDate?: string;
}) => {
  if (type === "textarea")
    return (
      <Textarea
        placeholder={placeholder}
        rows={4}
        className="w-full px-3 py-2 border border-black rounded-md"
        {...field}
      />
    );
  if (type === "datetime-local") {
    return (
      <Input
        id={field.name}
        type="datetime-local"
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        min={minDate}
      />
    );
  }
  return (
    <Input
      type={type}
      placeholder={placeholder}
      className="w-full px-3 border border-black rounded-md"
      {...field}
    />
  );
};

export default FormInput;
