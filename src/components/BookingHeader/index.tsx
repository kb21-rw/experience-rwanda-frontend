"use client";

import { useTrips } from "@/hooks/useTrips";
import BookingCircularProgressbar from "./CircularProgressBar";
import { IoLocationSharp } from "react-icons/io5";
const BookingHeader = () => {
  const { trips } = useTrips();
  return (
    <div className="p-10 bg-white font-inter flex  flex-col gap-8 md:flex-row justify-between">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Booking | Visit <span>{trips[2].destination} </span>
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
      <div>
        <div>
          <IoLocationSharp />
          <p>{trips[0].destination}</p>
        </div>
        <div>
          <IoLocationSharp />
          <p>{trips[0].departureTime}</p>
        </div>
      </div>
      <div className="flex gap-4 ">
        <BookingCircularProgressbar progress={80} label={"Days To Go"} />
        <BookingCircularProgressbar progress={90} label={"Bookings Made"} />
      </div>
    </div>
  );
};

export default BookingHeader;
