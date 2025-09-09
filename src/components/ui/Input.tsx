"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
export type BaseInputProp = {
  label?: string;
  error?: string;
  className?: string;
};

type InputProp = BaseInputProp & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProp>(
  ({ className, type, error, placeholder, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "name") {
        const value = e.target.value;
        e.target.value = value;
      }
    };

    return (
      <div className="space-y-2 pt-1">
        <input
          type={type}
          placeholder={placeholder}
          className={cn(
            "flex h-10 w-full border border-gray-125 bg-transparent p-3 text-sm focus:outline-none",
            className
          )}
          ref={ref}
          onChange={handleChange}
          aria-invalid={!!error}
          {...props}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
