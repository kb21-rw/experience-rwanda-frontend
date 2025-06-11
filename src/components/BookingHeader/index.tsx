"use client";

import { useTrips } from "@/hooks/useTrips";

const BookingHeader = () => {
  const { trips } = useTrips();
  console.log("TTTTTTTTTTTTTTTTTTTTTTrips", trips);
  return (
    <div className="p-10 bg-white font-inter">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Booking | <span>{trips[0].title} </span>
        </h1>
        <div>
          <h1>Crew Team:</h1>
          <p>
            Nestor Ngabonziza <span className="font-semibold">(Driver)</span>
          </p>
          <p>
            Ramona Ingabire{" "}
            <span className="font-semibold">(Trip coordinator)</span>
          </p>
        </div>
      </div>
      <div>
        <p>{trips[0].title}</p>
        <p>{trips[0].departureTime}</p>
      </div>
      <div></div>
    </div>
  );
};

export default BookingHeader;
