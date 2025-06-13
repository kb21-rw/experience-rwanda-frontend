"use client";

import BookingCircularProgressbar from "./CircularProgressBar";
import { IoLocationSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { useBookings } from "@/hooks/useBookings";
const BookingHeader = ({ params }: { params: { tripId: string } }) => {
  const { bookings } = useBookings(params.tripId);

  const remainingDays = bookings[0].trip.departureTime
    ? new Date(bookings[0].trip.departureTime).getTime() - Date.now()
    : null;

  console.log("remainingDays", remainingDays);
  console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT trip bookings", bookings);
  return (
    <div className="p-10 bg-white font-inter flex  flex-col gap-8 md:flex-row justify-between">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Booking | Visit <span>{bookings[0].trip.destination}</span>
        </h1>
        <div>
          <h1>Crew Team:</h1>
          <p>
            Nestor Ngabonziza <span className="font-semibold">(Driver)</span>
          </p>
          <p>
            Ramona Ingabire
            <span className="font-semibold">(Trip coordinator)</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <div className="flex gap-4 justify-center items-center">
          <IoLocationSharp />
          <p>{bookings[0].trip.destination}</p>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <FaClock />
          <p>{bookings[0].trip.departureTime}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <BookingCircularProgressbar
          progress={remainingDays?.valueOf() ?? 0}
          label={"Days To Go"}
        />
        <BookingCircularProgressbar progress={90} label={"Bookings Made"} />
      </div>
    </div>
  );
};

export default BookingHeader;
