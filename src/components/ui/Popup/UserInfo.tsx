import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../Input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../Button";
import { ClientData } from "@/types/Popup";
import { PricingOption } from "@/types/trip";
import { z } from "zod";
import { UserInfoSchema } from "@/utils/schemas/bookingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
} from "@/components/ui/Select";
import { Counter } from "@/components/Counter";
import { Loader2 } from "lucide-react";
import { CheckSeatsResponse, TripStatus } from "@/types/trip";

const UserInfoPopup = ({
  setCurrentStep,
  setClientData,
  priceTitle,
  priceDescription,
  pricingOptions,
  onCancel,
  tripId,
}: {
  setCurrentStep: Dispatch<SetStateAction<"userInfo" | "payment">>;
  setClientData: Dispatch<SetStateAction<ClientData | undefined>>;
  clientData: ClientData | undefined;
  priceTitle: string;
  priceDescription: string;
  pricingOptions: PricingOption[];
  onCancel: () => void;
  tripId: string;
}) => {
  const form = useForm<z.infer<typeof UserInfoSchema>>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      pricingId: pricingOptions.length === 1 ? pricingOptions[0].id : "",
      bookedSeats: 1,
    },
  });
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const onSubmit: SubmitHandler<ClientData> = async (data) => {
    setCheckingAvailability(true);
    try {
      const checkSeats = await axios.get<CheckSeatsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/trips/${tripId}/check-availability?seats=${data.bookedSeats}`
      );
      if (
        !checkSeats.data.success &&
        checkSeats.data.status === TripStatus.NO_ENOUGH_SEATS
      ) {
        form.setError("bookedSeats", {
          type: "manual",
          message: checkSeats.data.message,
        });

        return;
      } else if (!checkSeats.data.success) {
        form.setError("root", {
          type: "manual",
          message: checkSeats.data.message,
        });

        return;
      }
      setClientData(data);
      setCurrentStep("payment");
    } catch (error: unknown) {
      form.setError("root", {
        type: "manual",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setCheckingAvailability(false);
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-bold text-center mb-10">
          User Information
        </h2>
        {form.formState.errors.root && (
          <div className="mb-4 rounded-lg border border-red-500 bg-red-100 px-4 py-2 text-sm text-red-700 text-center w-auto">
            {form.formState.errors.root.message}
          </div>
        )}
        {checkingAvailability && (
          <div className="mb-4 flex items-center justify-center gap-2 text-blue-600 text-sm">
            <Loader2 className="animate-spin h-4 w-4" />
            Checking trip availability...
          </div>
        )}
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
                  <FormLabel>{priceTitle || "Pricing category"}</FormLabel>
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
          <FormField
            control={form.control}
            name="bookedSeats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Seats</FormLabel>
                <FormControl>
                  <Counter
                    value={field.value}
                    onChange={field.onChange}
                    min={1}
                    max={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-5 flex flex-col md:flex-row gap-5">
          <Button
            type="submit"
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
