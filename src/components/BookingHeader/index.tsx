"use client";

import { useMemo } from "react";
import BookingCircularProgressbar from "./CircularProgressBar";
import { IoLocationSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { useBookings } from "@/hooks/useBookings";
import { useParams } from "next/navigation";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const BookingHeader = () => {
  const params = useParams();
  const tripId = params?.tripId as string;

  const { bookings } = useBookings(tripId);
  const booking = bookings[0];

  const { formattedDate, statusLabel, progressValue } = useMemo(() => {
    if (!booking?.trip?.departureTime) {
      return {
        formattedDate: "",
        statusLabel: "Days To Go",
        progressValue: 0,
      };
    }

    const departureDate = new Date(booking.trip.departureTime);
    const today = new Date();

    const diffDays = Math.ceil(
      (departureDate.getTime() - today.getTime()) / MS_PER_DAY
    );

    let label = "Days To Go";
    let value: number = 0;

    if (diffDays > 0) {
      value = diffDays;
    } else if (diffDays === 0) {
      label = "Ongoing";
      value = 100;
    } else {
      label = "Done";
      value = 100;
    }

    return {
      formattedDate: departureDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
      statusLabel: label,
      progressValue: value,
    };
  }, [booking]);

  if (!booking) return null;

  return (
    <div className="px-10 py-8 bg-white font-inter flex flex-col gap-8 md:flex-row justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900">
          Booking |Visit
          <span>{booking.trip.destination}</span>
        </h1>

        <div className="text-base flex flex-col gap-1">
          <h1>Crew Team:</h1>
          <p>
            NestorNgabonziza
            <span className="font-semibold">(Driver)</span>
          </p>
          <p>
            RamonaIngabire
            <span className="font-semibold">(Trip coordinator)</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-start text-base">
        <div className="flex gap-4 items-center">
          <IoLocationSharp size={19} />
          <p>{booking.trip.destination}</p>
        </div>
        <div className="flex gap-4 items-center">
          <FaClock />
          <p>{formattedDate}</p>
        </div>
      </div>

      <div className="flex gap-4 flex-col md:flex-row items-start text-base">
        <BookingCircularProgressbar
          progress={progressValue}
          label={statusLabel}
        />
        <BookingCircularProgressbar progress={90} label="Bookings Made" />
      </div>
    </div>
  );
};

export default BookingHeader;
