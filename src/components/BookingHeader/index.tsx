"use client";

import BookingCircularProgressbar from "./CircularProgressBar";
import { IoLocationSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { useBookings } from "@/hooks/useBookings";
import { useParams } from "next/navigation";

const BookingHeader = () => {
  const params = useParams();
  const tripId = params?.tripId as string;

  const { bookings } = useBookings(tripId);

  const remainingDays = bookings[0]?.trip?.departureTime
    ? Math.round(
        (Date.now() - new Date(bookings[0].trip.departureTime).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <div className="p-10 bg-white font-inter flex  flex-col gap-8 md:flex-row justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900">
          Booking | Visit <span>{bookings[0].trip.destination}</span>
        </h1>
        <div className="text-base flex flex-col gap-1">
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
          progress={remainingDays ?? 0}
          label={"Days To Go"}
        />
        <BookingCircularProgressbar
          progress={`${90} %`}
          label={"Bookings Made"}
        />
      </div>
    </div>
  );
};

export default BookingHeader;
