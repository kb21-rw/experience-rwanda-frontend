"use client";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { usePasswordReset } from "@/hooks/usePasswordReset";

const PasswordResetForm = ({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) => {
  const { register, onSubmit, errors, isSubmitting } =
    usePasswordReset(onSuccess);

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md"
    >
      <div className="flex gap-5 md:gap-x-20 text-center">
        <Link href="/login" className="text-3xl font-bold mb-2">
          ←
        </Link>
        <h1 className="text-2xl font-bold">Reset Password</h1>
      </div>
      <p className="text-lg py-8">
        Enter the email address you used while creating your Experience Rwanda
        account. We will send a code to reset your password.
      </p>

      {errors.root && (
        <p className="text-red-600 text-center mb-4 text-sm font-medium">
          {errors.root.message}
        </p>
      )}

      <div className="mb-7">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <Button
        variant="primary"
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default PasswordResetForm;
