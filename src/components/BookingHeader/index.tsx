"use client";

import { useMemo } from "react";
import BookingCircularProgressbar from "./CircularProgressBar";
import { IoLocationSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { differenceInCalendarDays } from "date-fns";
import { Badge } from "../ui/badge";
import BackButton from "../ui/BackButton";

const BookingHeader = ({
  departureTime,
  totalBookedSeats,
  totalSeats,
  destination,
}: {
  departureTime: string;
  totalBookedSeats: number;
  totalSeats: number;
  destination: string;
}) => {
  const bookingsPercent = (totalBookedSeats / totalSeats) * 100;
  const { formattedDate, daysProgress } = useMemo(() => {
    const departureDate = new Date(departureTime);
    const today = new Date();

    return {
      formattedDate: departureDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
      daysProgress: differenceInCalendarDays(departureDate, today),
    };
  }, [departureTime]);

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <BackButton />
      <div className="bg-white font-inter w-full flex flex-col gap-8 md:flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex  flex-col items-start gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Booking | Visit <span>{destination}</span>
            </h1>
          </div>

          <div className="text-base flex flex-col gap-1">
            <h1>Crew Team:</h1>
            <p>
              Nestor Ngabonziza
              <span className="font-semibold">(Driver)</span>
            </p>
            <p>
              Ramona Ingabire
              <span className="font-semibold">(Trip coordinator)</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start text-base">
          <div className="flex gap-4 items-center">
            <IoLocationSharp size={19} />
            <p>{destination}</p>
          </div>
          <div className="flex gap-4 items-center">
            <FaClock />
            <p>{formattedDate}</p>
          </div>
        </div>

        <div className="flex gap-4 flex-col md:flex-row items-center text-base">
          {daysProgress > 0 ? (
            <BookingCircularProgressbar
              progress={daysProgress}
              label="Days To Go"
            />
          ) : (
            <Badge variant="destructive">Done</Badge>
          )}
          <BookingCircularProgressbar
            progress={Number(bookingsPercent.toFixed(1))}
            label="Bookings Made"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;
