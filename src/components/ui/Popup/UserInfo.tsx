import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../Input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../Button";
import { ClientData } from "@/types/Popup";
import { PricingOption } from "@/types/trip";
import { z } from "zod";
import { UserInfoSchema } from "@/utils/schemas/bookingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserInfoPopup = ({
  setCurrentStep,
  setClientData,
  priceTitle,
  priceDescription,
  pricingOptions,
  onCancel,
}: {
  setCurrentStep: Dispatch<SetStateAction<"userInfo" | "payment">>;
  setClientData: Dispatch<SetStateAction<ClientData | undefined>>;
  clientData: ClientData | undefined;
  priceTitle: string;
  priceDescription: string;
  pricingOptions: PricingOption[];
  onCancel: () => void;
}) => {
  const form = useForm<z.infer<typeof UserInfoSchema>>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      pricingId: pricingOptions.length === 1 ? pricingOptions[0].id : "",
    },
  });
  const onSubmit: SubmitHandler<ClientData> = (data) => {
    setClientData(data);
    setCurrentStep("payment");
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-bold text-center mb-10">
          User Information
        </h2>
        <div className="space-y-4 font-inter">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+250 788 888 888" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {pricingOptions.length > 1 && (
            <FormField
              control={form.control}
              name="pricingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{priceTitle}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a pricing option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {pricingOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>{priceDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="mt-5 flex gap-5">
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
            className="w-full"
          >
            Cancel
          </Button>

          <Button type="submit" variant="default" className="w-full">
            Continue To Checkout
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserInfoPopup;
