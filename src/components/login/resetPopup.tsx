"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "react-hot-toast";

interface ResetCodePopupProps {
  onClose: () => void;
  email: string;
}

export default function ResetCodePopup({
  onClose,
  email,
}: ResetCodePopupProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = [...Array(6).fill("")];
      pastedData.split("").forEach((char, index) => {
        newCode[index] = char;
      });
      setCode(newCode);
      const nextEmptyIndex = newCode.findIndex((char) => char === "");
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const verifyCode = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    try {
      console.log("Verifying code for:", email);
      console.log("Code:", verificationCode);

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

      console.log("Verification response status:", response.status);
      const data = await response.json();
      console.log("Verification response data:", data);

      if (response.ok) {
        toast.success("Code verified successfully!");
        setIsVerified(true);
      } else {
        toast.error(data.message || "Invalid verification code");
        setCode(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error("Failed to verify code. Please try again.");
      setCode(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const resendCode = async () => {
    setIsResending(true);
    try {
      console.log("Resending code to:", email);

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

      console.log("Resend response status:", response.status);
      const data = await response.json();
      console.log("Resend response data:", data);

      if (response.ok) {
        toast.success("New code sent successfully!");
        setCode(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      } else {
        toast.error(data.message || "Failed to resend code");
      }
    } catch (error) {
      console.error("Error resending code:", error);
      toast.error("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsResetting(true);
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
            newPassword,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset successfully!");
        onClose();
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-112.5 p-10 relative flex flex-col items-center">
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
              <p className="text-black text-base text-cente mb-8">
                You are almost there! We have sent you six digits code to
                your email. <br />
                <span className="font-semibold">{email}</span>
              </p>

              <div className="flex justify-center gap-4 mb-6">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={code[index]}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 text-center border border-black rounded-lg text-2xl font-bold focus:border-black focus:ring-2 focus:ring-black outline-none transition-all"
                    />
                  ))}
              </div>

             
              <div className="flex items-center justify-between w-full text-sm mb-8">
                <span className="text-black">Code will expire in 2 min</span>
                <button
                  onClick={resendCode}
                  disabled={isResending}
                  className="text-black underline hover:text-gray-800 disabled:opacity-50"
                  type="button"
                >
                  {isResending ? "Sending..." : "Resend code?"}
                </button>
              </div>

              <Button
                type="button"
                onClick={verifyCode}
                disabled={!isCodeComplete || isVerifying}
                className="w-full bg-black py-3 text-white rounded-md text-base font-semibold disabled:opacity-50"
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </>
          ) : (
            <div className="w-full space-y-4">
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
              <Button
                type="button"
                onClick={handleResetPassword}
                disabled={isResetting}
                className="w-full py-3 bg-black text-white hover:bg-gray-800 rounded-md text-base font-medium disabled:opacity-50"
              >
                {isResetting ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
