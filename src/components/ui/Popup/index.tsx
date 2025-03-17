import React, { useState } from "react";
import { Button } from "../Button";
import { PopupProps } from "@/types/Popup";

const Popup = ({ isOpen, setIsOpen, steps }: PopupProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleProceed = () => {
    const canProceed = steps[currentStep].onProceed?.();
    if (canProceed === false) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-center mb-10">
            {steps[currentStep].title}
          </h2>
          <h2 className="mb-6 font-bold text-lg">
            {steps[currentStep].subTitle}
          </h2>
          <div>{steps[currentStep].content}</div>
          <div className="mt-6 flex gap-5">
            {steps[currentStep].showBack && (
              <Button
                onClick={handleBack}
                variant="secondary"
                className="w-full"
              >
                Back
              </Button>
            )}
            {!steps[currentStep].showBack && (
              <Button
                onClick={handleCancel}
                variant="secondary"
                className="w-full"
              >
                Cancel
              </Button>
            )}
            {steps[currentStep].showProceed && (
              <Button
                onClick={handleProceed}
                variant="default"
                className="w-full"
              >
                Continue To Checkout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
