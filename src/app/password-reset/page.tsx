"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof signupSchema>;

const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Validated Form Data:", data);
    // waiting for api.........
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('/uploads/hand.png')`,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md"
      >
        <h1 className="text-xl font-bold text-center">Reset Password</h1>
        <p className="text-lg mb-6 font-medium">
          Enter the email address you used when creating Experience Rwanda
          account we will send a code to reset password{" "}
        </p>

        <div className="mb-4">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <Button variant="primary" type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </main>
  );
};

export default PasswordReset;
