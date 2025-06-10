import { Label } from "@radix-ui/react-label";
import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../Button";
import { ClientData } from "@/types/Popup";

const UserInfoPopup = ({
  setCurrentStep,
  setClientData,
  clientData,
  onCancel,
}: {
  setCurrentStep: Dispatch<SetStateAction<"userInfo" | "payment">>;
  setClientData: Dispatch<SetStateAction<ClientData | undefined>>;
  clientData: ClientData | undefined;
  onCancel: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientData>({
    defaultValues: {
      fullName: clientData?.fullName,
      email: clientData?.email,
      phoneNumber: clientData?.phoneNumber,
    },
  });
  const onSubmit: SubmitHandler<ClientData> = (data) => {
    setClientData(data);
    setCurrentStep("payment");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold text-center mb-10">User Information</h2>
      <div className="space-y-4 font-inter">
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Full Name</Label>
          <Input
            type="text"
            placeholder="John Doe"
            className="w-full border p-2 rounded"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Email</Label>
          <Input
            type="email"
            placeholder="johndoe@gmail.com"
            className="w-full border p-2 rounded"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Phone Number</Label>
          <Input
            type="tel"
            placeholder="+250 788 888 888"
            className="w-full border p-2 rounded"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>
      <div className="mt-5 flex gap-5">
        <Button onClick={onCancel} variant="secondary" className="w-full">
          Cancel
        </Button>

        <Button type="submit" variant="default" className="w-full">
          Continue To Checkout
        </Button>
      </div>
    </form>
  );
};

export default UserInfoPopup;
