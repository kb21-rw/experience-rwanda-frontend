"use client";
import {
  EditBookingSchema,
  EditBookingSchemaType,
} from "@/utils/schemas/editBookingSchema";
import { FormProvider, useForm } from "react-hook-form";
import { Booking } from "@/types/Booking";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

const EditBookingForm = ({ booking }: { booking: Booking | null }) => {
  const form = useForm<EditBookingSchemaType>({
    resolver: zodResolver(EditBookingSchema),
    defaultValues: {
      email: booking?.user.email,
      fullName: booking?.user.fullName,
      phoneNumber: booking?.user.phoneNumber,
    },
  });
  const onSubmit = async (data: EditBookingSchemaType) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${booking?.user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to update user");
      toast.success("Booking updated successfully");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider {...form}>
      <div className="flex-1 max-w-xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 px-6 rounded-md font-medium"
          >
            Update Booking
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default EditBookingForm;
