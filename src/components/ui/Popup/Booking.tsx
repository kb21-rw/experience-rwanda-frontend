"use client";

import React, { useState, ChangeEvent } from "react";
import Popup from "../Popup";
import { Label } from "../Label";
import { Input } from "../Input";
import { BookingPopupProps, FormErrors } from "@/types/Popup";

const BookingPopup = ({ isOpen, setIsOpen }: BookingPopupProps) => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleProceed = (step: number): boolean => {
    const formErrors: FormErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    };

    if (step === 0) {
      if (!userInfo.firstName) {
        formErrors.firstName = "First name is required.";
      }
      if (!userInfo.lastName) {
        formErrors.lastName = "Last name is required.";
      }
      if (!userInfo.email) {
        formErrors.email = "Email is required.";
      }
    }

    if (step === 1 && paymentMethod === "momo" && !phoneNumber) {
      formErrors.phoneNumber = "Phone number is required for mobile money.";
    }

    setErrors(formErrors);

    const hasErrors = Object.values(formErrors).some((error) => error !== "");

    return !hasErrors;
  };

  return (
    <Popup
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      steps={[
        {
          title: "Book Your Trip",
          content: (
            <div className="space-y-4 font-inter">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">First Name</Label>
                <Input
                  type="text"
                  placeholder="John"
                  className="w-full border p-2 rounded"
                  value={userInfo.firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserInfo({ ...userInfo, firstName: e.target.value })
                  }
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Last Name</Label>
                <Input
                  type="text"
                  placeholder="Doe"
                  className="w-full border p-2 rounded"
                  value={userInfo.lastName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserInfo({ ...userInfo, lastName: e.target.value })
                  }
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Email</Label>
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className="w-full border p-2 rounded"
                  value={userInfo.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>
          ),
          showProceed: true,
          onProceed: () => handleProceed(0),
        },
        {
          title: "Checkout",
          subTitle: "Payment Options",
          content: (
            <div className="space-y-4 font-inter">
              <div
                className={`p-4 border rounded-lg cursor-pointer flex items-center space-x-2 text-base font-semibold ${
                  paymentMethod === "card"
                    ? "border-gray-700 bg-white"
                    : "border-gray-300"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <Input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="w-4 h-4"
                />
                <span>Card Payment</span>
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer flex flex-col gap-2 ${
                  paymentMethod === "momo"
                    ? "border-gray-700 bg-white"
                    : "border-gray-300"
                }`}
                onClick={() => setPaymentMethod("momo")}
              >
                <div className="flex items-center space-x-2 font-semibold">
                  <Input
                    type="radio"
                    name="payment"
                    value="momo"
                    checked={paymentMethod === "momo"}
                    onChange={() => setPaymentMethod("momo")}
                    className="w-4 h-4"
                  />
                  <span>Mobile Payment</span>
                </div>
                {paymentMethod === "momo" && (
                  <div className="mt-5 flex flex-col ml-2 space-y-2">
                    <Label className="text-sm font-medium">Phone Number</Label>
                    <Input
                      type="tel"
                      placeholder="+250 788 888 888"
                      className="border p-2 rounded w-full"
                      value={phoneNumber}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPhoneNumber(e.target.value)
                      }
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ),
          showBack: true,
          showProceed: true,
          onProceed: () => handleProceed(1),
        },
      ]}
    />
  );
};

export default BookingPopup;
