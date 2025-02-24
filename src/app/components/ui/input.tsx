'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error,placeholder, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "name") {
        const value = e.target.value
        e.target.value = value
      }
    }
    
    return (
      <div className="space-y-2">
        {label && (
          <label
          htmlFor={props.id}
           className="text-sm w-full max-w-md font-medium ">
            {label}
          </label>
        )}
        
        <input
          type={type}
         
          placeholder = {placeholder}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            className
          )}
          ref={ref}
          onChange={handleChange}
          aria-invalid={!!error}
          {...props}
        />
        
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }