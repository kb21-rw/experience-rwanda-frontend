import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { Loader2 } from "lucide-react";
import { OTPInput } from "./OTPInput";
import { ApiResponse, ResetCodePopupProps, ResetPasswordFormData, resetPasswordSchema } from "../../../../utils/schemas/resetCodeSchema";

const ResetCodePopup = ({ onClose, email }: ResetCodePopupProps) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [otpExpiryTime, setOtpExpiryTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading: formLoading },
    setValue,
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      isVerified: false,
    },
  });

  const isVerified = watch("isVerified");

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (otpExpiryTime) {
      timer = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.ceil((otpExpiryTime - now) / 1000);

        if (timeLeft <= 0) {
          handleCodeExpired();
          if (timer) clearInterval(timer);
        } else {
          setRemainingTime(timeLeft);
        }
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [otpExpiryTime]);

  const handleCodeExpired = () => {
    setCode(Array(6).fill(""));
    setValue("isVerified", false);
    toast.error("OTP has expired. Please request a new one.");
    setOtpExpiryTime(null);
    setRemainingTime(null);
  };

  const verifyCode = async () => {
    if (otpExpiryTime && Date.now() >= otpExpiryTime) {
      handleCodeExpired();
      return;
    }

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
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            code: verificationCode,
          }),
        }
      );

      const data = (await response.json()) as ApiResponse<unknown>;

      if (response.ok) {
        toast.success("Code verified successfully!");
        setValue("isVerified", true);
        const expiryTime = Date.now() + 2 * 60 * 1000;
        setOtpExpiryTime(expiryTime);
        setRemainingTime(120);
      } else {
        handleVerificationError(response.status, data.message);
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Failed to verify code. Please try again.");
      setCode(Array(6).fill(""));
      setValue("isVerified", false);
    }
  };

  const handleVerificationError = (status: number, message?: string) => {
    switch (status) {
      case 400:
        toast.error("Invalid verification code. Please try again.");
        break;
      case 404:
        toast.error("No reset code found. Please request a new one.");
        break;
      case 410:
        toast.error("Reset code has expired. Please request a new one.");
        break;
      default:
        toast.error(message || "Failed to verify code. Please try again.");
    }
    setCode(Array(6).fill(""));
    setValue("isVerified", false);
  };

  const resendCode = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = (await response.json()) as ApiResponse<unknown>;

      if (response.ok) {
        toast.success("New code sent successfully!");
        setCode(Array(6).fill(""));
        const expiryTime = Date.now() + 2 * 60 * 1000;
        setOtpExpiryTime(expiryTime);
        setRemainingTime(120);
      } else {
        toast.error(data.message || "Failed to resend code");
      }
    } catch {
      toast.error("Failed to resend code. Please try again.");
    }
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!isVerified) {
      toast.error("Please verify your code first");
      return;
    }

    if (!otpExpiryTime || Date.now() >= otpExpiryTime) {
      handleCodeExpired();
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            code: code.join(""),
            newPassword: data.newPassword,
          }),
        }
      );

      const responseData = (await response.json()) as ApiResponse<unknown>;
      if (response.ok) {
        toast.success("Password reset successfully!");
        onClose();
      } else {
        toast.error(responseData.message || "Failed to reset password");
      }
    } catch {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  const isCodeExpired = Boolean(otpExpiryTime && Date.now() >= otpExpiryTime);
  const isLoading = isSubmitting || formLoading;

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
              {isVerified ? "Reset Password" : "Enter Reset Code"}
            </h2>
          </div>

          {!isVerified ? (
            <>
              <p className="text-black text-base text-center mb-8">
                You are almost there! We have sent you six digits code to your
                email. <br />
                <span className="font-semibold">{email}</span>
              </p>

              <OTPInput
                code={code}
                setCode={setCode}
                isVerifying={isLoading}
                isResending={isLoading}
                isCodeExpired={isCodeExpired}
                remainingTime={remainingTime}
                onVerify={verifyCode}
                onResend={resendCode}
              />
            </>
          ) : (
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
                disabled={isLoading || isCodeExpired}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetCodePopup; 