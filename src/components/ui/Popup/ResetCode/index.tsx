"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ResetCodePopupProps,
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/utils/schemas/resetCodeSchema";
import { OTPInput } from "./OTPInput";
import { usePasswordReset } from "@/hooks/usePasswordReset";

const ResetCodePopup = ({ onClose, email }: ResetCodePopupProps) => {
  const router = useRouter();

  const {
    formState: { isSubmitting },
    setValue,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { isVerified: false },
  });

  const { resend } = usePasswordReset(() => {});
  const [code, setCode] = useState<string[]>(Array(6).fill(""));

  const verifyCode = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: verificationCode }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid or expired code");
      }
      toast.success("Code verified successfully!");
      router.push(`/new-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verification failed");
      setCode(Array(6).fill(""));
      setValue("isVerified", false);
    }
  };

  const resendCode = async () => {
    await resend(email);
    setCode(Array(6).fill(""));
    setValue("isVerified", false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 font-inter">
          <div className="flex items-center w-full mb-8">
            <button
              onClick={onClose}
              className="text-2xl text-black hover:text-gray-800 mr-4"
              type="button"
            >
              ←
            </button>
            <h2 className="text-2xl font-bold text-center flex-1">
              Enter Reset Code
            </h2>
          </div>

          <p className="text-black text-base text-center mb-8">
            We sent a 6-digit code to your email: <br />
            <span className="font-semibold">{email}</span>
          </p>
          <OTPInput
            code={code}
            setCode={setCode}
            isVerifying={isSubmitting}
            onVerify={verifyCode}
            isResending={false}
            isCodeExpired={false}
            remainingTime={null}
            onResend={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={resendCode}
              className="text-sm text-blue-600 hover:underline"
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetCodePopup;
