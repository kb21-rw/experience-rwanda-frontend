import React, { useRef, useEffect } from "react";
import { OTPInputProps } from "./types";

export const OTPInput: React.FC<OTPInputProps> = ({
  code,
  setCode,
  isVerifying,
  isResending,
  isCodeExpired,
  remainingTime,
  onVerify,
  onResend,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isCodeExpired) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isCodeExpired) return;

    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (isCodeExpired) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = Array(6).fill("").map((_, i) => pastedData[i] || "");
    setCode(newCode);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isCodeExpired
                ? "bg-red-50 border-red-300 text-red-500"
                : "border-gray-300"
            }`}
            disabled={isCodeExpired}
          />
        ))}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={onVerify}
          disabled={isVerifying || isCodeExpired || code.some((digit) => !digit)}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
            isCodeExpired
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isVerifying ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Verifying...
            </div>
          ) : isCodeExpired ? (
            "Code Expired"
          ) : (
            "Verify Code"
          )}
        </button>

        <div className="text-center">
          {remainingTime !== null && !isCodeExpired && (
            <p className="text-sm text-gray-600 mb-2">
              Code expires in {Math.floor(remainingTime / 60)}:
              {(remainingTime % 60).toString().padStart(2, "0")}
            </p>
          )}
          <button
            onClick={onResend}
            disabled={isResending || (!isCodeExpired && remainingTime !== null)}
            className={`text-sm ${
              isResending || (!isCodeExpired && remainingTime !== null)
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-700"
            }`}
          >
            {isResending ? "Sending..." : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
}; 