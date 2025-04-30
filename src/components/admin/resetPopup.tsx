"use client";

import { Button } from "@/components/ui/Button";

interface ResetCodePopupProps {
  onClose: () => void;
}

export default function ResetCodePopup({ onClose }: ResetCodePopupProps) {
  return (
    <>
      
      <div className="fixed inset-0 bg-black/30 z-50" />

    
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-500 p-8 relative">
          <div className="flex text-center space-x-20 mb-8">
            <button
              onClick={onClose}
              className="text-xl left-6 top-6 text-black hover:text-gray-800"
            >
              ←
            </button>

            <h2 className="text-2xl font-medium">Enter Reset Code</h2>
          </div>

          <div className="mt-4">
            <p className="text-black text-sm mb-8">
              You are almost there! We&apos;ve sent you six digits code to your
              email experiencerwanda@gmail.com
            </p>

            <div className="grid grid-cols-6 gap-3 mb-8">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-10 h-10 text-center border border-gray-300 rounded-lg text-xl focus:border-black focus:ring-1 focus:ring-black outline-none"
                  />
                ))}
            </div>

            <div className="flex items-center justify-between text-sm mb-8">
              <span className="text-black">Code will expire in 2 min</span>
              <button className="text-black underline hover:text-gray-800">
                Resend code?
              </button>
            </div>

            <Button
              type="button"
              className="w-full py-3 bg-black text-white hover:bg-gray-800 rounded-xl text-base font-medium"
            >
              Verify
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
