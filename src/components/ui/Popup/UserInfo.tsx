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
      firstName: clientData?.firstName,
      lastName: clientData?.lastName,
      email: clientData?.email,
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
          <Label className="text-sm font-medium">First Name</Label>
          <Input
            type="text"
            placeholder="John"
            className="w-full border p-2 rounded"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Last Name</Label>
          <Input
            type="text"
            placeholder="Doe"
            className="w-full border p-2 rounded"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
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
