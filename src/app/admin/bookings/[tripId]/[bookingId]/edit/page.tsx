"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";

interface BookingData {
  user: {
    email: string;
    fullName: string;
    phoneNumber: string;
  };
  trip: {
    destination: string;
    departureTime: string;
    returnTime: string;
    title?: string;
    pricingOptions?: { amount: string }[];
  };
  totalAmount?: number;
}

type FormFields = {
  email: string;
  fullName: string;
  phone: string;
};

export default function EditBookingPage() {
  const router = useRouter();
  const params = useParams();
  const { tripId, bookingId } = params;
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormFields>();

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`);
        if (!res.ok) throw new Error("Failed to fetch booking");
        const data = await res.json();
        setBooking(data);
        setValue("email", data.user.email || "");
        setValue("fullName", data.user.fullName || "");
        setValue("phone", data.user.phoneNumber || "");
      } catch {
        setError("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [bookingId, setValue]);

  const onSubmit = async (form: FormFields) => {
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email: form.email,
            fullName: form.fullName,
            phoneNumber: form.phone,
          },
        }),
      });
      if (!res.ok) throw new Error("Failed to update booking");
      router.push(`/admin/bookings/${tripId}`);
    } catch {
      setError("Failed to update booking");
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with back arrow and title */}
      <div className="flex items-center gap-3 mt-12 mb-8 ml-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 rounded hover:bg-gray-200 transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Update Booking Information</h1>
      </div>
      {/* Main content: two columns, with border */}
      <div className="w-full max-w-7xl mx-auto mt-8 px-12">
        <div className="border border-gray-300 rounded-xl mt-12 py-12 px-12 flex flex-row gap-24 items-start">
          {/* Left: Form */}
          <div className="flex-1 max-w-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <FormInput<FormFields>
                register={register}
                name="email"
                label="Email"
                type="text"
                errors={errors}
              />
              <FormInput<FormFields>
                register={register}
                name="fullName"
                label="Full Name"
                type="text"
                errors={errors}
              />
              <FormInput<FormFields>
                register={register}
                name="phone"
                label="Phone"
                type="text"
                errors={errors}
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 px-6 rounded-md font-medium"
              >
                Update Booking
              </Button>
              {error && <div className="text-red-600 mt-2">{error}</div>}
            </form>
          </div>
          {/* Right: Client & Trip Info */}
          <div className="flex-1 min-w-[220px] flex flex-col gap-8 justify-start">
            <div>
              <h2 className="font-bold text-lg mb-2">Client Information</h2>
              <div className="text-gray-800">
                <div><span className="font-semibold">Name:</span> {booking?.user.fullName}</div>
                <div><span className="font-semibold">Email:</span> {booking?.user.email}</div>
                <div><span className="font-semibold">Tel:</span> {booking?.user.phoneNumber}</div>
                {booking?.totalAmount && (
                  <div><span className="font-semibold">Pricing:</span> {booking.totalAmount.toLocaleString()} Rwf</div>
                )}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2">Trip Information</h2>
              <div className="text-gray-800">
                <div><span className="font-semibold">Location:</span> {booking?.trip.destination}</div>
                <div><span className="font-semibold">Departure Time:</span> {booking?.trip.departureTime ? new Date(booking.trip.departureTime).toLocaleDateString("en-US", { weekday: "long", day: "2-digit", month: "short", year: "numeric" }) : ""}</div>
                <div><span className="font-semibold">Time:</span> {booking?.trip.departureTime ? new Date(booking.trip.departureTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 