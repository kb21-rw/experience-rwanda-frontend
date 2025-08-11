import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import VisibilityIcon from "@/icons/VisibilityIcon";
import HideIcon from "@/icons/HideIcon";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/utils/schemas/loginSchema";

type FormData = z.infer<typeof loginSchema>;

interface PasswordInputProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export const PasswordInput = ({
  register,
  errors,
  showPassword,
  setShowPassword,
}: PasswordInputProps) => (
  <div className="space-y-2 relative">
    <Label htmlFor="password" className="text-gray-900">
      Password
    </Label>
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••••••"
        data-testId="login-password"
        {...register("password")}
        className="w-full rounded-md pr-10"
        autoComplete="current-password"
      />
      <button
        type="button"
        data-testId="login-show-password"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {showPassword ? <VisibilityIcon /> : <HideIcon />}
      </button>
    </div>
    {errors.password && (
      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
    )}
  </div>
);
