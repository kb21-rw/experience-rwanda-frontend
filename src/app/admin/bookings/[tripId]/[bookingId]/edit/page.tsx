import { Booking } from "@/types/Booking";
import EditBookingForm from "./EditBookingForm";
import BackButton from "@/components/ui/BackButton";

export default async function EditBookingPage({
  params,
}: {
  params: { bookingId: string };
}) {
  let booking: Booking | null = null;
  const { bookingId } = params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`,
      {
        next: {
          tags: ["bookings"],
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch booking");
    booking = await res.json();
  } catch {
    console.error("Failed to fetch booking");
  }

  // if (loading) return <div className="p-10">Loading...</div>;
  // if (error) return <div className="p-10 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with back arrow and title */}
      <div className="flex items-center gap-3 mt-12 mb-8 ml-10">
        <BackButton />
        <h1 className="text-2xl font-bold">Update Booking Information</h1>
      </div>
      {/* Main content: two columns, with border */}
      <div className="w-full max-w-7xl mx-auto mt-8 px-12">
        <div className="border border-gray-300 rounded-xl mt-12 py-12 px-12 flex flex-row gap-24 items-start">
          {/* Left: Form */}
          <EditBookingForm booking={booking} />
          {/* Right: Client & Trip Info */}
          <div className="flex-1 min-w-[220px] flex flex-col gap-8 justify-start">
            <div>
              <h2 className="font-bold text-lg mb-2">Client Information</h2>
              <div className="text-gray-800">
                <div>
                  <span className="font-semibold">Name:</span>{" "}
                  {booking?.user.fullName}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {booking?.user.email}
                </div>
                <div>
                  <span className="font-semibold">Tel:</span>{" "}
                  {booking?.user.phoneNumber}
                </div>
                {booking?.totalAmount && (
                  <div>
                    <span className="font-semibold">Pricing:</span>{" "}
                    {booking.totalAmount.toLocaleString()} Rwf
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2">Trip Information</h2>
              <div className="text-gray-800">
                <div>
                  <span className="font-semibold">Location:</span>{" "}
                  {booking?.trip.destination}
                </div>
                <div>
                  <span className="font-semibold">Departure Time:</span>{" "}
                  {booking?.trip.departureTime
                    ? new Date(booking.trip.departureTime).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : ""}
                </div>
                <div>
                  <span className="font-semibold">Time:</span>{" "}
                  {booking?.trip.departureTime
                    ? new Date(booking.trip.departureTime).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
