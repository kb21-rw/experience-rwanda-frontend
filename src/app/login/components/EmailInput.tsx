import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/utils/schemas/loginSchema";

type FormData = z.infer<typeof loginSchema>;

interface EmailInputProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const EmailInput = ({ register, errors }: EmailInputProps) => (
  <div className="space-y-2">
    <Label htmlFor="email" className="text-gray-900">
      Email
    </Label>
    <Input
      id="email"
      type="email"
      placeholder="experiencerwanda@gmail.com"
      {...register("email")}
      className="w-full rounded-md"
      autoComplete="email"
    />
    {errors.email && (
      <p className="text-red-500 text-md mt-1">{errors.email.message}</p>
    )}
  </div>
);
