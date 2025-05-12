"use client";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useNewPassword } from "@/hooks/useNewPassword";

const NewPasswordForm = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useNewPassword();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md"
    >
      <div className="flex gap-5 mb-6">
        <Link href="/login" className="text-3xl font-bold">
          ←
        </Link>
        <h2 className="text-2xl font-bold">Enter New Password</h2>
      </div>

      {errors.root && (
        <p className="text-red-600 text-center text-sm mb-4">
          {errors.root.message}
        </p>
      )}

      <div className="mb-4">
        <Label>New Password</Label>
        <Input type="password" {...register("newPassword")} />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <Label>Confirm New Password</Label>
        <Input type="password" {...register("confirmNewPassword")} />
        {errors.confirmNewPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmNewPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default NewPasswordForm;
