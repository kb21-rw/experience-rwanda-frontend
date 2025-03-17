"use client";

import React, { useState } from "react";
import { ReactElement } from "react";
import { Card } from "@/types/ImageCard";
import Image from "next/image";
import { Button } from "../ui/Button";
import Popup from "../ui/Popup";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";

const ImageCard = ({ place, url, price, date }: Card): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <>
      <div className="bg-white shadow rounded-3xl border hover:border-gray-400">
        <div className="p-2">
          <Image src={url} alt={"image"} width={500} height={390} />
        </div>
        <div className="flex flex-col gap-5 font-inter p-6">
          <h1 className="font-bold text-lg md:text-xl h-12">{place}</h1>
          <p className="font-medium text-base">{price}</p>
          <p className="font-normal text-base">{date}</p>
          <Button className="w-1/2" variant="outline">
            More Details
          </Button>
          <Button
            aria-label="book-now"
            className="mb-1.5"
            variant="default"
            onClick={() => setIsOpen(true)}
          >
            Book Now
          </Button>
        </div>
      </div>

      <Popup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        steps={[
          {
            title: "Book Your Trip",
            content: (
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <Label className="text-base font-medium">First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="w-full border p-2 rounded"
                    required
                    value={userInfo.firstName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-base font-medium">Last Name</Label>

                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border p-2 rounded"
                    required
                    value={userInfo.lastName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-base font-medium">Email</Label>

                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    required
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                  />
                </div>
              </div>
            ),
            showProceed: true,
            onProceed: () => {
              if (
                !userInfo.firstName ||
                !userInfo.lastName ||
                !userInfo.email
              ) {
                alert("Please fill all required fields");
                return false;
              }
            },
          },
          {
            title: "Checkout",
            subTitle: "Payment Options",
            content: (
              <div className="space-y-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer flex items-center space-x-2 ${
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
                  <span>Credit/Debit Card</span>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer flex items-center space-x-2 ${
                    paymentMethod === "mobile"
                      ? "border-gray-700 bg-white"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("mobile")}
                >
                  <Input
                    type="radio"
                    name="payment"
                    value="mobile"
                    checked={paymentMethod === "mobile"}
                    onChange={() => setPaymentMethod("mobile")}
                    className="w-4 h-4"
                  />
                  <span>Mobile Money</span>

                  {paymentMethod === "mobile" && (
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      className="ml-2 border p-2 rounded w-full"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  )}
                </div>
              </div>
            ),
            showBack: true,
            showProceed: true,
            onProceed: () => {
              if (paymentMethod === "mobile" && !phoneNumber) {
                alert("Phone number required for mobile money");
                return false;
              }
              alert("Proceeding to checkout...");
            },
          },
        ]}
      />
    </>
  );
};

export default ImageCard;
