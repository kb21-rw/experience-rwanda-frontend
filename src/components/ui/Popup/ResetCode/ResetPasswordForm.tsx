import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { Loader2 } from "lucide-react";
import { ResetPasswordFormData, resetPasswordSchema } from "./types";

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormData) => void;
  isLoading: boolean;
  isCodeExpired: boolean;
}

export const ResetPasswordForm = ({
  onSubmit,
  isLoading,
  isCodeExpired,
}: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          type="password"
          placeholder="New Password"
          {...register("newPassword")}
          className="w-full"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className="w-full"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading || Boolean(isCodeExpired)}
        className="w-full bg-black text-white hover:bg-gray-800 rounded-md flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Resetting...
          </>
        ) : isCodeExpired ? (
          "Code Expired"
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}; 