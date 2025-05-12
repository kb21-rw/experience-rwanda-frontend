import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { OTPInput } from "./OTPInput";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { ApiResponse, ResetCodePopupProps } from "./types";

const ResetCodePopup = ({ onClose, email }: ResetCodePopupProps) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otpExpiryTime, setOtpExpiryTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (otpExpiryTime) {
      timer = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.ceil((otpExpiryTime - now) / 1000);

        if (timeLeft <= 0) {
          setCode(Array(6).fill(""));
          toast.error("OTP has expired. Please request a new one.");
          setIsVerified(false);
          setOtpExpiryTime(null);
          setRemainingTime(null);
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

  const verifyCode = async () => {
    if (otpExpiryTime && Date.now() >= otpExpiryTime) {
      toast.error("OTP has expired. Please request a new one.");
      setCode(Array(6).fill(""));
      setIsVerified(false);
      setOtpExpiryTime(null);
      setRemainingTime(null);
      return;
    }

    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`,
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
        setIsVerified(true);
        const expiryTime = Date.now() + 2 * 60 * 1000;
        setOtpExpiryTime(expiryTime);
        setRemainingTime(120);
      } else {
        toast.error(data.message || "Invalid verification code");
        setCode(Array(6).fill(""));
      }
    } catch {
      toast.error("Failed to verify code. Please try again.");
      setCode(Array(6).fill(""));
    } finally {
      setIsVerifying(false);
    }
  };

  const resendCode = async () => {
    setIsResending(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`,
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
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data: { newPassword: string }) => {
    if (!isVerified) {
      toast.error("Please verify your code first");
      return;
    }

    if (!otpExpiryTime || Date.now() >= otpExpiryTime) {
      toast.error("OTP has expired. Please request a new one.");
      setIsVerified(false);
      setCode(Array(6).fill(""));
      setOtpExpiryTime(null);
      setRemainingTime(null);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`,
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
                isVerifying={isVerifying}
                isResending={isResending}
                isCodeExpired={isCodeExpired}
                remainingTime={remainingTime}
                onVerify={verifyCode}
                onResend={resendCode}
              />
            </>
          ) : (
            <ResetPasswordForm
              onSubmit={onSubmit}
              isLoading={false}
              isCodeExpired={isCodeExpired}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetCodePopup; 